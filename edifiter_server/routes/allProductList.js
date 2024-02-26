var express = require('express')
var mongoose = require('mongoose')
var router = express.Router()

const AllProductList = mongoose.model('allProductList',new mongoose.Schema({
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

router.get('/AllProductList',async (req, res)=> {
	console.log("访问allProductList")
	const allProductList = await AllProductList.find()
	res.send({
		data: allProductList,
		code: 200
	})
})

module.exports = router