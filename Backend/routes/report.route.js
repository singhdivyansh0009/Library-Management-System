import express from "express";
import { getAllUser,getAllMovie,getAllBook, getAllProducts, getMembers, getSingleBook, getAllBookCopies, getSingleBookCopies } from "../controllers/report.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/users",verifyJWT, getAllUser);
router.get("/movies",verifyJWT, getAllMovie);
router.get("/books",verifyJWT, getAllBook);
router.get("/single-book",verifyJWT, getSingleBook);
router.get("/members",verifyJWT, getMembers);
router.get("/products",verifyJWT,getAllProducts);
router.get("/book-copies",verifyJWT,getAllBookCopies);
router.get("/single-book-copies",verifyJWT,getSingleBookCopies);
export default router;