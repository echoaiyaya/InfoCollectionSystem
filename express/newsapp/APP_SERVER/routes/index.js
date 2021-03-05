var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

const newsList = require('../controllers/news');
const homeList = require('../controllers/index');

router.get('/', homeList.getNVP);
router.get('/news', newsList.getNews);
router.get('/news/:newsid', newsList.getSingleNews);



module.exports = router;
