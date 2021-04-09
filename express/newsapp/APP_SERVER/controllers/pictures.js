const mongoose = require('mongoose');
// const news = mongoose.model('news');
// const categories = mongoose.model('categories');
// const tags = mongoose.model('tags');
const pictures = mongoose.model('pictures');
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



const aPicturesCreatePage = (req, res, next) => {
  let aPictures = {
      title: '',
      author: '',
      intro: '',
      link: '',
      actived: '',
      publicTime: '',
      insertTIme: '',
      picture: '',
      _id: ''
  }

  // categories.find({actived: true})
  //     .exec((err, categoriesData) => {
  //         aVideos.categories = categoriesData;
  //         tags.find({actived: true})
  //           .exec((err, tagsData) => {
  //               aNews.allTags = tagsData
  //               console.log(aVideos);
                res.render("admin/picturesManagementCreate", {aPictures: aPictures});
      
  
}

const aPicturesCreate = (req, res, next) => {
  if (!req.body.title || !req.body.actived || !req.body.author || !req.body.link || !req.body.intro || !req.body.picture) {
      return res
          .status(400)
          .json({ "code": 400, message: "miss params" });
  }
  pictures.create({
      title: req.body.title,
      actived: req.body.actived,
      author: req.body.author,
      link:req.body.link,
      picture:req.body.picture,
      intro:req.body.intro
      
  }, (err, picturesData) => {
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

const aPicturesPage = (req, res, next) => {
  pictures.find()
      //.populate('categoryId')
      //.populate('tags')
      .exec((err, picturesData) => {
         // console.log(videosData[0].tags);
          res.render('admin/picturesManagement', { title: 'pictures', pictures: picturesData });
      });
}

const usersPicturesPage = (req, res, next) => {
    pictures.find()
            .exec((err, picturesData) =>{
                res.render('pictures', {title: 'pictures', list: picturesData});
            });
  }

const getSinglePictures = (req, res, next) => {
  if (!req.params.pid) {
      res
          .status(404)
          .json({
              "code": 400,
              "message": "Not found, pictureid is required"
          });
      return;
  }
  pictures.findById(req.params.pid)
      .lean()
      .exec((err, picturesData) => {
          if (err) {
              console.log(err);
              return res.status(404).json(err)
          }
          picturesData.actived = String(picturesData.actived);
          // categories.find({actived: true})
          //   .exec((err, categoriesData) => {
          //       videosData.categories = categoriesData;
          //       tags.find({actived: true})
          //           .exec((err, tagsData) => {
          //               videosData.allTags = tagsData;
          //               videosData.priorities = priorities;
          console.log(picturesData);
          res.render("admin/picturesManagementCreate", {aPictures: picturesData});
          
          //res.render("admin/newsManagementCreate", { aNews: newsData });
      });
}

const getUserSinglePictures = (req, res, next) => {
    if (!req.params.pid) {
        res
            .status(404)
            .json({
                "code":400,
                "message": "Not found, picturesID is required"
            });
        return;
    }
    pictures.findById(req.params.pid)
            .lean()
            .exec((err, picturesData) => {
                if (err) {
                    console.log(err);
                    return res.status(404).json(err)
                }
                res.render("picturesDetail", {article: picturesData});
            });
}

const updatePictures = (req, res, next) => {
    if (!req.body.title || !req.body.actived || !req.body.author || !req.body.link || !req.body.intro || !req.body.picture ) {
        return res
            .status(400)
            .json({ "code": 400, message: "miss params" });
    }
    pictures.findById(req.params.pid)
        .exec((err, pictures) => {
            if (!pictures) {
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
            pictures.title = req.body.title,
            pictures.actived=  req.body.actived,
            pictures.author=  req.body.author,
            pictures.link= req.body.link,
            pictures.intro= req.body.intro,
            pictures.picture= req.body.picture,
           //pictures.content= req.body.content
            // news.categoryId= req.body.categoryId,
            // news.tags= req.body.tags,
            // news.priority= req.body.priority,
            //pictures.intro= req.body.intro
            //news.content= req.body.content
            pictures.save((err, aPicturesDate) => {
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

const deletePictures = (req, res, next) => {
  if (!req.params.pid) {
      res
          .status(404)
          .json({
              "code": 400,
              "message": "Not found, bookid is required"
          });
      return;
  }
  pictures
  .findByIdAndRemove(req.params.pid)
  .exec((err, picturesData) => {
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
  aPicturesCreate,
  aPicturesPage,
  aPicturesCreatePage,
  usersPicturesPage,
  getUserSinglePictures,
  getSinglePictures,
  updatePictures,
  deletePictures
}