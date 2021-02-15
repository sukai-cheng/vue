<template>
  <el-container class="container">
    <!--  导航栏  -->
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img class="avatar-img" src="~@/assets/avatar.png" alt="">
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <h3 class="title">电商后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a href="" @click.prevent="handleLogout()" class="login-out">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <!--  侧边栏  -->
      <el-aside class="aside" width="200px">
        <!--开启路由-->
        <el-menu
          :router="true"
          :unique-opened="true">

          <el-submenu :index="''+item1.order" v-for="(item1,index) in menus" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>

            <el-menu-item :index="item2.path" v-for="(item2,index) in item1.children" :key="index">
              <i class="el-icon-circle-check"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>

          </el-submenu>

        </el-menu>
      </el-aside>
      <!--   内容展示区   -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {

  data(){
    return {
      menus:[]
    }
  },
  //有实例之前自动触发
  beforeCreate() {
    //获取token
    const token = localStorage.getItem('token')

    if (!token) {
      this.$router.push({name: 'login'})
    }


  },
  created() {
    this.getMenus()
  },
  methods: {
    async getMenus() {
      const res = await this.$http.get(`menus`)
      console.log(res)
      this.menus = res.data.data
    },
    handleLogout() {
      localStorage.clear()
      this.$message.success("退出成功")
      this.$router.push('login')
    }
  }

}
</script>

<style scoped>

.avatar-img {
  height: 60px;
  width: 60px;
}

.middle {
  line-height: 60px;
}

.login-out {
  text-decoration: none;
  line-height: 60px;
}

.container {
  height: 100vh;
}

.title {
  font-weight: 700;
  text-align: center;
  line-height: 60px;
}

.header {
  background-color: #b3c0d1
}

.aside {
  background-color: #d3dcd6
}

.main {
  background-color: #e5eef3
}
</style>
