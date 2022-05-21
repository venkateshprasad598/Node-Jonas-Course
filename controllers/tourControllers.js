const { findByIdAndUpdate } = require("../models/tourModel")
const Tour = require("../models/tourModel")
const APIFeatures = require("../utils/apiFeatures")

const checkId =(req, res, next, val) => {
    console.log(`The tour val is ${val}`)
    if(!req.params.id){
        return res.status(404).send({status : "Invalid Id"})
    }
    next()
}

const checkBody = (req, res, next) => {
    const {name, price} = req.body
    if(!name || !price){
        return res.status(404).send({status : "Name or Price is missing"})
    }
    next()
}

const getAllTours = async(req, res) => {
    try {
        // EXECUTE QUERY
        const features = new APIFeatures(Tour.find(), req.query)
          .filter()
          .sort()
          .limitFields()
          .paginate();
          console.log(features)
          
        const tours = await features.query;
    console.log(tours);
        // SEND RESPONSE
        res.status(200).json({
          status: 'success',
          results: tours.length,
          data: {
            tours
          }
        });
      } catch (err) {
        res.status(404).json({
          status: 'fail',
          message: err
        });
      }
   
}

const createAllTours = async(req, res) => {
    try {
        const tour = await Tour.create(req.body)
        if(!tour){
            res.status(404).json({status : "Not Found"})
        }
        res.status(200).json({status : "success", data : {tour}})
    } catch (error) {
        res.status(501).json({status : "fail", message : error})

    }
}
const getTour = async(req, res) => {
    try {
        const tour = await Tour.findById(req.params.id)
        if(!tour){
            res.status(404).json({status : "Not Found"})
        }
        res.status(200).json({status : "success", data : {tour}})
    } catch (error) {
        res.status(501).json({status : "fail", message : error})

    }
}

const getTourStats = async(req, res) => {
    try {
        const tour = await Tour.aggregate( [
            // Stage 1: Filter pizza order documents by pizza size
            {
               $match: { ratingsAverage:{$gte : 4.5} }
            },
            // Stage 2: Group remaining documents by pizza name and calculate total quantity
            {
               $group: { _id: "$difficulty", num : {$sum :1}}
            }
         ] )
        if(!tour){
            res.status(404).json({status : "Not Found"})
        }
        res.status(200).json({status : "success", data : {tour}})
    } catch (error) {
        res.status(501).json({status : "fail", message : error})

    }
}

const updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {new : true})
        // {new : true} gives you the updated object in return
        if(!tour){
            res.status(404).json({status : "Not Found"})
        }
        res.status(200).json({status : "success", data : {tour}})
        
    } catch (error) {
        res.status(501).json({status : "fail", message : error})
    }
}

const deleteTour = async(req, res) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id)
console.log(tour)
        if(!tour){
            res.status(404).json({status : "Not Found"})
        }
        res.status(200).json({status : "success", data : {tour}})

    } catch (error) {
        res.status(501).json({status : "fail", message : error})
    }
}


module.exports = {getAllTours, createAllTours, getTour, updateTour, deleteTour, checkId, checkBody, getTourStats}