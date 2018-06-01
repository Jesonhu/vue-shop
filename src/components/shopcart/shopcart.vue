<template>
  <transition name="slide">
    <div class="shopcart-container">
      <navbar :right-text="rightText"
              title="购物车"
              @rightClick="edit">
      </navbar>
      <scroll class="shopcart-list" v-if="goodsList">
        <div>
          <van-checkbox-group class="card-goods" v-model="checkedGoods">
            <van-checkbox
              class="card-goods__item"
              v-for="item in goodsList"
              :key="item.product_id"
              :name="item.product_id"
            >
              <van-card
                class="cart"
                :title="item.name"
                :desc="item.unit"
                :num="item.quantity"
                :price="parseFloat(item.price).toFixed(2)"
                :thumb="item.image"
              >
                <div slot="footer">
                  <van-stepper v-model="item.quantity" @change="change(item.product_id, item.quantity)"/>
                </div>
              </van-card>
            </van-checkbox>
          </van-checkbox-group>
        </div>
      </scroll>
      <van-submit-bar
        v-if="goodsList"
        :price="totalPrice"
        :button-text="buttonText"
        @submit="onSubmit"
      >
        <van-checkbox v-model="checked" class="submit-all-btn" @click.native="selectAll">全选</van-checkbox>
      </van-submit-bar>

      <empty src="shopcart" text="您的购物车还没有商品..." v-if="!goodsList">
      </empty>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { Checkbox, CheckboxGroup, Card, Stepper, SubmitBar, Dialog, Toast } from 'vant';
  import { getShopcartList, deleteShopcartItem, modifyShopcart } from 'api/shopcart';
  import { mapMutations } from 'vuex';
  import { checkOrder } from 'api/order';
  import { getCartKey, getToken } from 'common/js/cache';
  import { ERR_OK } from 'api/config';
  import Scroll from 'base/scroll/scroll';
  import Navbar from 'base/navbar/navbar';
  import Empty from 'base/empty/empty';

  export default {
    data() {
      return {
        checkedGoods: [],
        goodsList: null,
        checked: false,
        rightText: '编辑',
        buttonText: '提交订单'
      };
    },
    created() {
      this.checked = false;
      this.checkedGoods = [];
      this._getShopcartList();
    },
    computed: {
      submitBarText() {
        const count = this.checkedGoods.length;
        return '结算' + (count ? `(${count})` : '');
      },
      totalPrice() {
        if (this.rightText === '完成') {
          return null;
        }

        if (this.checkedGoods.length === 0) {
          return 0;
        }

        let total = 0;
        this.goodsList.forEach((goods) => {
          if (this.checkedGoods.indexOf(goods.product_id) !== -1) {
            total = total + goods.price * goods.quantity * 100;
          }
        });

        return total;
      }
    },
    watch: {
      '$route'(newRoute) {
        if (newRoute.name === '购物车') {
          this.rightText = '编辑';
          this.buttonText = '提交订单';
          this.checked = false;
          this.checkedGoods = [];
          this._getShopcartList();
        }
      },
      checkedGoods(newArr) {
        if (!this.goodsList) {
          return;
        }

        if (newArr.length === this.goodsList.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      }
    },
    methods: {
      change(productId, quantity) {
        /**
         * 解决vant checkbox-group关联cart footer下 stepper的bug
         * 思路: 删除原来的id,并在相同的位置添加进去
         * @type {number}
         */
        const index = this.checkedGoods.findIndex((value) => {
          return value === productId;
        });
        this.checkedGoods = this.checkedGoods.splice(index, 0, productId);
        this._modifyShopcart(productId, quantity);
      },
      onSubmit() {
        if (this.rightText === '编辑') {
          if (this.checkedGoods.length === 0) {
            Toast('请您至少选择一个商品!');
            return;
          }

          const productIds = this.checkedGoods + '';
          this._checkOrder(productIds);
        } else {
          this.cofirmDelete();
        }
      },
      _checkOrder(productIds) {
        const token = getToken();

        if (!token) {
          this.setLoginModal(true);
          return;
        }

        checkOrder(token, getCartKey(), productIds).then((res) => {
          if (res.code === ERR_OK) {
            res.datum.order.order_items.forEach((goods) => {
              goods.thumbnail = res.imageUrl + goods.thumbnail;
            });

            this.setCheckOrder(res.datum);
            this.setSelectAddress(res.datum.defaultReceiver);
            this.$router.push('/shopcart_order');
          }
        });
      },
      _getShopcartList() {
        getShopcartList(getCartKey()).then((res) => {
          if (res.code === ERR_OK) {
            if (res.datum) {
              res.datum.cartItems.forEach((item) => {
                item.image = res.imageUrl + item.image;
                this.$set(item, 'is_select', false);
              });
              this.goodsList = res.datum.cartItems;
            } else {
              this.goodsList = res.daum;
            }
          }
        });
      },
      edit() {
        if (this.rightText === '编辑') {
          this.rightText = '完成';
          this.buttonText = '删除';
          this.checkedGoods = [];
          this.checked = false;
        } else {
          this.rightText = '编辑';
          this.buttonText = '提交订单';
          this.checkedGoods = [];
          this.checked = false;
        }
      },
      cofirmDelete() {
        if (this.checkedGoods.length === 0) {
          return;
        }

        Dialog.confirm({
          title: '提示',
          message: '是否删除选中商品'
        }).then(() => {
          this._deleteShopcartItem();
        }).catch(() => {
          // on cancel
        });
      },
      _deleteShopcartItem() {
        // const ids = this.checkedGoods + '';
        let ids = [];
        this.checkedGoods.forEach((item) => {
          let index = this.goodsList.findIndex((value) => {
            return item === value.product_id;
          });
          ids.push(this.goodsList[index].id);
        });
        if (ids.length >= 1) {
          deleteShopcartItem(getCartKey(), ids + '').then((res) => {
            if (res.code === ERR_OK) {
              Toast.success('删除成功!');
              this.checkedGoods = [];
              this._getShopcartList();
            }
          });
        }
      },
      selectAll() {
        if (this.checkedGoods.length === 0 || this.checkedGoods.length < this.goodsList.length) {
          this.checkedGoods = [];
          this.goodsList.forEach((goods) => {
            this.checkedGoods.push(goods.product_id);
          });
          return false;
        }
        if (this.checkedGoods.length === this.goodsList.length) {
          this.checkedGoods = [];
        }
      },
      _modifyShopcart(productId, quantity) {
        modifyShopcart(productId, quantity, getCartKey()).then((res) => {
          if (res.code === ERR_OK) {
            Toast.success('修改成功!');
          }
        });
      },
      ...mapMutations({
        setCheckOrder: 'SET_CHECK_ORDER',
        setLoginModal: 'SET_LOGIN_MODAL',
        setSelectAddress: 'SET_SELECT_ADDRESS'
      })
    },
    components: {
      [Card.name]: Card,
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
      [Stepper.name]: Stepper,
      [SubmitBar.name]: SubmitBar,
      [Dialog.name]: Dialog,
      [Toast.name]: Toast,
      Scroll,
      Navbar,
      Empty
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/slide'
  @import '~common/stylus/mixin'

  .shopcart-container
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: $zIndex-x
    background: rgb(249, 249, 249)
    .shopcart-list
      position: fixed
      top: 46px
      left: 0
      right: 0
      bottom: 50px
      z-index: $zIndex-s
      overflow: hidden
      .card-goods
        box-sizing: border-box
      .card-goods__item
        position: relative
        padding: 10px
        background-color: #fafafa
        &::after
          border-bottom-1px(#ddd)
        .van-checkbox--round
          position: absolute
          top: 35%
        .van-checkbox__input
          top: 50%
          position: absolute
        .van-checkbox__label
          margin: 0
          width: 100%
          padding-left: 35px
          box-sizing: border-box
        .van-card__price
          color: #f44
</style>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .submit-all-btn
    width: 60px
    margin-left: 10px
    font-size: 14px
  .van-checkbox__label
    position: relative
    top: 2px
</style>
