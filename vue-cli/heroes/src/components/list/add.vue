<template>
  <div class="add-container">
    <h2 class="sub-header">Add Hero</h2>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail">英雄名字</label>
        <input v-model="formData.name" type="text" class="form-control" id="exampleInputEmail" placeholder="英雄名称">
      </div>
      <div class="form-group">
        <label for="exampleInputGender">英雄性别</label>
        <input v-model="formData.gender" type="text" class="form-control" id="exampleInputGender" placeholder="英雄性别">
      </div>
      <div class="form-group">
        <label for="exampleInputAge">英雄年龄</label>
        <input v-model="formData.age" type="text" class="form-control" id="exampleInputAge" placeholder="英雄年龄">
      </div>
      <button type="submit" class="btn btn-success" @click.prevent="handleAddHero()">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      formData: {
        name: '',
        gender: '',
        age: ''
      }
    }
  },
  methods: {
    //添加 - 处理表单提交
    handleAddHero() {
      //1. 获取表单数据

      //2. axios.post
      axios.post('http://localhost:3001/users', this.formData).then(res => {
        this.$router.push({name: 'heroes'})
      })
      //3. 回到list组件
    }
  }
}
</script>

<style scoped>
.add-container {
  margin-left: 50px;
}
</style>
