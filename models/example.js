//This is an example we used to understand datatypes and it is going to stay for other people to understand our code.
module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Example;
};
