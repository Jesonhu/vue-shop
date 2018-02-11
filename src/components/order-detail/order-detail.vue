<template>
  <transition name="slide">
    <div class="order-detail-wrapper" v-if="detail">
      <navbar title="订单详情"></navbar>
      <div class="order-detail-title">
        <div class="title-text" @click="changeActive('status')" :class="{'active': selected === 'status'}">订单状态
        </div>
        <div class="title-text" @click="changeActive('detail')" :class="{'active': selected === 'detail'}">订单详情
        </div>
      </div>

      <scroll class="order-status" v-if="detail && selected === 'status'">
        <ul>
          <li class="status-item" v-for="(log, index) in detail.order_log" :key="index">
            <div class="imgs">
              <img src="./ic_order_type_highlighted@3x.png" v-show="index === detail.order_log.length -1"/>
              <img src="./ic_order_type_normal@3x.png" v-show="index !== detail.order_log.length -1"/>
            </div>
            <div class="text-wrapper active">
              <div class="text-first">
                <div class="status">{{ log.typeName }}</div>
                <div class="time">{{ log.create_date }}</div>
              </div>
              <div class="text-two">
                请在30分钟内完成支付
                {{ log.typeName === '订单创建' ? '请在30分钟内完成支付' : ''}}
                {{ log.typeName === '订单收款' ? '请耐心等待' : ''}}
                {{ log.typeName === '订单审核' ? '等待发货' : ''}}
                {{ log.typeName === '订单发货' ? `配送员正在飞速赶来的路上，请耐心等候` : ''}}
                {{ log.typeName === '订单收货' ? '您已经收到货物' : ''}}
                {{ log.typeName === '订单完成' ? '该订单已经完成' : ''}}
              </div>
            </div>
          </li>
        </ul>
      </scroll>

      <scroll class="order-detail" v-if="detail && selected === 'detail'" ref="scroll">
        <div>
          <div class="detail-title">配送方式</div>
          <div class="dispatch">
            <div class="dispatch-title">配送方式:</div>
            <div class="dispatch-content">
              {{ detail.order.shipping_method_name }}
              <!--<a :href="'tel:18148789239'" style="color: #26a2ff">-->
              <!--18148789239-->
              <!--</a>-->
            </div>
          </div>

          <!--<div class="dispatch">-->
          <!--<div class="dispatch-title">配送员:</div>-->
          <!--<div class="dispatch-content">-->
          <!--暂未发货,请耐心等待-->
          <!--</div>-->
          <!--</div>-->

          <div class="dispatch address">
            <div class="dispatch-title">收货地址:</div>
            <div class="dispatch-content">
              {{ detail.order.area_name }} {{ detail.order.address }} {{ detail.order.consignee }} {{ detail.order.phone
              }}
            </div>
          </div>

          <div class="detail-title">商品信息</div>

          <div class="order-goods-container">
            <list-goods v-for="(goods, index) in detail.order.order_items"
                        :key="index"
                        :goods="goods">
            </list-goods>
            <div class="price-detail">
              <div class="market-price-wrapper">
                <div class="market-price">
                  <div class="market">原价总计</div>
                  <div class="price">￥{{ detail.order.price.toFixed(2) }}</div>
                </div>
                <div class="market-price">
                  <div class="market">配送费用</div>
                  <div class="price">￥0.00</div>
                </div>
                <div class="market-price">
                  <div class="market">优惠金额</div>
                  <div class="price cheap">
                    -￥{{ detail.order.promotion_discount.toFixed(2) }}
                  </div>
                </div>
              </div>
              <div class="total-price">
                <div class="total-text">订单金额</div>
                <div class="total-price">￥{{ detail.order.amount.toFixed(2) }}</div>
              </div>
            </div>
          </div>

          <div class="detail-title">商品信息</div>

          <div class="order-info">
            <div class="info-item">
              <div class="info-text">订单编号</div>
              <div class="info-content">{{ detail.order.sn }}</div>
            </div>
            <div class="info-item">
              <div class="info-text">下单时间</div>
              <div class="info-content">{{ detail.order.create_date }}</div>
            </div>
            <div class="info-item">
              <div class="info-text">支付方式</div>
              <div class="info-content">{{ detail.order.payment_method_name }}</div>
            </div>
            <div class="info-item">
              <div class="info-text">留&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言</div>
              <div class="info-content">
                {{ detail.order.memo }}
              </div>
            </div>
          </div>
        </div>
      </scroll>

      <div class="btn-group" v-if="isShowBtnGroup(detail.order.status)">
        <m-btn text="取消订单"
               btnType="hollow"
               @click.native="_cancelOrder(detail.order.sn, 'detail')"
               v-if="isShowCancelBtn(detail.order.status)"
               class="btn-item">
        </m-btn>
        <m-btn text="删除订单"
               btnType="hollow"
               @click.native="_deleteOrder(detail.order.sn, 'detail')"
               v-if="isShowDeleteBtn(detail.order.status)"
               class="btn-item">
        </m-btn>
        <m-btn text="申请退款"
               btnType="hollow"
               @click.native="_refundsOrder(detail.order.sn, 'detail')"
               v-if="isShowRefund(detail.order.status)"
               class="btn-item">
        </m-btn>
        <m-btn text="确认收货"
               btnType="solid"
               @click.native="_confirmOrder(detail.order.sn, 'detail')"
               v-if="isShowConfirmBtn(detail.order.status)"
               class="btn-item">
        </m-btn>
        <m-btn text="去支付"
               btnType="solid"
               @click.native="toPayPage(detail.order.sn)"
               v-if="isShowPayBtn(detail.order.status)"
               class="btn-item"
        >
        </m-btn>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar';
  import Scroll from 'base/scroll/scroll';
  import MBtn from 'base/btns/m-btn';
  import ListGoods from 'base/list-goods/list-goods';
  import { getOrderDetail } from 'api/order';
  import { ERR_OK } from 'api/config';
  import { getToken } from 'common/js/cache';
  import { orderMixin } from 'common/js/mixin';
  import { orderStatus } from 'common/js/order-status';

  export default {
    mixins: [orderMixin],
    data() {
      return {
        selected: 'detail',
        detail: null
      };
    },
    created() {
      this._getOrderDetail(this.$route.params.sn);
    },
    watch: {
      '$route'(newRoute) {
        if (newRoute.name === '订单详情') {
          this._getOrderDetail(this.$route.params.sn);
        }
      }
    },
    methods: {
      changeActive(selected) {
        if (selected === this.selected) {
          return;
        }
        this.selected = selected;
      },
      _getOrderDetail(sn) {
        getOrderDetail(getToken(), sn).then((res) => {
          if (res.code === ERR_OK) {
            res.datum.order.order_items.forEach((item) => {
              item.thumbnail = res.imageUrl + item.thumbnail;
            });

            this.detail = res.datum;
            this.setScrollHeight(this.detail.order.status);
          }
        });
      },
      isShowBtnGroup(status) {
        if (status === orderStatus.completed || status === orderStatus.refunding) {
          return false;
        }
        return true;
      },
      setScrollHeight(status) {
        if (status === orderStatus.completed || status === orderStatus.refunding) {
          setTimeout(() => {
            this.$refs.scroll.$el.style.bottom = 0;
          }, 20);
        } else {
          setTimeout(() => {
            this.$refs.scroll.$el.style.bottom = '1rem';
          }, 20);
        }
      }
    },
    components: {
      Scroll,
      MBtn,
      ListGoods,
      Navbar
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/slide'
  @import '~common/stylus/mixin'

  .order-detail-wrapper
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: $zIndex-d
    background: $color-background
    .order-detail-title
      display: flex
      height: .8rem
      line-height: .8rem
      text-align: center
      font-size: $font-size-medium
      background: #fff
      .title-text
        flex: 1
        &.active
          border-bottom: 3px solid #ff9f02
          color: #ff9f02
    .order-status
      position: fixed
      top: 1.6rem
      left: 0
      right: 0
      bottom: 1rem
      z-index: -1
      overflow: hidden
      .status-item
        display: flex
        align-items: center
        padding: .2rem .2rem 0 0
        height: 1.4rem
        font-size: $font-size-medium
        .imgs
          display: flex
          justify-content: center
          align-items: center
          height: 1.4rem
          flex: 0 0 1.6rem
          img
            width: .24rem
            height: .24rem
        .text-wrapper
          box-sizing: border-box
          padding: .1rem
          flex: 1
          height: 1.4rem
          line-height: .7rem
          background: #fff
          &.active
            position: relative
            &::after
              position: absolute
              top: 0
              left: 0
              content: ' '
              border: 1px solid #ff9f02
              transform: scale(0.5, 0.5)
              transform-origin: top left
              width: 200%
              height: 200%
          .text-first
            .status
              display: inline-block
              font-size: $font-size-medium
              font-weight: bold
            .time
              display: inline-block
              float: right
              font-size: $font-size-small
              color: #a2a2a2
          .text-two
            font-size: $font-size-small
            color: #a2a2a2
    .order-detail
      position: fixed
      top: 2rem
      left: 0
      right: 0
      bottom: 0
      z-index: -1
      overflow: hidden
      .detail-title
        padding: 0 .2rem
        height: .4rem
        line-height: .4rem
        font-size: $font-size-medium
      .dispatch
        padding: 0 .2rem
        margin: .2rem 0
        height: .8rem
        line-height: .8rem
        background: #fff
        font-size: $font-size-medium
        &.address
          height: auto
        .dispatch-title
          display: inline-block
          color: #939293
        .dispatch-content
          display: inline-block
      .order-goods-container
        margin: 10px 0
        background: #fff
        .goods
          position: relative
          &::after
            border-bottom-1px(#ddd)
        .price-detail
          display: flex
          font-size: $font-size-medium
          .market-price-wrapper
            display: flex
            flex-direction: column
            justify-content: space-between
            box-sizing: border-box
            height: 1.8rem
            padding: .2rem
            flex: 1
            border-right: 1px solid #ddd
            .market-price
              .market
                display: inline-block
              .price
                display: inline-block
                float: right
                &.cheap
                  color: #f93801
          .total-price
            flex: 1
            margin-top: .2rem
            line-height: .6rem
            text-align: center
            font-size: $font-size-medium-x
            .total-price
              color: #f93801
      .order-info
        display: flex
        flex-direction: column
        justify-content: space-between
        padding: .2rem
        margin: .2rem 0
        height: 2rem
        font-size: $font-size-medium
        background: #fff
        .info-item
          display: flex
          .info-text
            flex: 0 0 2rem
            color: #9b9b9b
          .info-content
            flex: 1
    .btn-group
      position: fixed
      right: 0
      bottom: 0
      display: flex
      justify-content: center
      align-items: center
      width: 100%
      height: 1rem
      background: $color-background
      .m-btn
        margin: 0 .2rem
</style>
