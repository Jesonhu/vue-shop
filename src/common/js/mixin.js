import { mapActions } from 'vuex';
import { createSku } from './sku';
import { createSkuGoods } from './skuGoods';
import { ERR_OK } from 'api/config';
import { getToken } from './cache';
import { cancelOrder, deleteOrder, refundsOrder, confirmOrder } from 'api/order';
import { Dialog } from 'vant';
import { orderStatus } from './order-status';

const orderListTypes = {
  list: 'list',
  detail: 'detail'
};

export const sendSmsMixin = {
  computed: {
    sendSmsActive() {
      if (this.username.length === 11 && this.smsText === '获取验证码') {
        return 'active';
      }
      return '';
    }
  },
  methods: {
    countDown() {
      this.timer = null;
      clearInterval(this.timer);
      let num = 59;
      this.smsText = '59s';
      this.timer = setInterval(() => {
        num = num - 1;
        if (num === 0) {
          clearInterval(this.timer);
          this.timer = null;
          this.smsText = '获取验证码';
          return;
        }
        this.smsText = `${num}s`;
      }, 1000);
    }
  }
};

export const skuMixin = {
  methods: {
    _showSku(goodsDetail) {
      // this.setSkuStatus(true);
      const goods = createSkuGoods({
        title: goodsDetail.brand + goodsDetail.name,
        picture: goodsDetail.image
      });
      const sku = createSku({
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: '规格', // skuKeyName：规格类目名称
            v: [
              {
                id: goodsDetail.id, // skuValueId：规格值 id
                name: goodsDetail.unit, // skuValueName：规格值名称
                imgUrl: goodsDetail.image // 规格类目图片，只有第一个规格类目可以定义图片
              }
            ],
            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: goodsDetail.id, // skuId，下单时后端需要
            price: goodsDetail.price * 100, // 价格（单位分）
            s1: goodsDetail.id, // 规格类目 k_s 为 s1 的对应规格值 id
            stock_num: goodsDetail.availableStock // 当前 sku 组合对应的库存
          }
        ],
        price: goodsDetail.price, // 默认价格（单位元）
        stockNum: goodsDetail.availableStock, // 商品总库存
        collectionId: goodsDetail.id, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        noneSku: false, // 是否无规格商品
        messages: [],
        hideStock: false // 是否隐藏剩余库存
      });
      const goodsId = goodsDetail.id;
      this.showSku({ skuStatus: true, sku, goods, goodsId });
    },
    ...mapActions([
      'showSku'
    ])
  }
};

export const orderMixin = {
  methods: {
    _cancelOrder(sn, type) {
      Dialog.confirm({
        title: '提示',
        message: '是否取消订单?'
      }).then(() => {
        // on confirm
        cancelOrder(getToken(), sn).then((res) => {
          if (res.code === ERR_OK) {
            this.__getOrderList__(type);
          }
        });
      }).catch(() => {
        // on cancel
      });
    },
    toPayPage(sn) {
      this.$router.push(`/pay/${sn}`);
    },
    _deleteOrder(sn, type) {
      Dialog.confirm({
        title: '提示',
        message: '是否删除订单?'
      }).then(() => {
        // on confirm
        deleteOrder(getToken(), sn).then((res) => {
          if (res.code === ERR_OK) {
            this.__getOrderList__(type);
          }
        });
      }).catch(() => {
        // on cancel
      });
    },
    _refundsOrder(sn, type) {
      Dialog.confirm({
        title: '提示',
        message: '是否申请退款?'
      }).then(() => {
        // on confirm
        refundsOrder(getToken(), sn).then((res) => {
          if (res.code === ERR_OK) {
            this.__getOrderList__(type);
          }
        });
      }).catch(() => {
        // on cancel
      });
    },
    _confirmOrder(sn, type) {
      Dialog.confirm({
        title: '提示',
        message: '是否确认收货?'
      }).then(() => {
        // on confirm
        confirmOrder(getToken(), sn).then((res) => {
          if (res.code === ERR_OK) {
            this.__getOrderList__(type);
          }
        });
      }).catch(() => {
        // on cancel
      });
    },
    __getOrderList__(type) {
      if (type === orderListTypes.list) {
        this._getOrderList();
        return;
      }
      if (type === orderListTypes.detail) {
        this.$router.back();
      }
    },
    isShowCancelBtn(status) {
      if (status === orderStatus.pendingPayment) {
        return true;
      }
      return false;
    },
    isShowPayBtn(status) {
      if (status === orderStatus.pendingPayment) {
        return true;
      }
      return false;
    },
    isShowDeleteBtn(status) {
      if (status === orderStatus.canceled) {
        return true;
      }
      return false;
    },
    isShowRefund(status) {
      if (status === orderStatus.pendingReview || status === orderStatus.pendingShipment) {
        return true;
      }
      return false;
    },
    isShowConfirmBtn(status) {
      if (status === orderStatus.shipped) {
        return true;
      }
      return false;
    }
  }
};
