const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const xss = require("xss-clean");
const hpp = require("hpp");
const limiter = require("../login/controller/limitRequests");

const indexRouter = require("./routes/index");

const PORT = process.env.PORT || 3000;
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/api", limiter);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(xss());
app.use(hpp());
app.use("/", indexRouter);
app.use("*", (req, res, next) => {
  res.send("invalid_request_URL");
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
