const Core = require('@alicloud/pop-core') // 引入阿里云 SDK
var express = require('express')
var mongoose = require('mongoose')
var router = express.Router()

const loginSchema = new mongoose.Schema({
	phoneNumber: {
		type: String
	},
	generatedCode: {
		type: String
	},
	id: {
		type: Number
	},
})

const Login = mongoose.model('users', loginSchema)

// 创建 Client 对象
const client = new Core({
	accessKeyId: 'LTAI5tE1wg4rkb6MMZJfbDL4', // 替换成自己的 AccessKey ID
	accessKeySecret: '5B9fiSEMH9jNUx4OAULU563sNelzDc', // 替换成自己的 AccessKey Secret
	endpoint: 'https://dysmsapi.aliyuncs.com', // API 访问入口，根据实际情况修改
	apiVersion: '2017-05-25', // API 版本号，根据实际情况修改
})

// 生成随机验证码
let generatedCode = '' // 保存验证码的全局变量

function generateCode() {
	const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
	return code.toString()
}

// 发送短信验证码
router.post('/sendCode', (req, res) => {
	const phoneNumber = req.body.phoneNumber // 获取手机号码
	const code = generateCode() // 生成验证码
	generatedCode = code
	
	const params = {
		"RegionId": "cn-hangzhou", // 短信服务所在区域，可以参考阿里云文档
		"PhoneNumbers": phoneNumber, // 目标手机号码
		"SignName": "huangsy1995", // 短信签名名称，需先在阿里云控制台中申请审核通过
		"TemplateCode": "SMS_464365701", // 短信模板 CODE，需先在阿里云控制台中申请审核通过
		"TemplateParam": JSON.stringify({ // 短信模板参数，为 JSON 字符串格式
			"code": code // 模板中的变量名和对应的值
		})
	}

	const requestOption = { // 设置请求超时时间等选项
		method: 'POST',
		timeout: 5000
	}
	
	// 调用 SendSms 方法发送短信
	client.request('SendSms', params, requestOption).then((result) => {
		console.log(result) // 打印发送结果

		res.status(200).json({ // 返回状态码和生成的验证码
			message: '验证码已发送，请注意查收！',
			code: code
		})
	}, (ex) => {
		console.log(ex)

		res.status(500).json({ // 返回错误状态码和错误信息
			message: '短信发送失败，请稍后重试！'
		})
	})
})

// 验证短信验证码
router.post('/login', (req, res) => {
	const phoneNumber = req.body.phoneNumber // 获取手机号码
	const inputCode = req.body.code // 获取用户输入的验证码
	const savedCode = generatedCode // 获取之前生成的验证码

	console.log(inputCode)
	console.log(savedCode)
	
	// 判断验证码
	if (inputCode === savedCode) {
		res.status(200).json({
			message: '登录成功！'
		})
	} else {
		res.status(401).json({
			message: '验证码错误，请重新输入！'
		})
	}
})

module.exports = router