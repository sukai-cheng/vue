<template>
  <el-card class="box-card">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-row class="search-row">
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="input-search">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <!--slot-scope自动去上级查找绑定的数据-->
        <template slot-scope="userList">
          {{ userList.row.create_time | fmtDate }}
        </template>

      </el-table-column>
      <el-table-column
        label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          <el-button plain size="mini" type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      pagenum: 1,
      pagesize: 5,
      userList: [],
      total: 0,
      query: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }]
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      //设置请求头
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      )
      const {meta: {status, msg}, data: {users, total}} = res.data
      if (status === 200) {
        this.userList = users
        this.total = total
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}

.input-search {
  width: 300px;
}

.search-row {
  margin-top: 20px;
}
</style>
