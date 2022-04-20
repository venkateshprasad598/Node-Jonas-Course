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
const mongoose = require("mongoose")

const TourSchema = new mongoose.Schema({
name :{
    type : String,
    required : [true, "A tour must have a name"],
    unique : true
},
rating : {
    type : Number,
    default : 4.5
},
price : {
    type : Number,
    required : [true, "A tour must have a price"]
}
})

//KEEP TOUR NAME IN CAPS
const Tour = mongoose.model("Tour", TourSchema)
module.exports = Tour