const Sequelize = require("sequelize");
const sequelize = require("./../db");

module.exports = sequelize.define(
  "orders",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    Address: {
      field: "Address",
      type: Sequelize.STRING,
    },
    productId: {
      field: "product_id",
      type: Sequelize.INTEGER,
    },
    user_id: {
      field: "user_id",
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);
