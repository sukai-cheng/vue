<template>
  <div class="edit-container">
    <div class="add-container">
      <h2 class="sub-header">Edit Hero</h2>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail">英雄名字</label>
          <input v-model="formdata.name" type="text" class="form-control" id="exampleInputEmail" placeholder="英雄名称">
        </div>
        <div class="form-group">
          <label for="exampleInputGender">英雄性别</label>
          <input v-model="formdata.gender" type="text" class="form-control" id="exampleInputGender" placeholder="英雄性别">
        </div>
        <div class="form-group">
          <label for="exampleInputAge">英雄年龄</label>
          <input v-model="formdata.age" type="text" class="form-control" id="exampleInputAge" placeholder="英雄年龄">
        </div>
        <button type="submit" class="btn btn-success" @click.prevent="handleEditHero()">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      formdata: {}
    }
  },
  mounted() {
    this.getHeroById();
  },
  methods: {
    getHeroById() {
      axios.get('http://localhost:3001/users/' + this.$route.params.id)
        .then(res => {
          // console.log(res.data)
          this.formdata = res.data;
        })
    },
    handleEditHero() {
      axios.put('http://localhost:3001/users/' + this.$route.params.id, this.formdata)
        .then((res) => {
          this.$router.push({name: 'heroes'})
        })
    }
  },
}
</script>

<style scoped>
.edit-container {
  margin-left: 50px
}
</style>
