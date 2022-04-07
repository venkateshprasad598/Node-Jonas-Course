const express = require("express")
const app = express()
const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")

//MiddleWare
app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)
app.use(express.json())
app.get("/", (req, res) => {
    res.status(200).send("Hello")
})
module.exports = app