// src/models/Submission.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, trim: true, default: "" },
    city:   { type: String, trim: true, default: "" },
    state:  { type: String, trim: true, default: "" },
    zip:    { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const submissionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // basic email validation
    },
    aboutMe: {
      type: String,
      trim: true,
      maxlength: [1000, "About Me cannot exceed 1000 characters"],
      default: "",
    },
    address: { type: addressSchema, default: () => ({}) },
    birthdate: {
      type: String,
      match: [/^\d{4}-\d{2}-\d{2}$/, "Birthdate must be in YYYY-MM-DD format"],
      default: "",
    },
    step: {
      type: Number,
      min: [0, "Step cannot be negative"],
      max: [3, "Step cannot exceed total wizard steps"],
      default: 0,
    },
  },
  { timestamps: true }
);

// Unique index so each email has a single row you can upsert into
submissionSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("Submission", submissionSchema);
