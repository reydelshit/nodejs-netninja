const express = require('express');
const blogController = require('../controller/blogController');

const router = express.Router();


// create
router.get('/create', blogController.blog_create_get);
  
//  blog routes 
router.get('/', blogController.blog_index);

// post
router.post('/', blogController.blog_create_post);
  
// view single post
router.get('/:id', blogController.blog_details)
  
// delete single post
router.delete('/:id', blogController.blog_delete)
  

  module.exports = router;