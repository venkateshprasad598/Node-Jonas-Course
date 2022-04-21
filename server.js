const app =  require("./app")
const connectDB = require("./db/connect")

app.get("/", (req, res) => {
    res.status(200).json("Welcome To Home Page")
})

const port = process.env.PORT || 5000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => { 
            console.log(`App is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()
