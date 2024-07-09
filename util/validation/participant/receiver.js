const {body, validationResult} = require("express-validator");
    
const validateReceiver = async (req, res, next)=>{
    body("receiver.first_name").notEmpty().isString().isLength({min:3}).withMessage("Receiver name is not valid"),
    body("receiver.last_name").notEmpty().isString().isLength({min:3}).withMessage("Receiver name is not valid"),
    body("receiver.mobile_number").notEmpty().isMobilePhone(['si-LK', 'en-LK']).withMessage("invalid Receiver mobile number"),

    (req, res, next) =>{
        const result = validationResult(req)
        if(result.isEmpty()){
            return
        }else{
            res.status(400).json({Error: result.array()})
        } 
    }
}

module.exports = validateReceiver;