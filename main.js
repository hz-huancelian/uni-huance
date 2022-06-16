import Vue from 'vue'
import App from './App'
import store from './store/index.js';
import * as Api from './config/api.js'
import * as Db from './config/db.js'
import * as Common from './config/common.js'
import * as Config from './config/config.js'

import uView from 'uview-ui'
Vue.use(uView)

import tabBar from 'components/tabBar/index.vue'
Vue.component('tabBar', tabBar)

Vue.prototype.$api = Api;
Vue.prototype.$common = Common;
Vue.prototype.$db = Db;
Vue.prototype.$config = Config;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
