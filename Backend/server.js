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


dotenv.config()
connectDB()

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'https://edugen-7bwq.onrender.com',
  'edtech-kkol-m5bvj3rql-harshs-projects-9c290640.vercel.app',
  'https://edtech-kkol.vercel.app/'
]

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

// 🔥 Always put CORS middleware at the very top
app.use(cors(corsOptions))

// 🔥 Handle preflight (OPTIONS) requests properly
app.options('*', cors(corsOptions))



app.use(express.json())

app.use('/user', userRoutes)
app.use('/study', studyRoutes)
app.use('/video', videoRoutes)
app.use('/question', tutorRoutes)
app.use('/learning', learningRoutes)
app.use('/mock', mockRoutes)
app.use('/api/performance', performanceRoutes)
app.use('/assignment', assignmentRoutes)
app.use('/badge', badgeRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
