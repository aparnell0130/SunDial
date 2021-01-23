// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const Instance = sequelize.define("Instance", {
    timeIn: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timeOut: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Instance.associate = function(models) {
    Instance.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Instance.belongsTo(models.Project, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Instance;
};
