var express = require('express')
var mongoose = require('mongoose')
var router = express.Router()

const CategoryImg = mongoose.model('categoryImg', new mongoose.Schema({
	"id": {type: Number},
	"name": {type: String},
	"startTime": {type: String},
	"endTime": {type: String},
	"popupImg": {type: String},
	"closeImg": {type: String},
	"jumpType": {type: Number},
	"jumpContent": {type: String},
	"triggerCondition": {type: Number},
	"applyGroup": {type: Number},
	"state": {type: Number},
	"createTime": {type: String},
	"updateTime": {type: String},
	"locationType": {type: Number},
	"address": {type: String}
}))

router.get('/categoryImg', async (req, res) => {
	console.log("访问CategoryImg")
	const categoryImg = await CategoryImg.find()
	res.send({
		data: categoryImg,
		code: 200
	})
})

module.exports = router