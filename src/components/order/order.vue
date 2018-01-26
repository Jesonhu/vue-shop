<template>
  <transition name="slide">
    <div class="order-container">
      <navbar></navbar>
      <van-tabs :active="active">
        <van-tab v-for="index in 4" :title="'选项 ' + index" :key="index">
          <div class="order-wrapper">
            <div class="order-title">
              <div class="store">花园一期店</div>
              <div class="status">等待付款</div>
            </div>
            <list-goods v-for="n in 2" :key="n" @click.native="toOrderDetail"></list-goods>
            <div class="time-quantity-price">
              <div class="time">2017-09-09 18:80:30</div>
              <div class="quantity">
                共<span class="active"> 3 </span>件
              </div>
              <div class="price">
                应付<span class="active">￥80.0099</span>
              </div>
            </div>
            <div class="btns-group">
              <s-btn :text="'取消订单'" :btnType="'hollow'" class="btn-item"></s-btn>
              <s-btn :text="'去支付'" :btnType="'solid'" class="btn-item"></s-btn>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { Tab, Tabs } from 'vant';
  import Navbar from 'base/navbar/navbar';
  import ListGoods from 'base/list-goods/list-goods';
  import SBtn from 'base/btns/s-btn';

  export default {
    data() {
      return {
        active: 2
      };
    },
    methods: {
      toOrderDetail() {
        this.$router.push('/order_detail');
      }
    },
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      Navbar,
      ListGoods,
      SBtn
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  @import '~common/stylus/slide'

  .order-container
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: $zIndex-s
    background: $color-background
    .order-wrapper
      margin-top: 5px
      padding: 0 10px
      background: $color-text
      .order-title
        position: relative
        overflow: hidden
        height: 35px
        line-height: 35px
        font-size: $font-size-medium
        &::after
          border-bottom-1px(#d6d6d6)
        .store
          float: left
        .status
          float: right
          color: #ff8017
      .time-quantity-price
        display: flex
        align-items: center
        height: 30px
        font-size: $font-size-small
        .time
          flex: 1
          color: #ff8017
        .quantity
          flex: 0 0 60px
          .active
            color: #fb5627
        .price
          flex: 0 0 100px
          .active
            color: #fb5627
      .btns-group
        position: relative
        display: flex
        align-items: center
        justify-content: flex-end
        height: 50px
        .btn-item
          margin: 0 3px
</style>
