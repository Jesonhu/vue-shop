<template>
  <div class="shopcart-icon-wrapper">
    <router-link to="/shopcart" tag="div" class="shopcart-icon">
      <img width="100%" height="100%" src="./ic_shop_cart.png">
      <div class="badge" v-if="shopcartCount && shopcartCount >= 1">{{ shopcartCount }}</div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'shopcartCount'
      ])
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .shopcart-icon-wrapper
    position: fixed
    right: .2rem
    bottom: 1.4rem
    z-index: $zIndex-s
    .shopcart-icon
      position: relative
      width: 1rem
      height: 1rem
      .badge
        position: absolute
        top: 0
        right: 0
        min-width: .35rem
        min-height: .35rem
        line-height: .35rem
        text-align: center
        border-radius: 50%
        color: $color-text
        font-size: $font-size-small
        background: $color-price
</style>
