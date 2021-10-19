const User = require('../models/User');

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

//nalazi se u user controlleru, kreiranje usera u db
const create_user = async (req, res) => {
  try {
    const newUser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const login_post = (req, res) => {
  const { email, password } = req.body;
};

module.exports = {
  signup_get,
  login_get,
  create_user,
  login_post,
};
