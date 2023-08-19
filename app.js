const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();
// const keys = require('./configs/keys');

// Import Routes files
const todoRoutes = require('./routes/todos');

// Express settings and middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

// Routes
app.use('/api/todos', todoRoutes);

// Deploy with client sides
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Connect to Database
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect('mongodb://db:27017/dbname', { useNewUrlParser: true });

mongoose.connection.on('connected', ()=>{
  console.log(`Database connected`)
});
mongoose.connection.on('disconnected', () =>
  console.log(`Database disconnected`)
);
mongoose.connection.on('error', err =>
  console.log(`Database connect with error: ${err.message}`)
);

// Server
const PORT = process.env.PORT || 5566;

app.listen(PORT, () => {
  console.log('┌──────────────────────────────────┐');
  console.log('│   Todo List Server Started...    │');
  console.log(`│   Listening on the port ${PORT}     │`);
  console.log('│                      (´･ω･`)     │');
  console.log('└──────────────────────────────────┘');
});
