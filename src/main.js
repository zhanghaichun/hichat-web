import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/store'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入
import {isEmpty, isLogin,hasPermission} from "./util/utils";
import {isOnline} from "./api/api";
import VCharts from 'v-charts'
const whiteList = ['/login'] //白名单,不需要登录的路由
Vue.use(VCharts);
Vue.prototype.hasPerm = hasPermission;
Vue.prototype.$http = Axios;
Vue.use(preview,{
  closeOnScroll:false,
  closeOnVerticalDrag:false,
});
Vue.use(ElementUI);
Vue.config.productionTip = false

router.beforeEach((to,from,next) => {
  NProgress.start();
  //判断是否已经登陆过
  if(isLogin()){
    //已经登陆过
    if(to.path === "/login"){
      next("/index");
      NProgress.done()
    }else if(isEmpty(store.state.user)){
        //还没初始化用户则重新初始化
      let user = sessionStorage.getItem("user");
      if(!isEmpty(user)){
        store.dispatch('initUser', JSON.parse(user)).then(()=>{
          next({...to})
          NProgress.done()
        });
      }else{
        isOnline().then((res)=>{
          if(res.status === 200){
            store.dispatch('initUser', res.data).then(()=>{
              next({...to})
              NProgress.done()
            });
          }
        })
      }

    }else{
      next();
      NProgress.done()
    }
  }else if(whiteList.indexOf(to.path)!==-1){
    next();
    NProgress.done()
  }else {
    //未登录 则跳转到登录页
    next('/login');
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created(){
    
   
    /**
     * 在组件创建完成后，去浏览器的 sessionStorage 中检索名字为 essay
     * 的项， 如果有 essage 项， 则触发名字是 initEssay 的 action。
     */
    let essay = sessionStorage.getItem("essay");
    
    // 将 essay 解析为对象， 然后当做 payload 传递给 action.
    this.$store.dispatch('initEssay', JSON.parse(essay));
  }
})
