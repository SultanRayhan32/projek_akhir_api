var express = require('express');
var router = express.Router();
const {CartControllers} = require('../controllers')


router.post('/addtocart' ,CartControllers.addToCart );
router.post('/editcart' , CartControllers.editCart);
router.get('/showcart' , CartControllers.showAllCartby);
router.get('/getcart' , CartControllers.showAllCartbyidUser);
router.post('/checkout1' , CartControllers.checkOut1);
router.get('/getcartproduk' , CartControllers.getCartProduk)
router.post('/checkout2' , CartControllers.checkOut2);
router.delete('/checkout3' , CartControllers.checkOut3);
router.put('/kirimstruk/:id' , CartControllers.uploadStruk);

module.exports = router;