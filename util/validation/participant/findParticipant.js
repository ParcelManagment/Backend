const sequelize = require("../../../database/connectSequelize.js");
const User = require('../../../models/user.js');
const validateReceiver = require("./receiver.js");
const validateSender = require("./sender.js");

const findParticipant = async (req, res, next) => {

    let t;

    try{

        t = await sequelize.transaction();
        req.transaction = t;

        const senderEmail = req.body.sender.email;
        const receiverEmail = req.body.receiver.email;
        
        const sender = await User.findOne({where:{email:senderEmail}});
        const receiver = await User.findOne({where:{email:receiverEmail}});
        
        if(sender){
            
            req.body.sender.sender_id = sender.id
            req.body.sender.sender_type = "User"
            
        }else{
            
                
                await validateSender(req, res, next);
                const newSender = await User.create({
                    email: senderEmail,
                    first_name: req.body.sender.first_name,
                    last_name: req.body.sender.last_name,
                    mobile_number: req.body.sender.mobile_number
                },{transaction:t})
                
                req.body.sender.sender_id = newSender.id;
                req.body.sender.sender_type = "UnregisteredUser"
            
        }
    

        if(receiver){
            req.body.receiver.receiver_id = receiver.id
            req.body.receiver.receiver_type = "User"
            next();
            
        }else{
                validateReceiver(req, res, next)
                const newReceiver = await User.create({
                    email: receiverEmail,
                    first_name: req.body.receiver.first_name,
                    last_name: req.body.receiver.last_name,
                    mobile_number: req.body.receiver.mobile_number
                },{transaction:t})

                req.body.receiver.receiver_id = newReceiver.id;
                req.body.receiver.receiver_type = "UnregisteredUser";
                next()
            
            
        }
    }catch(err){
        await t.rollback()
        console.log(err)
        res.status(500).json({Error: "Something went Wrong"});
    }
}

module.exports = findParticipant;