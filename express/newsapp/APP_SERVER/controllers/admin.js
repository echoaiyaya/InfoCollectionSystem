const mongoose = require('mongoose');
const videos = mongoose.model('videos');
const news = mongoose.model('news');
const pictures = mongoose.model('pictures');


const checkLogin = function (req, res, next) {
    let account = "admin";
    let password = "123456";

    if (!req.body.account || !req.body.password) {
        res
            .status(404)
            .json({
                "message": "Not found, account or password is required"
            });
        return;
    }

    if (req.body.account == account && req.body.password == password) {
        req.session.user = req.body.account;
        res.status(200).json({ "code": 200, "message": "login success" });
    } else {
        res.status(400).json({ "code": 400, "message": "login fail" });
    }
}

const signOut = (req, res, next) => {
    if (req.session.user) {
        req.session.destroy(() => {
            res.status(200).json({ "code": 200, "message": "log out success" });
        });
    } else {
        res.status(200).json({ "code": 200, "message": "log out error" });
    }
}


const checkSignIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        res.redirect('admin/login');
    }
}

const adminLogin = (req, res, next) => {
    res.render('admin/login');
}

const adminIndex = (req, res, next) => {
    let utcTime = new Date();
    let utcTimeStamp = utcTime.getTime() - (240 * 60000);
    let currentTime = new Date(utcTimeStamp);
    let year = currentTime.getFullYear();
    let date = currentTime.getDate();
    let month = currentTime.getMonth() + 1;
    let todayUtcTime = new Date(`${year}-${month}-${date} 00:00:00`);
    let todayTime = new Date(todayUtcTime.getTime() - 240 * 60000);
    news.count({}, function (err, newsTotal) {
        news.count({insertTime: {$gte: todayTime}}, function(err, newsFilter){
            videos.count({}, function(err, videosTotal) {
                videos.count({insertTime: {$gte: todayTime}}, function(err, videosFilter){
                    pictures.count({}, function(err, picTotal) {
                        pictures.count({insertTime: {$gte: todayTime}}, function(err, picFilter){
                            if (newsTotal == null) newsTotal = 0;
                            if (newsFilter == null) newsFilter = 0;
                            if (videosTotal == null) videosTotal = 0;
                            if (videosFilter == null) videosFilter = 0;
                            if (picTotal == null) picTotal = 0;
                            if (picFilter == null) picFilter = 0;
                            res.render('admin/index', {newsTotal: newsTotal, newsFilter:newsFilter, videosTotal: videosTotal, videosFilter: videosFilter, picTotal: picTotal, picFilter: picFilter});
                        })
                    });
                })
            });
        });

    });
    
}







module.exports = {
    adminLogin,
    adminIndex,
    checkLogin,
    checkSignIn,
    signOut

}