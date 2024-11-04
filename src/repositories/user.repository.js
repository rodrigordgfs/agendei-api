import database from "../config/database.js";

const registertUser = async (name, email, password) => {
  try {
    const user = await database.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );

    return user.rows[0]
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await database.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    return user.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getUsers = async () => {
  try {
    const users = await database.query("SELECT * FROM users");

    return users.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await database.query("SELECT * FROM users WHERE id_user = $1", [
      id,
    ]);

    return user.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const patchUser = async (id, name) => {
  try {
    const user = await database.query(
      "UPDATE users SET name = $1 WHERE id_user = $2 RETURNING *",
      [name, id]
    );

    return user.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    await database.query("DELETE FROM users WHERE id_user = $1", [id]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  registertUser,
  getUserByEmail,
  getUsers,
  patchUser,
  getUserById,
  deleteUser
};
