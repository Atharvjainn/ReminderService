const { Notificationticket } = require('../models/index')
const { Op, DATE } = require('sequelize'); 

class TicketRepository{

    async createticket(data){
        try {
            const response = await Notificationticket.create(data)
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async fetchpendingtickets(){
        try {
            const response = await Notificationticket.findAll({
                where : {
                    status : "PENDING",
                    notificationtime : { [ Op.lte ] : new Date()}
                }
            }
            )
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateTicket(ticketid,data){
        try {
            const ticket = await Notificationticket.findByPk(ticketid)
            if(data.status)
               ticket.status = data.status
            await ticket.save()
            return ticket
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = TicketRepository