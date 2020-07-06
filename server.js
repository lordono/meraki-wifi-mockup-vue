require("dotenv").config();

const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

const path = require("path");
const app = express();

// parse application/json
app.use(bodyParser.json({ limit: "20mb" }));

app.use(cors());

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//load from router
const indexRouter = require("./backend/router");
app.use("/server", indexRouter);

app.listen(process.env.PORT || 5555);
