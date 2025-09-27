import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema(
  {
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" }
  },
  { timestamps: true }
);

export const Flashcard = mongoose.model("Flashcard", flashcardSchema);
