<template>
  <div id="app">
    <app-nav></app-nav>
    <div class="section">
      <app-slider></app-slider>
<!--      <app-list></app-list>-->
      <router-view></router-view>
    </div>

  </div>
</template>

<script>

/*导入组件*/
import appNav from './components/common/appnav.vue'
import appSlider from "./components/common/appslider.vue";
import appList from './components/list/list.vue'

/*导出对象*/
export default {
  name: 'app',
  data() {
    return {}
  },
  //通过选项注册组件
  components: {
    appNav,
    appSlider,
    appList
  }
}
</script>

<style>
.section {
  display: grid;
  grid-template-columns: 300px 1380px;
  }
</style>
