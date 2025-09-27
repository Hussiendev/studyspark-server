import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Subject = mongoose.model("Subject", subjectSchema);
