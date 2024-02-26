var express = require('express')
var mongoose = require('mongoose')
var router = express.Router()

const StrollList = mongoose.model('strollList', new mongoose.Schema({
	"id": {type:Number},
	"title": {type:String},
	"content": {type:String},
	"state": {type:Number},
	"syncForum": {type:Number},
	"likeCount": {type:Number},
	"createTime": {type:String},
	"buyerUserName": {type:String},
	"buyerUserHeadImg": {type:String},
	"buyerUserId": {type:Number},
	"postImage": {type:String},
	"hasLike": {type:Number},
	"productName": {type:String},
	"productImage": {type:String},
	"productId": {type:Number},
	"skuId": {type:Number},
	"shopId": {type:Number},
	"source": {type:Number},
	"height": {type:String},
	"width": {type:String},
	"sort": {type:Number}
}))

router.get('/strollList', async (req, res) => {
	console.log("访问StrollList")
	const strollList = await StrollList.find()
	res.send({
		data:strollList,
		code: 200
	})
})

module.exports = router