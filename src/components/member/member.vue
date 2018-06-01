<template>
  <div class="user-wrapper">
    <div class="user-container">
      <img class="user-poster" src="./member_bg.jpg">
      <div class="avatar">
        <div v-if="!userInfo">
          <!--<img src="./user_head.png">-->
          <div class="login-btn" @click="showLoginModal">登陆</div>
        </div>
        <div v-if="userInfo" class="avatar-wrapper">
          <!--<img v-lazy="userInfo.avatar"/>-->
          <div class="username"> {{ userInfo.username }}</div>
        </div>
      </div>
    </div>
    <van-row class="user-links">
      <van-col span="6" class="links-item" @click.native="toOrderPage(1)">
        <van-icon name="pending-payment" :info="total.pendingPayment"/>
        待付款
      </van-col>
      <van-col span="6" class="links-item" @click.native="toOrderPage(2)">
        <van-icon name="pending-orders" :info="total.pendingReview"/>
        待接单
      </van-col>
      <van-col span="6" class="links-item" @click.native="toOrderPage(3)">
        <van-icon name="pending-deliver" :info="total.pendingShipment"/>
        待发货
      </van-col>
      <van-col span="6" class="links-item" @click.native="toOrderPage(4)">
        <van-icon name="logistics" :info="total.shipped"/>
        待收货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell class=".van-cell__right-icon group-item"
                icon="records" title="全部订单"
                is-link
                @click.native="toOrderPage(0)"/>
    </van-cell-group>

    <van-cell-group class="user-group-hook">
      <van-cell class="group-item group-item-link" icon="exchange" title="我的地址" is-link
                @click.native="toPage('/address/member')"/>
      <van-cell class="group-item" icon="gold-coin" title="我的优惠券" is-link @click.native="toPage('/coupon/all')"/>
      <van-cell class="group-item" icon="gift" title="收藏商品" is-link @click.native="toPage('/favorite')"/>
      <van-cell class="group-item" icon="edit" title="设置" is-link @click.native="toPage('/setting')"/>
    </van-cell-group>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapMutations, mapGetters } from 'vuex';
  import { Row, Col, Icon, Cell, CellGroup } from 'vant';
  import { getUserInfo, getToken } from 'common/js/cache';
  import { getOrderList } from 'api/order';
  import { ERR_OK } from 'api/config';

  const orderTypes = {
    pendingPayment: 'pendingPayment',
    pendingReview: 'pendingReview',
    pendingShipment: 'pendingShipment',
    shipped: 'shipped'
  };

  export default {
    data() {
      return {
        total: {
          pendingPayment: null,
          pendingReview: null,
          pendingShipment: null,
          shipped: null
        }
      };
    },
    created() {
      this.setUserInfo(getUserInfo());
      if (getToken()) {
        this._getOrderList();
      }
    },
    computed: {
      ...mapGetters([
        'userInfo',
        'loginModal'
      ])
    },
    watch: {
      '$route'(newRoute) {
        if (newRoute.name === '会员') {
          if (getToken()) {
            this._getOrderList();
            this.setUserInfo(getUserInfo());
          } else {
            this.pendingPayment = null;
            this.pendingReview = null;
            this.pendingShipment = null;
            this.shipped = null;
          }
        }
      },
      loginModal(newStatus) {
        if (!newStatus) {
          this._getOrderList();
        }
      }
    },
    methods: {
      toOrderPage(orderActive) {
        if (getToken()) {
          this.setOrderActive(orderActive);
          this.$router.push('/order');
        } else {
          this.showLoginModal();
        }
      },
      showLoginModal() {
        this.setLoginModal(true);
      },
      toPage(url) {
        if (!getToken()) {
          this.showLoginModal();
          return;
        }
        this.$router.push(url);
      },
      _getOrderList() {
        if (!getToken()) {
          return;
        }

        const values = Object.values(orderTypes);
        values.forEach((value) => {
          getOrderList(getToken(), value).then((res) => {
            if (res.code === ERR_OK) {
              if (res.datum.totalRow >= 1) {
                if (value === orderTypes.pendingPayment) {
                  this.total.pendingPayment = res.datum.totalRow + '';
                  return;
                }
                if (value === orderTypes.pendingReview) {
                  this.total.pendingReview = res.datum.totalRow + '';
                  return;
                }
                if (value === orderTypes.pendingShipment) {
                  this.total.pendingShipment = res.datum.totalRow + '';
                  return;
                }
                if (value === orderTypes.shipped) {
                  this.total.shipped = res.datum.totalRow + '';
                }
              }
            }
          });
        });
      },
      ...mapMutations({
        setLoginModal: 'SET_LOGIN_MODAL',
        setUserInfo: 'SET_USER_INFO',
        setOrderActive: 'SET_ORDER_ACTIVE'
      })
    },
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .user-wrapper
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 50px
    background: $color-background
    .group-item-link
      position: relative
      &::before
        border-bottom-1px(#ddd)

  .user-container
    position: relative
    .user-poster
      width: 100vw
      height: 4rem
      display: block
    .avatar
      position: absolute
      bottom: .2rem
      left: 50%
      transform: translateX(-50%)
      img
        width: 1.6rem
        height: 1.6rem
        border-radius: 50%
      .login-btn
        width: 1.6rem
        height: .4rem
        line-height: .4rem
        text-align: center
        border: 1px solid #333
        border-radius: 5px
        font-size: $font-size-medium
        background: $color-text
      .avatar-wrapper
        font-size: $font-size-medium

  .user-links
    padding: .2rem 0
    font-size: $font-size-small
    text-align: center
    background-color: #fff
    .van-icon
      display: block
      padding-bottom: .1rem
      font-size: $font-size-large-d

  .user-group-hook
    margin-top: 10px
</style>

<style lang="stylus" ref="stylesheet/stylus">
  /*.van-cell__text*/
  /*position: relative*/
  /*top: 2px*/
</style>
