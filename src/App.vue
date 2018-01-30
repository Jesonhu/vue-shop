<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Tabbar></Tabbar>
    <shopcart-icon></shopcart-icon>
    <sku></sku>
    <login></login>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tabbar from 'components/tabbar/tabbar';
  import ShopcartIcon from 'components/shopcart-icon/shopcart-icon';
  import Sku from 'base/sku/sku';
  import Login from 'components/login/login';

  export default {
    components: {
      Tabbar,
      ShopcartIcon,
      Sku,
      Login
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
