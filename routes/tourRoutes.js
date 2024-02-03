const express = require("express");

const router = express.Router();
const {
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
} = require("../controllers/tourControllers");
// router.param("id", checkId)
const { protect } = require("../controllers/auth.controller");
const reviewRouter = require("./reviewRoutes");

router.use("/:id/reviews", reviewRouter);

router.route("/").get(protect, getAllTours).post(checkBody, createAllTours);
router.route("/stats").get(getTourStats);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(getToursWithin);

router.route("/distances/:latlng/unit/:unit").get(getDistances);

// /tours-within?distance=233&center=-40,45&unit=mi
// or
// /tours-within/233/center/-40,45/unit/mi
module.exports = router;
