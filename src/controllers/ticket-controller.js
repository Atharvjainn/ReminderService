const ticketservice = require('../services/email-service')

const create = async(req,res) => {
    try {
        const response = await ticketservice.createticket(req.body)
        return res.status(201).json({
            data : response,
            success : true,
            message : "Created a ticket",
            err : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {},
            success : false,
            message : "unable to create a ticket",
            err : error
        })
    }
}



const fetchtickets = async(req,res) => {
    try {
        const response = await ticketservice.fetchpendingtickets()
        return res.status(200).json({
            data : response,
            success : true,
            message : "Fetched pending tickets",
            err : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {},
            success : false,
            message : "unable to fetch pending tickets",
            err : error
        })
    }
}

module.exports = {
    create,fetchtickets
}