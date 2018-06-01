<template>
  <transition name="slide2">
    <div class="pay-result" v-if="result">
      <navbar title="支付结果" path="/order"></navbar>
      <div class="result-text">网上支付</div>

      <div class="result-content">
        <div class="content-item">
          <div class="text">支付金额</div>
          <div class="content price">
            ￥{{ result.amountPaid }}
          </div>
        </div>
        <div class="content-item">
          <div class="text">支付方式</div>
          <div class="content">{{ result.paymentMethodName }}</div>
        </div>
        <div class="content-item">
          <div class="text">商家配送</div>
          <div class="content">{{ result.shippingMethodName }}</div>
        </div>
        <div class="content-item info">
          商家正在为您配送货物
        </div>
      </div>

      <div class="dispatch-phone">
        <img class="service" src="./icon_green_call.png" alt="服务电话"/>
        <p class="dispatch-text">服务电话 <a href="tel:0757-80040000">0757-80040000</a></p>
      </div>

      <router-link to="/order">
        <fixed-bottom-btn :text="'返回订单列表'" :active="true">
        </fixed-bottom-btn>
      </router-link>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar';
  import FixedBottomBtn from 'base/fixed-bottom-btn/fixed-bottom-btn';
  import { getPayResult } from 'api/pay';
  import { ERR_OK } from 'api/config';
  import { getToken } from 'common/js/cache';

  export default {
    data() {
      return {
        result: null
      };
    },
    created() {
      this._getPayResult();
    },
    watch: {
      '$route'(newRoute) {
        if (newRoute.name === '支付结果') {
          this._getPayResult();
        }
      }
    },
    methods: {
      _getPayResult() {
        getPayResult(getToken(), this.$route.params.sn).then((res) => {
          if (res.code === ERR_OK) {
            this.result = res.datum;
          }
        });
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

  .pay-result
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 300
    background: $color-background
    .result-text
      margin: .2rem 0
      width: 100%
      text-align: center
      color: #f2350e
      font-size: $font-size-medium-x
    .result-content
      display: flex
      flex-direction: column
      justify-content: space-between
      box-sizing: border-box
      margin: 0 auto
      padding: .2rem
      width: 90%
      height: 3rem
      border-radius: .1rem
      font-size: $font-size-medium-x
      background: #fff
      .content-item
        display: flex
        &.info
          justify-content: center
          font-size: $font-size-medium
          color: #eaac86
        .text
          flex: 0 0 1.8rem
          color: #878787
        .content
          flex: 1
          &.price
            color: #f2350e
    .dispatch-phone
      display: flex
      justify-content: center
      align-items: center
      box-sizing: border-box
      margin: .2rem auto 0 auto
      padding: 0 .2rem
      width: 90%
      height: .9rem
      border-radius: .1rem
      font-size: $font-size-medium
      background: #fff
      .service
        flex: 0 0 .6rem
        width: .6rem
        height: .6rem
      .dispatch-text
        flex: 1
        a
          color: #74c0df
</style>
