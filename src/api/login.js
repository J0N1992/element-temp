import request from '@/utils/request'

export function loginByUsername(username, password) {
	//-------------从这里请求用户信息-------------------
	
//   const data = {
//     username,
//     password
//   }
//   return request({
//     url: '/user/login?username='+username+'&password='+password,
//     method: 'post'
//   })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

//根据管理员id查找菜单列表
export function findMenuByAdminUserId(adminUserId) {
  return request({
		//-------------从这里请求权限--------------
   // url: '/user/getAllMenu',
   // method: 'post',
   // params: { adminUserId }
  })
}

