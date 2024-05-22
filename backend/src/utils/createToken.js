import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_JWT = process.env.SECRET_JWT;

export const createToken = async (payload) => {
  try {
    const token = jwt.sign(payload, SECRET_JWT, { expiresIn: "1h" });
    console.log(token);
    return token;
  } catch (err) {
    console.log(err);
    throw new Error("Error al crear el token");
  }
};
