const path = require('path')
const readFile = require('../utils/read-file')
const usersPath = path.join(__dirname, '..', 'data', 'users.json')

const getUsers = (req, res) => {
  readFile(usersPath)
    .then(data => res.send(data))
    .catch(() => {
      res.status(500).send({ message: "Запрашиваемый ресурс не найден" })
    })
}

const getCurrentUser = (req, res) => {
  readFile(usersPath)
    .then((data) => {
      return data.find(user => user._id === req.params.id)
    })
    .then((user) => {
      if (!user) {
        return res.status(500).send({"message": "Нет пользователя с таким id"})
      }
      return res.send(user)
    })
    .catch(() => res.status(500).send({ "message": "Запрашиваемый ресурс не найден" }))
}

module.exports = {
  getUsers,
  getCurrentUser
}
