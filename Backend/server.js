import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './Config/db.js'
import userRoutes from './Routes/userRoutes.js'
import studyRoutes from './Routes/studyRoutes.js'
import videoRoutes from './Routes/videoRoutes.js'
import tutorRoutes from './Routes/tutorRoutes.js'
import learningRoutes from './Routes/learningRoutes.js'
import mockRoutes from './Routes/mockRoutes.js'
import performanceRoutes from "./Routes/perfomanceRoutes.js";
import assignmentRoutes from './Routes/assignmentRoutes.js'
import badgeRoutes from './Routes/badgeRoute.js';

const app=express();
dotenv.config();

connectDB();
app.use(
    cors({
      origin: "https://edugen-7bwq.onrender.com", // Your frontend URL
      credentials: true, // Allow cookies (JWT)
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization']
    })
  );
app.use(express.json());

//Routes
app.use('/user',userRoutes)
app.use('/study',studyRoutes)
app.use('/video',videoRoutes)
app.use('/question',tutorRoutes)
app.use('/learning',learningRoutes);
app.use('/mock',mockRoutes);
app.use("/api/performance", performanceRoutes);
app.use('/assignment',assignmentRoutes);
app.use('/badge',badgeRoutes)

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`)
})
