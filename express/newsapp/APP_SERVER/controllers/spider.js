const mongoose = require('mongoose');
const spiders = mongoose.model('spiders');
const categories = mongoose.model('categories');
var path = require('path');
const { exec } = require('child_process');
const cron = require('node-cron');
const { Console } = require('console');
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
    categories.find({ actived: true })
        .exec((err, categoriesData) => {
            spider.categories = categoriesData;
            res.render("admin/spiderManagementCreate", { spider: spider });
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
            //   if (req.body.actived) {
            //     let i = scheduleSpider(spidersData._id, req.body.startTime, req.body.frequency);
            //     i.start();
            //   }

            if (!allTask.hasOwnProperty(spidersData.name)) {
                allTask[spidersData.name] = scheduleSpider(spidersData._id, spidersData.frequency);
                console.log(allTask);

            }

            if (spidersData.active == true) {
                let reqDate = new Date(req.body.startTime);
                let currentDate = new Date();
                
                if (reqDate > currentDate) {
                    console.log("big");
                    let aTime = reqDate.getTime() - currentDate.getTime();
                    setTimeout(() => {
                        allTask[spidersData.name].start();
                    }, aTime)
                } else {
                    console.log("small");
                }

            } else {
                allTask[spidersData.name].stop();
            }

            res
                .status(201)
                .json({ "code": 200, "message": "create successfully" });
        }
    });
}

const scheduleSpider = (pid, frequency) => {
    let planTime = '* * * * *';
    if (frequency >= 1440) {
        d = Math.floor(frequency / 1440); // 60*24
        h = Math.floor((frequency - (d * 1440)) / 60);
        m = Math.round(frequency % 60);
        if (h == 0) {
            h = ""
        } else {
            h = "/" + h;
        }
        if (m == 0) {
            m = ""
        } else {
            m = "/" + m;
        }
        planTime = `*${m} *${h} */${d} * *`;
    } else if (frequency >= 60 && frequency < 1440) {
        h = Math.floor(frequency / 60);
        m = Math.round(frequency % 60);
        if (m == 0) {
            m = ""
        } else {
            m = "/" + m;
        }
        planTime = `*${m} */${h} * * *`;
    } else if (frequency < 60) {
        m = frequency;
        planTime = `*/${m} * * * *`;
    }
    // console.log(d);
    // console.log(h);
    // console.log(m);
    // return 0;
    console.log("plan is setting!");
    console.log(planTime);
    return cron.schedule(planTime, () => {
        console.log(pid + " is running!");
        exec('cd ' + path.join(process.cwd(), "spider", "tutorial", "tutorial") + '&& scrapy crawl voa -a id=' + pid, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }, {
        scheduled: false
    });
};

const spiderPage = (req, res, next) => {
    categories.count({}, function (err, count) {
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
            categories.find({ actived: true })
                .exec((err, categoriesData) => {
                    spidersData.categories = categoriesData;
                    spidersData.date = spidersData.startTime.toISOString().substr(0, 16);
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
            console.log(req.body.startTime + ":00.000+00:00");
            spiders.name = req.body.name;
            spiders.active = req.body.actived;
            spiders.startTime = req.body.startTime + ":00.000+00:00";
            spiders.targetName = req.body.targetName;
            spiders.frequency = req.body.frequency;
            spiders.categoryId = req.body.categoryId;
            spiders.start_url = req.body.start_url;
            spiders.linksSelector = req.body.linksSelector;
            spiders.titleSelector = req.body.titleSelector;
            spiders.pictureSelector = req.body.pictureSelector;
            spiders.publicTimeSelector = req.body.publicTimeSelector;
            spiders.authorSelector = req.body.authorSelector;
            spiders.contentSelector = req.body.contentSelector;
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
                        allTask[spiders.name] = scheduleSpider(spiderDate._id, req.body.frequency);
                        console.log(allTask);

                    }

                    if (spiders.active == true) {
                        let reqDate = new Date(req.body.startTime);
                        let currentDate = new Date();
                        console.log("-------------------");
                        console.log(reqDate.getTime());
                        console.log(currentDate.getTime());
                        if (reqDate > currentDate) {
                            console.log("big");
                            let aTime = reqDate.getTime() - currentDate.getTime();
                            let newTime = reqDate - currentDate;
                            console.log(aTime);
                            console.log(newTime);
                            setTimeout(() => {
                                allTask[spiders.name].start();
                            }, aTime)
                        } else {
                            console.log("small");
                        }

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
            if (allTask.hasOwnProperty(spiders.name)) {
                allTask[spidersData.name].stop();
                delete allTask[spidersData.name];
            }

            res
                .status(200)
                .json({
                    "code": 200,
                    "message": "delete successfully"
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
    console.log('cd "' + path.join(process.cwd(), "spider", "tutorial", "tutorial") + '"; scrapy crawl voa -a id=' + req.params.sid);
    exec('cd ' + path.join(process.cwd(), "spider", "tutorial", "tutorial") + '&& scrapy crawl voa -a id=' + req.params.sid, (err, stdout, stderr) => {
        if (err) {
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