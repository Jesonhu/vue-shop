<template>
  <div class="goods-wrapper">
    <div class="goods-img-wrapper">
      <img class="goods-img"
           v-lazy="goods.thumbnail"
           @click="toGoodsDetail"/>
    </div>
    <div class="goods-detail">
      <div class="brand-name">{{ goods.brand }}<span class="name">{{ goods.name }}</span>
      </div>
      <div class="unit">{{ goods.unit }}</div>
      <div class="price">￥{{ goods.price.toFixed(2) }} <span class="quantity">x{{ goods.quantity }}</span></div>
    </div>
    <promotions class="promotions" :promotions="promotions"></promotions>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapMutations } from 'vuex';
  import Promotions from 'base/promotions/promotions';

  export default {
    props: {
      promotions: {
        type: String,
        defalut: null
      },
      goods: {
        type: Object,
        defalut: {}
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
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .goods-wrapper
    position: relative
    display: flex
    align-items: center
    height: 1.4rem
    padding: .1rem
    font-size: $font-size-medium
    background: $color-text
    &::after
      border-bottom-1px(#ddd)
    .goods-img-wrapper
      flex: 0 0 1.2rem
      .goods-img
        width: 1.2rem
        height: 1.2rem
    .goods-detail
      flex: 1
      margin-left: .2rem
      line-height: .4rem
      .brand-name
        width: 80vw
        color: #333
        font-size: $font-size-small
        font-weight: bold
        no-wrap()
        .name
          font-size: $font-size-small
          font-weight: normal
      .unit
        color: $color-unit
        font-size: $font-size-small-s
      .price
        color: $color-price
        font-size: $font-size-small
        .quantity
          color: #333
    .promotions
      position: absolute
      top: 0
      left: 0
</style>
