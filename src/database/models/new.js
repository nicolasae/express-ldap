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
        through: "New_category",
        as: "categories",
        foreignKey: "new_id",
      });
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
        type:DataTypes.TEXT,
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
      idAuthor: {
        type:DataTypes.INTEGER,
        allowNull: false,
      } 
    }, 
    {
      sequelize,
      tableName:'news',
      modelName: 'New',
    }
  );
  return New;
};