const { Schema, model, Types: { ObjectId } } = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../config/constants');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Потребителското име е задължително поле'],
    minLength: [3, 'Потребителското име трябва да е поне 3 символа'],
    maxLength: [30, 'Потребителското име трябва да е най-много 30 символа'],
  },
  password: {
    type: String,
    required: [true, 'Паролата е задължително поле'],
  },
}, {
    timestamps: true,
  });

const User = model('User', userSchema);

module.exports = User;
