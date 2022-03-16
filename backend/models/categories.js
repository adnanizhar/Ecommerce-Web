const Sequelize = require("sequelize");
const sequelize = require("./../db");

module.exports = sequelize.define(
  "categories",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
    },

    name: {
      field: "name",
      type: Sequelize.STRING,
    },
    image: {
      field: "image",
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);
