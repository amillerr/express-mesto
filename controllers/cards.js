const path = require('path')
const readFile = require('../utils/read-file')
const cardsPath = path.join(__dirname, '..', 'data', 'cards.json')

const getCards = (req, res) => {
  readFile(cardsPath)
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ "message": "Запрашиваемый ресурс не найден" }))
}

module.exports = getCards