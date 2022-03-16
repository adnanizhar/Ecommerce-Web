const Sequelize = require("sequelize");
const sequelize = require("./../db");

module.exports = sequelize.define(
  "Users",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      filed: "name",
      type: Sequelize.STRING,
    },
    date: {
      field: "date",
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: false,
  }
);
