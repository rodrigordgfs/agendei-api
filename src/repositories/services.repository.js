import database from "../config/database.js";

const postService = async (description) => {
  try {
    const service = await database.query(
      "INSERT INTO services (description) VALUES ($1) RETURNING *",
      [description]
    );

    return service.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const patchService = async (id, description) => {
  try {
    const service = await database.query(
      "UPDATE services SET description = $1 WHERE id_service = $2 RETURNING *",
      [description, id]
    );

    return service.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getServices = async () => {
  try {
    const services = await database.query("SELECT * FROM services");

    return services.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getServiceById = async (id) => {
  try {
    const service = await database.query(
      "SELECT * FROM services WHERE id_service = $1",
      [id]
    );

    return service.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteService = async (id) => {
  try {
    await database.query("DELETE FROM services WHERE id_service = $1", [id]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getServiceDoctors = async (id) => {
  try {
    const services = await database.query(
      `SELECT * FROM doctors_services WHERE id_service = $1`,
      [id]
    );

    return services.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  postService,
  patchService,
  getServices,
  getServiceById,
  deleteService,
  getServiceDoctors
};
