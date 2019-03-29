import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress configuration

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
	
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
			
    }else if (to.path === '/'){
			
			const roles = store.getters.roles
			store.dispatch('ChangeRoles', getToken()).then(() => { // 根据roles权限生成可访问的路由表		 		 
				router.addRoutes(store.getters.addRouters) ;// 动态添加可访问路由表
				//router.options.routes = [];
				for(var i = 0 ; i < store.getters.addRouters.length ; i ++)
				router.options.routes.push(store.getters.addRouters[i]);
				
				next({ path: store.getters.addRouters[0].path+"/"+store.getters.addRouters[0].children[0].path })//直接跳去他能打开的页面
				NProgress.done()
			  // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
			})
			 
			
		}else{			
      //if (store.getters.roles.length === 0) {
			if (store.getters.roles.length === 0) {
				console.log(">>>>>>")
				const roles = store.getters.roles
				store.dispatch('ChangeRoles', getToken()).then(() => { // 根据roles权限生成可访问的路由表		    																	
					router.addRoutes(store.getters.addRouters) ;// 动态添加可访问路由表
					//router.options.routes = [];
					for(var i = 0 ; i < store.getters.addRouters.length ; i ++)
					router.options.routes.push(store.getters.addRouters[i]);
					
					//判断当前页面是否有权限，没有就自动去别的页面
					let rolesPaths = [];
					for(var n = 0 ; n < store.getters.addRouters.length ; n ++ ){
						
						rolesPaths.push(store.getters.addRouters[n].path)
					
					}
					
					if(rolesPaths.includes(to.path)) next()	;
					else {
					
						
						next({ path: store.getters.addRouters[0].path}) ;
					}
			    // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
			  })
			  console.log("<<<<<<<")
			}
      next()		
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
