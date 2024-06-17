const mysql = require('mysql2');
require('dotenv').config();


var connection;

function dbConfig() {
    return new Promise((resolve, reject) => {
      // Create the connection instance
      const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
      });
  
      
      connection.connect((err) => {
        if (err) {
          reject(err); 
        } else {
          resolve(connection); 
        }
      });
    });
  }

async function connectDb(){
  try{
    
    connection =  await dbConfig()
    console.log("database connected")
  }catch(err){
    console.log("Database connection failed")
  }

}


function getConnection(){
  return connection;
}

function endConnection() {
  con = getConnection();
  if(con){
    con.end((err) =>{
      if(err){
        console.log("Can't close the DB connection") // developing
      }else{
        console.log("DB connection closed") // developing 
      }
    })
  }
}

module.exports = {connectDb, getConnection,endConnection};