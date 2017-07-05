const express = require('express');
const router  = express.Router();
const chat   = require('../models/chat');

router.get('/create/:id_user/:id_friend', function(req, res) {
	chat.i_id_user   = req.params.id_user;
	chat.i_id_friend = req.params.id_friend;
	chat.create(function(result) {
		res.json(result);
	})
})

router.get('/get-id/:id_friend/:id_user', function(req, res) {
	chat.i_id_friend = req.params.id_friend;
	chat.i_id_user   = req.params.id_user;
	chat.getIdChat(function(result) {
		res.json(result);
	})
})

router.get('/get-id-by-user/:id_user', function(req, res) {
	chat.i_id_user   = req.params.id_user;
	chat.getIdChatByUser(function(result) {
		res.json(result);
	})
})

router.get('/get/:id_chat', function(req, res) {
	chat.i_id_chat = req.params.id_chat;
	chat.get(function(result) {
		res.json(result);
	})
})

router.post('/send', function(req, res) {
	chat.i_id_user = req.body.i_id_user;
	chat.i_id_chat = req.body.i_id_chat;
	chat.s_message = req.body.s_message;
	chat.send(function(result) {
	  res.json(result);
	})
})

module.exports = router;
