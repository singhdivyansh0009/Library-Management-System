import express from "express";
import { checkBookAvailability,issueBook,returnBook,payFine } from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/checkBookAvailability", checkBookAvailability);
router.post("/issueBook", issueBook);
router.post("/returnBook", returnBook);
router.post("/payFine", payFine);

export default router;