import express from 'express';
import {connectDB } from './db/utils/config.js';
import Subjectroutes from './routes/Subjectroutes.js'
const app = express();
const Port=3000;
app.use('/api/Subjects',Subjectroutes);
app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
    connectDB();
});
