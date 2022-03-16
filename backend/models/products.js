const Sequelize = require("sequelize");
const sequelize = require("./../db");

module.exports = sequelize.define(
  "products",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    title: {
      field: "title",
      type: Sequelize.STRING,
      primaryKey: true,
    },
    description: {
      field: "description",
      type: Sequelize.TEXT,
      primaryKey: true,
    },
    price: {
      field: "price",
      type: Sequelize.FLOAT,
      primaryKey: true,
    },

    category_id: {
      field: "category_id",
      type: Sequelize.INTEGER,
    },
    date: {
      field: "date",
      type: Sequelize.DATE,
      primaryKey: true,
    },
    image_url: {
      field: "image_url",
      type: Sequelize.TEXT,
    },
  },
  {
    timestamps: false,
  }
);
