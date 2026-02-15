const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); // Request Logger
const cors = require('cors');
const mongoose = require('mongoose');
const AppError = require('./utils/appError');
require('dotenv').config();

const app = express(); // Defined first to solve ReferenceError

// --- Global Middleware ---
app.use(morgan('dev')); // Standard dev logging
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --- Database Connection ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to Portfolio DB"))
  .catch(err => console.error("❌ DB connection error:", err));

// --- API Routes ---
app.use('/api/experience', require('./routes/experience'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contacts', require('./routes/contacts'));

// --- 404 Route Handler ---
// Catch all routes that aren't defined above
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// --- Global Error Handler ---
// Must have 4 arguments to be recognized as error middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  console.error('💥 ERROR:', err.stack); // For your server logs

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    // Include stack trace only in development mode
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;