const Booking = require("../models/bookingModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { updateOne, deleteOne } = require("./handleFactory");

const createBooking = catchAsync(async (req, res, next) => {
  const { price, user, tour } = req.body;
  console.log({ price, user, tour });

  if (!price || !user || !tour) {
    next(new AppError("Please provide all the details", 400));
  }

  const doc = await Booking.create(req.body);

  if (!doc) {
    next(new AppError("No document found", 404));
  }

  res.status(201).json({
    status: 201,
    data: { data: doc },
  });
});

const getSingleBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(new AppError("Please provide all the details", 400));
  }

  const doc = await Booking.findById(id);

  if (!doc) {
    next(new AppError("No document found", 404));
  }

  res.status(200).json({
    status: 200,
    data: { data: doc },
  });
});

// all of my bookings
const getMyBookings = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    next(new AppError("Please provide all the details", 400));
  }

  const doc = await Booking.find({ user: userId });

  if (!doc) {
    next(new AppError("No document found", 404));
  }

  res.status(200).json({
    status: 200,
    data: { data: doc },
  });
});

const editMyBooking = updateOne(Booking);
const deleteMyBooking = deleteOne(Booking);

module.exports = {
  createBooking,
  getSingleBooking,
  getMyBookings,
  editMyBooking,
  deleteMyBooking,
};
