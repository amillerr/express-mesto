const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => res.status(200).send(data))
    .catch((error) => {
      res.status(500).send({ message: `Внутренняя ошибка сервера ${error}` });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Не найден пользователь с данным id' });
      }
      return res.status(200).send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: `Внутренняя ошибка сервера ${error}` });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка валидации. Повторите запрос' });
      }
      return res.status(500).send({ message: `Внутренняя ошибка сервера ${error}` });
    });
};

module.exports = {
  getUsers,
  getCurrentUser,
  createUser,
};
