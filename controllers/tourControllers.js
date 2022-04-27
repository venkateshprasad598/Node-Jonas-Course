const Tours = require("../models/tourModel")

const checkId =(req, res, next, val) => {
    console.log(`The tour val is ${val}`)
    if(req.params.id > 5){
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
const updateTour = async(req, res) => {
    try {
        res.status(200).json("Hello Made It")
    } catch (error) {
        console.log(error)
    }
}
const deleteTour = async(req, res) => {
    try {
        res.status(200).json("Hello Made It")
    } catch (error) {
        console.log(error)
    }
}


module.exports = {getAllTours, createAllTours, getTour, updateTour, deleteTour, checkId, checkBody}