exports.handleQueryErrors = (err, req, res, next) => {
  if (err.code) {
    if (err.code === "22P02" || err.code === "23502") {
      res.status(400).send({ msg: "Bad Request" });
    }
    if (err.code === "23503") {
      res.status(404).send({ msg: "Not Found" });
    }
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
};
