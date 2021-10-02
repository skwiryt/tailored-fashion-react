const validator = require('validator');
const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');

router.get('/products', async (req, res) => {
  try {
    const result = await Product.find(); 
    if(!result) res.status(404).json({ product: 'Not found' });
    else res.json(result.map(r => r.toClient()));
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const result = await Product
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result.toClient());
      
  }
  catch(err) {
    res.status(500).json(err);
  }
});
/*
const validation = (input) => {
  let { author, email, title,text } = input;
  if ( 
    author && 
    title && title.length > 10 && title.length < 25 &&
    text && text.length > 20 &&
    email && validator.isEmail(email)
  ) {
    return true;
  } else {
    return false;
  }
};
router.post('/posts', upload.single('photo'), async (req, res) => {
  let { author, email, publishDate, editDate, status, title,text } = req.body;
  if (validation(req.body)) {    
    editDate = new Date();
    publishDate = publishDate ? publishDate :  editDate;
    status = 'published';
    if (req.fileRejected) {
      res.status(400).json({message: 'ERROR. File has wrong format'});
    } else {
      try {
        let postData;
        if (req.file) {
          const { filename } = req.file;     
          postData = { author, email, publishDate, editDate, status, title, text, photo: filename };
        } else {
          postData =  { author, email, publishDate, editDate, status, title, text };
        }
        const newPost = new Post(postData);
        const savedPost = await newPost.save();
        res.json(savedPost.toClient());
      } catch(err) {
        res.status(500).json(err);
      }
    }
    
  } else {
    res.status(400).json({message: 'ERROR. Required fields are missing or incorrect'});
  }
 
});
*/
module.exports = router;
