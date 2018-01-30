<template>
  <div class="goods-wrapper" :class="goodsType">
    <div class="goods-img-wrapper" :class="goodsType">
      <img class="goods-img"
           :class="goodsType"
           v-lazy="'http://www.omengo.com//upload/image/201711/52e53672-9c78-49ac-b57d-d8c631f7ebda_thumbnail.jpg'"
           @click="toGoodsDetail"/>
    </div>
    <div class="goods-detail" :class="goodsType">
      <div class="brand-name" :class="goodsType">银鹭<span class="name">银鹭花生牛奶饮料盒装银鹭花生牛奶饮料盒装</span>
      </div>
      <div class="unit">250ml/盒</div>
      <div class="price">￥2.50</div>
    </div>
    <img class="add-img" src="./shop_plus.png" @click="add"/>
    <promotions class="promotions" :promotions="promotions"></promotions>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapMutations } from 'vuex';
  import Promotions from 'base/promotions/promotions';

  export default {
    props: {
      goodsType: {
        type: String,
        default: 'normal'
      },
      promotions: {
        type: String,
        defalut: null
      }
    },
    data() {
      return {
        show: false
      };
    },
    methods: {
      toGoodsDetail() {
        this.$router.push('/detail');
      },
      add() {
        this.setSkuStatus(true);
      },
      ...mapMutations({
        setSkuStatus: 'SET_SKU_STATUS'
      })
    },
    components: {
      Promotions
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'

  .goods-wrapper
    display: inline-block
    position: relative
    box-sizing: border-box
    padding: .1rem
    background: $color-text
    &.normal
      width: 35vw
      height: 3.4rem
    &.medium
      width: 47vw
      margin: .1rem
    &.category
      display: flex
    .goods-img-wrapper
      text-align: center
      &.category
        flex: 0 0 1.8rem
      .goods-img
        width: 1.6rem
        height: 1.6rem
        &.medium
          width: 2rem
          height: 2rem
    .goods-detail
      &.category
        flex: 1
        > .brand-name, .unit, .price
          height: .5rem
          line-height: .5rem
      .brand-name, .unit, .price
        height: .4rem
        line-height: .4rem
      .brand-name
        no-wrap()
        font-size: $font-size-medium
        font-weight: 700
        &.category
          width: 3rem
        .name
          font-size: $font-size-medium
          font-weight: normal
      .unit
        font-size: $font-size-small
        color: $color-unit
      .price
        font-size: $font-size-medium
        color: $color-price
    .add-img
      position: absolute
      right: .2rem
      bottom: .2rem
      width: .5rem
      height: .5rem
    .promotions
      position: absolute
      top: .2rem
      left: .2rem
</style>
