<template>
  <div class="s-btn" :class="[btnType]">{{text}}</div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      btnType: {
        type: String,
        default: ''
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .s-btn
    position: relative
    display: inline-block
    vertical-align: middle
    width: 1rem
    height: .4rem
    line-height: .4rem
    text-align: center
    font-size: $font-size-small
    &::after
      content: ''
      width: 200%
      height: 200%
      position: absolute
      top: 0
      left: 0
      border: 1px solid #bfbfbf
      border-radius: 10px
      transform: scale(0.5, 0.5)
      transform-origin: top left
    &.hollow
      background: #f8f8f8
    &.solid
      background: #ffeb03
</style>
