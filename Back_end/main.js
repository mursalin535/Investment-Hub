const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { authenticate } = require('./middleware/auth');

const signup = require('./router/signup.js');
const health = require('./router/health.js');
const auth = require('./router/auth.js');

const posts=require('./router/posts.js');
const groups=require('./router/groups.js')
const companies=require('./router/companies.js')
const investment_ad=require('./router/investment_ad.js');
const deal=require('./router/deal.js');
const group_visit=require('./router/group_visit.js');
const group_investment=require('./router/group_investment.js');
const deal_feedback=require('./router/deal_feedback.js');

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authenticate);

// Serve static files correctly
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use(health);
app.use('/api', signup);
app.use(auth);

app.use(posts);
app.use(groups);
app.use(companies);
app.use(investment_ad);
app.use(deal);
app.use(group_visit);
app.use(group_investment);
app.use(deal_feedback);

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
    console.log(`Server running on http://localhost:${PORT}`);
});
