const mongoose = require('mongoose');
const news = mongoose.model('news');
const categories = mongoose.model('categories');



const aNewsCreatePage = (req, res, next) => {
  let aNews = {
      title: '',
      author: '',
      intro: '',
      link: '',
      content: '',
      picture: '',
      priority: '',
      actived: '',
      categories: '',
      tags: '',
      publicTime: '',
      insertTIme: '',
      _id: ''
  }

  categories.find({actived: 'true'})
      .exec((err, categoriesData) => {
          aNews.categories = categoriesData;
      });
  res.render("admin/newsManagementCreate", {aNews: aNews});
}

const aNewsCreate = (req, res, next) => {
  if (!req.body.name || !req.body.level || !req.body.actived) {
      return res
          .status(400)
          .json({ "code": 400, message: "miss params" });
  }
  news.create({
      name: req.body.name,
      level: req.body.level,
      actived: req.body.actived
  }, (err, newsData) => {
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

const aNewsPage = (req, res, next) => {
  news.find()
      .populate('categoryId')
      .populate('tags')
      .exec((err, newsData) => {
          console.log(newsData[0].tags);
          res.render('admin/newsManagement', { title: 'news', news: newsData });
      });
}

const getSingleNews = (req, res, next) => {
  if (!req.params.cid) {
      res
          .status(404)
          .json({
              "code": 400,
              "message": "Not found, bookid is required"
          });
      return;
  }
  news.findById(req.params.cid)
      .lean()
      .exec((err, newsData) => {
          if (err) {
              console.log(err);
              return res.status(404).json(err)
          }
          newsData.actived = String(newsData.actived);
          console.log(newsData);
          res.render("admin/newsManagementCreate", { aNews: newsData });
      });
}

const updateNews = (req, res, next) => {
  if (!req.body.name || !req.body.level || !req.body.actived) {
      return res
          .status(400)
          .json({ "code": 400, message: "miss params" });
  }
  news.findById(req.params.cid)
      .exec((err, news) => {
          if (!news) {
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
          news.name = req.body.name;
          news.actived = req.body.actived;
          news.level = req.body.level;
          news.save((err, aNewsDate) => {
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

const deleteNews = (req, res, next) => {
  if (!req.params.cid) {
      res
          .status(404)
          .json({
              "code": 400,
              "message": "Not found, bookid is required"
          });
      return;
  }
  news
  .findByIdAndRemove(req.params.cid)
  .exec((err, newsData) => {
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
  aNewsCreate,
  aNewsPage,
  aNewsCreatePage,
  getSingleNews,
  updateNews,
  deleteNews
}