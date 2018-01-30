<template>
  <div>
    <div class="user-container">
      <img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png">
      <div class="avatar">
        <div v-if="!userInfo">
          <img src="./user_head.png">
          <div class="login-btn" @click="showLoginModal">登陆</div>
        </div>
        <div v-if="userInfo" class="avatar-wrapper">
          <img v-lazy="userInfo.avatar"/>
          <div class="username"> {{ userInfo.username }}</div>
        </div>
      </div>
    </div>
    <van-row class="user-links">
      <van-col span="6" class="links-item" @click.native="toOrderPage">
        <van-icon name="pending-payment"/>
        待付款
      </van-col>
      <van-col span="6" class="links-item" @click.native="toOrderPage">
        <van-icon name="pending-orders"/>
        待接单
      </van-col>
      <van-col span="6" class="links-item" @click.native="toOrderPage">
        <van-icon name="pending-deliver" info="5"/>
        待发货
      </van-col>
      <van-col span="6" class="links-item" @click.native="toOrderPage">
        <van-icon name="logistics"/>
        待收货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell class=".van-cell__right-icon group-item"
                icon="records" title="全部订单"
                is-link
                @click.native="toOrderPage"/>
    </van-cell-group>

    <van-cell-group class="user-group">
      <router-link to="/address">
        <van-cell class="group-item" icon="exchange" title="我的地址" is-link/>
      </router-link>
      <router-link to="/coupon">
        <van-cell class="group-item" icon="gold-coin" title="我的优惠券" is-link/>
      </router-link>
      <router-link to="/setting">
        <van-cell class="group-item" icon="gift" title="设置" is-link/>
      </router-link>
    </van-cell-group>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapMutations, mapGetters } from 'vuex';
  import { Row, Col, Icon, Cell, CellGroup } from 'vant';
  import { getUserInfo } from 'common/js/cache';

  export default {
    created() {
      this.setUserInfo(getUserInfo());
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      toOrderPage() {
        this.$router.push('/order');
      },
      showLoginModal() {
        this.setLoginModal(true);
      },
      ...mapMutations({
        setLoginModal: 'SET_LOGIN_MODAL',
        setUserInfo: 'SET_USER_INFO'
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

  .user-container
    position: relative
    .user-poster
      width: 100vw
      height: 4rem
      display: block
    .avatar
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
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
  .user-group
    margin-bottom: .3rem
    .group-item
      padding: .2rem .3rem
      line-height: .48rem
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
</style>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .user-group
    .group-item
      .van-cell__title
        > .van-icon
          font-size: $font-size-medium-x
      .van-icon
        &.van-cell__right-icon
          font-size: $font-size-small
</style>
