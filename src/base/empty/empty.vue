<template>
  <div class="empty-wrapper">
    <div class="empty-img">
      <img width="100%" height="100%" src="./empty_address.png" alt="背景图" v-if="src === 'address'"/>
      <img width="100%" height="100%" src="./empty_cart.png" alt="背景图" v-if="src === 'shopcart'"/>
      <img width="100%" height="100%" src="./empty_order.png" alt="背景图" v-if="src === 'order'"/>
      <img width="100%" height="100%" src="./empty_coupon.png" alt="背景图" v-if="src === 'coupon'"/>
      <img width="100%" height="100%" src="./empty_refund.png" alt="背景图" v-if="src === 'refund'"/>
      <img width="100%" height="100%" src="./empty_category.png" alt="背景图" v-if="src === 'category'"/>
    </div>
    <div class="empty-info">{{text}}</div>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      src: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .empty-wrapper
    position: absolute
    top: 45%
    left: 50%
    display: inline-block
    transform: translate(-50%, -50%)
    text-align: center
    font-size: $font-size-medium
    .empty-img
      width: 3.5rem
    .empty-info
      margin-top: .2rem
</style>
