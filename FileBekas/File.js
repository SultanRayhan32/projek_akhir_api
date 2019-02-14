// // app.get('/users', (req, res) => {
    
// //     var nama = req.query.nama;
// //     var sql = `select * from users where nama = '${nama}' ;`;
// //     db.query(sql, (err, result) => {
// //         if (err) throw err;
// //         console.log(result);
// //         res.send(result)
// //     })
// })

// app.get('/signin' , (req ,res)=>{
//     var sql = 'select * from users;';
//     db.query(sql , (err , result)=>{
//         res.send(result);
//         console.log(result);
//     })
// })

// app.get('/Userku', (req , res) =>{
//     var nama = req.query.nama;
//     var password = req.query.password;
//     var sql = `select * from users where nama = '${nama}' and password = '${password}' ;`;
//     db.query(sql , (err , result) =>{
//         console.log(result);
//         res.send(result);
//     })
// }) // UNTUK LOGIN 

// app.get('/showtes2' , (req ,res)=>{
//     var sql = 'SELECT * FROM produk_table;';
//     db.query(sql , (err , result)=>{
//         res.send(result);
//         console.log(result);
//     })
// })