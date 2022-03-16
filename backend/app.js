const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const products = require("./models/products");
const users = require("./models/Users");
const categories = require("./models/categories");
const user_table = require("./models/user_table");
const orders = require("./models/orders");
const jwt = require("jsonwebtoken");
const db = require("./db");

app.use(bodyParser.json());
app.use(cors());

//app.get("/", function (request, response) {
// res.json([{}]);
//});

//For Getting of Product and also limitation set on per page
app.get("/products", function (request, response) {
  const page = request.query.page || 1;
  const limit = 8;
  const offset = (page - 1) * limit;

  resultproducts = products
    .findAndCountAll({
      limit: limit,
      offset: offset,
    })
    .then((items) => {
      response.json(items);
    });
});

//For product Categories
app.get("/categories", function (request, response) {
  categories.findAll().then((categories) => {
    response.json(categories);
  });
});

//For categorize product through category id
app.get("/products/:id", function (request, response) {
  const page = request.query.page || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  products
    .findAndCountAll({
      limit: limit,
      offset: offset,
      where: {
        category_id: +request.params.id,
      },
    })
    .then((categories) => {
      response.json(categories);
    });
});

//app.get("/users", function (request, response) {
//users.findAll().then((Users) => {
//response.json(Users);
//});
//});

//For User Registration
app.post("/user_table", function (request, response) {
  let data = {
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    password: request.body.password,
  };

  user_table.create(data).then((createdInstance) => {
    response.json(createdInstance);
  });
});

//For Login Request
app.post("/posts", verifyToken, (request, response) => {
  console.log("token", request.token);
  jwt.verify(request.token, "secretkey", (err, authData) => {
    if (err) {
      response.sendStatus(403);
    } else {
      response.json({
        message: "post created",
        authData,
      });
    }
  });
});

//app.post("/logins", (request, response) => {
//const user = {
// email: request.body.email,
// password: request.body.password,
// };
//});

//For User Login
app.post("/login", (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  user_table
    .findAll({
      where: {
        email: email,
        password: password,
      },
    })
    .then(function (users) {
      if (users.length > 0) {
        jwt.sign({ id: users[0].id }, "secretkey", (err, token) => {
          response.send({
            success: true,
            message: "You have logged In",
            token: token,
          });
        });
      } else {
        response.json({ success: false, message: "No user found" });
      }
    });
});

app.post("/AddToCart", (request, response) => {
  const id = request.body.id;

  products
    .findAll({
      where: {
        id: id,
      },
    })
    .then(function (products) {
      if (products.length > 0) {
        response.json({
          success: true,
          message: "Added in Cart",
        });
      } else {
        response.json({ success: false, message: "Not Added" });
      }
    });
});

//For Saving an Address in Checkout Page
app.post("/saveAddress", (request, response) => {
  const address = request.body.address;
  return response.json({
    status: 200,
    message: "Address saved",
  });
});

//For getting a product in a cart
app.get("/getCart", verifyToken, (request, response) => {
  const productId = request.query.product_id;

  products
    .findAll({
      where: {
        id: productId,
      },
    })
    .then(function (products) {
      if (products.length > 0) {
        response.json({ success: true, data: products });
      } else {
        response.json({
          success: false,
          message: "Not in a Next page",
        });
      }
    });
});

//For getting an order details
app.post("/orders", verifyToken, (request, response) => {
  const product_id = request.body.product_id;
  const address = request.body.address;
  const user_id = request.authData.id;

  orders
    .create({
      productId: product_id || 0,
      Address: address || "",
      user_id: user_id || 0,
    })
    .then((result) => {
      console.log(result);
      response.json({ status: 200, message: "order created" });
    });
});

app.get("/getorders", (request, response) => {
  orders
    .findAll({
      where: {
        id: 1,
      },
    })
    .then(function (orders) {
      if (orders.length > 0) {
        response.json({ success: true, data: orders });
      } else {
        response.json({ success: false, message: "Not saved" });
      }
    });
});

function verifyToken(request, response, next) {
  const bearerHeader = request.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    request.token = bearerToken;
    jwt.verify(request.token, "secretkey", (err, authData) => {
      if (err) {
        response.sendStatus(403);
      } else {
        request.authData = authData;
        next();
      }
    });
  } else {
    response.sendStatus(403);
  }
}

app.listen(3000);
