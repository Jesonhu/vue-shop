<template>
  <transition name="slide2">
    <div class="pay-wrapper">
      <navbar></navbar>
      <div class="title">合计</div>
      <div class="price-detail">
        <div class="detail-right">
          <div class="right-item">
            <div class="right-text">总价</div>
            <div class="price">￥40.00</div>
          </div>
          <div class="right-item">
            <div class="right-text">已付</div>
            <div class="price">￥0.00</div>
          </div>
          <div class="right-item">
            <div class="right-text">优惠</div>
            <div class="price decrease">-￥10.00</div>
          </div>
        </div>
        <div class="detail-left">
          <div class="left-text">还需支付</div>
          <div class="left-price">￥30.00</div>
        </div>
      </div>

      <div class="title">支付方式</div>

      <div class="pay-methods">
        <img class="choice" src="./choice_address_choice.png" alt="选中">
        <img class="weixin" src="./icon_wx_pay.png" alt="微信">
        <div class="method">微信支付</div>
      </div>

      <fixed-bottom-btn :text="'支付'" :active="true" @click.native="_payment"></fixed-bottom-btn>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar';
  import FixedBottomBtn from 'base/fixed-bottom-btn/fixed-bottom-btn';

  export default {
    methods: {
      _payment() {
        this.$router.push('/pay_result');
      }
    },
    components: {
      Navbar,
      FixedBottomBtn
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/slide2'
  @import '~common/stylus/mixin'

  .pay-wrapper
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 300
    background: $color-background
    .sn-items
      padding: 0 10px
      background: #fff
      font-size: $font-size-medium
      .sn-item
        position: relative
        overflow: hidden
        height: .6rem
        line-height: .6rem
        &::after
          border-bottom-1px(#ddd)
        .sn
          float: left
        .look
          float: right
    .title
      padding: 0 .4rem
      width: 100%
      height: .8rem
      line-height: .8rem
      font-size: $font-size-medium
    .price-detail
      display: flex
      box-sizing: border-box
      padding: .2rem
      margin: 0 auto
      width: 90%
      height: 3rem
      text-align: center
      border-radius: 10px
      font-size: $font-size-medium-x
      background: #fff
      .detail-right
        display: flex
        flex-direction: column
        justify-content: space-between
        flex: 1
        box-sizing: border-box
        padding: 0 .2rem
        border-right: 1px solid #ddd
        .right-text
          float: left
          color: #cacaca
        .price
          float: right
          &.decrease
            color: #f40009
      .detail-left
        display: flex
        justify-content: center
        flex-direction: column
        flex: 1
        .left-text
          margin-bottom: .1rem
        .left-price
          font-size: $font-size-large-x
          color: #f40009
    .pay-methods
      display: flex
      align-items: center
      margin: 0 auto
      width: 90%
      height: .8rem
      border-radius: 5px
      font-size: $font-size-medium
      background: #fff
      .choice
        margin: 0 .2rem
        flex: 0 0 .4rem
        width: .4rem
        height: .4rem
      .weixin
        margin: 0 .2rem
        flex: 0 0 .6rem
        width: .6rem
        height: .6rem
      .method
        flex: 1
</style>
