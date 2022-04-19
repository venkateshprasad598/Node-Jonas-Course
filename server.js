const app =  require("./app")
const connectDB = require("./db/connect")

app.get("/", (req, res) => {
    res.status(200).json("Welcome To Home Page")
})

const port = 5000
app.listen(port, () => { 
    console.log(`App is listening on port ${5000}...`)
})