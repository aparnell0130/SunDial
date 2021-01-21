// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function(models) {
    // Associating User with Instances
    // When an Author is deleted, also delete any associated Posts
    //   User.hasMany(models.Instance, {
    //     onDelete: "cascade"
    //   });
    User.hasMany(models.Project, {});
  };

  return User;
};
