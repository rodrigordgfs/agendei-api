import appointmentsRepository from "../repositories/appointments.repository.js";
import doctorRepository from "../repositories/doctor.repository.js";
import serviceRepository from "../repositories/services.repository.js";
import userRepository from "../repositories/user.repository.js";
import AppError from "../utils/error.js";

const getAppointments = async (id_user) => {
  return await appointmentsRepository.getAppointments(id_user);
};

const getAppointmentById = async (id) => {
  return await appointmentsRepository.getAppointmentById(id);
};

const postAppointment = async (
  id_doctor,
  id_service,
  id_user,
  booking_date,
  booking_hour
) => {
  const doctorExists = await doctorRepository.getDoctorById(id_doctor);
  if (!doctorExists) {
    throw new AppError("Doctor not found", 404);
  }

  const serviceExists = await serviceRepository.getServiceById(id_service);
  if (!serviceExists) {
    throw new AppError("Service not found", 404);
  }

  const userExists = await userRepository.getUserById(id_user);
  if (!userExists) {
    throw new AppError("User not found", 404);
  }

  const doctorAvailability =
    await appointmentsRepository.checkDoctorAvailability(
      id_doctor,
      booking_date,
      booking_hour
    );
  if (doctorAvailability) {
    throw new AppError("Doctor not available", 400);
  }

  return await appointmentsRepository.postAppointment(
    id_doctor,
    id_service,
    id_user,
    booking_date,
    booking_hour
  );
};

const deleteAppointment = async (id) => {
  return await appointmentsRepository.deleteAppointment(id);
};

export default {
  getAppointments,
  postAppointment,
  deleteAppointment,
  getAppointmentById,
};
