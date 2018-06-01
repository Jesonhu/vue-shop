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
  import { Toast } from 'vant';
  import { mapMutations } from 'vuex';
  import { getShopcartCount } from 'api/shopcart';
  import { getCartKey } from 'common/js/cache';
  import { ERR_OK } from 'api/config';

  export default {
    watch: {
      '$route'(newRoute) {
        this.directRightUrl();
        if (newRoute.name === '首页' || newRoute.name === '分类' ||
          newRoute.name === '首页商品' || newRoute.name === '会员' || newRoute.name === '收藏') {
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
          Toast.clear();
        });
      },
      directRightUrl() {
        let { href, protocol, host, pathname, search, hash } = window.location;
        search = search || '?';
        let newHref = `${protocol}//${host}${pathname}${search}${hash}`;
        if (newHref !== href) {
          window.location.replace(newHref);
        }
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

<style lang="stylus" rel="stylesheet/stylus">
</style>
