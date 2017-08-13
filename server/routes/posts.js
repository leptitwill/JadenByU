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

router.get('/get/:id', function(req, res) {
  posts.i_id_post = req.params.id;
  posts.get(function(result) {
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

router.get('/count-post/:id', function(req, res) {
  posts.i_id_user = req.params.id;
  posts.countPost(function(result) {
    res.json(result);
  })
})

router.get('/count-comment/:id', function(req, res) {
  posts.i_id_post = req.params.id;
  posts.countComment(function(result) {
    res.json(result);
  })
})

router.get('/comments/:id', function(req, res) {
  posts.i_id_post = req.params.id;
  posts.getComments(function(result) {
    res.json(result);
  })
})

router.post('/add-comment', function(req, res) {
	posts.i_id_user = req.body.i_id_user;
	posts.i_id_new = req.body.i_id_new;
	posts.s_comment = req.body.s_comment;
	posts.addComment(function(result) {
	  res.json(result);
	})
})

module.exports = router;
