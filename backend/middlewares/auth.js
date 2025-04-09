const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AppError = require('../utils/AppError');

module.exports = async (req, res, next) => {
  try {
    // 1) Récupérer le token
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(new AppError('Vous n\'êtes pas connecté', 401));
    }

    // 2) Vérifier le token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Vérifier si l'utilisateur existe toujours
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('L\'utilisateur n\'existe plus', 401));
    }

    // 4) Accorder l'accès à la route protégée
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};