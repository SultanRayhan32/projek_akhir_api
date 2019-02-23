var express = require('express');
var router = express.Router();
const {TransaksiControllers} = require('../controllers');

router.get('/getTransaksi' , TransaksiControllers.getTransaksi);
router.get('/getTrxDetail' , TransaksiControllers.getTransaksiDetail)
router.get('/getAllTransaksi' , TransaksiControllers.getAllTransaksiDetail)
module.exports = router