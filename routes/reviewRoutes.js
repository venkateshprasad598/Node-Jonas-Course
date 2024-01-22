const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getAllReviewsOfSingleTour,
  createReview,
  checkReviewBody,
  deleteReview,
  updateReview,
  getReview,
  checkReviewRequest,
} = require("../controllers/review.controller");

const { protect } = require("../controllers/auth.controller");

router
  .route("/")
  .get(getAllReviewsOfSingleTour)
  .post(protect, checkReviewBody, checkReviewRequest, createReview)
  .delete(deleteReview);

router.route("/:id").get(getReview).delete(deleteReview).patch(updateReview);

module.exports = router;
