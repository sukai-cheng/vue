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
        <el-input @clear="loadUserList()" clearable placeholder="请输入内容" v-model="query" class="input-search">
          <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
        </el-input>
        <el-button type="success" @click="showAddUserDia()">添加用户</el-button>
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

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :current-page="pagenum"
      :page-size="2"
      :page-sizes="[1, 2, 3, 4]"
    >
    </el-pagination>

    <!--    对话框-->
    <!--    添加用户的对话框-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisibleAdd: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
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
    async addUser(){
      const res = await this.$http.post('users',this.form)
      console.log(res)
      const {meta:{status,msg},data} = res.data
      if(status === 201){
        //1.提示成功
        this.$message.success(msg)
        //更新视图
        this.loadUserList()
        this.form = {}
        /*
        * for(const key in this.form){
        *   if(this.form.hasOwnProperty(key){
        *      this.form[key] = ""
        * }
        * */
      }else{
        this.$message.warning(msg)
      }
      this.dialogFormVisibleAdd = false
    },
    showAddUserDia() {
      this.dialogFormVisibleAdd = true
    },
    //清空搜索框，重新获取数据
    loadUserList() {
      this.getUserList()
    },
    searchUser() {
      this.getUserList()
    },
    //分页方法
    handleSizeChange(val) {
      this.pagesize = val
      this.pagenum = 1
      this.getUserList()

    },
    handleCurrentChange(val) {
      this.pagenum = val
      this.getUserList()
    },
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
        // this.$message.success(msg)
      } else {
        // this.$message.warning(msg)
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
