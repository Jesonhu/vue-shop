<template>
  <div class="btn-wrapper">
    <div class="btn" :class="{'active': active}">{{text}}</div>
  </div>
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

  .btn-wrapper
    position: fixed
    right: 0
    bottom: 0
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 1.1rem
    line-height: 1.1rem
    text-align: center
    background: #fff
    &::after
      border-top-1px(#ebebeb)
    .btn
      margin: 0 auto
      width: 80%
      height: .8rem
      line-height: .8rem
      text-align: center
      border-radius: 5px
      font-size: $font-size-medium
      color: #fff
      background: #c5c5c5
      &.active
        color: $color-text
        background: #f44
</style>
