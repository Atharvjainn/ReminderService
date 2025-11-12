const cron = require('node-cron');
const EmailService = require('../services/email-service')
const sender = require('../config/emailConfig')
const setupJobs = () => {
    cron.schedule('* * * * *', async() => {
        const mails = await EmailService.fetchpendingtickets()
        mails.forEach((mail) => {
            sender.sendMail({
                to : mail.recepientemail,
                subject : mail.subject,
                text : mail.content
            },async(err,data) => {
                if(err){
                    console.log(err);
                }
                else{
                    await EmailService.updateticket(mail.id,{status : "SUCCESS"})
                }
            })
        });
        console.log(mails);
        
        });
}

module.exports = setupJobs