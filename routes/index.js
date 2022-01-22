// const { skips } = require("debug");
const express = require("express");
const router = express.Router();
const blogModel = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index");
});

router.get("/create", function (req, res) {
	blogModel
		.create({
			post: req.query.post,
		})
		.then(function (data) {
			res.send(data.post);
		});
	// res.render("blog", {data: req.query.post})
	// console.log()
});

router.get("/show/", function (req, res) {
	blogModel
		.find()
		.sort({ post: -1 })
		.then(function (data) {
			res.render("blog", { data });
			// res.send(data)
		});
});

router.get("/blog/post/:userId", function (req, res) {
	blogModel.findOne({ _id: req.params.userId }).then(function (data) {
		res.send(data.post);
		console.log(data.post);
	});
});

router.get("/delete/:id", function (req, res) {
	blogModel.findOneAndDelete({ _id: req.params.id }).then(function (data) {
		res.redirect("/show");
	});
});

router.get("/update/:id", function (req, res) {
	blogModel.findOne({ _id: req.params.id }).then(function (data) {
		res.render("blogUpdate", { post: data });
		console.log(data);
	});
});

router.post("/update/:id", function (req, res) {
	blogModel
		.findOneAndUpdate({ _id: req.params.id }, { post: req.body.post })
		.then(function (data) {
			res.redirect("/show");
		});
});

module.exports = router;
