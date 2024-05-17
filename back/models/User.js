const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 15,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
     
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
