const mongoose = require("mongoose");

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

//QUERY MIDDLEWARE
ReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name, email", // give me only name and emails
  });
  next();
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
