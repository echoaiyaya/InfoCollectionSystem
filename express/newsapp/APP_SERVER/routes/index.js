var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
const pictureslist = require('../controllers/pictures');
const videoslist = require('../controllers/videos');
const newsList = require('../controllers/news');
const homeList = require('../controllers/index');
const fbList = require('../controllers/feedback');

router.get('/',homeList.getNVP);

// router.post('/donation', homeList.donationPage);
router.get('/submitDonation', homeList.submitDonation);

router.get('/news/list/:page?', newsList.usersNewsPage);
router.get('/news/category/:cid/:page?', newsList.usersNewsByCate);
router.get('/news/detail/:nid', newsList.getUserSingleNews);
router.get('/pictures/list/:page?', pictureslist.usersPicturesPage);
router.get('/pictures/detail/:pid', pictureslist.getUserSinglePictures);
router.get('/videos/list/:page?', videoslist.usersVideosPage);
router.get('/videos/detail/:vid', videoslist.getUserSingleVideos);
router.get('/aboutus', homeList.aboutusPage);
router.get('/feedbacksubmit', homeList.feedbackSubmit);
router.post('/feedback', fbList.feedbackCreate);
router.get('/search/:search', homeList.getSearch);


module.exports = router;
