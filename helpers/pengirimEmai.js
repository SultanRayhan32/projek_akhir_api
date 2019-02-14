var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sultanrayhanh@gmail.com',
        pass: 'saoqllapskivhrdr'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter;