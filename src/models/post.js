module.exports = (sequelize, DataTypes) => {

  const Post = sequelize.define('Post', {
    id: {
      type:DataTypes.BIGINT(11), 
      autoIncrement:true,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Post.associate = function(models){
    Post.belongsTo(models.User)
  }


  return Post

}