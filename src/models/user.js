module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    uid: {
      type: DataTypes.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    photo: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Post)
  }

  return User

}