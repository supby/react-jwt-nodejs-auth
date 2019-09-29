import jwt = require('jsonwebtoken');
import config from './config';
import { Request, Response } from 'express';

const checkToken = (req: Request, res: Response, next: any) => {
  // Express headers are auto converted to lowercase
  //   let token: string =
  //     req.headers['x-access-token'] || req.headers.authorization;
  if (!req.headers.authorization) {
    return res.json({
        success: false,
        message: 'Missing token',
      });
  }

  let token: string = req.headers.authorization;
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied',
    });
  }
};

exports = {
  checkToken,
};
