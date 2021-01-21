// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const Instance = sequelize.define("Instance", {
    userID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    projectID: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Instance.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Instance.belongsTo(models.Projects, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Instance;
};
