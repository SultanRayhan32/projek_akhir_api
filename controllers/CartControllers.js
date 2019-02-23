var mysql = require('mysql');
var fs = require('fs');
var {uploader} = require('../helpers/uploader');

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
    addToCart : (req, res) =>{
        var idUsers =  req.query.idUsers ;
        var idProduk = req.query.idProduk ;
        var namaProduk = req.query.namaProduk;
        var hargaProduk = req.query.hargaProduk  ;
        var qty = req.query.qty;
        var totalharga = req.query.totalharga ;

        var sql = `INSERT INTO cart values(null , ${idUsers} , ${idProduk} , ${hargaProduk} , ${qty} , ${totalharga} , '${namaProduk}') ;`

        db.query(sql , (err ,results)=>{
            console.log(results);
            res.send(results)
        })
    },
    showAllCartby : (req ,res) => {
        var idUsers = req.query.idUsers;
        var idProduk = req.query.idProduk;

        var sql = `SELECT * FROM cart WHERE idUsers = ${idUsers} AND idProduk = ${idProduk} ;` ;

        db.query(sql ,(err , results)=>{
            console.log(results);
            res.send(results);
        })
    },
    editCart : (req ,res) => {
        var idUsers = req.query.idUsers;
        var idProduk = req.query.idProduk;
        var qty = req.query.qty;
        var totalharga = req.query.totalharga;

        var sql = `UPDATE cart SET qty = ${qty} , totalharga = ${totalharga} WHERE idUsers = ${idUsers} AND idProduk = ${idProduk}` ;

        db.query(sql , (err , results)=>{
            console.log(results)
            res.send(results)
        })
    },
    showAllCartbyidUser : (req, res) =>{
        var idUsers = req.query.idUsers;

        var sql = `SELECT * FROM cart WHERE idUsers = ${idUsers};` ;

        db.query(sql , (err , results)=>{
            console.log(results)
            res.send(results);
        })
    },
    checkOut1 : (req, res) =>{ //INSERT KE table transaksi
        // var idUsers = req.query.idUsers;
        // var tanggal = req.query.tanggal;
        // var namaUser = req.query.namaUser;
        // var totalPrice = req.query.totalPrice;
        // var totalProduk = req.query.totalProduk;
        var idUsers = req.body.idUsers;
        var tanggal = req.body.tanggal;
        var namaUser = req.body.status;
        var totalPrice = req.body.totalPrice;
        var totalProduk = req.body.totalProduk;
        // var {  idUsers , namaUser , tanggal , totalPrice , totalProduk} = req.query;
        var sql = `INSERT into transaksi VALUES(null , ${idUsers} , '${namaUser}' , '${tanggal}' , ${totalProduk} , ${totalPrice}) ;` ;
        db.query(sql , (err ,results)=>{
            if(err){
                console.log(err.message)
            }
                

            sql = `SELECT * FROM transaksi WHERE tgltransaksi = '${tanggal}';` ;
            db.query(sql , (err , results)=>{
                if(err){
                    console.log(err.message)
                }
                    console.log(results);
                    
                    res.send(results);
            })
        })
    },
   getCartProduk : (req , res) =>{
        var idUsers = req.query.idUsers;

        var sql = `SELECT * , cart.id as id_Cart , produk_table.id as id_Produk FROM cart 
            JOIN produk_table 
            ON produk_table.id = cart.idProduk 
            WHERE cart.idUsers = ${idUsers} ;` ;
        db.query(sql , (err , results)=>{
            res.send(results)
            console.log(results)
        })
    },
    checkOut2 : (req ,res) =>{ // insert ke table transaksi detail

        var {
            id_transaksi , 
            id_Produk , 
            id_Users , 
            qty , 
            harga , 
            img , 
            deskripsi ,
            merk ,
            kategori ,
            totalHarga
        } = req.body;

        var sql = `INSERT INTO transaksi_detail VALUES(
            null ,
            ${id_transaksi} ,
            ${id_Produk} , 
            ${id_Users} ,
            ${qty} ,
            ${harga} ,
            '${img}' ,
            '${deskripsi}' ,
            '${merk}' ,
            '${kategori}' ,
            ${totalHarga}
            ) ;` ;
        db.query(sql , (err , results)=>{
            if(err){
                console.log(err.message)
            }
            console.log(results);
            res.send(results);
        }) 
    },
    checkOut3 : (req , res) =>{
        var idUsers = req.query.idUsers;
        
        var sql = `DELETE cart FROM cart WHERE idUsers = ${idUsers};` ;

        db.query(sql , (err ,results)=>{
            if(err){
                console.log(err.message)
            }
            console.log('BERHASIL DI HAPUS')
            res.send(results)
        })
    },
    uploadStruk : (req,res) => {
        var id = req.params.id;
        var sql = `SELECT * from table_konfirmasi where id_users = ${id};`;
        db.query(sql, (err, results) => {
            // if(err) {
            //     console.log(err.message)
            // }
    
            if(results.length > 0) {
                const path = '/struk/images'; //file save path
                const upload = uploader(path, 'PRD').fields([{ name: 'image'}]); //uploader(path, 'default prefix')
    
                upload(req, res, (err) => {
                    if(err){
                        console.log('error di page 176')
                        return res.status(500).json({ message: 'Upload brand picture failed !', error: err.message });
                    }
    
                    const { image } = req.files;
                    // console.log(image)
                    const imagePath = image ? path + '/' + image[0].filename : null;
                    const data = JSON.parse(req.body.data);
                    data.image = imagePath;
    
                    try {
                        if(imagePath) {
                            sql = `Update table_konfirmasi set ? where id_users = ${id};`
                            db.query(sql,data, (err1,results1) => {
                                if(err1) {
                                    fs.unlinkSync('./public' + imagePath);
                                    console.log(err1.message + ' error di page 191 ' )
                                    return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                                    
                                }
                                res.send(results1)
                                // fs.unlinkSync('./public' + results[0].image);
                                // sql = `Select * from table_konfirmasi;`;
                                // db.query(sql, (err2,results2) => {
                                //     if(err2) {
                                //         console.log(err2.message + ' ERROR DI PAGE 201 ')
                                //         return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                                //     }
                                //     res.send(results2)
                                    
                                    
                                // })
                            })
                        }
                        // else {
                        //     sql = `Update table_konfirmasi 
                        //             set 
                        //             status ='${data.status}'
                        //             where id_users = ${id};`
                        //     db.query(sql, (err1,results1) => {
                        //         if(err1) {
                        //             return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                        //         }
                        //         sql = `Select * from table_konfirmasi;`;
                        //         db.query(sql, (err2,results2) => {
                        //             if(err2) {
                        //                 console.log('error di page 222')
                        //                 return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                        //             }
    
                        //             res.send(results2);
                        //         })
                        //     })
                        // }
                    }
                    catch(err){
                        console.log(err.message + '  errro di page 230')
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                    }
                })
            }
        })
    },
    editCartqty : (req,res) =>{
        var idUser = req.body.idUser;
        var idProduk = req.body.idProduk;
        var newQty = req.body.qty;
        var totalHarga = req.body.totalharga
        var sql = `UPDATE cart SET qty = ${newQty} , totalharga = ${totalHarga}
                WHERE idProduk = ${idProduk} AND idUsers = ${idUser};`
        db.query(sql , (err, results)=>{
            if(err){
                console.log(err.message)
                console.log('error cuy')
            }
            res.send(results);
            console.log(results)
        })
    },
    getCartAndProduk : (req, res) =>{
        var idProduk = req.query.idProduk;
        var idUser = req.query.idUser;
        var sql = `SELECT * FROM cart 
                    JOIN produk_table ON
                    cart.idProduk = produk_table.id
                    WHERE cart.idProduk = ${idProduk} AND cart.idUsers = ${idUser};`;
        db.query(sql , (err, results)=>{
           res.send(results);
           console.log(results)
        })
    },
    deleteCart : (req, res) =>{
        var idUsers = req.query.idUser;
        var idProduk = req.query.idProduk;
        var sql = `DELETE cart FROM cart WHERE idUsers = ${idUsers} AND idProduk = ${idProduk};`;
        db.query(sql,(err, results)=>{
            if(err){
                console.log(err.message)
            }
            res.send(results)
        })
       
    }
}