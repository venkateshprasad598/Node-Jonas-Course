const app =  require("./app")
const connectDB = require("./db/connect")
// require("./dev-data/data/import-dev-data")
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

// process.on('unhandledRejection', err => {
//   console.log('UNHANDLED REJECTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });