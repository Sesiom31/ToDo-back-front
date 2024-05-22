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
    console.error("Error al registrar el usuario", err);

    res.status(500).json({ message: "Error al registrar el usuario " });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ username, email });
    if (!user)
      return res.status(404).json({ message: "Credenciales incorrectas" });

    const isMatch = await user.comparePassword(password);

    if (!isMatch)
      return res.status(404).json({ message: "Credenciales incorrectas" });

    const payload = { id: user.id };

    const token = await createToken(payload);

    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
    res.status(201).json({ message: "Usuario logueado exitosamente", token });
  } catch (err) {
    console.error("Error al iniciar sesión", err);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie(COOKIE_NAME, "", {
      ...COOKIE_OPTIONS,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Cierre de sesión exitoso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const verifyAuth = async (req, res) => {};
