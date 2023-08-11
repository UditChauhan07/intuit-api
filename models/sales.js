// models/user.js
const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, 
{ timestamps: true });


const User = mongoose.model('Sales', userSchema);

module.exports = Sales;
