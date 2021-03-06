<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!-- 文字说明 -->
    <el-alert
      class="alert"
      title="添加商品信息"
      type="success"
      center
      show-icon
    ></el-alert>
    <!-- 步骤条 -->
    <el-steps
      :active="1 * active"
      finish-status="success"
      simple
      style="margin-top:20px"
    >
      <el-step title="商品参数"></el-step>
      <el-step title="基本信息"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 表单 -->
    <el-form
      label-position="top"
      label-width="80px"
      :model="form"
      style="height:400px;overflow:auto;"
    >
      <!-- 切换标签 -->
      <el-tabs
        @tab-click="tabChange()"
        v-model="active"
        tab-position="left"
        style="margin-top:20px"
      >
        <el-tab-pane name="1" label="商品参数">
          <!-- 显示的是该三级分类的商品参数 -->
          <el-form-item
            :label="item1.attr_name"
            :key="i"
            v-for="(item1, i) in arrDyparams"
          >
            <!-- 复选框组 -->
            <el-checkbox-group v-model="item1.attr_vals">
              <el-checkbox
                border
                v-for="(item2, i) in item1.attr_vals"
                :key="i"
                :label="item2"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>

          <el-form-item label="商品分类">
            <!-- 级联显示框 -->
            <el-cascader
              clearable
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange"
              :props="defaultProps"
            >
            </el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
          <!-- 静态参数的数据 -->
          <el-form-item
            :label="item.attr_name"
            v-for="(item, i) in arrStaticparams"
            :key="i"
          >
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
          <el-form-item>
            <!-- baseUrl axios发的请求 -->
            <el-upload
              action="http://127.0.0.1:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :headers="headers"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png格式</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">
          <el-form-item>
            <!-- 表单元素 -->
            <el-button type="primary" @click="addGoods">添加商品</el-button>
            <!-- 富文本编辑器(需要用到富文本) -->
            <quill-editor v-model="form.goods_introduce"></quill-editor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
import myBread from "../custom/myBread.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  //局部注册富文本编辑器的组件
  data() {
    return {
      arrStaticparams: [],
      active: "1",
      headers: {
        Authorization: localStorage.getItem("token")
      },
      // id
      // goods_name
      // goods_price
      // goods_number
      // goods_weight
      // goods_introduce
      // pics
      // attrs
      form: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        goods_cat: "",
        pics: [],
        attrs: []
      },
      arrDyparams: [],
      // 级联选择器绑定的数据
      options: [],
      selectedOptions: [1, 3, 6],
      defaultProps: {
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
    handleClick() {},
    //添加商品
    async addGoods() {
      //将数组转换成以逗号分割的字符串
      this.form.goods_cat = this.selectedOptions.join(",");

      const res = await this.$http.post(`goods`, this.form);
      console.log(res);
    },
    //图片上传的相关方法
    //data.tmp_path
    //response.data.tmp_path
    handlePreview(file) {},
    handleRemove(file) {
      console.log("移除");
      //findIndex符合条件的索引进行返回
      let Index = this.form.pics.findIndex(item => {
        return item.pic === file.response.data.tmp_path;
      });
      this.form.pics.splice(Index, 1);
      console.log(this.form.pics);
    },
    handleSuccess(file) {
      console.log("成功");
      this.form.pics.push({
        pic: file.data.tmp_path
      });
    },
    // 点击不同的tabs触发方法
    async tabChange() {
      if (this.active === "1") {
        if (this.selectedOptions.length !== 3) {
          this.$message.warning("请先选择商品的三级分类");
          return;
        }
        const res = await this.$http.get(
          //manys表示动态参数的数据
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        this.arrDyparams = res.data.data;
        this.arrDyparams.forEach(item => {
          item.attr_vals.length === 0
            ? []
            : (item.attr_vals = item.attr_vals.trim().split(","));
        });
      } else if (this.active === "3") {
        if (this.selectedOptions.length !== 3) {
          this.$message.warning("请先选择商品的三级分类");
          return;
        }
        //获取静态参数的数据
        const res = await this.$http.get(
          //only表示动态参数的数据
          `categories/${this.selectedOptions[2]}/attributes?sel=only`
        );
        this.arrStaticparams = res.data.data;
      }
    },
    handleChange() {},
    async getGoodCate() {
      const res = await this.$http.get(`categories?type=3`);
      this.options = res.data.data;
    }
  },
  components: { myBread, quillEditor }
};
</script>

<style>
.alert {
  margin-top: 30px;
}

.ql-editor {
  min-height: 250px;
}
</style>
