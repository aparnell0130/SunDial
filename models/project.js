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
    //   // Associating User with Instances
    //   // When an Author is deleted, also delete any associated Posts
    Project.belongsTo(models.User, {});
    //   Project.hasMany(models.Instance, {});
  };

  return Project;
};
