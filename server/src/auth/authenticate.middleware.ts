import jwt = require('jsonwebtoken');
import config from '../config';
import { Request, Response } from 'express';

export default (req: Request, res: Response, next: any) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  let token: string = req.headers.authorization;
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    } else {
      // req.decoded = decoded;
      console.log(decoded);
      next();
    }
  });
};
