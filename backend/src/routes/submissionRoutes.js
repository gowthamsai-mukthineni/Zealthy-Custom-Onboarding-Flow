// src/routes/submissionRoutes.js
import { Router } from "express";
import {
  listSubmissions,
  upsertSubmission,
} from "../controllers/submissionController.js";

const router = Router();

/**
 * @route   GET /api/submissions
 * @desc    List submissions with pagination & optional search (?q=...)
 */
router.get("/", listSubmissions);

/**
 * @route   POST /api/submissions
 * @desc    Create or update a submission (upsert by email)
 */
router.post("/", upsertSubmission);

export default router;
