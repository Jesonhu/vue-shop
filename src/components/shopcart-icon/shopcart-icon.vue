<template>
  <div class="shopcart-icon-wrapper">
    <router-link to="/shopcart" tag="div" class="shopcart-icon">
      <img width="100%" height="100%" src="./ic_shop_cart.png">
      <div class="badge">3</div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Badge } from 'vant';

  export default {
    components: {
      [Badge.name]: Badge
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .shopcart-icon-wrapper
    position: fixed
    right: .2rem
    bottom: 1.4rem
    .shopcart-icon
      position: relative
      width: 1rem
      height: 1rem
      .badge
        position: absolute
        top: 0
        right: 0
        width: .35rem
        height: .35rem
        line-height: .35rem
        text-align: center
        border-radius: 50%
        color: $color-text
        font-size: $font-size-small
        background: $color-price
</style>
