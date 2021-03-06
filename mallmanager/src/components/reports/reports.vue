<template>
  <el-card>
    <my-bread level1="数据统计" level2="数据报表"></my-bread>
    <!-- 提供echarts的容器，需要指定固定宽高 -->
    <div id="min" style="width: 600px; height: 400px;"></div>
  </el-card>
</template>

<script>
// 导入echarts
var echarts = require("echarts");
export default {
  data() {
    return {};
  },
  mounted() {
    this.useEchart();
  },
  methods: {
    async useEchart() {
      //getElementById() 在mounted()中操作
      var myChart = echarts.init(document.getElementById("min"));

      //获取表格数据
      const res = await this.$http.get("reports/type/1");
      let option2 = res.data.data;
      console.log(res);
      myChart.setOption(option2);
    }
  }
};
</script>

<style></style>
