const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const PORT = 3000;
const { sequelize, ensureDatabaseExists } = require('./config/database');
const productRoutes = require('./routes/product.routes');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





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





app.use('/api/products', productRoutes);


// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

async function start() {
  try {
    // 1. Make sure the MySQL database exists
    await ensureDatabaseExists();

    // 2. Test the Sequelize connection
    await sequelize.authenticate();
    console.log('Connected to MySQL successfully.');

    // 3. Auto-create/update the "products" table to match the model
    //    Use { alter: true } during development so schema changes are applied automatically.
    await sequelize.sync({ alter: true });
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






