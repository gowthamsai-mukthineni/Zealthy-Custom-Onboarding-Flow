// src/controllers/configController.js
import Config from "../models/Config.js";

// Ensure there is always exactly one config document
async function getOrCreateSingleton() {
  let doc = await Config.findOne();
  if (!doc) {
    doc = await Config.create({
      page2Components: ["aboutMe"], // sensible defaults
      page3Components: ["address"],
    });
  }
  return doc;
}

// @desc    Get app configuration
// @route   GET /api/config
export async function getConfig(req, res, next) {
  try {
    const config = await getOrCreateSingleton();
    res.json(config);
  } catch (err) {
    console.error("❌ Error fetching config:", err.message);
    next(err);
  }
}

// @desc    Update app configuration
// @route   PUT /api/config
export async function updateConfig(req, res, next) {
  try {
    const { page2Components, page3Components } = req.body;

    // Validation: enforce non-empty arrays
    if (!Array.isArray(page2Components) || page2Components.length === 0) {
      return res.status(400).json({ message: "page2Components must be a non-empty array" });
    }
    if (!Array.isArray(page3Components) || page3Components.length === 0) {
      return res.status(400).json({ message: "page3Components must be a non-empty array" });
    }

    const updated = await Config.findOneAndUpdate(
      {},
      { page2Components, page3Components },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating config:", err.message);
    next(err);
  }
}
