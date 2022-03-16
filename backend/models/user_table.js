const Sequelize = require("sequelize");
const sequelize = require("./../db");

module.exports = sequelize.define(
  "user_table",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
    },

    first_name: {
      field: "first_name",
      type: Sequelize.STRING,
    },

    last_name: {
      field: "last_name",
      type: Sequelize.STRING,
    },
    email: {
      field: "email",
      type: Sequelize.STRING,
    },
    password: {
      field: "password",
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);
