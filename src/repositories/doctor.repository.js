import database from "../config/database.js";

const patchDoctor = async (id, name, specialty, icon) => {
  try {
    const doctor = await database.query(
      "UPDATE doctors SET name = $2, specialty = $3, icon = $4 WHERE id_doctor = $1 RETURNING *",
      [id, name, specialty, icon]
    );
    return doctor.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const postDoctor = async (name, specialty, icon) => {
  console.log(name, specialty, icon)
  try {
    const doctor = await database.query(
      "INSERT INTO doctors (name, specialty, icon) VALUES ($1, $2, $3) RETURNING *",
      [name, specialty, icon]
    );
    return doctor.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getDoctor = async (name) => {
  try {
    let query;
    let values;

    if (name) {
      // Se o nome foi fornecido, utilize o LIKE
      query = `
        SELECT * 
        FROM doctors 
        WHERE name ILIKE $1 
        ORDER BY name
      `;
      // Adiciona os '%' para permitir buscas parciais
      values = [`%${name}%`];
    } else {
      // Se o nome não foi fornecido, selecione todos os médicos
      query = `SELECT * FROM doctors ORDER BY name`;
      values = []; // Nenhum valor necessário para esta consulta
    }

    const doctors = await database.query(query, values);
    return doctors.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDoctorById = async (id) => {
  try {
    const doctor = await database.query(
      "SELECT * FROM doctors WHERE id_doctor = $1",
      [id]
    );
    return doctor.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteDoctor = async (id) => {
  try {
    const doctor = await database.query(
      "DELETE FROM doctors WHERE id_doctor = $1 RETURNING *",
      [id]
    );
    return doctor.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDoctorServices = async (id) => {
  try {
    const services = await database.query(
      `
      SELECT 
          s.id_service AS id_service,
          s.description AS description,
          d.price AS price
      FROM 
          doctors_services d
      JOIN 
          services s ON d.id_service = s.id_service
      WHERE 
          d.id_doctor = $1;
      `,
      [id]
    );
    return services.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDoctorService = async (idDoctor, idService) => {
  try {
    const service = await database.query(
      `
      SELECT 
          s.id_service AS id_service,
          s.description AS description,
          d.price AS price
      FROM 
          doctors_services d
      JOIN 
          services s ON d.id_service = s.id_service
      WHERE 
          d.id_doctor = $1 AND d.id_service = $2;
      `,
      [idDoctor, idService]
    );
    return service.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const patchDoctorServices = async (idDoctor, idService, price) => {
  try {
    const service = await database.query(
      `
      UPDATE doctors_services
      SET price = $3
      WHERE id_doctor = $1 AND id_service = $2
      RETURNING *;
      `,
      [idDoctor, idService, price]
    );
    return service.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const deleteDoctorService = async (idDoctor, idService) => {
  try {
    const service = await database.query(
      `
      DELETE FROM doctors_services
      WHERE id_doctor = $1 AND id_service = $2
      RETURNING *;
      `,
      [idDoctor, idService]
    );
    return service.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  getDoctor,
  getDoctorById,
  postDoctor,
  patchDoctor,
  deleteDoctor,
  getDoctorServices,
  patchDoctorServices,
  getDoctorService,
  deleteDoctorService
};
