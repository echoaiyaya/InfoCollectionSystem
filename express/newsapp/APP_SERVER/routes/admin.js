var express = require('express');
var router = express.Router();

const adminCtrl = require('../controllers/admin.js');
const cateCtrl = require('../controllers/category.js');
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

module.exports = router;