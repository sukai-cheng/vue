<template>
  <ul class="nav nav-pills nav-stacked custom">
        <li role="presentation" class="cus-title"><a href="#">Overview</a></li>
    <!--    <li role="presentation" id="bar-1"><a href="#">Reports</a></li>-->
    <!--    <li role="presentation" id="bar-2"><a href="#">Analytics</a></li>-->
    <!--    <li role="presentation" id="bar-3"><a href="#">Export</a></li>-->
    <router-link to="/heroes" tag="li"><a>英雄列表</a></router-link>
    <router-link to="/bar" tag="li"><a>武器列表</a></router-link>
    <router-link to="/foo" tag="li"><a>装备列表</a></router-link>
  </ul>
</template>

<script>
export default {}

</script>

<style>

.nav-pills > li > a {
  border-radius: 0;
}

.cus-title a {
  border: none;
  background-color: #0094ff !important;
  color: white;
  font-size: 16px;
}

.custom a {
  font-size: 20px;
}

.custom li {
  font-size: 20px;
  border: 1px solid #eee;
}

.custom {
  width: 300px;
  height: 100vh;
  background-color: #f6f6f6;
}
</style>
