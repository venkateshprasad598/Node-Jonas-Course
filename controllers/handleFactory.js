const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createOneOrMany = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    if (!doc) {
      next(new AppError(`Not found`, 404));
    }
    res.status(200).json({ status: "success", data: { data: doc } });
  });
};

const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // EXECUTE QUERY
    let filter = {};
    if (req.params.id) filter = { tour: req.params.id }; // hack

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    if (!doc) {
      next(new AppError(`Not found`, 404));
    }

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

const getOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    console.log("I did not ran");
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

const deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      res.status(404).json({ status: "Not Found" });
    }
    res.status(200).json({ status: "success", data: { doc } });
  });
};
module.exports = { deleteOne, updateOne, createOneOrMany, getOne, getAll };
