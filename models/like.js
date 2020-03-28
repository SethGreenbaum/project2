module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define("Like", {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    // postid: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
  });
  Like.associate = function(models) {
    Like.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Like;
};
