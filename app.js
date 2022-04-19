const express = require("express")
const app = express()

const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")

//MiddleWare
app.use(express.json())


app.use("/app/v1/tours", tourRouter)
app.use("/app/v1/users", userRouter)


module.exports = app