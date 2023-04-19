'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewsCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NewsCategory.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      idNew: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      idCategory: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      
    },
    {
      sequelize,
      tableName:'NewsCategories',
      modelName: 'NewsCategory',
  });
  return NewsCategory;
};