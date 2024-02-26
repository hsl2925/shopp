var express = require('express')
var mongoose = require('mongoose')
var router = express.Router()

const CartList = mongoose.model('cartList', new mongoose.Schema({
	"productName": {type:String},
	"image": {type:String},
	"price": {type:Number},
	"num": {type:Number},
	"checked": {type:Boolean},
	"id": {type:Number}
}))

router.get('/cartList', async (req, res)=> {
	console.log("访问CartList")
	const cartList = await CartList.find()
	res.send({
		data: cartList,
		code: 200
	})
})

router.post('/cartList', async (req, res)=> {
	var a = await CartList.create({
		"productName": req.body.productName,
		"image": req.body.image,
		"price": req.body.price,
		"num": req.body.num,
		"checked": req.body.checked,
		"id":req.body.id,
	})
	res.send({
		ok: true,
		msg: "发送成功"
	})
})

router.delete('/cartList/:id', async (req, res) => {
  console.log("发送 delete 请求给 CartList")
  const customId = parseInt(req.params.id, 10)

  try {
    await CartList.findOneAndDelete({ id: customId })
    res.send({
      ok: true,
      msg: "删除成功"
    })
  } catch (err) {
    console.error(err);
    res.status(500).send({
      ok: false,
      msg: "服务器错误，删除地址信息失败"
    })
  }
})

module.exports = router