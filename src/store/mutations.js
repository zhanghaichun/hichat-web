import * as types from './mutations-types'
import {generateRoutes} from '../router/makeroute'
import {isEmpty} from "../util/utils";
import Vue from 'vue'

/**
 * @desc 在状态管理中， 只有 Mutations 能直接改变应用程序的状态，
 *       并且使用 ECMAScript 6 中的计算属性方式可以为 mutations 赋值。
 *       mutations 是通过 commit 方法提交的。
 */
export default {
  [types.INIT_USER](state,user){
    sessionStorage.setItem("user",JSON.stringify(user));
    //生成路由
    if(!isEmpty(user)){
      generateRoutes(user.userPermission,state);
    }
    Vue.set(state,'user',user);
  },
  
  /**
   * @desc 初始化 essay 对象 (JavaScript 中合理的变成规范就是那些最后需要赋值为对象的
   *       属性的初始化值可以置为 null. )
   * @param state
   * @param essay
   */
  [types.INIT_ESSAY](state,essay){
    
    /*
    * 将传递过来的载荷对象序列化， 并赋值给 sessionStorage 中的 essay 变量
    * sessionStorage 的声明周期是当前会话， 如果当前的浏览器关闭或者是当前
    * 标签页关闭，那么当前的 sessionStorage 将不复存在。
    * */
    sessionStorage.setItem("essay",JSON.stringify(essay));
    
    // 使用 Vue.set 方法为 state 对象的 essay 属性赋值。
    Vue.set(state,'essay',essay);
  },
  [types.INIT_ROUTE](state,route){
    sessionStorage.setItem("route",JSON.stringify(route));
    Vue.set(state,'route',route);
  },
}
