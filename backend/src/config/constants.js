require('dotenv').config();

module.exports = {
  // Server variables
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  SECRET: process.env.SECRET || 'victoriasecret',
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  TOKEN_NAME: process.env.TOKEN_NAME || 'x-authorization',

  // Mongodb variables
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/db',
};
