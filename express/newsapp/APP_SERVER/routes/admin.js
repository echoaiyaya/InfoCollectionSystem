var express = require('express');
var router = express.Router();

const adminCtrl = require('../controllers/admin.js');
const { route } = require('./index.js');
router.get('/',adminCtrl.checkSignIn, adminCtrl.adminIndex);
router.route('/login')
      .get(adminCtrl.adminLogin)
      .post(adminCtrl.checkLogin);

router.get('/signout', adminCtrl.signOut);

router.get('/category',adminCtrl.checkSignIn, adminCtrl.categoryPage);

router.route('/category/create')
      .get(adminCtrl.checkSignIn, adminCtrl.categoryCreatePage)
      .post(adminCtrl.checkSignIn, adminCtrl.categoryCreate);

router.route('/category/:cid')
      .get(adminCtrl.getSingleCate)
      .put(adminCtrl.updateCate)
      .delete(adminCtrl.deleteCate);

module.exports = router;