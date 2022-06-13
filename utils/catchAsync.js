module.exports = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
      // OR For catch we can write it has catch(err => next(err))
    };
  };