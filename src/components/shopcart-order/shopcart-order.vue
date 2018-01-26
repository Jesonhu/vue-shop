<template>
  <transition name="slide2">
    <div class="shopcart-order-wrapper">
      <navbar></navbar>
      <contact></contact>
      <van-checkbox-group v-model="result">
        <van-cell-group>
          <van-cell v-for="(item, index) in list" :key="index">
            <van-checkbox :name="item" class="pay-methods">支付方式</van-checkbox>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>

      <div class="memo-wrapper">
        <span>备注</span>
        <input class="memo" type="text" placeholder="请输入备注">
      </div>

      <div class="list-goods-wrapper">
        <list-goods v-for="n in 3" :key="n"></list-goods>
      </div>
      <div class="pay-info">
        <div class="info-item">
          <div class="info">商品总价</div>
          <div class="price">￥40.00</div>
        </div>
        <div class="info-item">
          <div class="info">配送费</div>
          <div class="price">-￥0.00</div>
        </div>
        <div class="info-item">
          <div class="info">优惠</div>
          <div class="price promotions">-￥10.00</div>
        </div>
        <div class="info-item">
          <div class="info">应付</div>
          <div class="price">￥30.00</div>
        </div>
      </div>
      <submit-bar :selectAll="true" :totalPrice="3000" @submit="submitOrder"></submit-bar>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { Checkbox, CheckboxGroup, Cell, CellGroup } from 'vant';
  import Navbar from 'base/navbar/navbar';
  import Contact from 'base/contact/contact';
  import ListGoods from 'base/list-goods/list-goods';
  import SubmitBar from 'base/submit-bar/submit-bar';

  export default {
    data() {
      return {
        list: ['支付方式'],
        result: ['a', 'b']
      };
    },
    methods: {
      submitOrder() {
        this.$router.push('/pay');
      }
    },
    components: {
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      Navbar,
      Contact,
      ListGoods,
      SubmitBar
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
    z-index: $zIndex-d
    background: $color-background
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
  .pay-methods
    > .van-checkbox__input
      float: right
</style>
