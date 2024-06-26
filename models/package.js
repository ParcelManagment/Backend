const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connectSequelize');
const User = require('./user');
const UnregisteredUser = require('./user_nr');

class Package extends Model {}

Package.init({
  package_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tag_id: { type: DataTypes.STRING, unique: true, allowNull: false },
  sender_id: { type: DataTypes.INTEGER, allowNull: false },
  sender_type: { type: DataTypes.ENUM('User', 'UnregisteredUser'), allowNull: false },
  receiver_id: { type: DataTypes.INTEGER, allowNull: false },
  receiver_type: { type: DataTypes.ENUM('User', 'UnregisteredUser'), allowNull: false },
  type: { type: DataTypes.ENUM("vehical", "furniture", "food", "grocery", "chemical", "other"), allowNull: false },
  package_condition: { type: DataTypes.ENUM('new', 'used'), allowNull: false },
  destination: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  tracking_device_id: { type: DataTypes.INTEGER, allowNull: false },
  created_at: { type: DataTypes.DATE },
  submitted: { type: DataTypes.DATE  },
  out_for_delivery: { type: DataTypes.DATE },
  arrived: { type: DataTypes.DATE },
  cancelled: { type: DataTypes.BOOLEAN, defaultValue: false },
  submitted_by: {type: DataTypes.INTEGER, allowNull: false}
}, { sequelize, modelName: 'Package', tableName: "package", timestamps:false});


// Define polymorphic associations for sender
User.hasMany(Package, {
  foreignKey: 'sender_id',
  constraints: false,
  scope: {
    sender_type: 'User'
  }
});
UnregisteredUser.hasMany(Package, {
  foreignKey: 'sender_id',
  constraints: false,
  scope: {
    sender_type: 'UnregisteredUser'
  }
});
Package.belongsTo(User, {
  foreignKey: 'sender_id',
  constraints: false,
  as: 'senderUser'
});
Package.belongsTo(UnregisteredUser, {
  foreignKey: 'sender_id',
  constraints: false,
  as: 'senderUnregisteredUser'
});

// Define polymorphic associations for receiver
User.hasMany(Package, {
  foreignKey: 'receiver_id',
  constraints: false,
  scope: {
    receiver_type: 'User'
  }
});
UnregisteredUser.hasMany(Package, {
  foreignKey: 'receiver_id',
  constraints: false,
  scope: {
    receiver_type: 'UnregisteredUser'
  }
});
Package.belongsTo(User, {
  foreignKey: 'receiver_id',
  constraints: false,
  as: 'receiverUser'
});
Package.belongsTo(UnregisteredUser, {
  foreignKey: 'receiver_id',
  constraints: false,
  as: 'receiverUnregisteredUser'
});

module.exports = Package;
