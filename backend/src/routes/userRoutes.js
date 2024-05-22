import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyAuth,
} from "../controllers/user.controller.js";
import { validateDatosUser } from "../middlewares/validateDatosUser.middleware.js";
import { userRegisterSchema } from "../schemas/user.schema.js";

const router = Router();

router.get("/", (req, res) => {
  console.log("hola");
});

router.post("/register",validateDatosUser(userRegisterSchema), registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.post("/verify", verifyAuth);

export default router;
