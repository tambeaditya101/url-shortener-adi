// create registerUser & loginUser
import {
  loginUserService,
  registerUserService,
} from '../services/auth.service.js';
import tryCatchWrapper from '../utils/tryCatchWrapper.js';

export const registerUser = tryCatchWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;
  const { token, user } = await registerUserService(name, email, password);

  req.user = user;
  // res.cookie('accessToken', token, cookieOptions); causing issues on ios devices so removing it
  res.status(201).json({ message: 'User created successfully', user, token });
});

export const loginUser = tryCatchWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const { token, user } = await loginUserService(email, password);

  req.user = user;
  // res.cookie('accessToken', token, cookieOptions);
  res.status(200).json({ message: 'Login successful', user, token });
});

export const getCurrentUser = tryCatchWrapper(async (req, res, next) => {
  res.status(200).json({ user: req.user });
});
