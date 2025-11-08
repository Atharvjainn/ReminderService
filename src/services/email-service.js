const sender = require('../config/emailConfig')


const sendBasicEmail = (mailfrom,mailto,mailsubject,mailbody) => {
     sender.sendMail({
                from : mailfrom,
                to : mailto,
                subject : mailsubject,
                text : mailbody
   })
}

module.exports = sendBasicEmail