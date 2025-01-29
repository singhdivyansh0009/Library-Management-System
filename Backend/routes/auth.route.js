import Router from "express";

const router = Router();
import { loginUser, logout } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

router.post("/login", loginUser);
router.post("/logout",verifyJWT,logout);

export default router;