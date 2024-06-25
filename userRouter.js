import mongoose from 'mongoose';
import express from 'express';
import Users from './userModel.js';
import jwt from 'jsonwebtoken';

const signToken = (id) => {
  return jwt.sign({ id }, 'This is sample key');
};

const createToken = (statusCode, user, res) => {
  const token = signToken(user.id);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

const router = express.Router();

router.get('/', (req, res) => {
  const users = Users.find();
  res.status(200).json({
    body: users,
  });
});

router.post('/login', async (req, res) => {
  const body = req.body;
  console.log(body);
  const { email, password } = body;
  const user = await Users.findOne({ email: email });
  if (!user) {
    return res.status(401).json({
      status: 'failure',
      message: 'No user found',
    });
  }
  if (user.password === password) {
    createToken(201, user, res);
  }
});

router.post('/signup', async (req, res) => {
  const body = req.body;
  //   console.log(body);
  const user = await Users.create(body);
  //   res.status(200).json({
  //     status: 'success',
  //     body: user,
  //   });
  if (!user) {
    return res.status(404).json({
      status: 'failure',
      message: 'Cannot create user',
    });
  }
  createToken(201, user, res);
});

export default router;
