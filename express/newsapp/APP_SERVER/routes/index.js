var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
const pictureslist = require('../controllers/pictures');
const newsList = require('../controllers/news');
const homeList = require('../controllers/index');


router.get('/',homeList.getNVP);

router.get('/news/list/:page?', newsList.usersNewsPage);
router.get('/news/detail/:nid', newsList.getUserSingleNews);
router.get('/pictures', pictureslist.usersPicturesPage);
router.get('/pictures/:pid', pictureslist.getUserSinglePictures);


module.exports = router;
