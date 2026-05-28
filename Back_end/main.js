const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const signup = require('./router/signup.js');
const health = require('./router/health.js');
const getcomp=require('./router/getcomp.js');
const posts=require('./router/posts.js')

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files correctly
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use( health);
app.use('/api', signup);
app.use(getcomp);
app.use(posts);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global Error:", err.message);
    res.status(err.status || 400).json({
        success: false,
        message: err.message || "An unexpected error occurred"
    });
});

const PORT = 5009;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});