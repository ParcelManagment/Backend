const authoByRoles = require("./authByRoles");


const isStaff = (req, res, next) => { 

    const token = req.cookies.token;
    if(!token){
        res.status(401).json("No Token Provided");
        return
    }

    try{
        const payload = authoByRoles(token, ["station_master","general_staff", "not_approved"]);
        req.staff_id = payload.employee_id;
        req.staff_role = payload.role;
        next()

    }catch(error){
        res.status(401).json("Unauthorized")
        return;
    }
    
}

module.exports = isStaff;