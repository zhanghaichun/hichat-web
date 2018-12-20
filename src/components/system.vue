<template>
  <div>
    <el-menu router :default-active="activeIndex"  class="el-menu-demo" mode="horizontal" v-for="(item, index) in routes[0].children" v-if="item.name=='system'" :key="index">
      <el-menu-item :index="routes[0].path+'/'+item.path+'/'+child.path"  v-for="(child, inde) in item.children" v-if="!item.hidden" :key="index">
        {{child.meta.title}}
      </el-menu-item>
    </el-menu>
    <div style="margin-top: 15px;">
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex'
    export default {
      computed: {
        ...mapState({
          routes: state => state.route
        })
      },
      data(){
        return {
          activeIndex:"/index/system/employee"
        }
      },
      methods:{
      }
    }
</script>

<style>
</style>
