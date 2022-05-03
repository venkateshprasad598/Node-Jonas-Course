const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');
require("dotenv").config()

const connectDB = async (url) => {
    console.log()
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(() => console.log("Connected To DB For Dev")).catch((err) => console.log(err))
}

connectDB(process.env.MONGO_URI)

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};


if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// TERMINAL COMMMANDS

// 1. TO IMPORT
// nodemon dev-data/data/import-dev-data.js --import

// 1. TO DELETE
// nodemon dev-data/data/import-dev-data.js --delete