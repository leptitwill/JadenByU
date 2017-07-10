const express = require('express');
const router  = express.Router();
const news   = require('../models/news');

router.get('/all/:id', function(req, res) {
  news.b_user = false;
  news.i_id_user = req.params.id;
  news.getAll(function(result) {
    res.json(result);
  })
})

module.exports = router;
