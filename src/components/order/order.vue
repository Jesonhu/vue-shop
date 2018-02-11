<template>
  <transition name="slide">
    <div class="order-container" v-if="orderList">
      <navbar title="订单列表" path="/member"></navbar>
      <van-tabs :active="orderActive" class="order-list" @click="changeStatus" sticky>
        <van-tab v-for="(status, index) in statuses" :title="status.statusName" :key="index">
          <scroll class="order-scroll" :pullup="true" @scrollToEnd="loadMore" :data="orderList.list">
            <div>
              <van-pull-refresh v-model="isLoading">
                <div class="order-wrapper" v-for="(order, index) in orderList.list" :key="index">
                  <div class="order-title">
                    <div class="store">{{ order.status_name }}</div>
                    <div class="status">订单号: {{ order.sn }}</div>
                  </div>
                  <list-goods
                    @click.native="toOrderDetail(order.sn)"
                    v-for="(goods, index) in order.order_items" :key="index"
                    :goods="goods">
                  </list-goods>
                  <div class="time-quantity-price">
                    <div class="time">{{ order.create_date }}</div>
                    <div class="quantity">
                      共<span class="active"> {{ order.quantity }}</span>件
                    </div>
                    <div class="price">
                      应付<span class="active">￥{{ order.amount.toFixed(2) }}</span>
                    </div>
                  </div>
                  <div class="btns-group" v-show="isShowBtnGroup(order.status)">
                    <s-btn text="取消订单"
                           btnType="hollow"
                           @click.native="_cancelOrder(order.sn, 'list')"
                           v-if="isShowCancelBtn(order.status)"
                           class="btn-item">
                    </s-btn>
                    <s-btn text="删除订单"
                           btnType="hollow"
                           @click.native="_deleteOrder(order.sn, 'list')"
                           v-if="isShowDeleteBtn(order.status)"
                           class="btn-item">
                    </s-btn>
                    <s-btn text="申请退款"
                           btnType="hollow"
                           @click.native="_refundsOrder(order.sn, 'list')"
                           v-if="isShowRefund(order.status)"
                           class="btn-item">
                    </s-btn>
                    <s-btn text="确认收货"
                           btnType="solid"
                           @click.native="_confirmOrder(order.sn, 'list')"
                           v-if="isShowConfirmBtn(order.status)"
                           class="btn-item">
                    </s-btn>
                    <s-btn text="去支付"
                           btnType="solid"
                           @click.native="toPayPage(order.sn)"
                           v-if="isShowPayBtn(order.status)"
                           class="btn-item"
                    >
                    </s-btn>
                  </div>
                </div>
                <loading v-show="!orderList.lastPage"></loading>
                <loaded-bottom v-show="orderList.lastPage && orderList.list.length >= 1"></loaded-bottom>
              </van-pull-refresh>
            </div>
          </scroll>
          <empty src="order" text="您还没有该订单..." v-if="orderList.list.length === 0"></empty>
        </van-tab>
      </van-tabs>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { Tab, Tabs, PullRefresh } from 'vant';
  import { getOrderList } from 'api/order';
  import { ERR_OK } from 'api/config';
  import { getToken } from 'common/js/cache';
  import { orderMixin } from 'common/js/mixin';
  import { mapGetters } from 'vuex';
  import { orderStatus } from 'common/js/order-status';
  import Navbar from 'base/navbar/navbar';
  import ListGoods from 'base/list-goods/list-goods';
  import SBtn from 'base/btns/s-btn';
  import Empty from 'base/empty/empty';
  import Scroll from 'base/scroll/scroll';
  import Loading from 'base/loading/loading';
  import LoadedBottom from 'base/loaded-bottom/loaded-bottom';

  export default {
    mixins: [orderMixin],
    data() {
      return {
        statuses: [
          {
            status: '',
            statusName: '全部订单'
          },
          {
            status: 'pendingPayment',
            statusName: '待付款'
          },
          {
            status: 'pendingReview',
            statusName: '待接单'
          },
          {
            status: 'pendingShipment',
            statusName: '待发货'
          },
          {
            status: 'shipped',
            statusName: '待收货'
          }
        ],
        orderList: null,
        index: 0,
        isLoading: false
      };
    },
    created() {
      this.index = this.orderActive;
      this._getOrderList();
    },
    computed: {
      ...mapGetters([
        'orderActive'
      ])
    },
    watch: {
      '$route'(newRoute) {
        if (newRoute.name === '订单列表') {
          this.index = this.orderActive;
          this._getOrderList();
        }
      },
      isLoading() {
        if (this.isLoading) {
          setTimeout(() => {
            this._getOrderList();
            this.isLoading = false;
          }, 1000);
        }
      }
    },
    methods: {
      toOrderDetail(sn) {
        this.$router.push(`/order_detail/${sn}`);
      },
      _getOrderList(pageNumber) {
        getOrderList(getToken(), this.statuses[this.index].status, pageNumber).then((res) => {
          if (res.code === ERR_OK) {
            if (res.datum.list.length >= 1) {
              res.datum.list.forEach((item) => {
                item.order_items.forEach((goods) => {
                  goods.thumbnail = res.imageUrl + goods.thumbnail;
                });
              });
            }

            if (pageNumber) {
              this.orderList.lastPage = res.datum.lastPage;
              this.orderList.pageNumber = res.datum.pageNumber;
              this.orderList.list = this.orderList.list.concat(res.datum.list);
            } else {
              this.orderList = res.datum;
            }
          }
        });
      },
      loadMore() {
        if (this.orderList.lastPage) {
          return;
        }
        const pageNumber = this.orderList.pageNumber + 1;
        this._getOrderList(pageNumber);
      },
      changeStatus(index) {
        this.index = index;
        this._getOrderList();
      },
      isShowBtnGroup(status) {
        if (status === orderStatus.completed || status === orderStatus.refunding) {
          return false;
        }
        return true;
      }
    },
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [PullRefresh.name]: PullRefresh,
      Navbar,
      ListGoods,
      SBtn,
      Empty,
      Scroll,
      Loading,
      LoadedBottom
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
    z-index: $zIndex-d
    background: $color-background
    .order-list
      position: absolute
      top: 50px
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
      .order-scroll
        position: absolute
        top: 50px
        left: 0
        right: 0
        bottom: 0
        .order-wrapper
          margin-top: .1rem
          padding: .1rem .2rem
          background: $color-text
          .order-title
            position: relative
            overflow: hidden
            height: .7rem
            line-height: .7rem
            font-size: $font-size-medium
            &::after
              border-bottom-1px(#d6d6d6)
            .store
              float: left
              color: #ff8017
            .status
              float: right
          .time-quantity-price
            display: flex
            align-items: center
            height: .6rem
            font-size: $font-size-small
            .time
              flex: 1
              color: #ff8017
            .quantity
              flex: 0 0 1.2rem
              .active
                color: #fb5627
            .price
              flex: 0 0 2rem
              .active
                color: #fb5627
          .btns-group
            position: relative
            display: flex
            align-items: center
            justify-content: flex-end
            height: .6rem
            .btn-item
              margin: 0 .06rem
</style>
