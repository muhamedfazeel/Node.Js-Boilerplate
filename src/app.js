const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { logRequest, logResponse } = require('./utils/communicationLogger');
const router = require('./routes/routes');
const { error404 } = require('./middlewares/404');
const { errorHandler } = require('./middlewares/errorHandler');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later',
});

app.use(logRequest);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    next();
});
app.use(helmet()); // For preventing XSS and Click-jacking

app.use(limiter); // API Rate limiting

app.use(logResponse);

app.use(router);

// 404 Handler Middleware
app.use(error404);

// Custom Error Handler
app.use(errorHandler);

module.exports = app;
