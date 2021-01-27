<template>
  <el-container class="container">
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
      <el-aside class="aside" width="200px">
        <el-menu
          :router="true"
          :unique-opened="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>

            <el-menu-item index="users">
              <i class="el-icon-circle-check"></i>
              <span>用户列表</span>
            </el-menu-item>

          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>

            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>权限列表</span>
            </el-menu-item>

          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>

            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>商品分类</span>
            </el-menu-item>

          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>

            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>订单报表</span>
            </el-menu-item>

          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>

            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>数据报表</span>
            </el-menu-item>

          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {


  //有实例之前自动触发
  beforeCreate() {
    //获取token
    const token = localStorage.getItem('token')

    if (!token) {
      this.$router.push({name: 'login'})
    }


  },
  methods:{
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
