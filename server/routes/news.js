const express = require('express');
const router  = express.Router();
const news   = require('../models/news');

router.get('/get/:id_user', function(req, res) {
  news.i_id_new = false;
  news.i_id_user = req.params.id_user;
  news.get(function(result) {
    res.json(result);
  })
})

router.get('/get/:id/:id_user', function(req, res) {
  news.i_id_new = req.params.id;
  news.i_id_user = req.params.id_user;
  news.get(function(result) {
    res.json(result);
  })
})

router.get('/likes/:id', function(req, res) {
  news.i_id_new = req.params.id;
  news.getLikes(function(result) {
    res.json(result);
  })
})

router.get('/views/:id', function(req, res) {
  news.i_id_new = req.params.id;
  news.getViews(function(result) {
    res.json(result);
  })
})

router.get('/comments/:id', function(req, res) {
  news.i_id_new = req.params.id;
  news.getComments(function(result) {
    res.json(result);
  })
})

// Ajoute un like
router.get('/add-like/:id_new/:id_user', function(req, res) {
  news.i_id_user = req.params.id_user;
  news.i_id_new = req.params.id_new;
  news.addLike(function(result) {
    res.json(result);
  })
})

// Ajoute une vue
router.get('/add-view/:id_new/:id_user', function(req, res) {
  news.i_id_user = req.params.id_user;
  news.i_id_new = req.params.id_new;
  news.addView(function(result) {
    res.json(result);
  })
})

router.post('/add-comment', function(req, res) {
	news.i_id_user = req.body.i_id_user;
	news.i_id_new = req.body.i_id_new;
	news.s_comment = req.body.s_comment;
	news.addComment(function(result) {
	  res.json(result);
	})
})

module.exports = router;
