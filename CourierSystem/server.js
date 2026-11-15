const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = 3000;
const { sequelize, ensureDatabaseExists } = require('./config/database');

const countryRoutes = require('./routes/country.routes');

const divisionRoutes = require('./routes/division.routes');

const districtRoutes = require('./routes/district.routes');
const policeStationRoutes = require('./routes/police-station.routes');

const userRoutes = require('./routes/user.routes');

const customerRoutes = require('./routes/customer.routes');

const agentRoutes = require('./routes/agent.routes');

const riderRoutes = require('./routes/rider.routes');

const parcelRoutes = require('./routes/parcel.routes');

const authRoutes = require('./routes/auth.routes');

const { protect } = require('./middleware/auth');
const { csrfGuard } = require('./middleware/csrf');


const { assertJwtConfigured } = require('./utils/jwt');
const { seedAdmin } = require('./services/auth.service');




// Which front-end addresses may talk to this API from a browser (comma separated in .env).
const allowedOrigins = (process.env.CLIENT_ORIGINS || 'http://localhost:4200')
    .split(',')
    .map((origin) => origin.trim());

// credentials: true lets the browser send and receive the login cookie.
// (It only works with an explicit list of origins, never with the open "*".)
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());                  // fills req.cookies
app.use(csrfGuard(allowedOrigins));       // blocks cross-site requests that carry the cookie


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use('/api/country', countryRoutes)

app.use('/api/division', divisionRoutes)
app.use('/api/district', districtRoutes)
app.use('/api/police-station', policeStationRoutes)

app.use('/api/user', protect('ADMIN'), userRoutes)   // raw user accounts: admin only

app.use('/api/customer', customerRoutes)

app.use('/api/agent', agentRoutes)

app.use('/api/rider', riderRoutes)

app.use('/api/parcel', parcelRoutes)

app.use('/api/auth', authRoutes)






app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Node.js Server</title>
        <style>
            body { font-family: sans-serif; text-align: center; margin-top: 100px; background-color: #f4f4f9; }
            h1 { color: #333; }
            p { color: #666; font-size: 1.2em; }
            .badge { background: #4caf50; color: white; padding: 5px 10px; border-radius: 4px; }
        </style>
    </head>
    <body>
        <h1>🚀 Welcome to Your Node.js App</h1>
        <p>This simple HTML layout is being served directly from your <strong>Express</strong> backend server.</p>
        <p>Status: <span class="badge">Online & Running</span></p>
    </body>
    </html>
  `);
});








// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found.' });
});

async function start() {
    try {
        assertJwtConfigured(); // stop right away if JWT_SECRET is missing
        // 1. Make sure the MySQL database exists
        await ensureDatabaseExists();

        // 2. Test the Sequelize connection
        await sequelize.authenticate();
        console.log('Connected to MySQL successfully.');

        // 3. Auto-create/update the "products" table to match the model
        //    Use { alter: true } during development so schema changes are applied automatically.
        await sequelize.sync();
        await seedAdmin(); // creates the first admin from .env if none exists
        console.log('Database tables synced (auto-created if missing).');

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
}



start();






