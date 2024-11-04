import userRepository from "../repositories/user.repository.js";
import { hashPassword, verifyPassword } from '../utils/passwordCriptDecript.js'
import AppError from '../utils/error.js';
import token from '../utils/jwt.js'

const registertUser = async (name, email, password) => {
  const userExists = await userRepository.getUserByEmail(email);
  if (userExists) {
    throw new AppError("User already regitered", 409);
  }

  const user = await userRepository.registertUser(name, email, await hashPassword(password));
  delete user.password;
  user.token = await token.generateToken(user.id);
  
  return user;
};

const loginUser = async (email, password) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new AppError("Email or password Invalid", 401);
  }

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Email or password Invalid", 401);
  }
  delete user.password;
  user.token = await token.generateToken(user.id);

  return user;
};

const getUsers = async () => {
  const users =  await userRepository.getUsers();
  users.map(user => delete user.password);
  return users;
};

const getUserById = async (id) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  delete user.password
  return user;
};

const patchUser = async (id, name) => {
  
  const userExists = await userRepository.getUserById(id);
  if (!userExists) {
    throw new AppError("User not found", 404);
  }
  const user = await userRepository.patchUser(id, name);
  delete user.password
  return user;
};

const deleteUser = async (id) => {
  const userExists = await userRepository.getUserById(id);
  if (!userExists) {
    throw new AppError("User not found", 404);
  }
  return await userRepository.deleteUser(id);
};

export default {
  registertUser,
  loginUser,
  getUsers,
  patchUser,
  getUserById,
  deleteUser
};
