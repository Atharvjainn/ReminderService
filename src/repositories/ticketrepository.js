const {Notificationticket} = require('../models/index')
const { Op } = require('sequelize'); 

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
                    notifationtime : { [ Op.lte ] : new Date()}
                }
            }
            )
            return response;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = TicketRepository