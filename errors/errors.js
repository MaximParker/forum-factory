exports.handleQueryErrors = (err, req, res, next) => {
  if (err.status.code === '22P02') {
    res.status(404).send({ msg: 'Bad Request' });
  }
}

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    console.log("CUSTOM ERROR:", err.status, err)
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
}

exports.handleServerErrors = (err, req, res, next) => {
    res.status(500).send({ msg: "Internal server error" });
  }