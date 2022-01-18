exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    console.log("ERROR:", err.status, err)
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
}

exports.handleServerErrors = (err, req, res, next) => {
    res.status(500).send({ msg: "Internal server error" });
  }