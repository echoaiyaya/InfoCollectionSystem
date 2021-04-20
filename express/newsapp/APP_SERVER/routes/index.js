var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
const picturesList = require('../controllers/pictures');
const newsList = require('../controllers/news');
const homeList = require('../controllers/index');
const videosList = require('../controllers/videos');


router.get('/',homeList.getNVP);

router.get('/news', newsList.usersNewsPage);
router.get('/news/:nid', newsList.getUserSingleNews);
router.get('/pictures', picturesList.usersPicturesPage);
router.get('/pictures/:pid', picturesList.getUserSinglePictures);
router.get('/videos', videosList.usersVideosPage);
router.get('/videos/:vid', videosList.getUserSingleVideos);

// router.post('/donation', homeList.donationPage);
 router.get('/submitDonation', homeList.submitDonation);



module.exports = router;
