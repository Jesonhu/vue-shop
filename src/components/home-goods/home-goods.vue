<template>
  <transition name="slide">
    <div class="container">
      <navbar></navbar>
      <scroll class="wrapper">
        <div>
          <goods :goods-type="'category'" v-for="n in 10" :key="n" class="goods"></goods>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar';
  import Goods from 'base/goods/goods';
  import Scroll from 'base/scroll/scroll';

  export default {
    components: {
      Navbar,
      Goods,
      Scroll
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/slide'
  @import '~common/stylus/mixin'

  .container
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: $zIndex-s
    background: $color-text
    .wrapper
      position: absolute
      top: 1rem
      left: 0
      right: 0
      bottom: 0
      .goods
        position: relative
        &::after
          border-bottom-1px(#ddd)
</style>
