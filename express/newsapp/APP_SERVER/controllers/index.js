const mongoose = require('mongoose');
const news = mongoose.model('news');
// const videos = mongoose.model('videos');
const pictures = mongoose.model('pictures');
const categories = mongoose.model('categories');

// const donationPage = function(req, res, next) {
//     res.render('donation', {});
// }
const submitDonation = function(req, res, next) {
    res.render('submit', {});
}
const aboutusPage = function(req,res,next){
    res.render('aboutus',{});
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

//get simple news videos pictures
const getNVP = function (req, res, next) {
    let scrollNews
        , headLineNews
        , speicalNews
        , subNews
        , videos
        , pictures = {};
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
                let result = async function(callback) {
                    await new Promise((res, rej) => {
                        news.find({ categoryId: e._id })
                        .limit(5)
                        .then((err, newsData) => {
                            
                            callback(newsData);
                        });
                    }) 
                };
               
                subNews.content = result;
                subArray.push(subNews);
            });
            console.log(subArray);

        });
    // res.render('index', { scrollNews: scrollNews, headLineNews: headLineNews, speicalNews: speicalNews, subNews: subNews });
    res.render('index', { title: "hello world" });
};

module.exports = {
    getNVP,
    // donationPage,
    submitDonation,
    aboutusPage,
    feedbackSubmit
}
