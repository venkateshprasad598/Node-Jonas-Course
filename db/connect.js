const mongoose = require("mongoose")

const connectDB = async (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(() => console.log("Connected To DB")).catch((err) => console.log(err))
}
module.exports = connectDB