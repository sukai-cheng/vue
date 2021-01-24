<template>
  <ul class="nav nav-pills nav-stacked custom">
    <li role="presentation" class="cus-title"><a href="">Overview</a></li>
    <li role="presentation" id="bar-1"><a href="bar-1">Reports</a></li>
    <li role="presentation" id="bar-2"><a href="bar-2">Analytics</a></li>
    <li role="presentation" id="bar-3"><a href="bar-3">Export</a></li>
  </ul>
</template>

<script>
export default {}

</script>

<style>

.nav-pills>li>a{
  border-radius: 0;
}

.cus-title a{
  border: none;
  background-color: #0094ff !important;
  color: white;
  font-size:16px;
}

.custom a {
  font-size: 20px;
}

.custom li {
  font-size: 20px;
  border: 1px solid #eee;
}

.custom{
  width: 300px;
  height:100vh;
  background-color: #f6f6f6;
}
</style>
