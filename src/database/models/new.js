'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class New extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      New.belongsToMany(models.Category, {
        through: "NewsCategory",
        as: "Categories",
        foreignKey: "idNew",
      });
      New.belongsTo(models.User, {
        foreignKey:'idAuthor',
      })
    }
  }
  New.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title:{
        type: DataTypes.STRING,
        allowNull:false
      },
      summary: {
        type:DataTypes.STRING,
        allowNull:false
      },
      link: {
        type: DataTypes.STRING,
        allowNull:false
      },
      image: {
        type:DataTypes.STRING,
        allowNull:false
      },
      active:{
        type: DataTypes.BOOLEAN,
        allowNull:false
      }, 
      activeForPortal:{
        type: DataTypes.BOOLEAN,
        allowNull:false
      }, 
      idAuthor: {
        type:DataTypes.INTEGER,
        allowNull: false,
      },
    }, 
    {
      sequelize,
      tableName:'News',
      modelName: 'New',
    }
  );
  return New;
};