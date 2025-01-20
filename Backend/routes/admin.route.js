import express from "express";
import { addMembership,updateUser,addBook,updateBook,addMovie,updateMovie,userManagement } from "../controllers/admin.controller";

const router = express.Router();

router.post("/addMembership", addMembership);
router.post("/addBook", addBook);
router.post("/addMovie", addMovie);
router.post("/updateUser", updateUser);
router.post("/updateBook", updateBook);
router.post("/updateMovie", updateMovie);
router.post("/userManagement", userManagement);

export default router;