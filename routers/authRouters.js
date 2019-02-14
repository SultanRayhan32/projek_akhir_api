var express = require('express');
var router = express.Router();
const {authControllers} = require('../controllers')


router.get('/signin2' , authControllers.signin );
router.get('/UserLogin' , authControllers.UserLogin)
router.get('/keeplogin' , authControllers.keeplogin);
router.get('/getnama' , authControllers.getnama);
// router.post('/register' , authControllers.register);
router.post('/cobaregister' , authControllers.register2)

module.exports = router;
