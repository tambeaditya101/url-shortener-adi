import { getUserById } from '../dao/user.dao.js';
import { verifyToken } from './helper.js';

export const attachUser = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next();
  try {
    const decoded = verifyToken(token);
    const user = await getUserById(decoded);
    if (!user) return next();
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
