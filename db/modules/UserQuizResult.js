import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  selectedAnswer: String,
  isCorrect: Boolean
});

const userQuizResultSchema = new mongoose.Schema(
  {
    // no auth now; if you add anonymousId later you can store it
    quizIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
    score: Number,
    answers: [answerSchema],
    completedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const UserQuizResult = mongoose.model("UserQuizResult", userQuizResultSchema);
