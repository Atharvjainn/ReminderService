const sender = require('../config/emailConfig')
const TicketRepository = require('../repositories/ticketrepository')
const ticketrepo = new TicketRepository()

const sendBasicEmail = (mailfrom,mailto,mailsubject,mailbody) => {
     sender.sendMail({
                from : mailfrom,
                to : mailto,
                subject : mailsubject,
                text : mailbody
   })
}


const createticket = async(data) => {
   try {
      const response = await ticketrepo.createticket(data)
      return response
   } catch (error) {
      console.log(error)
   }
}


const fetchpendingtickets = async() => {
   try {
      const response = await ticketrepo.fetchpendingtickets()
      return response
   } catch (error) {
      console.log(error)
   }
}


module.exports = {
   sendBasicEmail,createticket,fetchpendingtickets
}