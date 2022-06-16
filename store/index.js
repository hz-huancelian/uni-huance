import Vue from 'vue';
import Vuex from 'vuex';
import state from './state.js';
import mutation from './mutation.js';
import getters from './getters.js';
import actions from './actions.js';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: state,
	mutations: mutation,
	getters: getters,
	actions: actions,
	plugins: [
	],	
})
// window.store = store;
export default store
