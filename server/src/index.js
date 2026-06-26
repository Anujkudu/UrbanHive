const dotenv = require('dotenv');
const path = require('path');

// Load .env from project root (one level up from server/src)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = require('./app');
const { connectDb } = require('./config/db');

const PORT = process.env.PORT || 5000;

async function start() {
    try {
        await connectDb(process.env.MONGODB_URI);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
}

start();
