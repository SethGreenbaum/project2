module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    header: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    link: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Post.associate = function(models) {
    Post.hasMany(models.Like, {
      onDelete: "cascade"
    });
  };
  return Post;
};
