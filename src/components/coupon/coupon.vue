<template>
  <transition name="slide">
    <div class="coupon-container">
      <!-- 优惠券单元格 -->
      <!--<van-coupon-cell-->
      <!--:coupons="coupons"-->
      <!--:chosen-coupon="chosenCoupon"-->
      <!--/>-->
      <navbar></navbar>

      <!-- 优惠券列表 -->
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { CouponCell, CouponList } from 'vant';
  import Navbar from 'base/navbar/navbar';

  const coupon = {
    available: 1,
    discount: 0,
    denominations: 150,
    origin_condition: 0,
    reason: '',
    value: 150,
    name: '优惠券名称',
    start_at: 1489104000,
    end_at: 1514592000
  };

  const coupon1 = {
    available: 1,
    discount: 0,
    denominations: 1150,
    origin_condition: 0,
    reason: '',
    value: 150,
    name: '优惠券名称1',
    start_at: 1489104000,
    end_at: 1514592000
  };

  const coupon2 = {
    available: 1,
    discount: 0,
    denominations: 1150,
    origin_condition: 0,
    reason: '',
    value: 150,
    name: '优惠券名称2',
    start_at: 1489104000,
    end_at: 1514592000
  };

  export default {
    data() {
      return {
        chosenCoupon: -1,
        coupons: [coupon, coupon2],
        disabledCoupons: [coupon1]
      };
    },
    methods: {
      onChange(index) {
        this.$router.back();
        this.chosenCoupon = index;
      },
      onExchange(code) {
        coupon.name = '优惠卷' + parseFloat(Math.random() * 10);
        this.coupons.push(coupon);
      }
    },
    components: {
      [CouponCell.name]: CouponCell,
      [CouponList.name]: CouponList,
      Navbar
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/slide'

  .coupon-container
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: $zIndex-s
    background: $color-text
</style>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/slide.styl'

  .van-coupon-list__close
    position: fixed
    right: 0
    bottom: 0
    z-index: $zIndex-s
</style>
