<template>
  <van-nav-bar
    :title="title"
    left-text="返回"
    :right-text="rightText"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>

<script type="text/ecmascript-6">
  import { NavBar } from 'vant';

  export default {
    props: {
      rightText: {
        type: String,
        default: null
      },
      title: {
        type: String,
        default: '标题'
      }
    },
    methods: {
      onClickLeft() {
        this.$router.back();
      },
      onClickRight() {
      }
    },
    components: {
      [NavBar.name]: NavBar
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
