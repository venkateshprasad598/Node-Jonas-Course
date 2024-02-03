const mongoose = require("mongoose");
const Tour = require("./tourModel");

const ReviewSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//index
ReviewSchema.index({ tour: 1, user: 1 }, { unique: true }); // In compound indexing, if there is any other object with same combination that duplicate error will be thrown.

//QUERY MIDDLEWARE
ReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name, email", // give me only name and emails
  });
  next();
});

// When someone adds review, calculate average of all reviews and update it in tours.
ReviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  // console.log(stats);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

ReviewSchema.post("save", function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.tour);
});

// for update and delete of a review, calculate average of all reviews and update it in tours.
// findByIdAndUpdate
// findByIdAndDelete
ReviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  // console.log(this.r);
  next();
});

ReviewSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

// { "tour":"65ab635dcb177e97a20e96f7",
//                 "user": {
//                     "_id": "62a4ae51e0d7cac6b52ed87f",
//                     "email": "venkuprasad003@gmail.com"
//                 }}

// After each review have tour id and user details, now when user get's tour we want to send reviews in each tour object.
// therefore,
// 1. go to tour model, now do child referencing with virtual not real, no need to give name inschema, intead use TourSchem.virtual and populate("reviews")
// 2. there, add reviews in scheme as virtual filed below schema, which won't be there in mongo db or schema but will to frontend when res is converted to json or object
// 3. Do TourScheme.virtual
//Virtual Populate
// TourSchema.virtual("reviews", {
//   ref: "Review", // model you want to reference
//   foreignField: "tour", // in that model which field are you targeting
//   localField: "_id", // take it's id and map it local id
// });
//4. that's it noe populate reviews using .populate("reviews") for find

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
