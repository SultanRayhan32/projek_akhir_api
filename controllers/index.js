const authControllers = require('./authControllers');
const ProdukControllers = require('./ProdukControllers')
const CartControllers = require('./CartControllers');
const AdminControllers = require('./AdminControllers');
const TransaksiControllers = require('./TransaksiControllers');
const KategoriMerkControllers = require('./KategoriMerkControllers');

module.exports = {
    authControllers, 
    ProdukControllers , 
    CartControllers , 
    AdminControllers , 
    TransaksiControllers ,
    KategoriMerkControllers
}

