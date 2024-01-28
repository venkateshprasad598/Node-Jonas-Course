const { findByIdAndUpdate } = require("../models/tourModel");
const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const {
  deleteOne,
  updateOne,
  createOneOrMany,
  getOne,
  getAll,
} = require("./handleFactory");

//Middlewares
const checkId = (req, res, next, val) => {
  console.log(`The tour val is ${val}`);
  if (!req.params.id) {
    return res.status(404).send({ status: "Invalid Id" });
  }
  next();
};

const checkBody = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(404).send({ status: "Name or Price is missing" });
  }
  next();
};
//Middlewares end's here

//Route Functions
const getAllTours = getAll(Tour);
const updateTour = updateOne(Tour);
const deleteTour = deleteOne(Tour);
const createAllTours = createOneOrMany(Tour);
const getTour = getOne(Tour);

const getTourStats = catchAsync(async (req, res, next) => {
  const tour = await Tour.aggregate([
    // Stage 1: Filter pizza order documents by pizza size
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    // Stage 2: Group remaining documents by pizza name and calculate total quantity
    {
      $group: { _id: "$difficulty", num: { $sum: 1 } },
    },
  ]);
  if (!tour) {
    res.status(404).json({ status: "Not Found" });
  }
  res.status(200).json({ status: "success", data: { tour } });
});

module.exports = {
  getAllTours,
  createAllTours,
  getTour,
  updateTour,
  deleteTour,
  checkId,
  checkBody,
  getTourStats,
};
