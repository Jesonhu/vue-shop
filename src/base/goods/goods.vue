<template>
  <div class="goods-wrapper" :class="goodsType" v-if="goods">
    <div class="goods-img-wrapper" :class="goodsType">
      <img class="goods-img"
           :class="goodsType"
           v-lazy="goods.image"
           @click="toGoodsDetail(goods.id)"
           @load="_loadImage"/>
    </div>
    <div class="goods-detail" :class="goodsType">
      <div class="brand-name" :class="goodsType">{{ goods.brand }}<span class="name">{{ goods.name }}</span>
      </div>
      <div class="unit">{{ goods.unit }}</div>
      <div class="price">￥{{ parseFloat(goods.price).toFixed(2) }}</div>
    </div>
    <img class="add-img" src="./shop_plus.png" @click="add(goods)"/>
    <promotions class="promotions" :promotions="promotions"></promotions>
  </div>
</template>

<script type="text/ecmascript-6">
  import Promotions from 'base/promotions/promotions';
  import { mapMutations } from 'vuex';
  import { skuMixin } from 'common/js/mixin';

  export default {
    mixins: [skuMixin],
    props: {
      goodsType: {
        type: String,
        default: 'normal'
      },
      promotions: {
        type: String,
        defalut: null
      },
      goods: {
        type: Object,
        defalut: null
      }
    },
    data() {
      return {
        show: false
      };
    },
    methods: {
      toGoodsDetail(goodsId) {
        this.$router.push(`/detail/${goodsId}`);
      },
      add(goods) {
        // this.setSkuStatus(true);
        this._showSku(goods);
      },
      _loadImage() {
        this.$emit('loadImage');
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
        margin-left: .2rem
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
      top: .1rem
      left: .1rem
</style>
