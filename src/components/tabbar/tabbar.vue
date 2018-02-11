<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="wap-home" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="wap-nav" to="/category">分类</van-tabbar-item>
    <van-tabbar-item icon="contact" to="/member">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script type="text/ecmascript-6">
  import { Tabbar, TabbarItem } from 'vant';

  const ACTIVE = {
    home: 0,
    category: 1,
    member: 2
  };

  export default {
    data() {
      return {
        active: ACTIVE.home
      };
    },
    created() {
      this.initActive();
    },
    watch: {
      '$route'() {
        this.initActive();
      }
    },
    methods: {
      initActive() {
        if (this.$route.name === '首页') {
          this.ative = ACTIVE.home;
        }

        if (this.$route.name === '分类') {
          this.active = ACTIVE.category;
        }

        if (this.$route.name === '会员') {
          this.active = ACTIVE.member;
        }
      }
    },
    components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .van-tabbar
    .van-tabbar-item
      &.van-tabbar-item--active
        color: $color-theme
</style>
