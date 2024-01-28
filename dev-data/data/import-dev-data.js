const fs = require("fs");
const mongoose = require("mongoose");
const Tour = require("../../models/tourModel");
const connectDB = require("../../db/connect");
const User = require("../../models/userModel");
const Review = require("../../models/reviewModel");
require("dotenv").config();

const url = process.env.MONGO_URI;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};
start();

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, "utf-8"));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users);
    await Review.create(reviews);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

// TERMINAL COMMMANDS

// 1. TO IMPORT
// nodemon dev-data/data/import-dev-data.js --import

// 1. TO DELETE
// nodemon dev-data/data/import-dev-data.js --delete
