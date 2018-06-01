<template>
  <transition name="slide">
    <div class="coupon-container">
      <!-- 优惠券单元格 -->
      <!--<van-coupon-cell-->
      <!--:coupons="coupons"-->
      <!--:chosen-coupon="chosenCoupon"-->
      <!--/>-->
      <navbar title="优惠券列表"></navbar>

      <scroll class="coupon-list">
        <div>
          <!-- 优惠券列表 -->
          <van-coupon-list
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            :disabled-coupons="disabledCoupons"
            :show-exchange-bar="false"
            :show-close-button="showCloseButton"
            @change="onChange"
          />
        </div>
      </scroll>

      <empty src="coupon" text="亲,您还没有优惠券..." v-if="isShwoEmpty">
      </empty>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { CouponCell, CouponList } from 'vant';
  import { getAllCoupon } from 'api/coupon';
  import { ERR_OK } from 'api/config';
  import { getToken } from 'common/js/cache';
  import Navbar from 'base/navbar/navbar';
  import Empty from 'base/empty/empty';
  import Scroll from 'base/scroll/scroll';

  export default {
    data() {
      return {
        chosenCoupon: -1,
        coupons: [],
        disabledCoupons: [],
        couponList: null
      };
    },
    created() {
      this._getAllCounpon();
    },
    computed: {
      showCloseButton() {
        if (this.$route.params.type === 'all') {
          return false;
        }
        if (this.$route.params.type === 'user') {
          return true;
        }
      },
      isShwoEmpty() {
        if (this.couponList) {
          return true;
        }
        if (this.couponList && this.couponList.length === 0) {
          return true;
        }
        return false;
      }
    },
    watch: {
      '$route'(newRoute) {
        const params = this.$route.params;
        if (newRoute.name === '优惠券' && params.type === 'all') {
          this._getAllCounpon();
          this.coupons = [];
          this.disabledCoupons = [];
        }
      }
    },
    methods: {
      onChange(index) {
        if (this.$route.params.type === 'all') {
          return;
        }
        this.$router.back();
        this.chosenCoupon = index;
      },
      _getAllCounpon() {
        getAllCoupon(getToken()).then((res) => {
          if (res.code === ERR_OK) {
            this.coupontList = res.datum;
            res.datum.list.forEach((coupon) => {
              const startTime = (new Date(coupon.begin_date)).getTime();
              const endTime = (new Date(coupon.end_date)).getTime();
              const amount = coupon.amount * 100;
              if (coupon.is_used) {
                this.coupons.push({
                  id: coupon.id,
                  discount: 0,
                  denominations: amount,
                  origin_condition: 0,
                  reason: '',
                  value: amount,
                  name: coupon.name,
                  start_at: startTime / 1000,
                  end_at: endTime / 1000
                });
              } else {
                this.coupons.push({
                  id: coupon.id,
                  discount: 0,
                  denominations: amount,
                  origin_condition: 0,
                  reason: '',
                  value: amount,
                  name: coupon.name,
                  start_at: startTime / 1000,
                  end_at: endTime / 1000
                });
              }
            });
          }
        });
      }
    },
    components: {
      [CouponCell.name]: CouponCell,
      [CouponList.name]: CouponList,
      Navbar,
      Empty,
      Scroll
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
    z-index: $zIndex-d
    background: $color-text
    .coupon-list
      position: absolute
      top: 50px
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
      background: $color-background
</style>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/slide.styl'

  .van-coupon-list__close
    position: fixed
    right: 0
    bottom: 0
    z-index: $zIndex-d
</style>
