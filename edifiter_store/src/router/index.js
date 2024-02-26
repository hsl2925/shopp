import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Index',
		component: () => import('@/pages/index/index.vue')
	},
	{
		path: '/category',
		name: 'Category',
		component: () => import('@/pages/category/category.vue')
	}, {
		path: '/cart',
		name: 'Cart',
		component: () => import('@/pages/cart/cart.vue')
	}, {
		path: '/profile',
		name: 'Profile',
		component: () => import('@/pages/profile/profile.vue'),
		// children: [{
		// 	path: '/profile/address',
		// 	name: 'Address',
		// 	component: () => import('@/pages/profile/componend/address.vue')
		// }, {
		// 	path: 'member',
		// 	name: 'Member',
		// 	component: () => import('@/pages/profile/componend/member.vue')
		// }]
	},
	{
		path: '/stroll',
		name: 'Stroll',
		component: () => import('@/pages/stroll/stroll.vue'),
		children: [{
			path: 'strollDetail',
			component: () => import('@/pages/stroll/strollDetail.vue')
		}]
	},
	{
		path: '/address',
		name: 'Address',
		component: () => import('@/pages/profile/componend/address.vue')
	},
	{
		path: '/add_address',
		name: 'Add',
		component: () => import('@/pages/profile/componend/addAddress.vue')
	},
	{
		path: '/member',
		name: 'Member',
		component: () => import('@/pages/profile/componend/member.vue')
	},
	{
		path: '/productId',
		name: 'ProductId',
		component: () => import('@/pages/index/componend/indexStoreDetail.vue')
	},
	{
		path: '/allProduct',
		name: 'AllProduct',
		component: () => import('@/pages/category/component/allProduct.vue')
	},
	{
		path: '/indexSearch',
		name: 'indexSearch',
		component: () => import('@/pages/index/componend/indexSearch.vue')
	},
	{
		path: '/confirmOrder',
		name: 'ConfirmOrder',
		component: () => import('@/pages/index/componend/confirmOrder.vue')
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/components/login.vue')
	},
	{
		path: '/strollDetail',
		component: () => import('@/pages/stroll/strollDetail.vue')
	}
]


const router = new VueRouter({
	routes
})

export default router