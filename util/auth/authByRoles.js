const Jwt = require("jsonwebtoken")

const authoByRoles = (token, role) => {

    try{
        const payload = Jwt.verify(token, process.env.JWT_SECRET);
        if(role.includes(payload.role)){
            return payload;
        }else{
            throw new Error("UnAuthorized");
        }

    }catch(error){
        throw new Error("Authentication failed")
    }

}

module.exports = authoByRoles;