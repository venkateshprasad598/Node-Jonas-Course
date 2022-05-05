const { findByIdAndUpdate } = require("../models/tourModel")
const Tours = require("../models/tourModel")

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
        const tour = await Tours.find()
        if(!tour){
            res.status(404).json({status : "Not Found"})
        }
        res.status(200).json({status : "success", data : {tour}})
    } catch (error) {
        res.status(501).json({status : "fail", message : error})
    }
}

const createAllTours = async(req, res) => {
    try {
        const tour = await Tours.create(req.body)
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
        const tour = await Tours.findById(req.params.id)
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
        const tour = await Tours.aggregate( [
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
        const tour = await Tours.findByIdAndUpdate(req.params.id, req.body, {new : true})
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
        const tour = await Tours.findByIdAndDelete(req.params.id)
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