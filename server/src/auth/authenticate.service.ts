import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
import config from '../config';
import { IUser, IUserView } from '../users/user';

// users hardcoded for simplicity, store in a db for production applications
const users: IUser[] = [
  {
    id: 1,
    username: 'admin',
    passwordHash: '$2y$10$OnhOgmbGWn29eubqzaops.ydIL11DB9mUKwGO0t0JFK5l1BUxiNtG',
    firstName: 'Admin',
    lastName: 'User',
    role: 'Role.Admin',
  },
  {
    id: 2,
    username: 'user',
    passwordHash: '$2y$10$nFIvhiY0yGrsi0gmLJauG.MYvMaQx4IghgJM.KmrmnVQ/l0JHhvhq',
    firstName: 'Normal',
    lastName: 'User',
    role: 'Role.User',
  },
];

export async function authenticate(username: string, password: string) {
  const hash = await bcrypt.hash(password, 10);
  const user = users.find(
    (u) => u.username === username && u.passwordHash === hash,
  );

  if (user) {
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
    const { passwordHash, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token,
    } as IUserView;
  }
}
