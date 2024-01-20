//EXAMPLE
// const mongoose = require('mongoose')

// const JobSchema = new mongoose.Schema(
//   {
//     company: {
//       type: String,
//       required: [true, 'Please provide company name'],
//       maxlength: 50,
//     },
//     position: {
//       type: String,
//       required: [true, 'Please provide position'],
//       maxlength: 100,
//     },
//     status: {
//       type: String,
//       enum: ['interview', 'declined', 'pending'],
//       default: 'pending',
//     },
//     createdBy: {
//       type: mongoose.Types.ObjectId,
//       ref: 'User',
//       required: [true, 'Please provide user'],
//     },
//   },
//   { timestamps: true }
// )

// module.exports = mongoose.model('Job', JobSchema)
const mongoose = require("mongoose");
const User = require("./userModel");

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true,
    maxlength: [40, "A tour name must have less or equal then 40 characters"],
    minlength: [10, "A tour name must have more or equal then 10 characters"],
    // validate: [validator.isAlpha, 'Tour name must only contain characters']
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"],
    enum: {
      values: ["easy", "medium", "difficult"],
      message: "Difficulty is either: easy, medium, difficult",
    },
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        // this only points to current doc on NEW document creation
        return val < this.price;
      },
      message: "Discount price ({VALUE}) should be below regular price",
    },
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A tour must have a description"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default: false,
  },
  startLocation: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
  locations: [
    {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
  ],
  guides: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User", //No need to import User Model, just give database datset name
    },
  ],
});

//DOCUMENT MIDDLEWARE : runs before .save() and .create()

// In schema add this  - guides: Array (For embedding)
//  TourSchema.pre("save", async function (next) {
//    const guidesPromises = this.guides.map(
//      async (id) => await User.findById(id)
//    );
//    this.guides = await Promise.all(guidesPromises);
//    next();
//  });

//QUERY MIDDLEWARE

// this will run whenever find method runs
TourSchema.pre(/^find/, function (next) {
  // this = Tour.findById OR Tour.find()
  this.populate("guides");
  next();
});

//KEEP TOUR NAME IN CAPS
const Tour = mongoose.model("Tour", TourSchema);
module.exports = Tour;
