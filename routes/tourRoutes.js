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
} = require("../controllers/tourControllers");
// router.param("id", checkId)
const { protect } = require("../controllers/auth.controller");
const reviewRouter = require("./reviewRoutes");

router.use("/:id/reviews", reviewRouter);

router.route("/").get(protect, getAllTours).post(checkBody, createAllTours);
router.route("/stats").get(getTourStats);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
