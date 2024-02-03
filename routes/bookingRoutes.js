const express = require("express");
const {
  createBooking,
  getSingleBooking,
  getMyBookings,
  editMyBooking,
  deleteMyBooking,
} = require("../controllers/booking.controller");
const { protect } = require("../controllers/auth.controller");
const router = express.Router();

router.route("/").post(createBooking).get(protect, getMyBookings);
router
  .route("/:id")
  .get(getSingleBooking)
  .patch(editMyBooking)
  .delete(deleteMyBooking);

module.exports = router;
