const mongoose = require('mongoose');
const news = mongoose.model('news');
const videos = mongoose.model('videos');
const pictures = mongoose.model('pictures');
const categories = mongoose.model('categories');

// const donationPage = function(req, res, next) {
//     res.render('donation', {});
// }
const submitDonation = function (req, res, next) {
    res.render('submit', {});
}
const aboutusPage = function (req, res, next) {
    res.render('aboutus', {});
}
const feedbackSubmit = function (req, res, next) {
    res.render('feedbacksubmit', {});
}

function getNewsByCategory() {
    return new Promise(function (resolve, reject) {
        news.find({ categoryId: e._id })
            .limit(5)
            .then((err, newsData) => {

                resolve(newsData);
            });
    });
}

const getSearch = function (req, res, next) {
    let search = req.params.search;
    news.find({ title: {$regex: search} })
        .select('_id title author publicTime intro')
        .sort('insertTime')
        .exec((err, newsData) => {
            pictures.find({ title: /search/ })
                .sort('insertTime')
                .exec((err, picsData) => {
                    videos.find({title: /search/})
                        .sort('insertTime')
                        .exec((err, vData) => {
                            res.render('search', {newsList: newsData, picList: picsData, vlist: vData});
                        });
                });

        });
}

//get simple news videos pictures
const getNVP = function (req, res, next) {
    let scrollNews
        , headLineNews
        , speicalNews
        , subNews
        , getVideos
        , getPictures = {};
    let subArray = new Array();
    //scroll news
    categories.find()
        .where('actived', true)
        .where('level', 1)
        .exec((err, cData) => {
            if (err) return handleError(err);

            cData.forEach((e) => {
                let subNews = {};
                subNews.title = e.name;

                (async () => {
                    return await new Promise((res, rej) => {
                        news.find({ priority: 3, categoryId: e._id, actived: true })
                            .select('_id title author picture')
                            .sort('insertTime')
                            .limit(5)
                            .exec((err, newsData) => {
                                res(newsData);
                                subNews.content = newsData;
                                subArray.push(subNews);
                            });
                    });
                })();



            });
            (async () => {
                return await new Promise((res, rej) => {
                    news.find({ priority: 0, actived: true })
                        .select('_id title author picture intro')
                        .limit(1)
                        .exec((err, newsData) => {
                            res(newsData);
                            scrollNews = newsData;
                        });
                });
            })();
            (async () => {
                return await new Promise((res, rej) => {
                    news.find({ priority: 1, actived: true })
                        .select('_id title author')
                        .limit(5)
                        .exec((err, newsData) => {
                            res(newsData);
                            headLineNews = newsData;
                        });
                });
            })();
            (async () => {
                return await new Promise((res, rej) => {
                    news.find({ priority: 2, actived: true })
                        .select('_id title author picture')
                        .limit(2)
                        .exec((err, newsData) => {
                            res(newsData);
                            speicalNews = newsData;
                        });
                });
            })();
            (async () => {
                return await new Promise((res, rej) => {
                    pictures.find({ picture: { $ne: '' }, active: true })
                        .select('_id title author picture')
                        .limit(4)
                        .exec((err, picData) => {
                            res(picData);
                            getPictures = picData;
                        });
                });
            })();
            (async () => {
                return await new Promise((res, rej) => {
                    pictures.find({ picture: { $ne: '' }, active: true })
                        .select('_id title author picture')
                        .sort('insertTime')
                        .limit(4)
                        .exec((err, picData) => {
                            res(picData);
                            getPictures = picData;
                        });
                });
            })();
            (async () => {
                return await new Promise((res, rej) => {
                    videos.find({ actived: true })
                        .select('_id title author picture')
                        .sort('insertTime')
                        .limit(2)
                        .exec((err, vData) => {
                            res(vData);
                            getVideos = vData;
                        });
                });
            })();
            setTimeout((v) => { console.log(getPictures); res.render('index', { scrollNews: scrollNews[0], headLineNews: headLineNews, speicalNews: speicalNews, subNews: subArray, getPictures: getPictures, getVideos: getVideos }); }, 1000);

        });
};

module.exports = {
    getNVP,
    // donationPage,
    submitDonation,
    aboutusPage,
    feedbackSubmit,
    getSearch
}
