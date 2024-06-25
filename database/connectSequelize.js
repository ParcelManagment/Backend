const Sequelize = require("sequelize");
require('dotenv').config();

// create sequelize connection
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  });

// test connection
  async function testconnection(){
    try{
        await sequelize.authenticate()
        console.log('Sequelize Connection has been established successfully.');

    }catch(error){
        console.error('Unable to connect to the database:', error);
    }
  }

testconnection();

module.exports = sequelize;