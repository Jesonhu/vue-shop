<template>
  <div class="loaded-bottom-wrapper">
    <div class="line"></div>
    <div class="text">我是有底线的</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .loaded-bottom-wrapper
    display: flex
    padding: 0 .2rem
    height: .6rem
    line-height: .6rem
    font-size: $font-size-medium
    .line
      flex: 1
      position: relative
      top: .3rem
      height: 1px
      background: rgba(154, 159, 167, .4)
    .text
      flex: 0 0 2rem
      text-align: center
      color: rgb(154, 159, 167)
</style>
