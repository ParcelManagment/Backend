const sequelize = require("../../../database/connectSequelize.js");
const syncDb = require('../../../database/syncDb');
const User = require('../../../models/user.js');
const UnregisteredUser = require('../../../models/user_nr.js');
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
            
            const sender_nr = await UnregisteredUser.findOne({where:{email:senderEmail}});
            if(sender_nr){
                req.body.sender.sender_id = sender_nr.id
                req.body.sender.sender_type = "UnregisteredUser";
            }else{
                
                await validateSender(req, res, next);
                const newSender = await UnregisteredUser.create({
                    email: senderEmail,
                    first_name: req.body.sender.first_name,
                    last_name: req.body.sender.last_name,
                    mobile_number: req.body.sender.mobile_number
                },{transaction:t})
                
                req.body.sender.sender_id = newSender.id;
                req.body.sender.sender_type = "UnregisteredUser"
            }
        }
    

        if(receiver){
            req.body.receiver.receiver_id = receiver.id
            req.body.receiver.receiver_type = "User"
        
            
            next();
        }else{
            const receiver_nr = await UnregisteredUser.findOne({where:{email:receiverEmail}});
            if(receiver_nr){

                req.body.receiver.receiver_id = receiver_nr.id;
                req.body.receiver.receiver_type = "UnregisteredUser"
                next()

            }else{
                validateReceiver(req, res, next)
                const newReceiver = await UnregisteredUser.create({
                    email: receiverEmail,
                    first_name: req.body.receiver.first_name,
                    last_name: req.body.receiver.last_name,
                    mobile_number: req.body.receiver.mobile_number
                },{transaction:t})

                req.body.receiver.receiver_id = newReceiver.id;
                req.body.receiver.receiver_type = "UnregisteredUser";
                next()
            }
            
        }
    }catch(err){
        await t.rollback()
        console.log(err)
        res.status(500).json({Error: "Something went Wrong"});
    }
    
    

}

module.exports = findParticipant;