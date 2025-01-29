import express from "express";
import {issueBook,returnBook,payFine, getActiveIssues, getAllActiveIssues, getOverdueReturns} from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/issue-book", issueBook);
router.post("/return-book", returnBook);
router.post("/pay-fine", payFine);
router.get("/active-issue",getActiveIssues);
router.get("/all-active-issues",getAllActiveIssues);
router.get("/overdue-returns",getOverdueReturns);

export default router;