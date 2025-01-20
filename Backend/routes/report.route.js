import express from "express";
import { getAllUser,getAllMovie,getAllBook,getMemberUser,getActiveIssues,getPendingRequests,addBookIssue,getPendingIssueRequests,updateBookReturn } from "../controllers/report.controller.js";

const router = express.Router();

router.get("/getAllUser", getAllUser);
router.get("/getAllMovie", getAllMovie);
router.get("/getAllBook", getAllBook);
router.get("/getMemberUser", getMemberUser);
router.get("/getActiveIssues", getActiveIssues);
router.get("/getPendingRequests", getPendingRequests);
router.post("/addBookIssue", addBookIssue);
router.get("/getPendingIssueRequests", getPendingIssueRequests);
router.post("/updateBookReturn", updateBookReturn);

export default router;