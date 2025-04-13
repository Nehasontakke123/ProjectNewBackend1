import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const registerService = async (data) => {
  const { firstName, lastName, email, mobile, password, confirmPassword } = data;

  // Check password match
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  // Check if email already registered
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    mobile,
    password: hashedPassword,
  });

  await newUser.save();
  return { message: "User registered successfully" };
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '1h',
  });

  return {
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    }
  };
};
