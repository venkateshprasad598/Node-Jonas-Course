const express = require("express")

const router = express.Router()
const {getAllTours, createAllTours, getTour,updateTour, deleteTour, checkId, checkBody} = require("../controllers/tourControllers")
router.param("id", checkId)

router.route("/").get(getAllTours).post(checkBody,createAllTours)
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour)

module.exports = router