const express = require("express");
const bodyParser = require("body-parser");
const user = require('./routes/user');
const shop = require('./routes/shop');
const InitiateMongoServer = require("./config/db");

InitiateMongoServer();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use('/user', user);

/**
 * Router Middleware
 * Router - /shop/*
 * Method - *
 */
 app.use('/shop', shop);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

// mongodb://127.0.0.1:27017/