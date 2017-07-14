const express = require('express');
const router  = express.Router();
const news   = require('../models/news');

router.get('/get', function(req, res) {
  news.i_id_new = false;
  news.get(function(result) {
    res.json(result);
  })
})

router.get('/get/:id', function(req, res) {
  news.i_id_new = req.params.id;
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

module.exports = router;
