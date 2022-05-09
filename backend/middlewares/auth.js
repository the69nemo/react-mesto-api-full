const jwt = require('jsonwebtoken');
const NotAuthErr = require('../errors/NotAuthErr');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line arrow-body-style
const extractToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthErr('Авторизируйтесь!'));
  }

  const token = extractToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new NotAuthErr('Авторизируйтесь!'));
  }

  req.user = payload;

  return next();
};
