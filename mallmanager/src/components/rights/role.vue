<template>
  <el-card>
    <!--  面包屑  -->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row class="addrolebtn">
      <el-col>
        <el-button type="info">添加角色</el-button>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table
      :data="rolelist"
      height="500px"
      style="width: 100%">

      <el-table-column
        type="expand"
        width="150">
        <template slot-scope="scope">
          <el-row v-for="(item1,i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag @close="deleRight(scope.row,item1.id)" closable>{{ item1.authName }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2,i) in item1.children" :key="i">
                <el-col :span="4">
                  <el-tag @close="deleRight(scope.row,item2.id)" closable type="success">{{
                      item2.authName
                    }}
                  </el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag @close="deleRight(scope.row,item3.id)" closable type="warning"
                          v-for="(item3,i) in item2.children" :key="i">
                    {{ item3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length === 0">未分配权限</span>
        </template>
      </el-table-column>

      <el-table-column
        type="index"
        label="#"
        width="150">
      </el-table-column>

      <el-table-column
        prop="roleName"
        label="角色名称"
        width="200">
      </el-table-column>

      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="200">
      </el-table-column>

      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEdituserDia(scope.row)"
                     circle></el-button>
          <el-button plain size="mini" type="danger" @click="showDeleUserMsgBox(scope.row.id)" icon="el-icon-delete"
                     circle></el-button>
          <el-button plain size="mini" type="success" icon="el-icon-check" @click="showSetUserRoleDia(scope.row)"
                     circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
      <!--      :default-checked-keys="[5]"-->
      <el-tree
        ref="tree"
        :data="treelist"
        show-checkbox
        node-key="id"
        :default-expanded-keys="arrexpand"
        :default-checked-keys="arrchecked"

        :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRight()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>

export default {
  data() {
    return {
      rolelist: [],
      dialogFormVisibleRight: false,
      treelist: [],
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      arrexpand: [],
      arrchecked: [],
      currRoleId: -1
    }
  },
  created() {
    this.getRolelist()
  },
  methods: {

    async setRoleRight() {
      let checkedKeys1 = this.$refs.tree.getCheckedKeys()
      let checkedKeys2 = this.$refs.tree.getHalfCheckedKeys()
      let checkedKeys = [...checkedKeys1,...checkedKeys2]
      const res = await this.$http.post(`roles/${this.currRoleId}/rights`, {rids: checkedKeys.join(',')})
      this.dialogFormVisibleRight = false
      this.getRolelist()
    },
    async showSetUserRoleDia(role) {
      this.currRoleId = role.id
      const res = await this.$http.get(`rights/tree`)
      this.treelist = res.data.data
      let arrtemp1 = []
      this.treelist.forEach(item1 => {
        arrtemp1.push(item1.id)
        item1.children.forEach(item2 => {
          arrtemp1.push(item2.id)
          item2.children.forEach(item3 => {
            arrtemp1.push(item3.id)
          })
        })
      })

      let arrtemp2 = []
      role.children.forEach(item1 => {
        // arrtemp2.push(item1.id)
        item1.children.forEach(item2 => {
          // arrtemp2.push(item2.id)
          item2.children.forEach(item3 => {
            arrtemp2.push(item3.id)
          })
        })
      })
      this.arrchecked = arrtemp2
      this.arrexpand = arrtemp1
      this.dialogFormVisibleRight = true

    },
    async deleRight(role, rightId) {
      let roleId = role.id;
      const res = await this.$http.delete(`roles/${roleId}/rights/${rightId}`)
      role.children = res.data.data;
    },
    async getRolelist() {
      const res = await this.$http.get('roles')
      this.rolelist = res.data.data
    }
  },
  name: "role"
}
</script>

<style scoped>
.addrolebtn {
  margin-top: 30px;
}
</style>
