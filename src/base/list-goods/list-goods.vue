<template>
  <div class="goods-wrapper">
    <div class="goods-img-wrapper">
      <img class="goods-img"
           v-lazy="'http://www.omengo.com//upload/image/201711/52e53672-9c78-49ac-b57d-d8c631f7ebda_thumbnail.jpg'"
           @click="toGoodsDetail"/>
    </div>
    <div class="goods-detail">
      <div class="brand-name">银鹭<span class="name">银鹭花生牛奶饮料盒</span>
      </div>
      <div class="unit">250ml/盒</div>
      <div class="price">￥2.50 <span class="quantity">x2</span></div>
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
