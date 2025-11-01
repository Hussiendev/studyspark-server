import express from 'express';
import {connectDB } from './db/utils/prisma.config.js';

import authroutes from './routes/authroutes.js';

const app = express();
const Port=process.env.PORT || 3000;
app.use(express.json())

;
app.use('/api/auth',authroutes);
app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
    connectDB();
});
