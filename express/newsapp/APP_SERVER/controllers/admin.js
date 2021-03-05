const mongoose = require('mongoose');
const categories = mongoose.model('categories');

const checkLogin = function (req, res, next) {
    let account = "admin";
    let password = "123456";

    if (!req.body.account || !req.body.password) {
        res
            .status(404)
            .json({
                "message": "Not found, account or password is required"
            });
        return;
    }

    if (req.body.account == account && req.body.password == password) {
        req.session.user = req.body.account;
        res.status(200).json({ "code": 200, "message": "login success" });
    } else {
        res.status(400).json({ "code": 400, "message": "login fail" });
    }
}

const signOut = (req, res, next) => {
    if (req.session.user) {
        req.session.destroy(() => {
            res.status(200).json({ "code": 200, "message": "log out success" });
        });
    }
}


const checkSignIn = (req, res, next) => {
    if (req.session.user) {
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

const categoryCreatePage = (req, res, next) => {
    let category = {
        name: '',
        level: '',
        actived: ''
    }
    res.render("admin/cateManagementCreate", {category: category});
}

const categoryCreate = (req, res, next) => {
    if (!req.body.name || !req.body.level || !req.body.actived) {
        return res
            .status(400)
            .json({ "code": 400, message: "miss params" });
    }
    categories.create({
        name: req.body.name,
        level: req.body.level,
        actived: req.body.actived
    }, (err, categoriesData) => {
        if (err) {
            res
                .status(400)
                .json({ "code": 400, "message": err });
        } else {
            res
                .status(201)
                .json({ "code": 200, "message": "create successfully" });
        }
    });
}

const categoryPage = (req, res, next) => {
    categories.find()
        .exec((err, categoriesData) => {
            res.render('admin/cateManagement', { title: 'categories', categories: categoriesData });
        });
}

const getSingleCate = (req, res, next) => {
    if (!req.params.cid) {
        res
            .status(404)
            .json({
                "code": 400,
                "message": "Not found, bookid is required"
            });
        return;
    }
    categories.findById(req.params.cid)
        .exec((err, categoriesData) => {
            if (err) {
                console.log(err);
                return res.status(404).json(err)
            }
            res.render("admin/cateManagementCreate", { category: categoriesData });
        });
}

const updateCate = (req, res, next) => {
    if (!req.body.name || !req.body.level || !req.body.actived) {
        return res
            .status(400)
            .json({ "code": 400, message: "miss params" });
    }
    categories.findById(req.params.cid)
        .exec((err, categories) => {
            if (!categories) {
                res
                    .status(404)
                    .json({
                        "code": 400,
                        "message": "cid not found"
                    });
                return;
            } else if (err) {
                res
                    .status(400)
                    .json({
                        "code": 400,
                        "message": err
                    });
                return;
            }
            categories.name = req.body.name;
            categories.actived = req.body.actived;
            categories.level = req.body.level;
            categories.save((err, categoryDate) => {
                if (err) {
                    res
                        .status(404)
                        .json({
                            "code": 400,
                            "message": err
                        });
                } else {
                    res
                        .status(200)
                        .json({
                            "code": 200,
                            "message": "update successfully"
                        })
                }
            });

        });
}

const deleteCate = (req, res, next) => {
    if (!req.params.cid) {
        res
            .status(404)
            .json({
                "code": 400,
                "message": "Not found, bookid is required"
            });
        return;
    }
    categories
    .findByIdAndRemove(req.params.cid)
    .exec((err, categoriesData) => {
        if (err) {
            res
            .status(404)
            .json({
                "code": 400,
                "message": err
            });
            return;
        }
        res
        .status(200)
        .json({
            "code": 200,
            "message" : "delete successfully"
        });
    });
	
	
}




module.exports = {
    adminLogin,
    adminIndex,
    checkLogin,
    checkSignIn,
    signOut,
    categoryCreate,
    categoryPage,
    categoryCreatePage,
    getSingleCate,
    updateCate,
    deleteCate
}