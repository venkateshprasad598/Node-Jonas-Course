const Review = require("../models/reviewModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const {
  deleteOne,
  updateOne,
  createOneOrMany,
  getOne,
  getAll,
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
const getAllReviewsOfSingleTour = getAll(Review);
const createReview = createOneOrMany(Review);
const getReview = getOne(Review);
const updateReview = updateOne(Review);
const deleteReview = deleteOne(Review);

module.exports = {
  getAllReviewsOfSingleTour,
  createReview,
  checkReviewBody,
  deleteReview,
  updateReview,
  getReview,
  checkReviewRequest,
};
