const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const fs = require("fs");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const port = 5012;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));

//connect database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "TodolistDB",
});

con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected!");
  }
});
//end connect database

//auto routes
fs.readdirSync("./routes").map((route) =>
  app.use(require(`./routes/${route}`)),
);

//end auto routes
app.listen(port, () => console.log(`server running on port ${port}`));
