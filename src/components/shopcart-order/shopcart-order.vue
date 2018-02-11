<template>
  <transition name="slide2">
    <div class="shopcart-order-wrapper" v-if="checkOrder">
      <navbar title="订单结算">
      </navbar>
      <contact>
      </contact>
      <van-checkbox-group v-model="result">
        <van-cell-group>
          <van-cell v-for="(item, index) in checkOrder.paymentMethods" :key="index">
            <van-checkbox :name="item.name" class="pay-methods">{{ item.name }}</van-checkbox>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>

      <div class="coupon-wrapper" @click="toCouponPage">
        <div class="coupon-title">优惠券</div>
        <div class="coupon-name" :class="{active: couponActive}">{{ couponeName }}</div>
      </div>

      <div class="memo-wrapper">
        <span>备注</span>
        <input class="memo" type="text" placeholder="请输入备注" v-model="memo">
      </div>

      <div class="list-goods-wrapper">
        <list-goods
          v-for="(goods, index) in checkOrder.order.order_items"
          :goods="goods"
          :key="index">
        </list-goods>
      </div>
      <div class="pay-info">
        <div class="info-item">
          <div class="info">商品总价</div>
          <div class="price">￥{{ checkOrder.order.orderTotal }}</div>
        </div>
        <div class="info-item">
          <div class="info">配送费</div>
          <div class="price">-￥0.00</div>
        </div>
        <div class="info-item">
          <div class="info">优惠</div>
          <div class="price promotions">-￥{{ parseFloat(checkOrder.order.promotion_discount).toFixed(2) }}</div>
        </div>
        <div class="info-item">
          <div class="info">应付</div>
          <div class="price">￥{{ checkOrder.order.amount.toFixed(2) }}</div>
        </div>
      </div>
      <van-submit-bar
        :price="checkOrder.order.amount * 100"
        button-text="结算"
        @submit="onSubmit"
      >
      </van-submit-bar>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { Checkbox, CheckboxGroup, Cell, CellGroup, SubmitBar } from 'vant';
  import { mapGetters, mapMutations } from 'vuex';
  import { createOrder } from 'api/order';
  import { ERR_OK } from 'api/config';
  import { getToken } from 'common/js/cache';
  import { getUserCoupon } from 'api/coupon';
  import Navbar from 'base/navbar/navbar';
  import Contact from 'base/contact/contact';
  import ListGoods from 'base/list-goods/list-goods';

  export default {
    data() {
      return {
        result: [],
        checked: true,
        memo: null,
        userCoupon: null
      };
    },
    created() {
      if (!this.checkOrder) {
        this.$router.back();
      }
      if (this.checkOrder) {
        this.result.push(this.checkOrder.paymentMethods[0].name);
        this._getUserCoupon();
      }
    },
    watch: {
      '$route'(newRoute) {
        if (newRoute.name === '购物车订单') {
          if (this.checkOrder) {
            this.result.push(this.checkOrder.paymentMethods[0].name);
          }
          this._getUserCoupon();
        }
      }
    },
    computed: {
      couponeName() {
        if (this.userCoupon && this.userCoupon.length >= 1) {
          return `有${this.userCoupon.length}可用的优惠券`;
        }
        if (this.userCoupon && this.userCoupon.length === 0) {
          return '无可用的优惠券';
        }
      },
      couponActive() {
        if (this.userCoupon && this.userCoupon.length >= 1) {
          return true;
        }
        if (this.userCoupon && this.userCoupon.length === 0) {
          return false;
        }
      },
      ...mapGetters([
        'checkOrder'
      ])
    },
    methods: {
      onSubmit() {
        createOrder({
          token: getToken(),
          cartToken: this.checkOrder.cartToken,
          receiverId: this.checkOrder.defaultReceiver.id,
          paymentMethodId: this.checkOrder.paymentMethods[0].id,
          memo: this.memo
        }).then((res) => {
          if (res.code === ERR_OK) {
            this.setCreateOrder(res.datum);
            this.$router.push(`/pay/${res.datum.sn}`);
          }
        });
      },
      _getUserCoupon() {
        getUserCoupon(getToken()).then((res) => {
          if (res.code === ERR_OK) {
            this.userCoupon = res.data;
          }
        });
      },
      toCouponPage() {
        if (this.couponeName !== '无可用的优惠券') {
          this.$router.push('/coupon/user');
        }
      },
      ...mapMutations({
        setCreateOrder: 'SET_CREATE_ORDER'
      })
    },
    components: {
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [SubmitBar.name]: SubmitBar,
      Navbar,
      Contact,
      ListGoods
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/slide2'
  @import '~common/stylus/variable'

  .shopcart-order-wrapper
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: $zIndex-xl
    background: $color-background
    .coupon-wrapper
      margin-top: .1rem
      padding: 0 .5rem
      height: .8rem
      line-height: .8rem
      overflow: hidden
      font-size: $font-size-medium
      background: $color-text
      .coupon-title
        float: left
      .coupon-name
        float: right
        color: #ddd
        &.active
          color: $color-price
    .memo-wrapper
      display: flex
      margin-top: .1rem
      height: .8rem
      overflow: hidden
      background: $color-text
      font-size: $font-size-medium
      span
        box-sizing: border-box
        flex: 0 0 1.6rem
        padding-left: .5rem
        line-height: .8rem
      .memo
        box-sizing: border-box
        flex: 1
        height: .8rem
        padding-right: .2rem
        text-align: right
        font-size: $font-size-medium
    .list-goods-wrapper
      margin-top: .1rem
    .pay-info
      padding: .1rem .3rem
      font-size: $font-size-small
      background: $color-text
      .info-item
        display: flex
        height: .6rem
        line-height: .6rem
        .info
          flex: 0 0 1.6rem
        .price
          flex: 1
          text-align: right
          &.promotions
            color: $color-price
</style>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .pay-methods
    > .van-checkbox__input
      float: right

  .van-cell
    padding: .2rem .3rem
    line-height: .48rem
    font-size: $font-size-medium

  .van-checkbox__input
    height: .4rem

  .van-checkbox .van-icon-success
    font-size: $font-size-small
    width: .4rem
    height: .4rem
    &::before
      line-height: .4rem
</style>
