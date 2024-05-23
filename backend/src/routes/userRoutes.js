import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
} from "../controllers/user.controller.js";
import { validateDatosUser } from "../middlewares/validateDatosUser.middleware.js";
import { userLoginSchema, userRegisterSchema } from "../schemas/user.schema.js";
import { verifyToken } from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  console.log("hola");
});

router.post("/register", validateDatosUser(userRegisterSchema), registerUser);

router.post("/login", validateDatosUser(userLoginSchema), loginUser);

router.post("/logout", logoutUser);

router.get("/verify", verifyToken, verifyUser);

export default router;
