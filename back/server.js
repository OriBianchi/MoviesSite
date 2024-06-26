const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to Database'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Routes
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth'); // Add this line
app.use('/api/users', usersRouter); // Use '/api/users' as the base path
app.use('/api/auth', authRouter); // Add this line to include auth routes

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Optional: Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
