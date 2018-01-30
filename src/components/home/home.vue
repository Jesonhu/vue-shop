<template>
  <div class="home-container">
    <div class="header">
      <div class="header-text" @click="toLocationPage">有赞商城 <img class="arrow_bottom" src="./title_bar_arrow.png"/></div>
      <div class="header-imgs">
        <img class="imgs-item" src="./title_bar_msg.png"/>
        <img class="imgs-item" src="./title_bar_search.png" @click="toSearchPage"/>
      </div>
    </div>
    <scroll class="product-list">
      <div>
        <van-swipe :autoplay="3000" class="swiper">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img width="100%" height="100%" v-lazy="image"/>
          </van-swipe-item>
        </van-swipe>

        <div class="services">
          <div class="service-item" @click="toHomeGoodsPage()">
            <img src="./ic_home_often.png" />
            <span>我常买</span>
          </div>
          <div class="service-item" @click="toHomeGoodsPage()">
            <img src="./ic_home_funs.png" />
            <span>粉丝</span>
          </div>
          <div class="service-item" @click="toHomeGoodsPage()">
            <img src="./ic_home_hot.png" />
            <span>热销</span>
          </div>
          <div class="service-item" @click="toHomeGoodsPage()">
            <img src="./ic_home_new.png" />
            <span>新品</span>
          </div>
        </div>

        <div class="product-category" v-for="n in 5" :key="n">
          <div class="product-item">
            <img class="product-bg"
                 src="http://www.omengo.com//upload/image/201712/06510a64-29eb-4144-be3f-91d8d992ebc6.jpg"/>
            <scroll class="product-container"
                    :direction="'horizontal'"
                    :scrollX="true">
              <div style="width: 1000px; font-size: 0">
                <goods :promotions="'满减'"></goods>
                <goods></goods>
                <goods :promotions="'折扣'"></goods>
                <goods></goods>
                <goods></goods>
                <goods></goods>
              </div>
            </scroll>
          </div>
        </div>
        <div class="guess-container">
          <img class="guess-bar" src="./home_guess_bar.png"/>
          <div class="guess-list">
            <goods v-for="n in 5"
                   :key="n"
                   :goods-type="'medium'"
                   :promotions=" n %2 === 0 ? '一元抢购' : null"
                   ></goods>
          </div>
        </div>
        <loaded-bottom></loaded-bottom>
      </div>
    </scroll>

  </div>
</template>

<script type="text/ecmascript-6">
  import { Swipe, SwipeItem, PullRefresh, Toast } from 'vant';
  import Goods from 'base/goods/goods';
  import Scroll from 'base/scroll/scroll';
  import LoadedBottom from 'base/loaded-bottom/loaded-bottom';
  import Sku from 'base/sku/sku';

  export default {
    data() {
      return {
        images: [
          'http://www.omengo.com//upload/image/201801/62f65234-aea6-4d40-9917-f7389307d0e3.jpg',
          'https://img.yzcdn.cn/2.jpg'
        ]
      };
    },
    methods: {
      toSearchPage() {
        this.$router.push('/search');
      },
      toLocationPage() {
        this.$router.push('/location');
      },
      toServicePage() {
        this.$router.push('/subfield');
      },
      toHomeGoodsPage() {
        this.$router.push('/home_goods');
      }
    },
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [PullRefresh.name]: PullRefresh,
      [Toast.name]: Toast,
      Goods,
      Scroll,
      LoadedBottom,
      Sku
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .home-container
    .header
      display: flex
      box-sizing: border-box
      padding-left: .2rem
      width: 100vw
      height: .8rem
      line-height: .8rem
      font-size: $font-size-medium
      background: $color-theme
      .header-text
        flex: 1
        .arrow_bottom
          position: relative
          top: 2px
      .header-imgs
        display: flex
        align-items: center
        flex: 0 0 1.6rem
        .imgs-item
          display: inline-block
          margin: 0 .2rem
          width: .6rem
          height: .6rem

    .product-list
      position: fixed
      top: .8rem
      left: 0
      right: 0
      bottom: 1rem
      overflow: hidden
      background: $color-background
      .swiper
        width: 100%
        height: 50vw
      .services
        display: flex
        align-items: center
        height: 70px
        font-size: $font-size-medium
        background: $color-text
        .service-item
          flex: 1
          text-align: center
          img
            display: block
            margin: 0 auto
            width: 40px
            height: 40px
      .product-item
        .product-bg
          width: 100%
          height: 1.4rem
      .guess-container
        .guess-bar
          display: block
          width: 100%
          height: .4rem
</style>
