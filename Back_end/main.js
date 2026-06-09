const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const signup = require('./router/signup.js');
const health = require('./router/health.js');

const posts=require('./router/posts.js');
const groups=require('./router/groups.js')
const companies=require('./router/companies.js')
const investment_ad=require('./router/investment_ad.js');
const deal=require('./router/deal.js');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files correctly
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use( health);
app.use('/api', signup);

app.use(posts);
app.use(groups);
app.use(companies);
app.use(investment_ad);
app.use(deal);

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