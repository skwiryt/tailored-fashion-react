const validator = require('validator');
const express = require('express');
const router = express.Router();

router.post('/orders', (req, res) => {
  let { name, email, lines } = req.body;
  console.log('name', name);
  console.log('email', email);
  console.log('lines', lines);
  //res.status(500).json({message: 'dummy error'});
  res.json({name, email, lines});
});
module.exports = router;