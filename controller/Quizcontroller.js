// controllers/flashcardController.js
import { Quiz } from "../db/modules/Quiz.js";
import { Subject } from "../db/modules/Subject.js";
import mongoose from "mongoose";
import logger from "../utils/logger.js";

export const getRandomQuizBySubjectName = async (req, res, next) => {
  try {
    const { name } = req.params;
    logger.info(name);

    // Find subject by name (case-insensitive)
  const subject = await Subject.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") }
    });
    if (!subject) {
        logger.info('not found');
      return res.status(404).json({ message: "Subject not found" });
      
    }
    logger.info(`got the subjectc ${name}` );
    // Get 10 random flashcards for that subject
    const quizez = await Quiz.aggregate([
      { $match: { subjectId: new mongoose.Types.ObjectId(subject._id) } },
      { $sample: { size: 10 } }
    ]);
    logger.info('generated the Quizez');

    res.json({ subject: name, quizez });
  } catch (err) {
    next(err);
  }
};
