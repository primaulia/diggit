'use strict';
module.exports = function(sequelize, DataTypes) {
  const topic = sequelize.define('Topic', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    url: DataTypes.STRING,
    votes: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return topic;
};