import { User } from '../models/user.model.js';

export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const registerUser = async (name, email, password) => {
  const newUser = new User({
    name,
    email,
    password,
  });
  await newUser.save();
  return newUser;
};

// find by id
export const getUserById = async (id) => {
  return await User.findById(id);
};
