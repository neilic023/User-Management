const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//handle errors
const handleErrors = err => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  //duplicate error code
  if (err.code === 11000) {
    errors.email = 'Email already in use';
    return errors;
  }

  //validation errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const signup_get = (req, res) => {
  res.send('signup');
};

const login_get = (req, res) => {
  res.send('login form');
};

//logic for creating user and saving it in a database as signup post request
const create_user = async (req, res) => {
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const newUser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const login_post = async (req, res) => {
  try {
    //checking if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is not found');
    //validate pass
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');
    //create and assign token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.TOKEN_SECRET
    );
    res.header('auth-token', token).send(token);
  } catch (error) {
    console.log({ error: message });
  }
};

//role permissions restriction
const restrict_to = (...roles) => {
  return (req, res, next) => {
    console.log(roles);
    if (!roles.includes(req.user.role)) {
      console.log(req.user);
      return res.status(403).send('Forbidden');
    }
    next();
  };
};

module.exports = {
  signup_get,
  login_get,
  create_user,
  login_post,
  restrict_to,
};
