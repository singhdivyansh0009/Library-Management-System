import express from "express";
import { 
    addMembership,
    updateMembership,
    addBook,
    updateBook,
    addMovie,
    updateMovie,
    userManagement,
    deleteMembership
} from "../controllers/admin.controller.js";
import {verifyJWT,isAdmin} from "../middleware/auth.middleware.js"

const router = express.Router();
// membership routes
router.post("/membership",verifyJWT, addMembership);
router.patch("/membership",verifyJWT, updateMembership);
router.delete("/membership/:memberShipId",verifyJWT, deleteMembership);

// book and movie routes
router.post("/book", verifyJWT,addBook);
router.patch("/book", verifyJWT,updateBook);
router.post("/movie",verifyJWT,addMovie);
router.patch("/movie",verifyJWT,updateMovie);

// user management routes
router.post("/userManagement",verifyJWT, userManagement);

export default router;