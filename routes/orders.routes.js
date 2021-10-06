const validator = require('validator');
const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const Product = require('../models/product.model');

const productsExist = async (lines) => {
  let exist = true;
  for (const line of lines) {
    const fine = (await Product.countDocuments({_id: line.productId})) === 1;
    if (!fine) {
      exist = false;
    }
  }
  return exist
}
const validation = (input) => {  
  let { name, email, lines } = input;
  if (
    name && name.length > 4 && name.length < 31 &&
    lines && lines.length > 0 &&
    email && validator.isEmail(email)
  ) {
    return true;
  } else {
    return false;
  }
};
router.post('/orders', async (req, res) => {
  let { email, name , lines} = req.body;
  if (validation(req.body)) { 
    if (await productsExist(lines)) {
      const documentDate = new Date();    
      try {        
        const newOrder = new Order({name, email, documentDate, lines});
        const savedOrder = await newOrder.save();
        res.json(savedOrder.toClient());
      } catch(err) {
        res.status(500).json(err);
      }
    } else {
      res.status(404).json({message: 'ERROR. Product not found'});
    } 
  } else {
    res.status(400).json({message: 'ERROR. Required fields are missing or incorrect'});
  }
 
});

module.exports = router;