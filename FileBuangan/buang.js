getCartProduk : ( req , res) =>{

    var idUsers = req.query.idUsers;
    // var tanggal = req.query.tanggal; 

    var sql = `SELECT * , transaksi.id as id_transaksi , 
    produk_table.id as id_Produk , 
    cart.idUsers as id_User 
    from cart 
    JOIN produk_table on produk_table.id = cart.idProduk 
    JOIN transaksi ON cart.idUsers = transaksi.idUser
    WHERE cart.idUsers = ${idUsers} ` ;
    //AND transaksi.tgltransaksi = '${tanggal}'
    // var sql = `SELECT transaksi.id as id_transaksi , 
    // cart.idProduk as id_Produk , 
    // cart.idUsers as id_Users , 
    // cart.qty as qty from cart ,
    // cart.harga as harga ,
    // produk_table.image as img ,
    // produk_table.deskripsi as deskripsi ,
    // produk_table.merk as merk ,
    // produk_table.kategori as kategori
    // JOIN produk_table on produk_table.id = cart.idProduk 
    // JOIN transaksi ON cart.idUsers = transaksi.idUser;` ;

    db.query(sql , (err ,results)=>{
        res.send(results)
    })
}

konfirmasi : (req, res) =>{
    var idUsers = req.query.id;
    var status = req.query.status;
    var sql = `UPDATE table_konfirmasi SET status = '${status}' WHERE id_users = ${idUsers} ;` ;
    db.query(sql , (err ,results)=>{
        if(err){
            console.log(err.message)
        }
        res.send(results);
        console.log(results)
        
    })
}