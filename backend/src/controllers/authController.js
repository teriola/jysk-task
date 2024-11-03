const router = require('express').Router();
const { validationResult } = require('express-validator');
const { isAuth } = require('../middlewares/authMiddleware');
const { validateLogin, validateRegister } = require('../utils/validations');
const { login, register } = require('../services/authService');
const { parseError } = require('../utils/parser');

// Login user
// POST /auth/login
// Public
router.post('/login',
  validateLogin(),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      if (errors.length > 0) throw errors;

      // Login user
      const { _id, accessToken } = await login({
        username: req.body.username,
        password: req.body.password,
      });

      res.status(200).json({
        _id,
        accessToken,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: 'Невалидни данни за вход',
        errors: parseError(err)
      });
    }
  });

// Register new user
// POST /auth/register
// Public
router.post('/register',
  validateRegister(),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      if (errors.length > 0) throw errors;

      if (req.body.password !== req.body.rePassword) {
        throw new Error('Паролите не съвпадат');
      }

      // Register user
      const { _id, accessToken } = await register({
        username: req.body.username,
        password: req.body.password,
      });

      res.status(201).json({
        _id,
        accessToken,

      });
    } catch (err) {
      res.status(400).json({
        message: 'Невалидни данни за регистрация',
        errors: parseError(err)
      });
    }
  });

// Logout user
// GET /auth/logout
// Private
router.get('/logout',
  isAuth,
  (req, res) => {
    res.status(205).json({});
  });

module.exports = router;
