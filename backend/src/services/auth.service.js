import bcrypt from 'bcrypt';
import { getUserByEmail, registerUser } from '../dao/user.dao.js';
import { ConflictError } from '../utils/errorHandler.js';
import { generateToken } from '../utils/helper.js';

export const registerUserService = async (name, email, password) => {
  const user = await getUserByEmail(email);
  if (user) {
    throw new ConflictError('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = registerUser(name, email, hashedPassword);
  const token = generateToken({ id: newUser._id });

  return { token, user: newUser };
};

export const loginUserService = async (email, password) => {
  const user = await getUserByEmail(email);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!user || !isPasswordValid) {
    throw new Error('Invalid Credentials');
  }
  const token = generateToken({ id: user._id });
  return { token, user };
};
