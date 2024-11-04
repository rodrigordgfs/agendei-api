import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

const generateToken = async (id) => {
  const token = jwt.sign({ id }, secret, {
    expiresIn: "7d",
  });

  return token;
};

const validateToken = async (req, res, next) => {
  const token = String(req.headers["authorization"]).split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalid" });
    }
    req.userId = decoded.id;
    next();
  });
};

export default {
  generateToken,
  validateToken,
};
