import { User } from '../models/user.model.js';

export const getUserByEmail = async (email) => {
  return await User.findOne({ email }).select('+password');
};

export const registerUser = async (name, email, password) => {
  const newUser = new User({
    name,
    email,
    password,
  });
  const savedUser = await newUser.save();
  return savedUser; // Make sure to return the saved user
};

// find by id
export const getUserById = async (id) => {
  return await User.findById(id);
};
