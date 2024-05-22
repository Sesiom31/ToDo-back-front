import { User } from "../models/user.model.js";
import { createToken } from "../utils/createToken.js";

const COOKIE_NAME = "token";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  samesite: "strict",
  maxAge: "3600000",
};

export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "Este email ya está en uso" });

    user = await User.findOne({ username });
    if (user)
      return res.status(400).json({ message: "Este username ya está en uso" });

    user = await new User({
      firstname,
      lastname,
      username,
      email,
      password,
    });
    await user.save();

    const payload = { id: user.id };

    const token = await createToken(payload);
    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);

    res.status(201).json({ message: "Usuario registrado exitosamente", token });
  } catch (err) {
    console.err("Erro al registrar el usuario", err);

    res.status(500).json({ message: "Error al registrar el usuario " });
  }
};

export const loginUser = async (req, res) => {};

export const logoutUser = async (req, res) => {};

export const verifyAuth = async (req, res) => {};
