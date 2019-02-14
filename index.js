var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express({defaultErrorHandler:false});
var mysql = require('mysql')
var fs = require('fs');
var { uploader } = require('./helpers/uploader')
var port = 2019;

const db = mysql.createConnection({
    host: 'db4free.net',
    user: 'sultan123lol',
    password: 'sususapi123',
    database: 'popokpediasultan',
    port: 3306
});

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'jeffrey',
//     password: '12345',
//     database: 'projekakhir',
//     port: 3306
// });

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))

const {
    authrouter , ProdukRouters , CartRouters , AdminRouters
} = require('./routers')

app.use('/auth' , authrouter);
app.use('/produk' , ProdukRouters);
app.use('/cart' , CartRouters );
app.use('/admin' , AdminRouters)

app.post('/addbrand', (req,res) => {
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
                sql = 'SELECT * from brand;';
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
        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
    }
})


app.listen(port, () => console.log('API Aktif di port ' + port))