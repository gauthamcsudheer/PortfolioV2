const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); 
const cors = require('cors');
const mongoose = require('mongoose');
const AppError = require('./utils/appError');
const protect = require('./middleware/auth'); // Our new gatekeeper middleware
require('dotenv').config();

const app = express(); 

// --- Global Middleware ---
app.use(morgan('dev')); 
app.use(cors()); // In production, configure this to only allow your domain
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --- Database Connection ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to Portfolio DB"))
  .catch(err => console.error("❌ DB connection error:", err));

// --- API Routes ---

// 1. Authentication (Public - so you can log in!)
app.use('/api/auth', require('./routes/auth'));

// 2. Contacts (POST is public for visitors, GET should be protected for you)
// We handle specific protection inside the route file or here
app.use('/api/contacts', require('./routes/contacts'));

// 3. Content Routes
// As a DSE, you want GET requests to be public so the world sees your work.
// But POST, PUT, and DELETE must be protected.
app.use('/api/experience', require('./routes/experience'));
app.use('/api/projects', require('./routes/projects'));

// --- 404 Route Handler ---
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    console.error('💥 ERROR:', err.stack);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;