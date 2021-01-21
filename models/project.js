// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const Project = sequelize.define("Project", {
    projectNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Project.associate = function(models) {
    Project.hasMany(models.Instance, {
      onDelete: "cascade"
    });
  };

  return Project;
};
