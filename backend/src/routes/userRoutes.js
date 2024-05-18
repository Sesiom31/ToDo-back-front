import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  console.log("hola");
});

export default router;
