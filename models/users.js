"use strict";

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    passw: {
      type: DataTypes.TEXT,
      allowNull:  false
    }
  }, {
    tableName: 'users', timestamps : false
  });

  return Users;
};
