var mysql = require('mysql');
var fs = require('fs');

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
    showproduk : (req ,res)=>{
        var sql = 'SELECT * FROM produk_table;';
        db.query(sql , (err , result)=>{
            res.send(result);
            console.log(result);
        })
    },
    addproduk : (req, res) =>{
        var sql = 'INSERT INTO product SET ?';
        db.query(sql , req.query, (err , result)=>{
            if(err){
                console.log(err)
            }
            res.send(result)
        })
    },

    addproduk1 : (req,res) => {
        try {
            const path = '/brand/images'; //file save path
            const upload = uploader(path, 'PRD').fields([{ name: 'image'}]); //uploader(path, 'default prefix')
    
            upload(req, res, (err) => {
                if(err){
                    return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
                }
    
                const { image  } = req.files;
                console.log(image)
                const imagePath = image ? path + '/' + image[0].filename : null;
                console.log(imagePath)
    
                console.log(req.body.data)
                const data = JSON.parse(req.body.data);
                console.log(data)
                data.image = imagePath;
                
                var sql = 'INSERT INTO produk_table SET ?';
                conn.query(sql, data, (err, results) => {
                    if(err) {
                        console.log(err.message)
                        fs.unlinkSync('./public' + imagePath);
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                    }
                   
                    console.log(results);
                    sql = 'SELECT * from produk_table;';
                    conn.query(sql, (err, results) => {
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
            return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
        }
    },
    showproduk2 : (req ,res)=>{
        var nama = req.query.nama;
        var id = req.query.id;
        var sql = `SELECT * FROM produk_table where nama = '${nama}' and id = '${id}'  ;`;
        db.query(sql , (err , result)=>{
            res.send(result);
            console.log(result);
        })
    },
    addToCart : (req, res) =>{
        var idUsers =  req.query.idUsers ;
        var idProduk = req.query.idProduk ;
        var namaProduk = req.query.namaProduk;
        var hargaProduk = req.query.hargaProduk  ;
        var qty = req.query.qty;
        var totalharga = req.query.totalharga ;

        var sql = `INSERT INTO cart values(null , ${idUsers} , ${idProduk} , ${hargaProduk} , ${qty} , ${totalharga} , '${namaProduk}') ;`

        db.query(sql , (err ,results)=>{
            console.log(results)
        })
    }
   
}