const mongoose = require('mongoose');
const spiders = mongoose.model('spiders');
const categories = mongoose.model('categories');
var path = require('path');
const { exec } = require('child_process');
const cron = require('node-cron');
const allTask = {};

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
      limit: 0,
      type: ''

  }
  categories.find({actived: true})
            .exec((err, categoriesData) => {
              spider.categories = categoriesData;
              res.render("admin/spiderManagementCreate", {spider: spider});
            });
  
}

const spiderCreate = (req, res, next) => {
  if (!req.body.name || !req.body.actived) {
      return res
          .status(400)
          .json({ "code": 400, message: "miss params" });
  }
  spiders.create({
      name: req.body.name,
      active: req.body.actived,
      startTime: req.body.startTime,
      targetName: req.body.targetName,
      frequency: req.body.frequency,
      categoryId: req.body.categoryId,
      start_url: req.body.start_url,
      linksSelector: req.body.linksSelector,
      titleSelector: req.body.titleSelector,
      pictureSelector: req.body.pictureSelector,
      publicTimeSelector: req.body.publicTimeSelector,
      authorSelector: req.body.authorSelector,
      contentSelector: req.body.contentSelector,
      limit: req.body.limit,
      type: req.body.type
  }, (err, spidersData) => {
      if (err) {
          res
              .status(400)
              .json({ "code": 400, "message": err });
      } else {
          let i = scheduleSpider();
          i.start();
          res
              .status(201)
              .json({ "code": 200, "message": "create successfully" });
      }
  });
}

const scheduleSpider = (params) => {
    return cron.schedule('0,10,20,30,40,50 * * * * *', () => {
        console.log(params + " is running!");
    }, {
        scheduled: false
    });
};

const spiderPage = (req, res, next) => {
    categories.count({}, function(err, count) {
        spiders.find()
        .skip((req.params.page - 1) * 5)
        .limit(5)
        .exec((err, spidersData) => {
            maxPage = Math.ceil(count / 5);
            spidersDataFill = spidersData.map((v) => {
                v.newStartTime = v.startTime.toISOString();
                return v;
            });
            res.render('admin/spiderManagement', { title: 'spiders', spiders: spidersDataFill, maxPage: maxPage });
        });
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
              console.log(spidersData);
              res.render("admin/spiderManagementCreate", { spider: spidersData });
            });
          
      });
}

const updateSpider = (req, res, next) => {
  if (!req.body.name || !req.body.actived) {
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
            spiders.name = req.body.name;
            spiders.active = req.body.actived;
            spiders.startTime = req.body.startTime;
            spiders.targetName = req.body.targetName;
            spiders.frequency = req.body.frequency;
            spiders.categoryId = req.body.categoryId;
            spiders.start_url = req.body.start_url;
            spiders.linksSelector = req.body.linksSelector;
            spiders.titleSelector = req.body.titleSelector;
            spiders.pictureSelector =req.body.pictureSelector;
            spiders.publicTimeSelector = req.body.publicTimeSelector;
            spiders.authorSelector = req.body.authorSelector;
            spiders.contentSelector =req.body.contentSelector;
            spiders.limit = req.body.limit;
            spiders.type = req.body.type;
          spiders.save((err, spiderDate) => {
              if (err) {
                  res
                      .status(404)
                      .json({
                          "code": 400,
                          "message": err
                      });
              } else {
                if (!allTask.hasOwnProperty(spiders.name)) {
                    allTask[spiders.name] = scheduleSpider(req.body.name　+ "");
                }
                if (spiders.active == true) {
                    allTask[spiders.name].start();  
                } else {
                    allTask[spiders.name].stop(); 
                }
                
                
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
  console.log(req.params.sid);
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