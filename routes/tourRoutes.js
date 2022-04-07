const express = require("express")
const router = express.Router()
const {getAllTours, createAllTours, getTour,updateTour, deleteTour } = require("../controllers/tourControllers")

router.route("/").get(getAllTours).post(createAllTours)
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour)

module.exports = router
