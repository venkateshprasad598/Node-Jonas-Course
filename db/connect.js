const mongoose = require("mongoose")

const connectDB = async (url) => {
    return mongoose.connect(url).then(() => console.log("Connected To DB")).catch((err) => console.log(err))
}

module.exports = connectDB
 