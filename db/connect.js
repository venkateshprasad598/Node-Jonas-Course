const mongoose = require("mongoose");

const connectDB = async (url) => {
  return mongoose
    .connect(
      "mongodb+srv://venkateshprasad:Venku9980809652!@nodeexpressprojects.akouw.mongodb.net/JonasCourse?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected To DB"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
