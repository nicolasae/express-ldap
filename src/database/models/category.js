'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsToMany(models.New, {
        through: "NewsCategory",
        as: "News",
        foreignKey: "idCategory",
      });
    }
  }
  Category.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull:false,
      },  
      state: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
      },  
    },
    {
      sequelize,
      tableName:'Categories',
      modelName: 'Category',
  });
  return Category;
};