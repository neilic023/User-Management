require('dotenv/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes');
var cors = require('cors');
const cookieParser = require('cookie-parser');



//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//cors middleware
app.use(cors({origin: true, credentials: true}));

//route middlewares
app.use('/', routes);
app.get('/', (req, res) => {
  res.json({ message: 'User managment app' });
});

//server start and mongoose connection
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
