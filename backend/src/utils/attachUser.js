import { getUserById } from '../dao/user.dao.js';
import { verifyToken } from './helper.js';

export const attachUser = async (req, res, next) => {
  // Check Authorization header first (for localStorage tokens)
  const authHeader = req.headers.authorization;
  const headerToken = authHeader && authHeader.split(' ')[1];

  // Fallback to cookie (for backward compatibility)
  // const cookieToken = req.cookies.accessToken;

  const token = headerToken;

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
