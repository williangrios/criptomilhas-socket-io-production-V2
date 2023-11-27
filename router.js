const express = require("express");
const router = express.Router();
const users = require('./users.js')
const cors = require("cors");
router.use(cors({
  origin: 'https://www.criptomilhas.com.br',
  methods: ['GET', 'POST', "OPTIONS"],
  optionsSuccessStatus: 204,
}))
router.get("/", (req, res) => {
  res.send({ response: "Server is up", users }).status(200);
});

module.exports = router;