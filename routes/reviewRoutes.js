const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getAllReviewsOfSingleTour,
  createReview,
  checkReviewBody,
  deleteReview,
} = require("../controllers/review.controller");

const { protect } = require("../controllers/auth.controller");

router
  .route("/")
  .get(getAllReviewsOfSingleTour)
  .post(protect, checkReviewBody, createReview)
  .delete(deleteReview);

router.route("/:id").delete(deleteReview);

module.exports = router;
