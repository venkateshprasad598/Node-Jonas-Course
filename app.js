//DOTENV
require("dotenv").config()

//PACKAGE IMPORTS
const express = require("express")
const app = express()

//SYSTEM IMPORTS
const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")

//MiddleWare
app.use(express.json())


app.use("/app/v1/tours", tourRouter)
app.use("/app/v1/users", userRouter)


module.exports = app