const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/orders', { useNewUrlParser: true, useUnifiedTopology: true });

// Import the routes
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');

// Use the authentication routes for any requests to /auth
app.use('/auth', authRoutes);

// Use the order routes for any requests to /order, protected by authentication middleware
app.use('/order', authMiddleware, orderRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
