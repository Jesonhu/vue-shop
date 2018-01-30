<template>
  <transition name="slide">
    <div class="goods-container">
      <scroll class="goods">
        <div>
          <van-swipe class="goods-swipe" :autoplay="3000">
            <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
              <img :src="thumb">
            </van-swipe-item>
          </van-swipe>

          <van-cell-group>
            <van-cell class="goods-title-price">
              <div class="goods-title">{{ goods.title }}</div>
              <div class="goods-price">{{ formatPrice(goods.price) }}</div>
            </van-cell>
            <van-cell class="goods-express">
              <van-col span="10">运费：{{ goods.express }}</van-col>
              <van-col span="14">剩余：{{ goods.remain }}</van-col>
            </van-cell>
          </van-cell-group>

          <van-cell-group class="goods-cell-group">
            <van-cell value="进入店铺" icon="shop" is-link>
              <template slot="title">
                <span class="van-cell-text">有赞的店</span>
                <van-tag type="danger">官方</van-tag>
              </template>
            </van-cell>
            <van-cell title="线下门店" icon="location" is-link/>
          </van-cell-group>

          <van-cell-group class="goods-cell-group">
            <van-cell title="查看商品详情" is-link/>
          </van-cell-group>

        </div>
      </scroll>

      <van-goods-action class="goods-action">
        <van-goods-action-mini-btn icon="chat">
          客服
        </van-goods-action-mini-btn>
        <van-goods-action-mini-btn icon="cart" :info="cartQuantity">
          购物车
        </van-goods-action-mini-btn>
        <van-goods-action-big-btn @click="showSku">
          加入购物车
        </van-goods-action-big-btn>
        <van-goods-action-big-btn primary>
          立即购买
        </van-goods-action-big-btn>
      </van-goods-action>

      <div class="back-wrapper">
        <div class="back-img" @click="back">
          <img width="100%" height="100%" src="./back_icon_gray_bg.png"/>
        </div>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  import {
    Tag,
    Col,
    Icon,
    Cell,
    CellGroup,
    Swipe,
    SwipeItem,
    GoodsAction,
    GoodsActionBigBtn,
    GoodsActionMiniBtn,
    Toast
  } from 'vant';
  import { mapMutations } from 'vuex';
  import Scroll from 'base/scroll/scroll';
  import Sku from 'base/sku/sku';

  export default {
    data() {
      return {
        showBase: false,
        cartQuantity: '4',
        goods: {
          title: '美国伽力果（约680g/3个）',
          price: 2680,
          express: '免运费',
          remain: 19,
          thumb: [
            'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
            'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
          ],
          picture: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg'
        }
      };
    },
    methods: {
      formatPrice() {
        return '¥' + (this.goods.price / 100).toFixed(2);
      },
      back() {
        this.$router.back();
      },
      showSku() {
        this.setSkuStatus(true);
      },
      ...mapMutations({
        setSkuStatus: 'SET_SKU_STATUS'
      })
    },
    components: {
      [Tag.name]: Tag,
      [Col.name]: Col,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [GoodsAction.name]: GoodsAction,
      [GoodsActionBigBtn.name]: GoodsActionBigBtn,
      [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
      [Toast.name]: Toast,
      Scroll,
      Sku
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/slide'

  .goods-container
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: $zIndex-x
    background: $color-text
    .goods
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 1rem
      overflow: hidden
      z-index: $zIndex-s
      background: $color-text
      .goods-swipe
        img
          width: 100vw
          height: 100vw
          display: block
      .goods-title-price
        padding: .2rem .3rem
        line-height: .48rem
        .goods-title
          font-size: $font-size-medium
        .goods-price
          font-size: $font-size-small
          color: #f44
      .goods-express
        color: #999
        font-size: $font-size-small
        padding: .1rem .3rem
      .goods-cell-group
        margin: .3rem 0
        .van-cell__value
          color: #999
        .goods-action
          z-index: $zIndex-s
    .goods-action
      position: fixed
      .van-goods-action__mini-btn
        height: 1rem
        font-size: $font-size-small-s
        .van-goods-action__mini-btn-icon
          font-size: .4rem
      .van-button--bottom-action
        height: 1rem
        line-height: 1rem
        font-size: $font-size-medium
    .back-wrapper
      position: fixed
      top: .2rem
      left: .2rem
      z-index: $zIndex-s
      .back-img
        width: .7rem
        height: .7rem
</style>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  .goods-cell-group
    .van-cell
      .van-cell__title
        font-size: $font-size-small
        .van-icon-shop, .van-icon-location
          font-size: $font-size-medium-x
        .van-tag--danger
          line-height: .28rem
          padding: .02rem .1rem
          border-radius: .04rem
          font-size: $font-size-small
          /*background: #c9c9c9*/
          color: $color-text
        .van-hairline--surround
          &::after
            border-width: 0
      .van-cell__value--link
        padding-right: .4rem
        font-size: $font-size-small
      .van-icon-arrow
        right: .3rem
        font-size: $font-size-small-s

  .goods-action
    .van-goods-action__mini-btn
      .van-goods-action__mini-btn-icon
        font-size: .4rem
        margin-bottom: .1rem
</style>
