// src/controllers/submissionController.js
import Submission from "../models/Submission.js";

/**
 * @desc    Create or update a submission (upsert by email)
 * @route   POST /api/submissions
 */
export async function upsertSubmission(req, res, next) {
  try {
    const { email, aboutMe, address, birthdate, step } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Valid email is required" });
    }

    const update = {};
    if (aboutMe !== undefined) update.aboutMe = aboutMe;
    if (address !== undefined) update.address = address;
    if (birthdate !== undefined) update.birthdate = birthdate;
    if (step !== undefined) update.step = step;

    const doc = await Submission.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        $set: update,
        $setOnInsert: { email: email.toLowerCase() },
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json(doc);
  } catch (err) {
    console.error("❌ Error in upsertSubmission:", err.message);
    next(err);
  }
}

/**
 * @desc    List submissions with pagination & optional search
 * @route   GET /api/submissions
 */
export async function listSubmissions(req, res, next) {
  try {
    const { page = 1, limit = 20, q } = req.query;

    const query = q
      ? {
          $or: [
            { email: { $regex: q, $options: "i" } },
            { aboutMe: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const pageNum = Math.max(1, Number(page));
    const perPage = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * perPage;

    const [items, total] = await Promise.all([
      Submission.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage),
      Submission.countDocuments(query),
    ]);

    res.json({
      items,
      pagination: {
        total,
        page: pageNum,
        limit: perPage,
        pages: Math.ceil(total / perPage),
      },
    });
  } catch (err) {
    console.error("❌ Error in listSubmissions:", err.message);
    next(err);
  }
}
