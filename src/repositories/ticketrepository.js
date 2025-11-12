const {Notificationticket} = require('../models/index')

class TicketRepository{

    async createticket(data){
        try {
            const response = await Notificationticket.create(data)
            return response
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = TicketRepository