import { Router } from "express";
import {
  addCategorie,
  deleteCategorie,
  getCategories,
  loginUser,
  logoutUser,
  profileUser,
  registerUser,
  verifyUser,
} from "../controllers/user.controller.js";
import { validateDatos } from "../middlewares/validateDatos.middleware.js";
import { userLoginSchema, userRegisterSchema } from "../schemas/user.schema.js";
import { verifyToken } from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  console.log("hola");
});

router.post("/register", validateDatos(userRegisterSchema), registerUser);

router.post("/login", validateDatos(userLoginSchema), loginUser);

router.post("/logout", logoutUser);

router.get("/verify", verifyUser);

router.get("/profile", verifyToken, profileUser);

router.get("/getCategories", verifyToken, getCategories);

router.patch("/addCategorie", verifyToken, addCategorie);

router.patch("/deleteCategorie", verifyToken, deleteCategorie);

export default router;
