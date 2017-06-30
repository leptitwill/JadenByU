const express = require('express');
const router  = express.Router();
const chat   = require('../models/chat');

router.get('/get-id/:id_friend/:id_user', function(req, res) {
  chat.i_id_friend = req.params.id_friend;
  chat.i_id_user   = req.params.id_user;
  chat.getIdChat(function(result) {
    res.json(result);
  })
})

router.get('/get/:id_chat', function(req, res) {
  chat.i_id_chat = req.params.id_chat;
  chat.get(function(result) {
    res.json(result);
  })
})

router.get('/send/:message', function(req, res) {
  chat.s_message = req.params.message;
  chat.send(function(result) {
    res.json(result);
  })
})

module.exports = router;
