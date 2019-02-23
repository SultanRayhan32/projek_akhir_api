var express = require('express');
var router = express.Router();
const {KategoriMerkControllers} = require('../controllers');

router.get('/getAllKategori' , KategoriMerkControllers.SelectAllKategori);
router.post('/EditKategori' , KategoriMerkControllers.EditKategori);
router.post('/AddNewKategori' , KategoriMerkControllers.AddNewKategori)

module.exports = router