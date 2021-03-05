const checkLogin = function(req,res,next) {
    let account = "admin";
    let password = "123456";

    if (!req.body.account || !req.body.password) {
		res
		.status(404)
		.json({
			"message" : "Not found, account or password is required"
		});
        return;
	}

    if (req.body.account == account && req.body.password == password) {
        req.session.user = req.body.account;
        res.status(200).json({"code": 200,"message": "login success"});
    } else {
        res.status(400).json({"code": 400,"message" : "login fail"});
    }
}

const signOut = (req,res,next) => {
    if (req.session.user) {
        req.session.destroy(() => {
            res.status(200).json({"code": 200,"message": "log out success"});
        });
    }
}


const checkSignIn = (req,res,next) => {
    if(req.session.user){
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
    res.render('admin/index');
}

module.exports = {
    adminLogin,
    adminIndex,
    checkLogin,
    checkSignIn,
    signOut
}