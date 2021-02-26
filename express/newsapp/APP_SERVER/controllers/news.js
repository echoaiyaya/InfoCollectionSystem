const mongoose = require('mongoose');
const news = mongoose.model('news');


const getNews = function (req, res, next) {
    news.find()
        .where("actived", true)
        .select('title author intro picture publicTime tags')
        .exec((err, newsData) => {
            newsData.map((e) => {
                let d = new Date(e.publicTime);
                e.publicTimeString = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();
                console.log(e.publicTimeString);
                e.intro = e.intro.substr(0, 120) + '...';
                console.log(e.tags);
            });
            res.render('news', {title: 'News', list: newsData});
        });
};

const getSingleNews = function (req, res, next) {
    news.findById(req.params.newsid)
        .exec((err, newsData) => {
            
            let d = new Date(newsData.publicTime);
            newsData.publicTimeString = d.getMonth() + '' + d.getDate() + '/' + d.getFullYear();
        
            res.render('newsDetail', {article: newsData});
        });
};



// const deleteNews = function (req, res, next) {
//     const newsId = req.params.newsid;

//     if (newsId) {
//         news
//             .findByIdAndRemove(newsId)
//             .exec((err, newsData) => {
//                 if (err) {
//                     res
//                         .status(404)
//                         .json(err);
//                     return;
//                 }
//                 res
//                     .status(204)
//                     .json({
//                         "message": "delete success"
//                     });
//             });
//     } else {
//         res
//             .status(404)
//             .json({ "message": "No newsid" });
//     }
// };

module.exports = {
    getNews,
    getSingleNews
}
