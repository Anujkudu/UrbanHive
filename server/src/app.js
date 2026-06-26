const express = require('express');
const cors = require('cors');

const app = express();
const { notFound, errorHandler } = require('./middleware/error');
const apiRoutes = require('./routes');

const rawOrigins = process.env.CORS_ORIGIN || '*';
const originList = rawOrigins
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);
const allowAll = originList.includes('*');

const corsOptions = {
    origin: allowAll
        ? '*'
        : function (origin, callback) {
            if (!origin || originList.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error('Not allowed by CORS'));
        },
    credentials: !allowAll
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
