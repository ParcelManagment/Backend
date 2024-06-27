const {body, validationResult} = require("express-validator");

const validateSender = async function(req, res, next){
    body("sender.first_name").notEmpty().isString().isLength({min:3}).withMessage("Sender name is not valid"),
    body("sender.last_name").notEmpty().isString().isLength({min:3}).withMessage("Sender name is not valid"),
    body("sender.mobile_number").notEmpty().isMobilePhone(['si-LK', 'en-LK']).withMessage("invalid Sender mobile number"),
    
    (req, res, next) =>{
        const result = validationResult(req)
        if(result.isEmpty()){
            return
        }else{
            res.status(400).json({Error: result.array()})
            
        }
        
    }
}

module.exports = validateSender;