const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

const reassureList = require('./routes/reassureList')
const addressList = require('./routes/addressList')
const allGoods = require('./routes/allGoods')
const allProductList = require('./routes/allProductList')
const cartList = require('./routes/cartList')
const categoryImg = require('./routes/categoryImg')
const categoryList = require('./routes/categoryList')
const categoryMoreList = require('./routes/categoryMoreList')
const indexRecommendlist = require('./routes/indexRecommendlist')
const members = require('./routes/members')
const profileRecommendList = require('./routes/profileRecommendList')
const recommendList = require('./routes/recommendList')
const strollList = require('./routes/strollList')
const welfareList = require('./routes/welfareList')
const login = require('./routes/login')

const app = express()

app.use(cors({
  origin: 'http://localhost:8080'
}))

// 连接mongodb数据库
mongoose.connect('mongodb://localhost:27017/edifier',{})

// 请求头
app.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*")
	res.header("Access-Control-Allow-Headers","X-Requested-With,Content-Type")
	res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS")
	next()
})

// 识别json格式
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', reassureList)
app.use('/', addressList) // 地址列表
app.use('/', allGoods) // 全部商品
app.use('/', allProductList) // 全部商品列表
app.use('/', cartList) // 分类
app.use('/', categoryImg) // 分类-图片
app.use('/', categoryList) // 分类数据
app.use('/', categoryMoreList) // 分类-更多
app.use('/', indexRecommendlist) // 首页-推荐数据
app.use('/', members) // 会员
app.use('/', profileRecommendList) // 我的-推荐数据
app.use('/', recommendList) // 推荐数据
app.use('/', strollList) // 逛逛列表
app.use('/', welfareList) // 福利
app.use('/', login) // 登录


module.exports = app
