import express from 'express';
import {connectDB } from './db/utils/config.js';
import { signup } from './controller/authcontroler.js';
const app = express();
const Port=3000;
app.get('/',(req,res)=>{
    res.send('Hello World!');
});
app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
    connectDB();
});
signup();