import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
import config from '../config';
import { IUser, IUserView } from '../users/user';

// users hardcoded for simplicity, store in a db for production applications
const users: IUser[] = [
  {
    id: 1,
    username: 'admin',
    passwordHash: '$2a$10$dIgfYQXh5AWx4fsVaGHmpOlj0.lN8WOVr2T0aznMnFS9YaW67xG2O', // admin
    firstName: 'Admin',
    lastName: 'User',
    role: 'Role.Admin',
  },
  {
    id: 2,
    username: 'user',
    passwordHash: '$2a$10$UduxHFt0i9OUUtUFwkSuAe4t/FIqzHlEqeaDhCVWHlITOumt1rOY.', // user
    firstName: 'Normal',
    lastName: 'User',
    role: 'Role.User',
  },
];

export async function authenticate(username: string, password: string) {
  const user = users.find((u) => u.username === username);
  if (!user) {
    return null;
  }

  if (await bcrypt.compare(password, user.passwordHash)) {
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
    const { passwordHash, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token,
    } as IUserView;
  }
}
