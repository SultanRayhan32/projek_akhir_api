var express = require('express');
var router = express.Router();
const {ProdukControllers} = require('../controllers');

router.get('/showproduk' , ProdukControllers.showproduk);
router.post('/addproduk' , ProdukControllers.addproduk);
// router.post('/addproduk2', )
router.get('/getnamaid' , ProdukControllers.showproduk2);
router.get('/paging' , ProdukControllers.PaginationProduk);
// router.post('/addtocart' , ProdukControllers.addToCart)

module.exports = router;