module.exports = (sequelize, DataTypes) =>{
  const Role = sequelize.define('Role', {
      id : {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      name : {
          type: DataTypes.STRING(100),
          allowNull: false,
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

  Role.associate = (models) => {

      Role.hasMany(models.User, {
          as: "users",
          foreignKey: "roleId"
      })
  };

  return Role;
}