import jwt = require('jsonwebtoken');
import config from '../config';
import { IUser } from '../users/user';

// users hardcoded for simplicity, store in a db for production applications
const users: IUser[] = [
  {
    id: 1,
    username: 'admin',
    passwordHash: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    role: 'Role.Admin',
  },
  {
    id: 2,
    username: 'user',
    passwordHash: 'user',
    firstName: 'Normal',
    lastName: 'User',
    role: 'Role.User',
  },
];

export async function authenticate(username: string, password: string) {
  const user = users.find(
    (u) => u.username === username && u.passwordHash === password,
  );
  if (user) {
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
    const { passwordHash, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token,
    };
  }
}
