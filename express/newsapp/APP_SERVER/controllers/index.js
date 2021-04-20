const mongoose = require('mongoose');
const news = mongoose.model('news');
// const videos = mongoose.model('videos');
const pictures = mongoose.model('pictures');
const categories = mongoose.model('categories');


//get simple news videos pictures
const getNVP = function (req, res, next) {
    let scrollNews
        , headLineNews
        , speicalNews
        , subNews
        , videos
        , pictures = {};
    //scroll news
    news.find()
        .where('priority', 0)
        .where('actived', true)
        .select("title intro picture")
        .exec((err, newsData) => {
            if (err) return handleError(err);
            scrollNews = newsData;
        });
    //headline news
    news.find()
        .where('priority', 1)
        .where('actived', true)
        .select("title intro picture")
        .limit(5)
        .exec((err, newsData) => {
            if (err) return handleError(err);
            headLineNews = newsData;
        });
    //special news
    news.find()
        .where('priority', 2)
        .where('actived', true)
        .select("title intro picture")
        .limit(2)
        .exec((err, newsData) => {
            if (err) return handleError(err);
            speicalNews = newsData;
        });

    categories.find()
        .where('actived', true)
        .where('level', 1)
        .select("name")
        .exec((err, cData) => {
            if (err) return handleError(err);
            let newsArray = new Array();
            cData.forEach((e) => {

                news.find()
                    .select('name picture')
                    .where('categoryId', e._id)
                    .limit(5)
                    .exec((err, newsData) => {
                        newsArray.push(newsData);
                    });
            });
            subNews = newsArray;
        });
    res.render('index', { scrollNews: scrollNews, headLineNews: headLineNews, speicalNews: speicalNews, subNews: subNews });
    //res.render('index', {title: "hello world"});
};

module.exports = {
    getNVP
}
