import express = require('express');
import { IUser } from '../users/user';
import { authenticate } from './authenticate.service';

const router = express.Router();

// routes
router.post('/', (req, res, next) => {
  console.log('authenticate request');
  console.log(req.body);
//   userService
//     .authenticate(req.body)
//     .then(user: IUser =>
//       user
//         ? res.json(user)
//         : res.status(400).json({ message: "Username or password is incorrect" })
//     )
//     .catch((err: any) => next(err));
});

export default router;
