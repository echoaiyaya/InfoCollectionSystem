const mongoose = require('mongoose');
// const news = mongoose.model('news');
const categories = mongoose.model('categories');
const tags = mongoose.model('tags');
const pictures = mongoose.model('pictures');
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
        active: '',
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
    res.render("admin/picturesManagementCreate", { aPictures: aPictures });


}

const aPicturesCreate = (req, res, next) => {
    if (!req.body.title || !req.body.actived || !req.body.author || !req.body.link || !req.body.intro || !req.body.picture) {
        return res
            .status(400)
            .json({ "code": 400, message: "miss params" });
    }
    pictures.create({
        title: req.body.title,
        active: req.body.actived,
        author: req.body.author,
        link: req.body.link,
        intro: req.body.intro,
        picture: req.body.picutre
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
    pictures.count({}, function (err, count) {
        pictures.find()
            //.populate('categoryId')
            //.populate('tags')
            .skip((req.params.page - 1) * 5)
            .limit(5)
            .exec((err, picturesData) => {
                // console.log(videosData[0].tags);
                maxPage = Math.ceil(count / 5);
                res.render('admin/picturesManagement', { title: 'pictures', pictures: picturesData, maxPage: maxPage });
            });
    });

}

const usersPicturesPage = (req, res, next) => {
    pictures.count({}, (err, num) => {
        pictures.find()
        .skip((req.params.page-1) * 10)
        .limit(10)
        .exec((err, picturesData) => {
            maxPage = Math.ceil(num / 10);
            res.render('pictures', { title: 'pictures', list: picturesData, maxPage: maxPage });
        });
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
            // categories.find({actived: true})
            //   .exec((err, categoriesData) => {
            //       videosData.categories = categoriesData;
            //       tags.find({actived: true})
            //           .exec((err, tagsData) => {
            //               videosData.allTags = tagsData;
            //               videosData.priorities = priorities;
            picturesData.actived = String(picturesData.active);
            console.log(picturesData);
            res.render("admin/picturesManagementCreate", { aPictures: picturesData });

            //res.render("admin/newsManagementCreate", { aNews: newsData });
        });
}

const getUserSinglePictures = (req, res, next) => {
    if (!req.params.pid) {
        res
            .status(404)
            .json({
                "code": 400,
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
            res.render("picturesDetail", { article: picturesData });
        });
}
const updatePictures = (req, res, next) => {
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
            pictures.title = req.body.title;
            pictures.active = req.body.actived;
            pictures.author = req.body.author;
            pictures.link = req.body.link;
            // news.categoryId= req.body.categoryId,
            // news.tags= req.body.tags,
            // news.priority= req.body.priority,
            pictures.intro = req.body.intro;
            pictures.picture = req.body.picutre;
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
                    "message": "delete successfully"
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