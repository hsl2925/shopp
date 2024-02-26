var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

const ReassureList = mongoose.model('reassureList',new mongoose.Schema({
	"id":{type:Number},
	"reassureUrl":{type:String},
	"name":{type:String}
}))

router.get('/reassureList',async (req, res)=> {
	console.log("访问ReassureList");
	const reassureList = await ReassureList.find();
	res.send({
		data:reassureList,
		code:200
	});
});

module.exports = router;