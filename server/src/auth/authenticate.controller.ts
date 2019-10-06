import express = require('express');
import { Request, Response } from 'express';
import { IUserAuthInput } from '../users/user';
import { authenticate } from './authenticate.service';

const router = express.Router();

// routes
router.post('/', async (req: Request, res: Response, next) => {
  const userAuthInput = req.body as IUserAuthInput;
  if (!userAuthInput || !userAuthInput.username || !userAuthInput.password) {
    res.status(400).json();
    return;
  }

  const user = await authenticate(userAuthInput.username, userAuthInput.password);
  if (user) {
    res.json(user);
  } else {
    res.status(400).json({ message: 'Username or password is incorrect' });
  }
});

export default router;
