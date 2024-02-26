var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

const Members = mongoose.model('member', new mongoose.Schema({
	"id":{type:Number},
	"reassureUrl":{type:String},
	"memberLevelId": {type:Number},
	      "memberLevelName": {type:String},
	      "memberLevelIcon": {type:String},
	      "memberLevelBackground": {type:String},
	      "growth": {type:Number},
	      "credit": {type:Number},
	      "memberIds": {type:String},
	      "memberLevelReason": {type:String},
	      "createTime": {type:String},
	      "updateTime": {type:String},
	      "membershipList": [
	        {
	          "memberId": {type:Number},
	          "memberName": {type:String},
	          "memberIcon": {type:String},
	          "memberReason": {type:String},
	          "createTime": {type:String},
	          "updateTime": {type:String}
	        }
	      ]
}))

router.get('/members',async (req, res)=> {
	console.log("访问Members");
	const members = await Members.find();
	res.send({
		data:members,
		code:200
	});
});

module.exports = router;