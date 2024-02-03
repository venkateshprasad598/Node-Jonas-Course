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

const getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(","); // latitue,longitude

  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1; // distance/radius of earth in miles and km

  if (!lat || !lng) {
    next(
      new AppError(
        "Please provide latitute and longitude in the format lat,lng.",
        400
      )
    );
  }

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      data: tours,
    },
  });
});

const getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  const multiplier = unit === "mi" ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    next(
      new AppError(
        "Please provide latitute and longitude in the format lat,lng.",
        400
      )
    );
  }

  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: "distance",
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      data: distances,
    },
  });
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
  getToursWithin,
  getDistances,
};
