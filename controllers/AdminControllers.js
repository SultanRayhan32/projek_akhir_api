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
    addNewProduk : (req,res) => {
        try {
            const path = '/brand/images'; //file save path
            const upload = uploader(path, 'PRD').fields([{ name: 'image'}]); //uploader(path, 'default prefix')
    
            upload(req, res, (err) => {
                if(err){
                    return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
                }
    
                const { image } = req.files;
                console.log(image)
                const imagePath = image ? path + '/' + image[0].filename : null;
                console.log(imagePath)
    
                console.log(req.body.data)
                const data = JSON.parse(req.body.data);
                console.log(data)
                data.image = imagePath;
                
                var sql = 'INSERT INTO produk_table SET ?';
                db.query(sql, data, (err, results) => {
                    if(err) {
                        console.log(err.message)
                        fs.unlinkSync('./public' + imagePath);
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                    }
                   
                    console.log(results);
                    sql = 'SELECT * from produk_table;';
                    db.query(sql, (err, results) => {
                        if(err) {
                            console.log(err.message);
                            return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                        }
                        console.log(results);
                        
                        res.send(results);
                    })   
                })    
            })
        } catch(err) {
            console.log(err)
            return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
            
        }
    },
    showAlltransaksi : (req, res) =>{
        var sql = 'SELECT * FROM users';
        db.query(sql , (err, results)=>{
            res.send(results);
            console.log(results)
        })
    },
   
    editProduk : (req,res) => {
        var produk_id = req.params.id;
        var sql = `SELECT * from produk_table where id = ${produk_id};`;
        db.query(sql, (err, results) => {
            if(err) {
                console.log(err.message)
            }
    
            if(results.length > 0) {
                const path = '/brand/images'; //file save path
                const upload = uploader(path, 'PRD').fields([{ name: 'image'}]); //uploader(path, 'default prefix')
    
                upload(req, res, (err) => {
                    if(err){
                        return res.status(500).json({ message: 'Upload brand picture failed !', error: err.message });
                    }
    
                    const { image } = req.files;
                    // console.log(image)
                    const imagePath = image ? path + '/' + image[0].filename : null;
                    const data = JSON.parse(req.body.data);
                    data.image = imagePath;
    
                    try {
                        if(imagePath) {
                            sql = `Update produk_table set ? where id = ${produk_id};`
                            db.query(sql,data, (err1,results1) => {
                                if(err1) {
                                    fs.unlinkSync('./public' + imagePath);
                                    return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                                }
                                fs.unlinkSync('./public' + results[0].image);
                                sql = `Select * from produk_table;`;
                                db.query(sql, (err2,results2) => {
                                    if(err2) {
                                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                                    }
    
                                    res.send(results2);
                                })
                            })
                        }
                        else {
                            sql = `Update produk_table 
                                    set 
                                    nama='${data.nama}' , 
                                    harga=${data.harga} , 
                                    merk='${data.merk}' ,
                                    deskripsi = '${data.deskripsi}',
                                    kategori = '${data.kategori}'
                                    where id = ${produk_id};`
                            db.query(sql, (err1,results1) => {
                                if(err1) {
                                    return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                                }
                                sql = `Select * from produk_table;`;
                                db.query(sql, (err2,results2) => {
                                    if(err2) {
                                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                                    }
    
                                    res.send(results2);
                                })
                            })
                        }
                    }
                    catch(err){
                        console.log(err.message)
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                    }
                })
            }
        })
    },
    deleteProduk : (req,res) => {
        var ProdukId = req.params.id;
        var sql = `SELECT * from produk_table where id = ${ProdukId};`;
        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
            }
            
            if(results.length > 0) {
                sql = `DELETE from produk_table where id = ${ProdukId};`
                db.query(sql, (err1,results1) => {
                    if(err1) {
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                    }
    
                    fs.unlinkSync('./public' + results[0].image);
                    sql = `SELECT * from produk_table;`;
                    db.query(sql, (err2,results2) => {
                        if(err2) {
                            return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err2.message });
                        }
    
                        res.send(results2);
                    })
                })
            }
        })   
    
    },
    selectAllKonfirm : (req , res) =>{
        var sql = 'SELECT * FROM table_konfirmasi ;' ;
        db.query(sql , (err , results)=>{
            if(err) {
                console.log(err.message)
            }
            res.send(results);
            console.log(results);
        })
    },
    selectKonfirm : (req , res) =>{
        var idUsers = req.query.id;
        var sql = `SELECT * FROM table_konfirmasi WHERE id_users = ${idUsers};` ;
        db.query(sql, (err , results)=>{
            if(err){
                console.log(err.message)
            }
            res.send(results)
            console.log(results)
        })
    },
    konfirmasi : (req, res) =>{
        var idUsers = req.query.id;
        var status = req.query.status;
        var image = req.query.image
        var sql = `INSERT INTO table_konfirmasi VALUES(null , ${idUsers} , '${status}' , '${image}') ;` ;
        db.query(sql , (err ,results)=>{
            if(err){
                console.log(err.message)
            }
            res.send(results);
            console.log(results)
            
        })
    },
    cancelDelete : (req, res) =>{
        var idUsers = req.query.id;
        var sql = `DELETE FROM table_konfirmasi WHERE id_users = ${idUsers};` ;
        db.query(sql , (err , results)=>{
            if(err){
                console.log(err.message);
            }
            res.send(results)
            console.log('berhasi di cancel dan hapus')
        })
    },
    deleteUser : (req,res) =>{
        var idUser = req.query.id;
        var sql = `DELETE FROM users WHERE id = ${idUser};` ;
        db.query(sql , (err, results)=>{
            if(err){
                console.log(err.message)
            }
            console.log(results)
            res.send(results)
        })
    },
    filterProduk : (req, res) =>{
        var filter = req.query.nama;
        var sql = `SELECT * FROM produk_table WHERE nama like '%${filter}%';`;
        db.query(sql,(err, results)=>{
            res.send(results);
        })
    }

}