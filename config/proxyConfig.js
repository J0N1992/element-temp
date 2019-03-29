module.exports = {
	proxyList: {
		"/api":{
			target: 'http://172.18.0.150:8001',
			changeOrigin: true,
			pathRewrite: {
			'^/api': '/'
			}
		}
	}
}
