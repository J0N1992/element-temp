import request from '@/utils/request'

export function commonInterface(url,params) {
  return request({
    url: url,
    method: 'post',
    params
  })
}

export function downloadUrl(url,data){
	return request({
      	url: url, // 接口名字
      	method: 'get',
				params:data,
				responseType:"blob"
    })
}
