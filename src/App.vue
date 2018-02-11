<template>
  <div id="app" @touchmove.prevent>
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
  import { mapMutations } from 'vuex';
  import { getShopcartCount } from 'api/shopcart';
  import { getCartKey } from 'common/js/cache';
  import { ERR_OK } from 'api/config';

  export default {
    created() {
    },
    watch: {
      '$route'(newRoute) {
        if (newRoute.name === '首页' || newRoute.name === '分类' ||
          newRoute.name === '首页商品' || newRoute.name === '商品详情' ||
          newRoute.name === '会员') {
          this._getShopcartCount();
        }
      }
    },
    methods: {
      _getShopcartCount() {
        getShopcartCount(getCartKey()).then((res) => {
          if (res.code === ERR_OK) {
            this.setShopcartCount(res.datum);
          }
        });
      },
      ...mapMutations({
        setShopcartCount: 'SET_SHOPCART_COUNT'
      })
    },
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
