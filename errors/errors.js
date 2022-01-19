exports.handleQueryErrors = (err, req, res, next) => {
  if (err.code) {
    console.log("handleQueryErrors:", err.code, err);
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
    console.log("ChandleCustomErrors:", err.code, err);
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log("handleServerErrors", err);
  res.status(500).send({ msg: "Internal server error" });
};
