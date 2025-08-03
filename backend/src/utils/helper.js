import jsonwebtoken from 'jsonwebtoken';
import { nanoid } from 'nanoid';

export const generateNanoId = (length) => {
  return nanoid(length);
};

export const generateToken = (payload) => {
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '5m',
  });
};

export const verifyToken = (token) => {
  const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};
