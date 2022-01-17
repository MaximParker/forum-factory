const { selectAllTopics } = require("../models/topics.models");

exports.getTopics = (req, res, next) => {
  console.log("## CONTROLLER");
  selectAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};
