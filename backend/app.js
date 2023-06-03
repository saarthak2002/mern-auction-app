const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const items = require('./routes/api/items.js');
const users = require('./routes/api/users.js');

const app = express();

// Connect Database
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/api/items', items);
app.use('/api/users', users);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));