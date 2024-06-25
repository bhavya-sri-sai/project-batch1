import mongoose from 'mongoose';
import validator from 'validator';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required'],
  },
  password: {
    type: String,
    required: [true, 'Pass required'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'Cpass required'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords didn't match",
    },
  },
  email: {
    type: String,
    required: [true, 'Email Id required'],
  },
});

const users = mongoose.model('users', userSchema);

export default users;
