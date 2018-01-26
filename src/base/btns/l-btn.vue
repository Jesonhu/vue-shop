<template>
  <div class="btn" :class="{'active': active}">{{text}}</div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      active: {
        type: Boolean,
        defautl: false
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'

  .btn
    margin: 0 auto
    width: 80%
    height: 8vw
    line-height: 8vw
    text-align: center
    border-radius: 5px
    font-size: $font-size-medium
    color: #fff
    background: #c5c5c5
    &.active
      color: #333
      background: #ffeb03
</style>
