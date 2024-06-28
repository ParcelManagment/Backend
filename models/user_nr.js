const { DataTypes, Model} = require("sequelize");
const sequelize = require("../database/connectSequelize.js");


class UnregisteredUser extends Model{}

UnregisteredUser.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
     },
    email: {
         type: DataTypes.STRING, 
         unique: true, 
         allowNull: false 
    },
    first_name: { 
        type: DataTypes.STRING, 
        allowNull: false
    },
    last_name: { 
        type: DataTypes.STRING,
         allowNull: false
    },
    mobile_number: { 
        type: DataTypes.STRING, 
        allowNull: false
    }
    },{
    sequelize, 
    modelName: 'UnregisteredUser', 
    tableName: 'user_NR', // Explicitly define the table name
    timestamps: false // Disable timestamps

})

module.exports = UnregisteredUser;
