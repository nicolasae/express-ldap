'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
        allowNull:false
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false
      },
      active: {
        type: DataTypes.BOOLEAN, 
        allowNull:false
      },
      idRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // autoIncrement: true,
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