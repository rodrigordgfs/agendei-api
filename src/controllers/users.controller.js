import userService from "../services/user.service.js";

const registertUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userService.registertUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
     if (error.message === 'User already regitered') {
      return res.status(409).json({ message: "Usuário já registrado." });
    }
    res.status(500).json({ message: "Erro ao registrar usuário" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.loginUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === "Email or password Invalid") {
      return res.status(401).json({ message: "Email ou senha inválido." });
    }
    console.log(error);
    res.status(500).json({ message: "Erro ao fazer login" });
  } 
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    console.log(error);
    res.status(500).json({ message: "Erro ao buscar usuário" });
  }
};

const patchUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  console.log('controller', id);
  
  try {
    const user = await userService.patchUser(id, name);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    console.log(error);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userService.deleteUser(id);
    res.status(204).end();
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    console.log(error);
    res.status(500).json({ message: "Erro ao deletar usuário" });
  }
};

export default {
  registertUser,
  loginUser,
  getUsers,
  patchUser,
  getUserById,
  deleteUser
};
