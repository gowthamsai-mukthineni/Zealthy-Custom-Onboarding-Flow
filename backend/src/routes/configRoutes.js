// src/routes/configRoutes.js
import { Router } from "express";
import { getConfig, updateConfig } from "../controllers/configController.js";

const router = Router();

/**
 * @route   GET /api/config
 * @desc    Fetch the current app configuration
 */
router.get("/", getConfig);

/**
 * @route   PUT /api/config
 * @desc    Update the app configuration
 */
router.put("/", updateConfig);

export default router;
