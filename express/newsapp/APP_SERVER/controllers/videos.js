const mongoose = require('mongoose');
// const news = mongoose.model('news');
// const categories = mongoose.model('categories');
// const tags = mongoose.model('tags');
const videos = mongoose.model('videos');
//var videos = require('../models/videos.js');
// const priorities =  [
//     {
//     value:4,
//     name: 'regular'
//     },
//     {
//     value:0,
//     name: 'Carousel'
//     },
//     {
//     value:1,
//     name: 'headline'
//     },
//     {
//     value:2,
//     name: 'speical'
//     },
//     {
//     value:3,
//     name: 'home page'
//     },
      
//   ];



const aVideosCreatePage = (req, res, next) => {
  let aVideos = {
      title: '',
      author: '',
      intro: '',
      link: '',
      content: '',
      actived: '',
      publicTime: '',
      insertTIme: '',
      _id: ''
  }

  // categories.find({actived: true})
  //     .exec((err, categoriesData) => {
  //         aVideos.categories = categoriesData;
  //         tags.find({actived: true})
  //           .exec((err, tagsData) => {
  //               aNews.allTags = tagsData
  //               console.log(aVideos);
                res.render("admin/videosManagementCreate", {aVideos: aVideos});
      
  
}

const aVideosCreate = (req, res, next) => {
  if (!req.body.title || !req.body.actived || !req.body.author || !req.body.link || !req.body.intro ) {
      return res
          .status(400)
          .json({ "code": 400, message: "miss params" });
  }
  videos.create({
      title: req.body.title,
      actived: req.body.actived,
      author: req.body.author,
      link:req.body.link,
      intro:req.body.intro
  }, (err, videosData) => {
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

const aVideosPage = (req, res, next) => {
  videos.find()
      //.populate('categoryId')
      //.populate('tags')
      .exec((err, videosData) => {
         // console.log(videosData[0].tags);
          res.render('admin/videosManagement', { title: 'videos', videos: videosData });
      });
}

const getSingleVideos = (req, res, next) => {
  if (!req.params.nid) {
      res
          .status(404)
          .json({
              "code": 400,
              "message": "Not found, bookid is required"
          });
      return;
  }
  videos.findById(req.params.vid)
      .lean()
      .exec((err, videosData) => {
          if (err) {
              console.log(err);
              return res.status(404).json(err)
          }
          videosData.actived = String(videosData.actived);
          // categories.find({actived: true})
          //   .exec((err, categoriesData) => {
          //       videosData.categories = categoriesData;
          //       tags.find({actived: true})
          //           .exec((err, tagsData) => {
          //               videosData.allTags = tagsData;
          //               videosData.priorities = priorities;
          console.log(videosData);
          res.render("admin/videosManagementCreate", {aVideos: videosData});
          
          //res.render("admin/newsManagementCreate", { aNews: newsData });
      });
}

const updateVideos = (req, res, next) => {
    if (!req.body.title || !req.body.actived || !req.body.author || !req.body.link || !req.body.intro) {
        return res
            .status(400)
            .json({ "code": 400, message: "miss params" });
    }
    videos.findById(req.params.vid)
        .exec((err, videos) => {
            if (!videos) {
                res
                    .status(404)
                    .json({
                        "code": 400,
                        "message": "vid not found"
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
            videos.title = req.body.title,
            videos.actived=  req.body.actived,
            videos.author=  req.body.author,
            videos.link= req.body.link,
            // news.categoryId= req.body.categoryId,
            // news.tags= req.body.tags,
            // news.priority= req.body.priority,
            videos.intro= req.body.intro;
            //news.content= req.body.content
            videos.save((err, aVideosDate) => {
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

const deleteVideos = (req, res, next) => {
  if (!req.params.vid) {
      res
          .status(404)
          .json({
              "code": 400,
              "message": "Not found, bookid is required"
          });
      return;
  }
  videos
  .findByIdAndRemove(req.params.vid)
  .exec((err, videosData) => {
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
  aVideosCreate,
  aVideosPage,
  aVideosCreatePage,
  getSingleVideos,
  updateVideos,
  deleteVideos
}