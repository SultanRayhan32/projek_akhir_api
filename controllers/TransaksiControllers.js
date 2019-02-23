var mysql = require('mysql');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'jeffrey',
    password: '12345',
    database: 'popokpediasultan',
    port: 3306
});

module.exports ={
    getTransaksi : (req, res) =>{
        var idUser = req.query.idUser;
        var sql = `SELECT * FROM transaksi WHERE idUser = ${idUser} ; `;
        db.query(sql, (err ,results)=>{
            res.send(results)
            console.log(results)
        })
    },
    getTransaksiDetail : (req,res) =>{
        var id_transaksi = req.query.id_transaksi;
        var sql = `SELECT * FROM transaksi_detail WHERE id_transaksi = ${id_transaksi} ;`;
        db.query(sql , (err , results)=>{
            res.send(results);
            console.log(results)
        })
    },
    getAllTransaksiDetail : (req, res) =>{
        var awal = req.query.awal;
        var sql = `SELECT * FROM transaksi LIMIT ${awal} , 5;`;
        db.query(sql , (err, results)=>{
            res.send(results)
        })
    }
}