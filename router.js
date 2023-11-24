const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors({
  origin: 'https://www.criptomilhas.com.br',
  methods: ['GET', 'POST'],
  optionsSuccessStatus: 204,
}))

const router = express.Router()
const users = require('./users.js')
router.get("/", (req, res) => {
  res.send({ response: "Server is running.....", users }).status(200)
})
app.use(router)
module.exports = app