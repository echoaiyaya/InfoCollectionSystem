var express = require('express');
var router = express.Router();

const adminCtrl = require('../controllers/admin.js');
router.get('/',adminCtrl.checkSignIn, adminCtrl.adminIndex);
router.route('/login')
      .get(adminCtrl.adminLogin)
      .post(adminCtrl.checkLogin);

router.get('/signout', adminCtrl.signOut);


module.exports = router;