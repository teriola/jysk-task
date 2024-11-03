const User = require("../models/User");
const { createToken } = require("../utils/createToken");
const { SALT_ROUNDS } = require('../config/constants.js');
const bcrypt = require('bcrypt');

exports.register = async userData => {
  // Check if user is registered
  const existingUser = await User.findOne({ username: userData.username });
  if (existingUser) throw new Error('Потребителят вече съществува');

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);

  // Create user
  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });
  const accessToken = await createToken(user);
  return {
    _id: user._id,
    accessToken,
  };
}

exports.login = async ({ username, password }) => {
  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) throw new Error('Невалидно потребителско име или парола');

  // Validate if password is correct
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Невалидно потребителско име или парола');

  const accessToken = await createToken(user);
  return {
    _id: user._id,
    accessToken,
  };
}
