var mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'jeffrey',
    password: '12345',
    database: 'popokpediasultan',
    port: 3306
});

module.exports = {
    SelectAllKategori : (req, res) =>{
        var sql = 'SELECT * FROM kategori;' ;

        db.query(sql , (err , results)=>{
            res.send(results);
            console.log(results)
        })
    },
    EditKategori : (req, res) =>{
        var id = req.query.id;
        var namaKategori = req.query.nama;
        var sql = `UPDATE kategori SET nama = '${namaKategori}' WHERE id = ${id};`;

        db.query(sql , (err ,results)=>{
            console.log(results)
            res.send(results)
        })
    },
    AddNewKategori : (req, res) =>{
        var namaKategoriBaru = req.query.nama;
        var sql = `INSERT INTO kategori VALUES(null , '${namaKategoriBaru}');` ;

        db.query(sql , (err, results)=>{
            console.log(results);
            res.send(results)
        })
    }
}