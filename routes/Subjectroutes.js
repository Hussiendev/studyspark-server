import express from "express";
import { getSubject ,getSubjectByName} from "../controller/Subjectcontroller.js";
const router=express.Router();
router.get('/getAllSubjects',getSubject);
router.get('/getByname/:name',getSubjectByName);
export default router;