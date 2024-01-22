const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      res.status(404).json({ status: "Not Found" });
    }
    res.status(200).json({ status: "success", data: { doc } });
  });
};

const updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // {new : true} gives you the updated object in return
    if (!doc) {
      res.status(404).json({ status: "Not Found" });
    }
    res.status(200).json({ status: "success", data: { data: doc } });
  });
};

const createOneOrMany = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    if (!doc) {
      next(new AppError(`Not found`, 404));
    }
    res.status(200).json({ status: "success", data: { data: doc } });
  });
};

const getOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id); // Tour.findOne({ _id: req.params.id })
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
};

module.exports = { deleteOne, updateOne, createOneOrMany, getOne };
