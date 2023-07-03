import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: {
		setting:[],
	},
	mutations: {
		pushSetting(state,data){
			console.log('satate',state,data)
			state.setting.push(data)
		},
		setSetting (state,data) {
			state.setting = data;
		}
	}
})
export default store
