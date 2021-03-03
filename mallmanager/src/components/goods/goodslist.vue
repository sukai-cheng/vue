<template>
  <el-card class="box-card">
    <my-bread level1="商品管理" level2="商品列表"></my-bread>

    <!--搜索-->
    <el-row class="search-row">
      <el-col>
        <el-input
          @clear="loadGoodsList()"
          clearable
          placeholder="请输入内容"
          v-model="query"
          class="input-search"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchGoods()"
          ></el-button>
        </el-input>
        <el-button
          type="success"
          plain
          @click="$router.push({ name: 'goodsadd' })"
          >添加商品</el-button
        >
      </el-col>
    </el-row>

    <!--表格-->
    <el-table height="450px" :data="list" style="width: 100%">
      <el-table-column type="index"></el-table-column>

      <el-table-column prop="goods_name" label="商品名称"></el-table-column>

      <el-table-column
        prop="goods_price"
        label="商品价格(元)"
        width="100"
      ></el-table-column>

      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="80"
      ></el-table-column>

      <el-table-column label="创建日期" width="120">
        <template slot-scope="scope">{{
          scope.row.add_time | fmtDate
        }}</template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="showEditGoodsDia(scope.row)"
            circle
          ></el-button>
          <el-button
            plain
            size="mini"
            type="danger"
            @click="showDeleGoodsMsgBox(scope.row.id)"
            icon="el-icon-delete"
            circle
          ></el-button>
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
      :page-size="pagesize"
      :page-sizes="[10, 20, 30, 40]"
    >
    </el-pagination>
    <!-- 修改商品对话框 -->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="goods">
        <el-form-item label="商品名称" label-width="100px">
          <el-input
            disabled
            v-model="goods.goods_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="goods.goods_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" label-width="100px">
          <el-input v-model="goods.goods_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" label-width="100px">
          <el-input v-model="goods.goods_weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品介绍" label-width="100px">
          <el-input
            v-model="goods.goods_introduce"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pagenum: 1,
      total: 0,
      pagesize: 30,
      query: "",
      dialogFormVisibleEdit: false,
      goods: {
        goods_name: "test_goods_name2",
        goods_price: 20,
        goods_number: 30,
        goods_weight: 40,
        goods_introduce: "abc"
      }
    };
  },
  created() {
    this.getGoodList();
  },
  methods: {
    searchGoods() {
      this.getGoodList();
    },
    async editGoods(GoodsId) {
      const res = await this.$http.put(`goods/${GoodsId}`);
    },
    showEditGoodsDia(goods) {
      this.goods = goods;
      this.dialogFormVisibleEdit = true;
    },
    async getGoodList() {
      this.$http.defaults.headers.common[
        "Authorization"
      ] = localStorage.getItem("token");
      const res = await this.$http.get(
        `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      const {
        meta: { status },
        data: { goods, total }
      } = res.data;
      if (status === 200) {
        console.log(res);
        this.list = goods;
        this.total = total;
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.pagenum = 1;
      this.getGoodList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getGoodList();
    }
  }
};
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
