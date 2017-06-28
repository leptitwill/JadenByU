const express = require('express');
const router  = express.Router();
const users   = require('../models/users');

router.get('/all', function(req, res) {
  users.getAll(function(result) {
    res.json(result);
  })
})

router.get('/get/:id', function(req, res) {
  users.i_id_user = req.params.id;
  users.get(function(result) {
    res.json(result);
  })
})

module.exports = router;
