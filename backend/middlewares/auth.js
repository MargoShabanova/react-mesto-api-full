const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

// const { NODE_ENV, JWT_SECRET } = process.env;
const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzRmZThkNzkzNzkwOGE1ZTRhMDE4OWIiLCJpYXQiOjE2NjYyNjgyMDQsImV4cCI6MTY2Njg3MzAwN'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = '22a981272b0aa91febfb9af970be58e4936c3fbac51b5e46c775edb157d1289b';

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError();
  }

  let payload;
  try {
    payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
    console.log('\x1b[31m%s\x1b[0m', `
    Надо исправить. В продакшне используется тот же
    секретный ключ, что и в режиме разработки.
    `);
  } catch (err) {
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      console.log(
        '\x1b[32m%s\x1b[0m',
        'Всё в порядке. Секретные ключи отличаются',
      );
    } else {
      console.log(
        '\x1b[33m%s\x1b[0m',
        'Что-то не так',
        err,
      );
    }
  }

  // try {
  //   payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  // } catch (err) {
  //   throw new UnauthorizedError();
  // }

  req.user = payload;
  next();
};
