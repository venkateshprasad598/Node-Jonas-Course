const Tours = require("../models/Tours")

const checkId =(req, res, next, val) => {
    console.log(`The tour val is ${val}`)
    if(req.params.id > 5){
        return res.status(404).send({status : "Invalid Id"})
    }
    res.status(200).send({status : "Id is Present"})
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
        res.status(200).json("Hello Made It")
    } catch (error) {
        console.log(error)
    }
}
const createAllTours = async(req, res) => {
    try {
        const Tour = await Tours.create(req.body)
        console.log(Tour, "Hello")
        res.status(200).json("Hello Made It")
    } catch (error) {
        console.log(error)
    }
}
const getTour = async(req, res) => {
    try {
        res.status(200).json("Hello Made It")
    } catch (error) {
        console.log(error)
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