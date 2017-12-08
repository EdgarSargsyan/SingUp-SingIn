const express = require("express");
const router = express.Router();


const mongodb = require('../model/db.js');
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://127.0.0.1:27017/test';
const User = require('../model/schemas/users.js')



router.get("/", (req, res, next) => {
	res.render(`index`, { title: "Registration form" });
});

router.post("/regist", (req, res, next) => {
	let newUser = new User(req.body);
	console.log(newUser);
	newUser.save().then(() => {
		console.log("ok");
		res.send(req.body);
		res.end();
	}).catch((err) => {
		console.log(err);
	});
});
router.post("/login", (req, res, next) => {
	console.log(req.body);
	User.findOne({"email":`${req.body.email}`}, function(err, docs){
		if(err) throw err;
		let loginInfo = {};
		if(docs != null){
			if(docs.checkPassword(req.body.password)){
				req.session.name = docs._id;
				loginInfo.user = docs;
			}else{
				loginInfo.passErr = "Incorrect password";
			}
		}else{
			loginInfo.emailErr = "Incorrect email";
		}
		res.send(loginInfo);
	})
});










module.exports = router;