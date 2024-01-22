const Review = require("../models/reviewModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { deleteOne } = require("./handleFactory");

const checkReviewBody = (req, res, next) => {
  const { review, rating } = req.body;
  if (!review || !rating)
    return res.status(400).send({ status: "Review or rating is missing" });
  next();
};
const getAllReviewsOfSingleTour = async (req, res, next) => {
  try {
    let filterReviews = {};
    if (req.params.id) filterReviews = { tour: req.params.id };
    const reviews = await Review.find(filterReviews);
    console.log({ reviews });

    if (!reviews) {
      next(new AppError("No Review Found", 404));
    }
    console.log({ reviews });

    res.status(200).json({
      status: "success",
      data: { reviews },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      status: "error",
      message: "Something went wrong. Please try again later.",
    });
  }
};

const createReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.id;
  if (!req.body.user) req.body.user = req.user.id;

  const review = await Review.create(req.body);

  if (!review) {
    next(new AppError("No Review Found", 404));
  }
  res.status(200).json({ status: "success", data: { review } });
});

const deleteReview = deleteOne(Review);

module.exports = {
  getAllReviewsOfSingleTour,
  createReview,
  checkReviewBody,
  deleteReview,
};
