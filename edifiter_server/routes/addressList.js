const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const AddressList = mongoose.model('addressList', new mongoose.Schema({
	"name": { type:String },
	"phone": { type:String },
	"city": { type:String },
	"cityNum": { type:String },
	"id": { type:Number },
}))

// 获取所有地址列表
router.get('/addressList',async (req, res)=>{
	const addressList = await AddressList.find()
	res.send({
		data:addressList,
		code:200
	})
})

// 根据 id 查询地址
router.get('/addressList/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10)
  try {
    const address = await AddressList.findOne({ id: id })
    if (!address) {
      return res.status(404).send({
        message: '未找到指定的地址信息',
        code: 404
      })
    }
    res.send({
      data: address,
      code: 200
    })
  } catch (error) {
    res.status(500).send({
      message: '查询地址信息失败，请稍后再试',
      code: 500
    })
  }
})

// 新增地址
router.post('/addressList', async (req, res)=> {
	var a = await AddressList.create({
		"name":req.body.name,
		"phone":req.body.phone,
		"city":req.body.city,
		"cityNum":req.body.cityNum,
		"id":req.body.id,
	})
	res.send({
		ok:true,
		msg:"发送成功"
	})
})

// 删除地址
router.delete('/addressList/:id', async (req, res) => {
  const customId = parseInt(req.params.id, 10)

  try {
    await AddressList.findOneAndDelete({ id: customId })
    res.send({
      ok: true,
      msg: "删除成功"
    })
  } catch (err) {
    res.status(500).send({
      ok: false,
      msg: "服务器错误，删除地址信息失败"
    })
  }
})

// 修改地址
router.put('/addressList/:id', async (req, res) => {
	const customId = parseInt(req.params.id, 10)
  try {
    const result = await AddressList.findOneAndUpdate({ id: customId }, {
      "name": req.body.name,
      "phone": req.body.phone, 
      "city": req.body.city,
      "cityNum": req.body.cityNum
    })
	
    res.send({
      ok: true,
      msg: "修改成功"
    })
	
  } catch (error) {
    res.status(500).send("服务器错误")
  }
})

module.exports = router