<template>
  <div class="home-container">
    <div class="header">
      <div class="header-text">{{ siteName }} <img class="arrow_bottom" src="./title_bar_arrow.png"/>
      </div>
      <div class="header-imgs">
        <img class="imgs-item" src="./title_bar_msg.png"/>
        <img class="imgs-item" src="./title_bar_search.png" @click="toSearchPage"/>
      </div>
    </div>
    <scroll class="product-list" ref="scroll" :data="productCategorys">
      <div>
        <van-pull-refresh v-model="isLoading">
          <van-swipe :autoplay="3000" class="swiper">
            <van-swipe-item v-for="(banner, index) in banners" :key="index">
              <img width="100%" height="100%" v-lazy="banner.path"/>
            </van-swipe-item>
          </van-swipe>

          <div class="services">
            <div class="service-item" @click="toHomeGoodsPage('always_buy')">
              <img src="./ic_home_often.png"/>
              <span>我常买</span>
            </div>
            <div class="service-item" @click="toHomeGoodsPage('recommend')">
              <img src="./ic_home_funs.png"/>
              <span>推荐</span>
            </div>
            <div class="service-item" @click="toHomeGoodsPage('hot')">
              <img src="./ic_home_hot.png"/>
              <span>热销</span>
            </div>
            <div class="service-item" @click="toHomeGoodsPage('new_products')">
              <img src="./ic_home_new.png"/>
              <span>新品</span>
            </div>
          </div>

          <div class="product-category" v-for="(category, index) in productCategorys" :key="index">
            <div class="product-item">
              <img class="product-bg"
                   :src="category.image"
                   @error="setFailImg"/>
              <scroll class="product-container"
                      :direction="'horizontal'"
                      :scrollX="true">
                <div ref="products">
                  <goods
                    v-for="(product, index) in category.children"
                    :key="index"
                    :goods="product"
                  >
                  </goods>
                </div>
              </scroll>
            </div>
          </div>
          <div class="guess-container">
            <img class="guess-bar" src="./home_guess_bar.png"/>
            <div class="guess-list">
              <goods v-for="(goods, index) in guessYouLikeGoods.list"
                     :key="index"
                     :goods-type="'medium'"
                     :goods="goods"
              >
              </goods>
            </div>
          </div>
          <loaded-bottom></loaded-bottom>
        </van-pull-refresh>
      </div>
    </scroll>

  </div>
</template>

<script type="text/ecmascript-6">
  import { Swipe, SwipeItem, PullRefresh, Toast } from 'vant';
  import { getBanner, getProductCategory, getGuessYouLikeGoods } from 'api/home';
  import { ERR_OK } from 'api/config';
  import Goods from 'base/goods/goods';
  import Scroll from 'base/scroll/scroll';
  import LoadedBottom from 'base/loaded-bottom/loaded-bottom';
  import Sku from 'base/sku/sku';
  import FailImg from './img_error_big.jpg';
  // import FailImg from './home_category_02.png';

  export default {
    data() {
      return {
        banners: [],
        productCategorys: [],
        guessYouLikeGoods: [],
        isLoading: false,
        siteName: ''
      };
    },
    created() {
      this._getBanner();
      this._getProductCategory();
      this._getGuessYouLikeGoods();
    },
    watch: {
      isLoading() {
        if (this.isLoading) {
          setTimeout(() => {
            Toast('刷新成功');
            this._getBanner();
            this._getProductCategory();
            this._getGuessYouLikeGoods();
            this.isLoading = false;
          }, 1000);
        }
      }
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
      toHomeGoodsPage(type) {
        this.$router.push(`/home_goods/${type}`);
      },
      _getBanner() {
        getBanner().then((res) => {
          if (res.code === ERR_OK) {
            res.data.forEach((item) => {
              item.path = res.imageUrl + item.path;
            });
            this.banners = res.data;
            this.siteName = res.siteName;
            Toast.clear();
          }
        });
      },
      _getProductCategory() {
        getProductCategory().then((res) => {
          if (res.code === ERR_OK) {
            res.data.forEach((category) => {
              category.image = res.imageUrl + category.image;
              category.children.forEach((item) => {
                item.image = res.imageUrl + item.image;
                item.availableStock = Number(item.availableStock);
              });
            });
            this.productCategorys = res.data;
            Toast.clear();
            setTimeout(() => {
              this.setProductsWidth();
            }, 20);
          }
        });
      },
      setFailImg(event) {
        event.target.src = FailImg;
      },
      setProductsWidth() {
        const productsElems = this.$refs.products;
        const width = document.getElementsByClassName('goods-wrapper')[0].clientWidth;

        for (var i = 0; i < productsElems.length; i++) {
          productsElems[i].style.width = productsElems[i].children.length * width + 'px';
        }
      },
      _getGuessYouLikeGoods() {
        getGuessYouLikeGoods().then((res) => {
          if (res.code === ERR_OK) {
            res.datum.list.forEach((item) => {
              item.image = res.imageUrl + item.image;
            });
            this.guessYouLikeGoods = res.datum;
          }
        });
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
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    .header
      display: flex
      box-sizing: border-box
      padding-left: .2rem
      width: 100vw
      height: .8rem
      line-height: .8rem
      font-size: $font-size-medium
      background: #ffeb03
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
      .product-container
        white-space: nowrap
        overflow: hidden
        width: 100%
      .guess-container
        .guess-bar
          display: block
          width: 100%
          height: .4rem
</style>
