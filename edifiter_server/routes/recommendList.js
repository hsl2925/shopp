var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

const RecommendList = mongoose.model('recommendList',new mongoose.Schema({
	"shopId": {type: Number},
	"shopName": {type: String},
	"shopLogo": {type: String},
	"productId": {type: Number},
	"skuId": {type: Number},
	"productName": {type: String},
	"image": {type: String},
	"originalPrice": {type: Number},
	"price": {type: Number},
	"users": {type: Number},
	"fictitiousNumber": {type: Number},
	"collectUsers": {type: Number},
	"productBrief": {type: String},
	"activityType": {type: Number},
	"number": {type: Number},
	"total": {type: Number},
	"canRedeem": {type: Number},
	"integralRedeemNum": {type: Number},
	"integral":{type: Number},
	"watermarkImgList": {type: String},
	"deliveryPrice": {type: Number},
	"ifAdd": {type: Number},
	"downPrice": {type: Number},
	"sku": {type: String},
}))

router.get('/recommendList',async (req, res)=> {
	console.log("访问RecommendList");
	const recommendList = await RecommendList.find();
	res.send({
		data:recommendList,
		code:200
	});
});

module.exports = router;