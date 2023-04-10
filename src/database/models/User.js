'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // association here
      User.belongsTo(models.Role, {
        foreignKey:'idRole',
      });
      User.hasMany(models.New, {
        foreignKey:'idAuthor',
      })
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name:{
        type: DataTypes.STRING,
        allowNull:false,        
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
          isEmail:true
        }
      },
      active: {
        type: DataTypes.BOOLEAN, 
        allowNull:false
      },
      idRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'Users',
      modelName: 'User',
    }
  );
  return User;
};