import express from "express";
import {getRandomFlashcardsBySubjectName } from "../controller/Flashcontroller.js"
const router=express.Router();
router.get('/getFalsh/:name',getRandomFlashcardsBySubjectName );
export default router;