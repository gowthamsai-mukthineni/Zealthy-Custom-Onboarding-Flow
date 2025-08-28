// src/models/Config.js
import mongoose from "mongoose";

const ALLOWED = ["aboutMe", "address", "birthdate"];

const configSchema = new mongoose.Schema(
  {
    page2Components: {
      type: [String],
      required: [true, "page2Components is required"],
      validate: {
        validator: (arr) =>
          Array.isArray(arr) && arr.length > 0 && arr.every((x) => ALLOWED.includes(x)),
        message: (props) => `Invalid page2Components: ${props.value}`,
      },
      default: ["aboutMe"],
    },
    page3Components: {
      type: [String],
      required: [true, "page3Components is required"],
      validate: {
        validator: (arr) =>
          Array.isArray(arr) && arr.length > 0 && arr.every((x) => ALLOWED.includes(x)),
        message: (props) => `Invalid page3Components: ${props.value}`,
      },
      default: ["address"],
    },
  },
  { timestamps: true }
);

// Ensure only one config doc exists
configSchema.index({}, { unique: true });

export default mongoose.model("Config", configSchema);
