const mongoose = require('mongoose');
const tags = mongoose.model('tags');


const tagCreatePage = (req, res, next) => {
  let tag = {
      name: '',
      actived: '',
      _id: ''
  }
  res.render("admin/tagsManagementCreate", {tag: tag});
}

const tagCreate = (req, res, next) => {
  if (!req.body.name || !req.body.actived) {
      return res
          .status(400)
          .json({ "code": 400, message: "miss params" });
  }
  tags.create({
      name: req.body.name,
      actived: req.body.actived
  }, (err, tagsData) => {
      if (err) {
          res
              .status(400)
              .json({ "code": 400, "message": err });
      } else {
          res
              .status(201)
              .json({ "code": 200, "message": "create successfully" });
      }
  });
}

const tagPage = (req, res, next) => {
    tags.count({}, function(err, count) {
        tags.find()
        .skip((req.params.page - 1) * 5)
        .limit(5)
        .exec((err, tagsData) => {
            maxPage = Math.ceil(count / 5);
            res.render('admin/tagsManagement', { title: 'tags', tags: tagsData, maxPage: maxPage });
        });
    });
  
}

const getSingleTag = (req, res, next) => {
  if (!req.params.tid) {
      res
          .status(404)
          .json({
              "code": 400,
              "message": "Not found, bookid is required"
          });
      return;
  }
  tags.findById(req.params.tid)
      .lean()
      .exec((err, tagsData) => {
          if (err) {
              console.log(err);
              return res.status(404).json(err)
          }
          tagsData.actived = String(tagsData.actived);
          console.log(tagsData);
          res.render("admin/tagsManagementCreate", { tag: tagsData });
      });
}

const updateTag = (req, res, next) => {
  if (!req.body.name || !req.body.actived) {
      return res
          .status(400)
          .json({ "code": 400, message: "miss params" });
  }
  tags.findById(req.params.tid)
      .exec((err, tags) => {
          if (!tags) {
              res
                  .status(404)
                  .json({
                      "code": 400,
                      "message": "tid not found"
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
          tags.name = req.body.name;
          tags.actived = req.body.actived;
          tags.save((err, tagDate) => {
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

const deleteTag = (req, res, next) => {
  if (!req.params.tid) {
      res
          .status(404)
          .json({
              "code": 400,
              "message": "Not found, bookid is required"
          });
      return;
  }
  tags
  .findByIdAndRemove(req.params.tid)
  .exec((err, tagsData) => {
      if (err) {
          res
          .status(404)
          .json({
              "code": 400,
              "message": err
          });
          return;
      }
      res
      .status(200)
      .json({
          "code": 200,
          "message" : "delete successfully"
      });
  });


}

module.exports = {
  tagCreate,
  tagPage,
  tagCreatePage,
  getSingleTag,
  updateTag,
  deleteTag
}