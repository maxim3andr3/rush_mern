const express = require('express');
const connectDB = require('./config/db');
const app = express();

// connect db
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));



const PORT = process.env.PORT || 4242;

app.listen(PORT, () => console.log(`Serveur en marche sur Port: ${PORT}!`));