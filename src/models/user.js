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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Post)
  }

  return User

}