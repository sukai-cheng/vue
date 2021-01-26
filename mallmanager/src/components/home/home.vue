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
            <a href="" class="login-out">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {}
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
