const User = require("../models/userModel")
const catchAsync =require("../utils/catchAsync")

const getAllUsers = catchAsync(async(req, res) => {
    const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });

})

const createAllUsers = async(req, res) => {
    try {
        res.status(200).json("Hello Made It")
    } catch (error) {
        console.log(error)
    }
}

const getUser = async(req, res) => {
    try {
        res.status(200).json("Hello Made It")
    } catch (error) {
        console.log(error)
    }
}
const updateUser = async(req, res) => {
    try {
        res.status(200).json("Hello Made It")
    } catch (error) {
        console.log(error)
    }
}
const deleteUser = async(req, res) => {
    try {
        res.status(200).json("Hello Made It")
    } catch (error) {
        console.log(error)
    }
}


module.exports = {getAllUsers, createAllUsers, getUser, updateUser, deleteUser}