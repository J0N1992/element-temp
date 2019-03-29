import { loginByUsername, logout, findMenuByAdminUserId } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import { Message, MessageBox } from 'element-ui'
const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data        
					console.log(data)
          if(data.Code == "99"){
          	Message({
		           message: data.Msg,
		           type: 'error',
		           duration: 5 * 1000
		         })
          }else{
          	//Cookies.set("merchantId", response.data.Data.merchantId)
          	//commit('SET_TOKEN', response.data.Data.id)
          	setToken(response.data.Data.id)          
          	resolve()
          }         
        }).catch(error => {
          reject(error)
        })
      })
    },

		// 动态修改权限
		ChangeRoles({ commit, dispatch }, role) {
		  return new Promise(resolve => {
		    commit('SET_TOKEN', role)
				commit('SET_ROLES', ["a"])
		    findMenuByAdminUserId(role).then(response => {
			
		      const data = response.data.Data
		      dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单				
		      resolve()
		    })
		  })
		},
    
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
