var exports = module.exports = {};


exports.about = function (req, res) {
    res.render("about", { msg: "about page" });
};


exports.feed = function (req, res) {
    res.render("about", { msg: "about page" });
};


exports.index = function (req, res) {
    res.render("index", { msg: "about page" });
};

