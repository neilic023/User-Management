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



const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.TOKEN_SECRET, { 
      expiresIn: maxAge
    })
} 





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
    await newUser.save();
     const token = createToken(newUser._id, newUser.role);
     res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
     res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
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
    const token = createToken(user._id, user.role);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
    res.status(200).send(token);
  } catch (error) {
    res.status(400).json({})
    console.log(error);
  }
};


const logout_get = async (req, res ) => {
 res.clearCookie('jwt')
} 

//role permissions restriction
const restrict_to = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send('Forbidden');
    }
    next();
  };
};

module.exports = {
  create_user,
  login_post,
  logout_get,
  restrict_to,
};


  
