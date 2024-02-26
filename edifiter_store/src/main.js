import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/style/base.css'
import 'vant/lib/index.css'
// import store from './store'

// 按需引入组件库
import { Search } from 'vant'
import { Swipe, SwipeItem } from 'vant'
import { CountDown } from 'vant'
import { NavBar } from 'vant'
import { Icon } from 'vant'
import { Lazyload } from 'vant'
import { Tab, Tabs } from 'vant'
import { Grid, GridItem } from 'vant'
import { Field } from 'vant'
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant'
import { Button } from 'vant'
import { SubmitBar } from 'vant'
import { RadioGroup, Radio } from 'vant'
import { Checkbox, CheckboxGroup } from 'vant'
import { DropdownMenu, DropdownItem } from 'vant'
import { Stepper } from 'vant'
import { Popup } from 'vant'
import { Cell, CellGroup } from 'vant'
import { Toast } from 'vant'
import { Sidebar, SidebarItem } from 'vant'
import { Image as VanImage } from 'vant'
import { AddressEdit } from 'vant'


Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(CountDown)
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Lazyload)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Field)
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)
Vue.use(Button)
Vue.use(SubmitBar)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Stepper)
Vue.use(Popup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Toast)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(VanImage)
Vue.use(AddressEdit)

new Vue({
	// store,
	router,
	render: (h) => h(App), // App 根组件
}).$mount('#app')
