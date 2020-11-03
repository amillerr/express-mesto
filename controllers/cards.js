const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((data) => res.status(200).send(data))
    .catch((error) => res.status(500).send({ message: `Внутренняя ошибка сервера ${error}` }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка валидации. Повторите запрос' });
      }
      return res.status(500).send({ message: `Внутренняя ошибка сервера ${error}` });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Не найдена карточка с данным id' });
      } else {
        res.status(500).send({ message: `Внутренняя ошибка сервера ${error}` });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
