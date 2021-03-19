const mongoose = require('mongoose');
const videos = mongoose.model('videos');

const aVideosCreatePage = (req, res, next) => {
  let aVideos = {
      title: '',
      author: '',
      intro: '',
      link: '',
      picture: '',
      actived: '',
      publicTime: '',
      insertTIme: '',
      _id: ''
  }
  res.render("admin/videosManagementCreate", {aVideos: aVideos}); 
}

const aVideosCreate = (req, res, next) => {
  if (!req.body.title || !req.body.actived || !req.body.author || !req.body.link || !req.body.intro || !req.body.picture ) {
      return res
          .status(400)
          .json({ "code": 400, message: "miss params" });
  }
  videos.create({
      title: req.body.title,
      actived: req.body.actived,
      author: req.body.author,
      link: req.body.link,
      picture: req.body.picture,
      intro: req.body.intro
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
  if (!req.params.vid) {
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
          console.log(videosData);
          res.render("admin/videosManagementCreate", {aVideos: videosData});
      });
}

const updateVideos = (req, res, next) => {
    if (!req.body.title || !req.body.actived || !req.body.author || !req.body.link || !req.body.picture || !req.body.intro) {
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
            videos.picture= req.body.picture,            
            videos.intro= req.body.intro
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