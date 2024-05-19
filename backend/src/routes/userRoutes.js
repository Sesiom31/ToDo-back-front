import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyAuth,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", (req, res) => {
  console.log("hola");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.post("/verify", verifyAuth);

export default router;
