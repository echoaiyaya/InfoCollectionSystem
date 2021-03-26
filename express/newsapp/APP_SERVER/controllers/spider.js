const mongoose = require('mongoose');
const spiders = mongoose.model('spiders');
const categories = mongoose.model('categories');
var path = require('path');
const { exec } = require('child_process');

const spiderCreatePage = (req, res, next) => {
  let spider = {
      name: '',
      active: '',
      hasActive: 'false',
      startTime: '',
      _id: '',
      categoryId: '',
      frequency: '',
      start_url: '',
      linksSelector: '',
      titleSelector: '',
      pictureSelector: '',
      publicTimeSelector: '',
      authorSelector: '',
      contentSelector: '',
      limit: 0

  }
  categories.find({actived: true})
            .exec((err, categoriesData) => {
              spider.categories = categoriesData;
              res.render("admin/spiderManagementCreate", {spider: spider});
            });
  
}

const spiderCreate = (req, res, next) => {
  if (!req.body.name || !req.body.level || !req.body.actived) {
      return res
          .status(400)
          .json({ "code": 400, message: "miss params" });
  }
  spiders.create({
      name: res.body.name,
      active: res.body.active,
      startTime: res.body.startTime,
      frequency: res.body.frequency,
      start_url: res.body.start_url,
      linksSelector: res.body.linksSelector,
      titleSelector: res.body.titleSelector,
      pictureSelector: res.body.pictureSelector,
      publicTimeSelector: res.body.publicTimeSelector,
      authorSelector: res.body.authorSelector,
      contentSelector: res.body.contentSelector,
      limit: res.body.limit
  }, (err, spidersData) => {
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

const spiderPage = (req, res, next) => {
  spiders.find()
      .exec((err, spidersData) => {
          res.render('admin/spiderManagement', { title: 'spiders', spiders: spidersData });
      });
}

const getSingleSpider = (req, res, next) => {
  if (!req.params.sid) {
      res
          .status(404)
          .json({
              "code": 400,
              "message": "Not found, bookid is required"
          });
      return;
  }
  spiders.findById(req.params.sid)
      .lean()
      .exec((err, spidersData) => {
          if (err) {
              console.log(err);
              return res.status(404).json(err)
          }
          categories.find({actived: true})
            .exec((err, categoriesData) => {
              spidersData.categories = categoriesData;
              spidersData.date = spidersData.startTime.toISOString().substr(0,16);
              spidersData.hasActive = 'true';
              
              res.render("admin/spiderManagementCreate", { spider: spidersData });
            });
          
      });
}

const updateSpider = (req, res, next) => {
  if (!req.body.name || !req.body.level || !req.body.actived) {
      return res
          .status(400)
          .json({ "code": 400, message: "miss params" });
  }
  spiders.findById(req.params.sid)
      .exec((err, spiders) => {
          if (!spiders) {
              res
                  .status(404)
                  .json({
                      "code": 400,
                      "message": "sid not found"
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
          spiders.name = res.body.name;
          spiders.active = res.body.active;
          spiders.startTime = res.body.startTime;
          spiders.frequency = res.body.frequency;
          spiders.start_url = res.body.start_url;
          spiders.linksSelector = res.body.linksSelector;
          spiders.titleSelector = res.body.titleSelector;
          spiders.pictureSelector = res.body.pictureSelector;
          spiders.publicTimeSelector = res.body.publicTimeSelector;
          spiders.authorSelector = res.body.authorSelector;
          spiders.contentSelector = res.body.contentSelector;
          spiders.limit = res.body.limit;
          spiders.save((err, spiderDate) => {
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

const deleteSpider = (req, res, next) => {
  if (!req.params.sid) {
      res
          .status(404)
          .json({
              "code": 400,
              "message": "Not found, bookid is required"
          });
      return;
  }
  spiders
  .findByIdAndRemove(req.params.sid)
  .exec((err, spidersData) => {
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

const runSpider = (req, res, next) => {
  if (!req.params.sid) {
      res
          .status(404)
          .json({
              "code": 400,
              "message": "Not found, bookid is required"
          });
      return;
  }
  console.log('cd "'+ path.join(process.cwd(),"spider","tutorial","tutorial") +'"; scrapy crawl voa -a id=' + req.params.sid);
  exec('cd '+ path.join(process.cwd(),"spider", "tutorial", "tutorial") +'&& scrapy crawl voa -a id=' + req.params.sid, (err, stdout, stderr) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
  res
  .status(404)
  .json({
      "code": 400,
      "message": err
  });
  return;

}

module.exports = {
  spiderCreate,
  spiderPage,
  spiderCreatePage,
  getSingleSpider,
  updateSpider,
  deleteSpider,
  runSpider
}