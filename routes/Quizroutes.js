import express from "express";
import {getRandomQuizBySubjectName } from "../controller/Quizcontroller.js"
const router=express.Router();
router.get('/getQuiz/:name',getRandomQuizBySubjectName );
export default router;