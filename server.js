require('dotenv/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//cors middleware
app.use(cors());

//route middlewares
app.use('/', routes);
app.get('/', (req, res) => {
  res.json({ message: 'User managment app' });
});

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  mongoose.connection
    .once('open', () => console.log('Connected to database'))
    .on('error', err => console.error('connecting to MongoDB' + err));
  console.log('Server is listening...');
});
