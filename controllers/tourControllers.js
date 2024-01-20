const { findByIdAndUpdate } = require("../models/tourModel");
const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

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

const getAllTours = async (req, res, next) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    console.log(features);

    const tours = await features.query;
    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const createAllTours = catchAsync(async (req, res, next) => {
  const tour = await Tour.create(req.body);
  if (!tour) {
    next(new AppError(`No tour found`, 404));
  }
  res.status(200).json({ status: "success", data: { tour } });
});

// const getTour = catchAsync(async(req, res, next) => {
//     console.log("ERROR")
//     console.log("ERROR")
//     const tour = await Tour.findById(req.params.id)
//         console.log("ERROR")

//         if(!tour){
//             console.log("ERROR")
//             return next(new AppError(`No tour found with that ID`, 404));
//         }
//         res.status(200).json({status : "success", data : {tour}})
// })

const getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  // Tour.findOne({ _id: req.params.id })
  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

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

const updateTour = catchAsync(async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // {new : true} gives you the updated object in return
    if (!tour) {
      res.status(404).json({ status: "Not Found" });
    }
    res.status(200).json({ status: "success", data: { tour } });
  } catch (error) {
    res.status(501).json({ status: "fail", message: error });
  }
});

const deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
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
