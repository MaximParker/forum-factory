exports.handleQueryErrors = (err, req, res, next) => {
  if (err.code) {
    console.log("QUERY ERROR CODE:", err.code)
    if (err.code === '22P02' || err.code === "23502")
    res.status(400).send({ msg: 'Bad Request' });
  } else {
    next(err);
  }
}

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
}

exports.handleServerErrors = (err, req, res, next) => {
    res.status(500).send({ msg: "Internal server error" });
  }