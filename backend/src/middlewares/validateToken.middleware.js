import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_JWT = process.env.SECRET_JWT;

export const verifyToken = (req, res, next) => {
  console.log("VERIFICANDO TOKEN 1");

  try {
    const { token } = req.cookies;
    console.log("VERIFICANDO TOKEN 2");

    if (!token)
      return res
        .status(400)
        .json({ message: "No existe el token, autorización denegada" });

    console.log("VERIFICANDO TOKEN 3");

    jwt.verify(token, SECRET_JWT, (err, decode) => {
      if (err) return res.status(400).json({ message: "Token inválido" });
      console.log("VERIFICANDO TOKEN 4");

      req.user = decode;
      next();
    });
  } catch (err) {
    res.status(400).json({ message: "Autorizacion denegada" });
  }
};
