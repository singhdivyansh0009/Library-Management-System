import express from "express";
import { addRequest,updateRequest } from "../controllers/requestissue.controller.js";

const router = express.Router();

router.post("/addRequest", addRequest);
router.post("/updateRequest/:requestId", updateRequest);

export default router;