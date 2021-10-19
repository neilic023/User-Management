const mongoose = require('mongoose');
const { isEmail } = require('validator');
const itemSchema = require('./Item').schema;
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, 'Minimum password length is 6 characters'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    items: [itemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
