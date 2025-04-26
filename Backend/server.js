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
  'http://localhost:5173', // Local development
  'https://edugen-7bwq.onrender.com', // Render frontend
  'https://edtech-kkol.vercel.app', // Vercel production
  'https://edtech-kappa-coral.vercel.app', // Vercel deployment from error
  'https://edtech-kkol-m5bvj3rql-harshs-projects-9c290640.vercel.app' // Vercel deployment URL
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in the allowed list or matches a pattern
    if (allowedOrigins.some(allowedOrigin => {
      return origin === allowedOrigin ||
             origin.startsWith(allowedOrigin.replace('https://', 'http://')) || // HTTP fallback
             origin.includes(allowedOrigin.replace('https://', '').replace('http://', '')); // Loose match
    })) {
      return callback(null, true);
    }
    
    console.warn(`⚠️ Blocked by CORS: ${origin}`);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // Legacy browsers
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight for all routes
app.use(express.json());

// ... rest of your code remains the same ...

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/user', userRoutes);
app.use('/study', studyRoutes);
app.use('/video', videoRoutes);
app.use('/question', tutorRoutes);
app.use('/learning', learningRoutes);
app.use('/mock', mockRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/assignment', assignmentRoutes);
app.use('/badge', badgeRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  
  // Handle CORS errors specifically
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS policy blocked this request' });
  }
  
  res.status(500).json({ error: 'Something went wrong!' });
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🟢 Allowed origins: ${allowedOrigins.join(', ')}`);
});
