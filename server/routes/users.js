const express = require('express');
const router  = express.Router();
const users   = require('../models/users');

router.get('/all', function(req, res) {
  users.getAll(function(result) {
    res.json(result);
  })
})

router.get('/get/:i_id_user/:i_id_actual_user', function(req, res) {
  users.i_id_user        = req.params.i_id_user;
  users.i_id_actual_user = req.params.i_id_actual_user;
  users.get(function(result) {
    res.json(result);
  })
})

module.exports = router;
