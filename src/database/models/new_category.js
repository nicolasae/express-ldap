'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class New_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  New_Category.init(
    {
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
      tableName:'News_Categories',
      modelName: 'New_Category',
  });
  return New_Category;
};