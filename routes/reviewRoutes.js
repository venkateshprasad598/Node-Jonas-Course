const express = require("express");
const router = express.Router();
const {
  getAllReviewsOfSingleTour,
  createReview,
  checkReviewBody,
} = require("../controllers/review.controller");

router
  .route("/")
  .get(getAllReviewsOfSingleTour)
  .post(checkReviewBody, createReview);
module.exports = router;
