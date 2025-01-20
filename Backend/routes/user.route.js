import Router from "express";

const router = Router();
import { loginUser } from "../controllers/auth.controller.js";

router.post("/login", loginUser);
export default router;