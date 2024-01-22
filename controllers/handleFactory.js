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

module.exports = { deleteOne };
