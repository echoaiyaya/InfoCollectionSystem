const mongoose = require('mongoose');
const categories = mongoose.model('categories');


const categoryCreatePage = (req, res, next) => {
  let category = {
      name: '',
      level: '',
      actived: '',
      _id: ''
  }
  res.render("admin/cateManagementCreate", {category: category});
}

const categoryCreate = (req, res, next) => {
  if (!req.body.name || !req.body.level || !req.body.actived) {
      return res
          .status(400)
          .json({ "code": 400, message: "miss params" });
  }
  categories.create({
      name: req.body.name,
      level: req.body.level,
      actived: req.body.actived
  }, (err, categoriesData) => {
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

const categoryPage = (req, res, next) => {
    categories.count({}, function(err, count) {
        categories.find()
        .skip((req.params.page - 1) * 5)
        .limit(5)
        .exec((err, categoriesData) => {
            maxPage = Math.ceil(count / 5);
            res.render('admin/cateManagement', { title: 'categories', categories: categoriesData, maxPage: maxPage });
        });
    });
  
}

const getSingleCate = (req, res, next) => {
  if (!req.params.cid) {
      res
          .status(404)
          .json({
              "code": 400,
              "message": "Not found, bookid is required"
          });
      return;
  }
  categories.findById(req.params.cid)
      .lean()
      .exec((err, categoriesData) => {
          if (err) {
              console.log(err);
              return res.status(404).json(err)
          }
          categoriesData.actived = String(categoriesData.actived);
          console.log(categoriesData);
          res.render("admin/cateManagementCreate", { category: categoriesData });
      });
}

const updateCate = (req, res, next) => {
  if (!req.body.name || !req.body.level || !req.body.actived) {
      return res
          .status(400)
          .json({ "code": 400, message: "miss params" });
  }
  categories.findById(req.params.cid)
      .exec((err, categories) => {
          if (!categories) {
              res
                  .status(404)
                  .json({
                      "code": 400,
                      "message": "cid not found"
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
          categories.name = req.body.name;
          categories.actived = req.body.actived;
          categories.level = req.body.level;
          categories.save((err, categoryDate) => {
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

const deleteCate = (req, res, next) => {
  if (!req.params.cid) {
      res
          .status(404)
          .json({
              "code": 400,
              "message": "Not found, bookid is required"
          });
      return;
  }
  categories
  .findByIdAndRemove(req.params.cid)
  .exec((err, categoriesData) => {
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
  categoryCreate,
  categoryPage,
  categoryCreatePage,
  getSingleCate,
  updateCate,
  deleteCate
}