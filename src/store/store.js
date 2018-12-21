import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
Vue.use(Vuex);

/**
 * @desc 在 Store 中， state 是唯一一个会根据模块组合时的别名来添加层级的。
 *       state 状态中存储的这些对象， 都是用 sessionStorage 来存储的。
 */
const state={
  user:null,
  essay:null,
  route:null
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
