import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    type: { type: String, enum: ["mcq", "true_false", "scenario"], required: true },
    question: { type: String, required: true },
    options: [String], // for mcq / true_false (["True","False"])
    correctAnswer: { type: String, required: true }, // exact option string
    explanation: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Quiz = mongoose.model("Quiz", quizSchema);
