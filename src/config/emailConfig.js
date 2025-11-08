const nodemailer = require('nodemailer')
const { EMAIL,EMAIL_PWD } = require('./serverConfig')

const sender = nodemailer.createTransport({
    service : "Gmail",
    auth : {
        user : EMAIL,
        pass : EMAIL_PWD
    }  
})

module.exports = sender