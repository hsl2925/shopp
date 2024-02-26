var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

const WelfareList = mongoose.model('welfareList', new mongoose.Schema({
	"id": {type:Number},
	"imgUrl": {type:String},
	"newPersonPrice": {type:String},
	"newPrice": {type:String},
	"oldPrice": {type:String},
	"currentTag": {type:String},
}))

router.get('/welfareList', async (req, res) => {
	console.log("访问WelfareList");
	const welfareList = await WelfareList.find();
	res.send({
		data:welfareList,
		code: 200
	});
});

module.exports = router;