const mongoose = require("mongoose")

const connectDB = async (url) => {
try {
const connect = await mongoose.connect(url)
console.log(connect)
} catch (error) {
    console
    .log(error)
}
}
module.exports = connectDB