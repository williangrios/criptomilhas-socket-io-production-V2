const express = require("express");
const router = express.Router();
const users = require('./users.js')
router.get("/", (req, res) => {
  res.send({ response: "Server is up and running in this address.", users }).status(200);
});

module.exports = router;