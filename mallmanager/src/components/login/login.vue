<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formData">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handleLogin()" class="login-btn" type="primary">登录</el-button>
    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // handleLogin(){
    //   /* 这是一个异步操作，所有的异步操作有结果的位置都在函数里边 */
    //   this.$http.post('login',this.formData).then(res => {
    //    //在代码的这里才可以拿到函数的结果
    //     //希望让异步操作的代码看起来像同步代码
    //     const {
    //       data,meta:{msg,status} //对象的结构赋值
    //     } = res.data
    //
    //     if(status === 200){
    //        this.$router.push({name:'home'})
    //       //elementUI在vue实例上添加了一个方法$message
    //        this.$message.success(msg)
    //     }else{
    //       this.$message.warning(msg)
    //     }
    //   })
    // }
    //通过ES7中的async和await来执行异步操作
    //async让异步操作看起来像同步操作离await最近的函数放置
    //await在异步操作有结果的地方放置await
    async handleLogin() {
      const res = await this.$http.post('login', this.formData)

      const {
        data,
        meta: {msg, status}
      } = res.data

      if (status === 200) {
        localStorage.setItem('token',data.token)
        this.$router.push({name:'home'})
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style scoped>
.login-wrap {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}

.login-wrap .login-form .login-btn {
  width: 100%;
}
</style>
