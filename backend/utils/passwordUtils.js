const User = require("../models/user");
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

exports.hashPassword = async (password) => {
  return await hash(password, 12);
};

exports.comparePassword = async (candidatePassword, userPassword) => {
  return await compare(candidatePassword, userPassword);
};

// Ajouté au modèle User
User.prototype.correctPassword = async function(candidatePassword, userPassword) {
  return await compare(candidatePassword, userPassword);
};