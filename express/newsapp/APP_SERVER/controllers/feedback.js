const mongoose = require('mongoose');
const feedback = mongoose.model('feedback');

const feedbackCreate = (req, res, next) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.comment) {
    return res
      .status(400)
      .json({ "code": 400, message: "miss params" });
  }
  feedback.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    comment: req.body.comment
  }, (err, fbData) => {
    if (err) {
      res
        .status(400)
        .json({ "code": 400, "message": err });
    } else {
      res
        .status(201)
        .json({ "code": 200, "message": "submit successfully, thanks for your feedback!" });
    }
  });
}

const feedbackPage = (req, res, next) => {
  feedback.count({}, function(err, count) {
    feedback.find()
      .skip((req.params.page - 1) * 5)
      .limit(5)
      .sort('-insertTime')
      .exec((err, fbData) => {
          maxPage = Math.ceil(count / 5);
          res.render('admin/feedbackManagement', { title: 'feedback', feedbacks: fbData, maxPage: maxPage });
      });
  });
}

const updateFeedback = (req, res, next) => {
  feedback.findById(req.params.fid)
      .exec((err, fbData) => {
          if (!fbData) {
              res
                  .status(404)
                  .json({
                      "code": 400,
                      "message": "fid not found"
                  });
              return;
          } else if (err) {
              res
                  .status(400)
                  .json({
                      "code": 400,
                      "message": err
                  });
              return;
          }
          fbData.status = true;
          fbData.save((err, fbDate) => {
              if (err) {
                  res
                      .status(404)
                      .json({
                          "code": 400,
                          "message": err
                      });
              } else {
                  res
                      .status(200)
                      .json({
                          "code": 200,
                          "message": "update successfully"
                      })
              }
          });

      });
}
module.exports = {
  feedbackCreate,
  feedbackPage,
  updateFeedback  
}