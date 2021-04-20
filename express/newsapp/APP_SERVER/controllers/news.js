const mongoose = require('mongoose');
const news = mongoose.model('news');
const categories = mongoose.model('categories');
const tags = mongoose.model('tags');
const priorities =  [
    {
    value:4,
    name: 'regular'
    },
    {
    value:0,
    name: 'Carousel'
    },
    {
    value:1,
    name: 'headline'
    },
    {
    value:2,
    name: 'speical'
    },
    {
    value:3,
    name: 'home page'
    },
      
  ];



const aNewsCreatePage = (req, res, next) => {
  let aNews = {
      title: '',
      author: '',
      intro: '',
      link: '',
      content: '',
      picture: '',
      priority: '',
      priorities: priorities,
      actived: '',
      categoryId: '',
      tags: '',
      publicTime: '',
      insertTIme: '',
      _id: ''
  }

  categories.find({actived: true})
      .exec((err, categoriesData) => {
          aNews.categories = categoriesData;
          tags.find({actived: true})
            .exec((err, tagsData) => {
                aNews.allTags = tagsData
                console.log(aNews);
                res.render("admin/newsManagementCreate", {aNews: aNews});
            });
      });
  
  
  
}

const aNewsCreate = (req, res, next) => {
  if (!req.body.title || !req.body.actived || !req.body.author || !req.body.link || !req.body.categoryId || !req.body.tags|| !req.body.priority || !req.body.intro || !req.body.content) {
      return res
          .status(400)
          .json({ "code": 400, message: "miss params" });
  }
  news.create({
      title: req.body.title,
      actived: req.body.actived,
      author: req.body.author,
      link:req.body.link,
      categoryId:req.body.categoryId,
      tags:req.body.tags,
      priority:req.body.priority,
      intro:req.body.intro,
      content:req.body.content
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

  news.count({}, (err, num) => {
    news.find()
      .skip((req.params.page-1) * 5)
      .limit(5)
      .populate('categoryId')
      .populate('tags')
      .exec((err, newsData) => {
          //console.log(newsData);
          maxPage = Math.ceil(num / 5);
          res.render('admin/newsManagement', { title: 'news', news: newsData, maxPage: maxPage });
      });
  });
  
}

const usersNewsPage = (req, res, next) => {
    news.count({}, (err, num) => {
        news.find()
        .skip((req.params.page-1) * 5)
        .limit(5)
        .populate('categoryId')
        .populate('tags')
        .exec((err, newsData) => {
            console.log(newsData[0].tags);
            maxPage = Math.ceil(num / 5);
            res.render('news', { title: 'news', list: newsData, maxPage: maxPage });
        });
    });
    
  }

const getSingleNews = (req, res, next) => {
  if (!req.params.nid) {
      res
          .status(404)
          .json({
              "code": 400,
              "message": "Not found, newsId is required"
          });
      return;
  }
  news.findById(req.params.nid)
      .lean()
      .exec((err, newsData) => {
          if (err) {
              console.log(err);
              return res.status(404).json(err)
          }
          categories.find({actived: true})
            .exec((err, categoriesData) => {
                newsData.categories = categoriesData;
                tags.find({actived: true})
                    .exec((err, tagsData) => {
                        newsData.allTags = tagsData;
                        newsData.priorities = priorities;
                        console.log(newsData);
                        res.render("admin/newsManagementCreate", {aNews: newsData});
                    });
            });
          //res.render("admin/newsManagementCreate", { aNews: newsData });
      });
}


const getUserSingleNews = (req, res, next) => {
    if (!req.params.nid) {
        res
            .status(404)
            .json({
                "code": 400,
                "message": "Not found, newsId is required"
            });
        return;
    }
    news.findById(req.params.nid)
        .lean()
        .exec((err, newsData) => {
            if (err) {
                console.log(err);
                return res.status(404).json(err)
            }
            categories.find({actived: true})
              .exec((err, categoriesData) => {
                  newsData.categories = categoriesData;
                  tags.find({actived: true})
                      .exec((err, tagsData) => {
                          newsData.allTags = tagsData;
                          newsData.priorities = priorities;
                          console.log(newsData);
                          res.render("newsDetail", {article: newsData});
                      });
              });
            //res.render("admin/newsManagementCreate", { aNews: newsData });
        });
  }

const updateNews = (req, res, next) => {
    if (!req.body.title || !req.body.actived || !req.body.author || !req.body.link || !req.body.categoryId || !req.body.tags|| !req.body.priority || !req.body.intro || !req.body.content) {
        return res
            .status(400)
            .json({ "code": 400, message: "miss params" });
    }
    news.findById(req.params.nid)
        .exec((err, news) => {
            if (!news) {
                res
                    .status(404)
                    .json({
                        "code": 400,
                        "message": "nid not found"
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
            news.title = req.body.title,
            news.actived=  req.body.actived,
            news.author=  req.body.author,
            news.link= req.body.link,
            news.categoryId= req.body.categoryId,
            news.tags= req.body.tags,
            news.priority= req.body.priority,
            news.intro= req.body.intro,
            news.content= req.body.content
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
  if (!req.params.nid) {
      res
          .status(404)
          .json({
              "code": 400,
              "message": "Not found, bookid is required"
          });
      return;
  }
  news
  .findByIdAndRemove(req.params.nid)
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
  deleteNews,
  usersNewsPage,
  getUserSingleNews
}