const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "A review must have a content"],
    trim: true,
  },
  rating: {
    type: Number,
    default: 3,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

ReviewSchema.pre(/^find/, (next) => {
  this.populate("tour");
  next();
});

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
