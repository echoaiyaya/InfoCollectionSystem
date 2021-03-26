var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

const newsList = require('../controllers/news');
const homeList = require('../controllers/index');


router.get('/',homeList.getNVP);

router.get('/news', newsList.usersNewsPage);
router.get('/news/:nid', newsList.getUserSingleNews);


module.exports = router;
