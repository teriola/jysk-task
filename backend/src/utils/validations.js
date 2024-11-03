const { body } = require('express-validator');

// Auth controller
exports.validateLogin = () => [
  body('username').trim()
  .notEmpty().withMessage('Потребителското име е задължително'),
  body('password').trim()
  .notEmpty().withMessage('Паролата е задължителна')
];

exports.validateRegister = () => [
  body('username').trim()
  .notEmpty().withMessage('Потребителското име е задължително')
  .isLength({ min: 3, max: 13 }).withMessage('Потребителското име трябва да е между 3 и 13 символа'),
  body('password').trim()
  .notEmpty().withMessage('Password is required')
  .isLength({ min: 6, max: 18 }).withMessage('Паролата трябва да е между 6 и 18 символа'),
  body('rePassword').trim()
  .custom((value, { req }) => value === req.body.password).withMessage('Паролите не съвпадат'),
];
