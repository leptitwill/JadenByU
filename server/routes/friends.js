const express = require('express');
const router  = express.Router();
const friends = require('../models/friends');

// Récupère tous les amis
router.get('/all/:id', function(req, res) {
  friends.b_friend  = true;
  friends.i_id_user = req.params.id;
  friends.getAll(function(result) {
    res.json(result);
  })
})

//Récupère tous ceux qui ne sont pas amis
router.get('/not/:id', function(req, res) {
  friends.b_friend  = false;
  friends.i_id_user = req.params.id;
  friends.getAll(function(result) {
    res.json(result);
  })
})

// Ajoute un ami
router.get('/add/:id_user/:id_friend', function(req, res) {
  friends.i_id_user = req.params.id_user;
  friends.i_id_friend = req.params.id_friend;
  friends.add(function(result) {
    res.json(result);
  })
})

// Supprime un ami
router.get('/delete/:id_user/:id_friend', function(req, res) {
  friends.i_id_user = req.params.id_user;
  friends.i_id_friend = req.params.id_friend;
  friends.delete(function(result) {
    res.json(result);
  })
})

router.get('/count-follower/:id', function(req, res) {
  friends.i_id_user = req.params.id;
  friends.countFollower(function(result) {
    res.json(result);
  })
})

module.exports = router;
