<template>

	<el-card>
		<!-- 面包屑 -->
		<my-bread level1='商品管理' level2='商品分类' class="my-bread"></my-bread>

		<!-- 添加分类 -->
		<el-row>
			<el-col :span="24" class="searchArea">
				<p />
				<el-button type="success" @click='addGoodsCate()'>添加分类</el-button>
			</el-col>
		</el-row>


		<!-- 添加分类 -->
		<el-dialog title="添加分类" :visible.sync="dialogFormVisibleAdd">
			<el-form :model="form">
				<el-form-item label="分类名称" :label-width="formLabelWidth">
					<el-input v-model="form.cat_name" autocomplete='off'></el-input>
				</el-form-item>
				<!-- 级联选择器(表单元素) -->
				<el-form-item label="分类" :label-width="formLabelWidth">
					<el-cascader expand-trigger="hover" clearable :options="caslist" v-model="selectedOptions" :props="defaultProp">
					</el-cascader>
				</el-form-item>
			</el-form>
			<div slot='footer' class="dialog-footer">
				<el-button @click="dialogFormVisibleAdd = false">取消</el-button>
				<el-button type="primary" @click='addCate()'>确定</el-button>
			</div>
		</el-dialog>
		<!-- 表格 -->
		<el-table :data="list" height="450" style="width: 100%">
			<!-- <el-table-column label="分类名称" prop="cat_name"></el-table-column> -->
			<!--
			treeKey -> nodekey ->节点唯一标识idparentKey ->父节点的id
			leveLKey ->当前节点的级别
			childKey ->子节点
			-->
			<el-tree-grid prop="cat_name" label="分类名称" treeKey="cat_id" parentKey="cat_pid" levelKey="cat_level" childKey="children">
			</el-tree-grid>

			<el-table-column prop="date" label="级别" width="180">
				<template slot-scope='scop'>
					<span v-if="scop.row.cat_level===0">一级</span>
					<span v-else-if="scop.row.cat_level===1">二级</span>
					<span v-else-if="scop.row.cat_level===2">三级</span>
				</template>
			</el-table-column>
			<el-table-column label="是否有效">
				<template slot-scope='scop'>
					<span v-if="scop.row.cat_deleted===false">有效</span>
					<span v-else-if="scop.row.cat_deleted===true">无效</span>
				</template>
			</el-table-column>

			<el-table-column label="操作" prop="desc">
				<el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click='showEditUserDia(scope.row)'></el-button>
				<el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showDeleUserMsgBox(scope.row.id)"></el-button>
			</el-table-column>
		</el-table>
		</el-scrollbar>
		<!-- 分页 -->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
		 :page-sizes="[4,10,20,30]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
	</el-card>

</template>

<script>
	//局部引入npm install element-tree-grid --save
	var ElTreeGrid = require('element-tree-grid');
	export default {
		//局部注册，组件名为<el-tree-grid>
		components: {
			ElTreeGrid
		},
		data() {
			return {
				list: [],
				pagenum: 1,
				pagesize: 10,
				total: 1,
				dialogFormVisibleAdd: false,
				form: {
					cat_pid: -1,
					cat_name: "",
					cat_level: -1
				},
				formLabelWidth: "140px",
				// 级联选择器要用的数据
				caslist: [],
				// 级联选择器选择的数据
				selectedOptions: [],
				defaultProp: {
					label: 'cat_name',
					value: 'cat_id',
					children: 'children'
				}
			};
		},
		created() {
			this.getGoodsCate();

		},
		methods: {

			//添加分类 - 发送请求
			async addCate() {
				// cat_pid分类父ID不能为空
				// cat_name分类名称不能为空
				// cat_Level分类层级不能为空
				//三种情况
				// 1．一级分类 seLectedOptions.Length==0 cat_pid=0 cat_level=0
				//2．二级分类 seLectedOptions.Length==1 cat_pid=seLectedOptions[0] cat_level=1
				//3．三级分类 seLectedOptions.Length==2 cat_pid=seLectedOptions[1] cat_level=2
				if (this.selectedOptions.length === 0) {
					this.form.cat_pid = 0;
					this.form.cat_level = 0;
				} else if (this.selectedOptions.length === 1) {
					this.form.cat_pid = this.selectedOptions[0];
					this.form.cat_level = 1;
				} else if (this.selectedOptions.length === 2) {
					this.form.cat_pid = this.selectedOptions[1];
					this.form.cat_level = 2;
				}
				const res = await this.$http.post('categories', this.form);
				console.log(res);
				//更新视图
				this.getGoodsCate();
				//关闭对话框
				this.dialogFormVisibleAdd = false;
				//清空form表单
				this.form={};
				//提示
				if(res.data.meta.status===201){
					this.$message.success("添加成功");
				}else{
					this.$message.error("添加失败");
				}
			},
			//添加分类 -显示对话框
			async addGoodsCate() {
				//获取二级分类
				const res = await this.$http.get(`categories?type=2`);
				this.caslist = res.data.data;
				console.log(this.caslist);
				this.dialogFormVisibleAdd = true;
			},
			//获取所有分类
			async getGoodsCate() {
				const res = await this.$http.get(
					'categories?type=3&pagenum=' + this.pagenum + '&pagesize=' + this.pagesize
				);
				// console.log(res);
				this.list = res.data.data.result;
				//console.log(this.list);
				this.total = res.data.data.total;
				// console.log(this.total);
			},
			//分页的相关方法
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
				this.pagesize = val;
				this.pagenum = 1;
				this.getGoodsCate();
			},
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.pagenum = val;
				this.getGoodsCate();
			}
		}
	}
</script>

<style scoped>
	/* 取消 el-tree-grid的默认图标*/
	.el-icon-folder:before {
		content: '';
	}
  .my-bread{
    margin-bottom: 30px;
  }
</style>
