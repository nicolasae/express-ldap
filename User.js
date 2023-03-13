module.exports = (sequelize, DataTypes) =>{
  const User = sequelize.define('User', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    roleId : {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    name : {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email : {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    created_at : {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue : Date.now
    },
    updated_at : {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue : Date.now
    },
  },
  {
      timestamps: true,
      underscored: true,
  });

  User.associate = (models) =>{
      User.belongsTo(models.Role, {
          as: "roles",
          foreignKey: "roleId"
      })
  }

  return User;
};