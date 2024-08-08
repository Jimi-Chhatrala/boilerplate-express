let bodyParser = require("body-parser");
require("dotenv").config();
let express = require("express");
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

console.log("Hello World");

app.post("/name", function (req, res) {
  let { first: firstname, last: lastname } = req.body;
  let fullName = `${firstname} ${lastname}`;
  res.json({ name: fullName });
});

app.get("/name", function (req, res) {
  let { first: firstname, last: lastname } = req.query;
  res.json({ name: `${firstname} ${lastname}` });
});

app.get("/:word/echo", function (req, res) {
  let word = req.params.word;
  res.json({ echo: word });
});

app.get(
  "/now",
  function (req, res, next) {
    let currentTime = new Date().toString();
    req.time = currentTime;
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

app.use(function (req, res, next) {
  console.log(req.method, req.path, "-", req.ip);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", function (req, res) {
  let messageStyle = process.env.MESSAGE_STYLE;

  if (messageStyle === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

// app.get("/", function (req, res) {
//   res.send("Hello Express");
// });

let absolutePath = __dirname + "/views/index.html";

app.get("/", function (req, res) {
  res.sendFile(absolutePath);
});

module.exports = app;
