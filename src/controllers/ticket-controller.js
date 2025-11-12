const {createticket} = require('../services/email-service')


const create = async(req,res) => {
    try {
        const response = await createticket(req.body)
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

module.exports = {
    create
}