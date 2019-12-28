'use strict';
module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('Table', {
    fieldString: DataTypes.STRING,
    fieldNumeric: DataTypes.INTEGER
  }, {});
  Table.associate = function(models) {
    // associations can be defined here
  };
  return Table;
};