//DOTENV
require("dotenv").config();


const AppError = require("./utils/appError")
const globalErrorHandler = require("./controllers/errorController")
//PACKAGE IMPORTS
const express = require("express");
const app = express();

//SYSTEM IMPORTS
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

//MiddleWare
app.use(express.json());

app.use("/app/v1/tours", tourRouter);
app.use("/app/v1/users", userRouter);

app.all("*", (req, res, next) => {
    console.log("Hello")
  // next in middleware takes a paramater which is an error, wherever there is a function after this middleware which accepts err Ex : (err, req, res, next) it jumps to that fucntion by skiping all of the other functions in the middle
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
