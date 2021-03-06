<template>
  <el-card>
    <my-bread level1="商品管理" level2="分类参数"></my-bread>
    <el-alert
      class="alert"
      title="只允许为第三级分类设置参数"
      type="error"
    ></el-alert>
    <!-- 级联选择器 -->
    <el-cascader
      :show-all-levels="false"
      style="margin-top:20px"
      clearable
      expand-trigger="hover"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange"
      :props="defaultProp"
    >
    </el-cascader>
    <!-- Tab (必须选择三级分类才会发请求) -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="1">
        <!-- 按钮 -->
        <el-button type="danger">设置动态参数</el-button>
        <!-- 展开功能的表格 -->
        <el-table style="width:100%" :data="arrDyparams">
          <el-table-column type="expand" label="#">
            <template slot-scope="scope">
              <!-- el-tag -->
              <el-tag
                style="margin:10px"
                :key="tag"
                v-for="tag in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row, tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ New Tag</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="属性名称" prop="attr_name"> </el-table-column>
          <el-table-column label="操作" prop="desc">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="showEdituserDia(scope.row)"
                circle
              ></el-button>

              <el-button
                plain
                size="mini"
                type="danger"
                @click="showDeleUserMsgBox(scope.row.id)"
                icon="el-icon-delete"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">
        <!-- 按钮 -->
        <el-button type="danger">设置静态参数</el-button>
        <!-- 表格 -->
        <el-table style="width:100%" :data="arrStatparams">
          <el-table-column type="index" label="#"> </el-table-column>
          <el-table-column label="属性名称" prop="attr_name"> </el-table-column>
          <el-table-column label="属性值" prop="attr_vals"> </el-table-column>
          <el-table-column label="操作" prop="desc">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="showEdituserDia(scope.row)"
                circle
              ></el-button>

              <el-button
                plain
                size="mini"
                type="danger"
                @click="showDeleUserMsgBox(scope.row.id)"
                icon="el-icon-delete"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
import myBread from "../custom/myBread.vue";
export default {
  components: { myBread },
  data() {
    return {
      inputValue: "",
      inputVisible: false,
      list: [],
      activeName: "1",
      arrDyparams: [],
      arrStatparams: [],
      // 级联选择器绑定的数据
      options: [],
      selectedOptions: [],
      defaultProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      }
    };
  },
  created() {
    this.getGoodCate();
  },
  methods: {
    async handleClose(scopeData, tag) {
      scopeData.attr_vals.splice(scopeData.attr_vals.indexOf(tag), 1);
      //axios请求修改数据
      let putData = {
        attr_name: scopeData.attr_name,
        attr_sel: "many",
        attr_vals: scopeData.attr_vals.join(",")
      };
      //发送请求
      const res = await this.$http.put(
        "categories/" +
          this.selectedOptions[2] +
          "/attributes/" +
          scopeData.attr_id,
        putData
      );
    },
    async handleInputConfirm(scopeData) {
      let inputValue = this.inputValue;
      if (inputValue) {
        scopeData.attr_vals.push(inputValue);
        //axios请求修改数据
        let putData = {
          attr_name: scopeData.attr_name,
          attr_sel: "many",
          attr_vals: scopeData.attr_vals.join(",")
        };
        const res = await this.$http.put(
          "categories/" +
            this.selectedOptions[2] +
            "/attributes/" +
            scopeData.attr_id,
          putData
        );
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    async handleClick() {
      if (this.activeName === "2") {
        if (this.selectedOptions.length === 3) {
          //获取静态参数数据
          const res = await this.$http.get(
            `categories/${this.selectedOptions[2]}/attributes?sel=only`
          );
          this.arrStatparams = res.data.data;
        }
      }
    },

    async handleChange() {
      if (this.selectedOptions.length === 3) {
        //获取动态参数
        //级联选择器选项发生改变时，同时，选择了三级分类
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );

        this.arrDyparams = res.data.data;
        this.arrDyparams.forEach(item => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(",");
        });
      }
    },
    //获取三级分类
    async getGoodCate() {
      const res = await this.$http.get(`categories?type=3`);
      this.options = res.data.data;
    }
  }
};
</script>
<style>
.alert {
  margin-top: 20px;
}
</style>
