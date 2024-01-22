const Review = require("../models/reviewModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const {
  deleteOne,
  updateOne,
  createOneOrMany,
  getOne,
} = require("./handleFactory");

const checkReviewBody = (req, res, next) => {
  const { review, rating } = req.body;
  if (!review || !rating)
    return res.status(400).send({ status: "Review or rating is missing" });
  next();
};

const checkReviewRequest = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.id;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

//Review Control Functions
const createReview = createOneOrMany(Review);
const getReview = getOne(Review);
const updateReview = updateOne(Review);
const deleteReview = deleteOne(Review);

const getAllReviewsOfSingleTour = async (req, res, next) => {
  try {
    let filterReviews = {};
    if (req.params.id) filterReviews = { tour: req.params.id };

    const reviews = await Review.find(filterReviews);

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

module.exports = {
  getAllReviewsOfSingleTour,
  createReview,
  checkReviewBody,
  deleteReview,
  updateReview,
  getReview,
  checkReviewRequest,
};
