module.exports = {
	devServer: {
		proxy: {
			// 要请求的接口域名后的第一个路径
			'/': {
				target: 'https://mall-app.edifier.com',
				ws: false
			}
		}
	}
}