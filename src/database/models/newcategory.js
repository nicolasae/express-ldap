'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NewCategory.init(
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
      tableName:'NewCategories',
      modelName: 'NewCategory',
  });
  return NewCategory;
};