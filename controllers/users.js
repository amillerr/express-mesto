const path = require('path');
const readFile = require('../utils/read-file');

const usersPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  readFile(usersPath)
    .then((data) => res.send(data))
    .catch(() => {
      res.status(500).send({ message: 'Внутренняя ошибка сервиса' });
    });
};

const getCurrentUser = (req, res) => {
  readFile(usersPath)
    .then((data) => {
      const userById = data.find((user) => user._id === req.params.id);
      return userById;
    })
    .then((userById) => {
      if (!userById) {
        return res.status(500).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(userById);
    })
    .catch(() => res.status(500).send({ message: 'Внутренняя ошибка сервиса' }));
};

module.exports = {
  getUsers,
  getCurrentUser,
};
