import request from '@/utils/request'

export function commonInterface(url, params) {
  return request({
    url: url,
    method: 'post',
    params: params,
    credentials: true
  })
}

export function commonUploadInterface(url, params) {
  return request({
    url: url,
    method: 'post',
    params: params,
		  headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    credentials: true
  })
}

export function saveTlinxMerchant(query) {
  return request({
    url: '/admin/saveTlinxMerchant',
    method: 'post',
    params: query
  })
}

export function getCity(){
	return request({
		url: '/admin/getCity',
		method: 'post'
	})
}

export function getMctClass(){
	return request({
		url: '/admin/getMctClass',
		method: 'get'
	})
}
