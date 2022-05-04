const jwt = require('jsonwebtoken');
const NotAuthErr = require('../errors/NotAuthErr');

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
    payload = jwt.verify(token, 'super-puper-secret-key');
  } catch (err) {
    return next(new NotAuthErr('Авторизируйтесь!'));
  }

  req.user = payload;

  return next();
};
