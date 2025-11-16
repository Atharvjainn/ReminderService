const sender = require('../config/emailConfig')
const TicketRepository = require('../repositories/ticketrepository')
const ticketrepo = new TicketRepository()

const sendBasicEmail = async(mailfrom,mailto,mailsubject,mailbody) => {
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

const updateticket = async(ticketId,data) => {
   try {
      const response = await ticketrepo.updateTicket(ticketId,data)
      return response
   } catch (error) {
      console.log(error)
   }
}

const subscribedevents = async(payload) => {
   const service = payload.service
   const data = payload.data
   switch(service){
      case "CREATE_TICKET" : 
         await createticket(data);
         break;

      case "SEND_BASIC_MAIL" :
         await sendBasicEmail(data)
         break;

      default :
         console.log("No valid event received");
         break
   }
}


module.exports = {
   sendBasicEmail,createticket,fetchpendingtickets,updateticket,subscribedevents
}