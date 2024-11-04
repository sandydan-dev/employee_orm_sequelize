const { DataTypes, sequelize } = require("../lib/index");

// Define the Product model
const employee = sequelize.define("employee", {
  name: DataTypes.TEXT,
  salary: DataTypes.INTEGER,
  department: DataTypes.TEXT,
  designation: DataTypes.TEXT,
});

module.exports = employee;
