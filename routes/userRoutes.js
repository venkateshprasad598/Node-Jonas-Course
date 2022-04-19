const express = require("express")
const router = express.Router()

const {getAllUsers, createAllUsers, getUser, updateUser, deleteUser} =require("../controllers/userController")
router.param("id", (req, res, next, val) => {
    console.log(val)
})      
router.route("/").get(getAllUsers).post(createAllUsers)
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser)
module.exports = router