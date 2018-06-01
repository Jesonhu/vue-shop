<template>
  <transition name="slide2">
    <div class="pay-wrapper" v-if="payInfo">
      <navbar title="支付" path="/order"></navbar>
      <div class="title">合计</div>
      <div class="price-detail">
        <div class="detail-right">
          <div class="right-item">
            <div class="right-text">总价</div>
            <div class="price" v-if="payInfo">￥{{ parseFloat(payInfo.amount).toFixed(2) }}</div>
          </div>
          <div class="right-item">
            <div class="right-text">已付</div>
            <div class="price">￥0.00</div>
          </div>
          <div class="right-item">
            <div class="right-text">优惠</div>
            <div class="price decrease">-￥{{parseFloat(payInfo.couponDiscount).toFixed(2) }}
            </div>
          </div>
        </div>
        <div class="detail-left">
          <div class="left-text">还需支付</div>
          <div class="left-price">￥{{ (parseFloat(payInfo.amount) - payInfo.couponDiscount).toFixed(2) }}</div>
        </div>
      </div>

      <div class="title">支付方式</div>

      <div class="pay-methods">
        <img class="choice" src="./choice_address_choice.png" alt="选中">
        <img class="weixin" src="./icon_wx_pay.png" alt="微信">
        <div class="method">微信支付</div>
      </div>

      <fixed-bottom-btn :text="'支付'" :active="true" @click.native="_pay">
      </fixed-bottom-btn>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex';
  import { getPayInfo, pay } from 'api/pay';
  import { getToken } from 'common/js/cache';
  import { ERR_OK } from 'api/config';
  import { Toast } from 'vant';
  import Navbar from 'base/navbar/navbar';
  import FixedBottomBtn from 'base/fixed-bottom-btn/fixed-bottom-btn';

  export default {
    data() {
      return {
        payInfo: null
      };
    },
    created() {
      if (!this.createOrder) {
        this.$router.back();
      } else {
        this._getPayInfo();
      }
    },
    computed: {
      ...mapGetters([
        'createOrder'
      ])
    },
    watch: {
      '$route'(newRoute) {
        if (newRoute.name === '支付') {
          this._getPayInfo();
        }
      }
    },
    methods: {
      _getPayInfo() {
        getPayInfo(getToken(), this.$route.params.sn).then((res) => {
          if (res.code === ERR_OK) {
            this.payInfo = res.datum;
          }
        });
      },
      _pay() {
        pay(getToken(), this.payInfo.sn, this.payInfo.amount).then((res) => {
          let _this = this;
          let data = JSON.parse(res.data);
          if (res.code === 0) {
            if (typeof WeixinJSBridge === 'undefined') {
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', _this.onBridgeReady(data), false);
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', _this.onBridgeReady(data));
                document.attachEvent('onWeixinJSBridgeReady', _this.onBridgeReady(data));
              }
            } else {
              _this.onBridgeReady(data);
            }
          }
        });
      },
      onBridgeReady(json) {
        /* eslint-disable */
        const _this = this;
        WeixinJSBridge.invoke('getBrandWCPayRequest', json, function (res) {
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠。
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              Toast('支付成功!');
              _this.$router.push(`/pay_result/${_this.payInfo.sn}`);
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              Toast('支付取消!');
            } else {
              Toast('支付失败!');
            }
          }
        );
        /* eslint-enable */
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
    z-index: $zIndex-xxl
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
