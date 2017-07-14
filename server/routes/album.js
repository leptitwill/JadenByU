const express = require('express');
const router  = express.Router();
const album = require('../models/album');

// Récupère tous les photos d'un utilisateur
router.get('/all/:id', function(req, res) {
  album.i_id_user = req.params.id;
  album.getAll(function(result) {
    res.json(result);
  })
})



module.exports = router;
