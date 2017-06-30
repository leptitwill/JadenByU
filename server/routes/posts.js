const express = require('express');
const router  = express.Router();
const posts   = require('../models/posts');

router.get('/all/:id', function(req, res) {
  posts.b_user = false;
  posts.i_id_user = req.params.id;
  posts.getAll(function(result) {
    res.json(result);
  })
})

router.get('/user/:id', function(req, res) {
  posts.b_user = true;
  posts.i_id_user = req.params.id;
  posts.getAll(function(result) {
    res.json(result);
  })
})

router.get('/count-like/:id', function(req, res) {
  posts.i_id_user = req.params.id;
  posts.countLike(function(result) {
    res.json(result);
  })
})

module.exports = router;
