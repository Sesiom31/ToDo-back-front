import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_JWT = process.env.SECRET_JWT;

export const verifyToken = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res
        .status(400)
        .json({ message: "No existe el token, autorización denegada" });

    jwt.verify(token, SECRET_JWT, (err, decode) => {
      if (err) return res.status(400).json({ message: "Token inválido" });

      req.user = decode;
      console.log(req.user);
      next();
    });
  } catch (err) {
    res.status(400).json({ message: "Autorizacion denegada" });
  }
};
