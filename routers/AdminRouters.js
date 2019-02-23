var express = require('express');
var router = express.Router();
const { AdminControllers } = require('../controllers');

router.post('/addnewproduk' , AdminControllers.addNewProduk);
router.put('/editproduk/:id' , AdminControllers.editProduk);
router.get('/tes' , AdminControllers.showAlltransaksi);
router.delete('/deleteproduk/:id' , AdminControllers.deleteProduk);
router.get('/konfirmasi' , AdminControllers.selectKonfirm);
router.post('/konfirmasiadmin' , AdminControllers.konfirmasi);
router.get('/getkonfimasi' , AdminControllers.selectAllKonfirm);
router.delete('/cancelkonfirmasi' , AdminControllers.cancelDelete);
router.delete('/deletuser' , AdminControllers.deleteUser);
router.get('/filterproduk' , AdminControllers.filterProduk)

module.exports = router; 