<template>
  <div class="promitions-wrapper" v-if="promotions">
    <div class="text">{{promotions}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      promotions: {
        type: String,
        default: null
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .promitions-wrapper
    padding: .06rem
    border-radius: .06rem
    background: $color-price
    .text
      color: $color-text
      font-size: $font-size-small
</style>
