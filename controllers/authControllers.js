var mysql = require('mysql');
const Crypto = require('crypto');
var transporter = require('../helpers/pengirimEmai');

// const db = mysql.createConnection({
//     host: 'db4free.net',
//     user: 'sultan123lol',
//     password: 'sususapi123',
//     database: 'popokpediasultan',
//     port: 3306
// });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'jeffrey',
    password: '12345',
    database: 'popokpediasultan',
    port: 3306
});

module.exports = {
    signin : (req ,res)=>{
        var sql = 'select * from users;';
        db.query(sql , (err , result)=>{
            res.send(result);
            console.log(result);
        })
    },
    UserLogin : (req , res) =>{
        var nama = req.query.nama;
        var password = req.query.password;
        var sql = `select * from users where nama = '${nama}' and password = '${password}' ;`;
        db.query(sql , (err , result) =>{
            console.log(result);
            res.send(result);
            // sql = 'SELECT * FROM users;' ;
            // db.query(sql , (err ,result2)=>{
            //     if(err){
            //         console.log(err.message)
            //     }
            //     console.log(result2);
            //     res.send(result2)   
            // })
        })
    },
    keeplogin : (req, res) => {
    
        var nama = req.query.nama;
        var sql = `select * from users where nama = '${nama}' ;`;
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err.message)            
            };
            console.log(result);
            res.send(result)
        })
    },
    getnama : (req, res) => {
    
        var nama = req.query.nama;
        var sql = `select * from users where nama = '${nama}' ;`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result)
        })
    },
    // register : (req , res) => {
    //         // var { nama, password, email } = req.body;
    //         var nama = req.query.nama;
    //         var password = req.query.password;
    //         var email = req.query.email;
    //         // var sql = `select * from users where nama = '${nama}' ; `;
    //         // db.query(sql , (err , result)=>{
    //                 // if(err) throw err;

    //             // if (result.length > 0) {
    //             //     res.send({ status: 'error', message: "Username has been taken!"})
    //             // }
    //             // else{
    //             var hashPassword = Crypto.createHmac('sha256', 'abc123')
    //             .update(password).digest('hex');
    //                 // var dataUser = {
    //                 // nama ,
    //                 // password: hashPassword,
    //                 // email,
    //                 // role: 'user',
    //                 // }
    //                 sql = `INSERT INTO users SET nama='${nama}' , email='${email}' , password = '${password}' , role = 'user';`;
    //                 db.query(sql , (err1 , result1)=>{
    //                     var mailOptions = {
    //                         from: " <budiyahed@gmail.com>",
    //                         to: email,
    //                         subject: "Verivikasi email untuk menjadi kandidat popok",
    //                         html: `Click link ini untuk verifikasi : <a href="#">Join Us</a>`
    //                     }
    //                     transporter.sendMail(mailOptions, (err2, res2) => {
    //                         if (err2) {
    //                             console.log(err2)
    //                             throw err2;
    //                         } else {
    //                             // console.log('success')
    //                             console.log('succes')
    //                             res.send({  nama  , email , role : 'User'  })
    //                         }
    //                     })
    //                 })
                
            
    //     },
            register2 : (req, res) =>{
                
                var nama = req.query.nama;
                var password = req.query.password;
                var email = req.query.email;
                var sql = `INSERT INTO users SET nama='${nama}' , email='${email}' , password = '${password}' , role = 'user';`;
                db.query(sql  , (err , result)=>{
                    if(err) throw err;
                    console.log(result)

                    
                })
            }
            
}