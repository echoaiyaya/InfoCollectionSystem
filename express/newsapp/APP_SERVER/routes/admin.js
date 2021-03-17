var express = require('express');
var router = express.Router();

const adminCtrl = require('../controllers/admin.js');
const cateCtrl = require('../controllers/category.js');
const newsCtrl = require('../controllers/news.js');
const tagCtrl = require('../controllers/tags.js');
const videosCtrl = require('../controllers/videos.js');
const { route } = require('./index.js');
router.get('/',adminCtrl.checkSignIn, adminCtrl.adminIndex);
router.route('/login')
      .get(adminCtrl.adminLogin)
      .post(adminCtrl.checkLogin);

router.get('/signout', adminCtrl.signOut);

router.get('/category',adminCtrl.checkSignIn, cateCtrl.categoryPage);

router.route('/category/create')
      .get(adminCtrl.checkSignIn, cateCtrl.categoryCreatePage)
      .post(adminCtrl.checkSignIn, cateCtrl.categoryCreate);

router.route('/category/:cid')
      .get(cateCtrl.getSingleCate)
      .put(cateCtrl.updateCate)
      .delete(cateCtrl.deleteCate);

router.get('/news',adminCtrl.checkSignIn, newsCtrl.aNewsPage);

router.route('/news/create')
      .get( newsCtrl.aNewsCreatePage)
      .post(adminCtrl.checkSignIn, newsCtrl.aNewsCreate);

router.route('/news/:nid')
      .get(newsCtrl.getSingleNews)
      .put(newsCtrl.updateNews)
      .delete(newsCtrl.deleteNews);


router.get('/tag',adminCtrl.checkSignIn, tagCtrl.tagPage);

router.route('/tag/create')
      .get(adminCtrl.checkSignIn, tagCtrl.tagCreatePage)
      .post(adminCtrl.checkSignIn, tagCtrl.tagCreate);

router.route('/tag/:tid')
      .get(tagCtrl.getSingleTag)
      .put(tagCtrl.updateTag)
      .delete(tagCtrl.deleteTag);

router.get('/videos',adminCtrl.checkSignIn, videosCtrl.aVideosPage);

router.route('/videos/create')
      .get( videosCtrl.aVideosCreatePage)
      .post(adminCtrl.checkSignIn, videosCtrl.aVideosCreate);
      
router.route('/videos/:vid')
      .get(videosCtrl.getSingleVideos)
      .put(videosCtrl.updateVideos)
      .delete(videosCtrl.deleteVideos);
      
      

module.exports = router;