<template>
  <transition name="slide">
    <div class="shopcart-container">
      <navbar :right-text="'编辑'"></navbar>
      <scroll class="shopcart-list">
        <div>
          <van-checkbox-group class="card-goods" v-model="checkedGoods">
            <van-checkbox
              class="card-goods__item"
              v-for="item in goods"
              :key="item.id"
              :name="item.id"
            >
              <van-card
                class="cart"
                :title="item.title"
                :desc="item.desc"
                :num="item.num"
                :price="formatPrice(item.price)"
                :thumb="item.thumb"
              >
                <div slot="footer">
                  <van-stepper v-model="item.num" @change="change(item.id)"/>
                </div>
              </van-card>
            </van-checkbox>
          </van-checkbox-group>
        </div>
      </scroll>

      <submit-bar :totalPrice="totalPrice" @submit="submitOrder"></submit-bar>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { Checkbox, CheckboxGroup, Card, Stepper } from 'vant';
  import Scroll from 'base/scroll/scroll';
  import Navbar from 'base/navbar/navbar';
  import SubmitBar from 'base/submit-bar/submit-bar';

  export default {
    data() {
      return {
        checkedGoods: ['1', '2', '3'],
        goods: [
          {
            id: '1',
            title: '进口香蕉',
            desc: '约250g，2根',
            price: 200,
            num: 1,
            thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
          },
          {
            id: '2',
            title: '陕西蜜梨',
            desc: '约600g',
            price: 690,
            num: 1,
            thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'
          },
          {
            id: '3',
            title: '美国伽力果',
            desc: '约680g/3个',
            price: 2680,
            num: 1,
            thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
          }]
      };
    },
    computed: {
      submitBarText() {
        const count = this.checkedGoods.length;
        return '结算' + (count ? `(${count})` : '');
      },
      totalPrice() {
        return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price * item.num : 0), 0);
      }
    },
    methods: {
      formatPrice(price) {
        return (price / 100).toFixed(2);
      },
      change(id) {
        /**
         * 解决vant checkbox-group关联cart footer下 stepper的bug
         * 思路: 删除原来的id,并在相同的位置添加进去
         * @type {number}
         */
        const index = this.checkedGoods.findIndex((value) => {
          return value === id;
        });
        this.checkedGoods = this.checkedGoods.splice(index, 0, id);
      },
      submitOrder() {
        this.$router.push('/shopcart_order');
      }
    },
    components: {
      [Card.name]: Card,
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
      [Stepper.name]: Stepper,
      Scroll,
      Navbar,
      SubmitBar
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
    z-index: $zIndex-d
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
        padding: .2rem
        background-color: #fafafa
        &::after
          border-bottom-1px(#ddd)
        .van-checkbox__input
          top: 50%
          left: .3rem
          margin-top: -0.2rem
          position: absolute
        .van-checkbox__label
          margin: 0
          width: 100%
          padding-left: .7rem
          box-sizing: border-box
        .van-card__price
          color: #f44
</style>
