import database from "../config/database.js";

const getAppointments = async (id_user, startDate, endDate, doctor) => {
  console.log(id_user, startDate, endDate, doctor);

  try {
    let query = `
      SELECT 
        u.name AS user,
        a.id_appointment,
        s.description AS service,
        d.name AS doctor,
        d.specialty,
        ds.price,
        a.booking_date,
        a.booking_hour
      FROM appointments a
      JOIN doctors d ON a.id_doctor = d.id_doctor
      JOIN services s ON a.id_service = s.id_service
      JOIN users u ON a.id_user = u.id_user
      LEFT JOIN doctors_services ds ON ds.id_doctor = a.id_doctor AND ds.id_service = a.id_service
    `;

    const params = [];
    let conditions = [];

    if (id_user) {
      conditions.push(`a.id_user = $${params.length + 1}`);
      params.push(id_user);
    }

    if (startDate) {
      conditions.push(`a.booking_date >= $${params.length + 1}`);
      params.push(startDate);
    }

    if (endDate) {
      conditions.push(`a.booking_date <= $${params.length + 1}`);
      params.push(endDate);
    }

    if (doctor) {
      conditions.push(`a.id_doctor = $${params.length + 1}`);
      params.push(doctor);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    query += ` ORDER BY a.booking_date, a.booking_hour`;

    console.log(query);

    const appointments = await database.query(query, params);

    return appointments.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAppointmentById = async (id) => {
  try {
    const query = `
      SELECT 
        u.name AS user,
        a.id_appointment,
        s.description AS service,
        d.name AS doctor,
        d.specialty,
        ds.price,
        a.booking_date,
        a.booking_hour
      FROM appointments a
      JOIN doctors d ON a.id_doctor = d.id_doctor
      JOIN services s ON a.id_service = s.id_service
      JOIN users u ON a.id_user = u.id_user
      LEFT JOIN doctors_services ds ON ds.id_doctor = a.id_doctor AND ds.id_service = a.id_service
      WHERE id_appointment = $1
      ORDER BY a.booking_date, a.booking_hour;
    `;

    const params = [id];

    const appointment = await database.query(query, params);

    return appointment.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postAppointment = async (
  id_doctor,
  id_service,
  id_user,
  booking_date,
  booking_hour
) => {
  try {
    const query =
      "INSERT INTO appointments (id_doctor, id_service, id_user, booking_date, booking_hour) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const params = [id_doctor, id_service, id_user, booking_date, booking_hour];

    const newAppointment = await database.query(query, params);

    return newAppointment.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const checkDoctorAvailability = async (idDoctor, bookingDate, bookingHour) => {
  try {
    const query = `
      SELECT * FROM appointments
      WHERE id_doctor = $1
      AND booking_date = $2
      AND booking_hour = $3
    `;

    const params = [idDoctor, bookingDate, bookingHour];

    const appointment = await database.query(query, params);

    return appointment.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteAppointment = async (id) => {
  try {
    const query = "DELETE FROM appointments WHERE id_appointment = $1";
    const params = [id];

    await database.query(query, params);

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  getAppointments,
  postAppointment,
  checkDoctorAvailability,
  deleteAppointment,
  getAppointmentById,
};
