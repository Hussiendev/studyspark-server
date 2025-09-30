import express from 'express';
import {connectDB } from './db/utils/config.js';
import Subjectroutes from './routes/Subjectroutes.js'
import Flashcardroutes from './routes/Flashcardroutes.js'
import Quizroutes from './routes/Quizroutes.js';

const app = express();
const Port=3000;
app.use('/api/Subjects',Subjectroutes);
app.use('/api/Flashcards',Flashcardroutes);
app.use('/api/Quiz',Quizroutes);
app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
    connectDB();
});
