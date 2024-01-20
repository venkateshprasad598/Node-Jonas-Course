const Review = require("../models/reviewModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const checkReviewBody = (req, res, next) => {
  const { review, rating } = req.body;
  if (!review || !rating)
    return res.status(404).send({ status: "Review or rating is missing" });
  next();
};

const getAllReviewsOfSingleTour = async (req, res, next) => {
  try {
    const features = await Review.find();
    console.log({ features });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

const createReview = catchAsync(async (req, res, next) => {
  const review = await Review.create(req.body);

  if (!review) {
    next(new AppError("No Review Found", 404));
  }
  res.status(200).json({ status: "success", data: { review } });
});

module.exports = {
  getAllReviewsOfSingleTour,
  createReview,
  checkReviewBody,
};
