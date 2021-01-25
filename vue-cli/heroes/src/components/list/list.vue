<template>
  <div>
    <div class="panel panel-default">
      <h2 class="sub-header">Hero List</h2>
      <a class="btn btn-success" @click.prevent="showAddVue()">Add</a>
      <table class="table">
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(v,i) in list" :key="i">
          <th scope="row">{{ v.id }}</th>
          <td>{{ v.name }}</td>
          <td>{{ v.age }}</td>
          <td>{{ v.gender }}</td>
          <td>
            <a href="" @click.prevent="editItem(v.id)">edit</a>&nbsp;&nbsp;
            <a
              @click.prevent="deleteItem(v.id)"
            >delete</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {

    editItem(ID){

      this.$router.push({
        name: 'edit',
        params:{id:ID} //重点-动态路由
      })
    },
    showAddVue() {
      //js修改标识->编程式导航
      this.$router.push({
        name:'add',//找到路由配置中name为add的路由配置
      })
    },
    deleteItem(ID) {
      if (confirm('Sure?')) {
        axios.delete(' http://localhost:3001/users/' + ID)
          .then(res => {
            //更新视图
            this.getData()
          })
      }
    },
    getData() {
      axios.get(' http://localhost:3001/users')
        .then(res => {
          const {status, data} = res;
          if (status === 200) {
            this.list = data
          }
        })
    }

  }
}
</script>

<style>

</style>

