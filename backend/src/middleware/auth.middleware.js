import { verifyToken } from '../utils/helper';

export const authMiddleware = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = verifyToken(accessToken);
    const user = await getUserById(decoded);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
