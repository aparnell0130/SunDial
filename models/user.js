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

  return User;
};
