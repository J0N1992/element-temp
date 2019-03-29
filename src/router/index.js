import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [

{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/404'),
		hidden: true
	}

	//   {
	//     path: '/',
	//     component: Layout,
	//     redirect: '/dashboard',
	//     name: 'Dashboard',
	//     hidden: true,
	//     children: [{
	//       path: 'dashboard',
	//       //component: () => import('@/views/dashboard/index')
	// 			component: () => import('@/views/table/question')
	//     }]
	//   },
	// 	{
	// 	  path: '/question',
	// 	  component: Layout,
	// 	  redirect: '/example/table',
	// 		uuid:"938d9fdc-b419-4c40-ba80-5d9a2986ce69",
	// 	  //name: 'question',
	// 	  meta: { title: 'question', icon: 'example',roles:"a" },
	// 	  children: [
	// 	    {
	// 	      path: 'question',
	// 	      name: 'Question',
	// 	      component: () => import('@/views/table/question'),
	// 	      meta: { title: '问题分页', icon: 'table',roles:"a" }
	// 	    }
	// 	  ]
	// 	},
	// 	{
	// 	  path: '/preliminaryScreening',
	// 	  component: Layout,
	// 	  redirect: '/example/table',
	// 		uuid:"941dedeb-235c-45d9-80f1-a0adf15733d1",
	// 	  //name: 'preliminaryScreening',
	// 	  meta: { title: 'question', icon: 'example' },
	// 	  children: [
	// 	    {
	// 	      path: 'preliminaryScreening',
	// 	      name: 'PreliminaryScreening',
	// 	      component: () => import('@/views/table/preliminaryScreening'),
	// 	      meta: { title: '初筛分页', icon: 'list' }
	// 	    }
	// 	  ]
	// 	},

	//{ path: '*', redirect: '/404', hidden: true }

]
//-----------------这里是主要菜单------------------------
export const asyncRouterMap = [{
		path: '',
		component: Layout,
		redirect: 'dashboard',
		name: 'Dashboard',
		//-----注意这里的hidden ，如果没有该属性，那这个路由将显示在左侧菜单，有的就不会显示在菜单栏
		//-----hidden: true,
		//-----
		meta: {
			//--这里的roles对应权限接口返回菜单的uuid，如果放回的菜单数组中包含该uuid就说明有权限
			roles: "938d9fdc-b419-4c40-ba80-5d9a2986ce69",
			title: '主菜单',
			icon: 'table',
		},
		children: [{
			path: 'dashboard',
			meta: {
				roles: "938d9fdc-b419-4c40-ba80-5d9a2986ce69",
				title: '分菜单',
				icon: 'table',
			},
			component: () => import('@/views/table/merchantsPaging')
		}]
	},
	/*
	{
		path: '',
		component: Layout,
		redirect: 'merchantsPaging',
		children: [{
			path: 'merchantsPaging',
			component: () => import('@/views/table/merchantsPaging'),
			//name: 'MerchantsPaging',
			meta: {
				title: '商户分页',
				icon: 'list',
				noCache: true
			}
		}]
	},
	*/
	{
		path: '/addmerchants',
		component: () => import('@/views/table/addmerchants'),
		//name: 'Addmerchants',
		hidden: true,
		meta: {
			roles: "938d9fdc-b419-4c40-ba80-5d9a2986ce69",
			title: '添加商户表',
			icon: 'form',
			noCache: true
		}
	},
	{
		path: '/addTore',
		component: () => import('@/views/table/addTore'),
		//name: 'AddTore',
		hidden: true,
		meta: {
			roles: "938d9fdc-b419-4c40-ba80-5d9a2986ce69",
			title: '添加门店',
			icon: 'component'
		}
	},
	{
		path: '/pylInto',
		component: () => import('@/views/table/pylInto'),
		//name: 'PylInto',
		hidden: true,
		meta: {
			roles: "938d9fdc-b419-4c40-ba80-5d9a2986ce69",
			title: '票易联进件',
			icon: 'tab'
		}
	},

	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
]
export default new Router({
	//mode: 'history', //后端支持可开
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRouterMap
})
