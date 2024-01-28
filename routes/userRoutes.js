const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getMe,
} = require("../controllers/userController");
const { signup, login, protect } = require("../controllers/auth.controller");
const { getOne } = require("../controllers/handleFactory");
const User = require("../models/userModel");

//Routes
router.post("/signup", signup);
router.post("/login", login);
router.route("/").get(getAllUsers).post(createAllUsers);
router.route("/me").get(protect, getMe, getOne(User));
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
// router.param("id", (req, res, next, val) => {
//   console.log(val);
// });
module.exports = router;
