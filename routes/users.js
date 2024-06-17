const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const  {connectDb,getConnection, endConnection} = require('../database/database.js')


router.post('/signup', async (req, res, next) => {
    
    const connection = getConnection();
    if(!connection){
        console.log("Database connection unavailable")
        res.status(500).json({Error: "Database Error"})
        return;
    }

    const data = req.body;
    const username = data.username;
    const password = data.password

    const validationError = validate(username, password);
    if(validationError){
        res.status(500).json({Error: validationError})
        return;
    }
    
    try{
    const hash = await hashPassword(password)
    console.log(hash)

    const result = await savaUserCredientials(username, hash, connection)
    res.status(201).json({Error: null, message: 'Registration Successful', userId: result.insertId, })
    }catch(err){
        console.log("registration error occured", err);  // developing
        res.status(500).json({Error: "Registration Failed"})
    }finally{
       // endConnection()
    }
});




function validate(username, password){
    if(!username || typeof username !== 'string'){
        return 'Please enter a Valid Username'
    }
    if(username.length <2){
        return "invalid username"
    }
    if(!password || typeof password !== 'string'){
        return 'Please enter your password'
    }
    if(password.length<6){
        return "Password should have minimum 6 characters"
    }
    const containsUppercase = /[A-Z]/.test(password);
    const containsSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if(!containsUppercase || !containsSymbol){
        return "Oops! Make sure your password has at least one uppercase letter and one special character."
    }
}

async function hashPassword(password){
    const saltRound = 10;
    const hash = await bcrypt.hash(password,saltRound);
    return hash;
}

 function savaUserCredientials(username, hashPassword, connection){
    
    const query = 'INSERT INTO user (username, password) VALUES (?,?)';
    return new Promise((resolve, reject)=>{
    const result = connection.query(query, [username, hashPassword], (err, result) =>{
        if(err){
            reject(err);
        }else{
            resolve(result)
        }
    })
   
    
    });

    
}

module.exports = router;