<template>
  <transition name="slide">
    <div class="container">
      <navbar :title="title"></navbar>
      <scroll
        class="wrapper"
        :data="goodsList.list"
        v-if="goodsList && goodsList.list"
        :pullup="true"
        @scrollToEnd="pullupMore"
        ref="scroll">
        <div>
          <goods :goods-type="'category'"
                 v-for="(goods, index) in goodsList.list"
                 :key="index"
                 :promotions="goods.promotions_name"
                 :goods="goods"
                 class="goods">

          </goods>
          <div class="loading-container">
            <van-loading type="gradient-circle" color="black" v-show="!goodsList.lastPage" class="loading"/>
          </div>
          <loaded-bottom v-show="goodsList.list.length >= 1 &&goodsList.lastPage">
          </loaded-bottom>
        </div>
      </scroll>
      <scroll class="wrapper"
              :data="goodsList.list"
              v-if="goodsList && !goodsList.list">
        <div>
          <goods :goods-type="'category'"
                 v-for="(goods, index) in goodsList"
                 :key="index"
                 :goods="goods"
                 class="goods">

          </goods>
          <loaded-bottom v-show="goodsList">
          </loaded-bottom>
        </div>
      </scroll>
      <empty src="category" text="哭瞎，还没该商品..." v-if="showEmpty">
        <div class="login-btn" v-if="isLoginBtn" @click="_login">登录</div>
      </empty>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar';
  import Goods from 'base/goods/goods';
  import Scroll from 'base/scroll/scroll';
  import Empty from 'base/empty/empty';
  import LoadedBottom from 'base/loaded-bottom/loaded-bottom';
  import { mapMutations, mapGetters } from 'vuex';
  import { Toast, Loading } from 'vant';
  import { getHotGoods, getNewProducts, getRecommendGoods, getAlwaysBuyGoods } from 'api/home';
  import { ERR_OK } from 'api/config';
  import { getToken } from 'common/js/cache';

  const GoodsListTypes = {
    HOT: 'hot',
    RECOMMEND: 'recommend',
    ALWAYS_BUY: 'always_buy',
    NEW_PRODUCTS: 'new_products'
  };

  export default {
    data() {
      return {
        goodsList: null,
        text: null
      };
    },
    created() {
      this.getGoodsList();
    },
    computed: {
      title() {
        const params = this.$route.params;

        if (params.type === GoodsListTypes.HOT) {
          return '热销';
        }
        if (params.type === GoodsListTypes.RECOMMEND) {
          return '推荐';
        }
        if (params.type === GoodsListTypes.ALWAYS_BUY) {
          return '我常买';
        }
        if (params.type === GoodsListTypes.NEW_PRODUCTS) {
          return '新品';
        }
      },
      isLoginBtn() {
        const params = this.$route.params;

        if (!getToken() && params.type === GoodsListTypes.ALWAYS_BUY) {
          return true;
        }
        return false;
      },
      showEmpty() {
        if (!this.goodsList) {
          return true;
        }
        if (this.goodsList.list && this.goodsList.list.length === 0) {
          return true;
        }

        if (this.goodsList && this.goodsList.length === 0) {
          return true;
        }
        return false;
      },
      ...mapGetters([
        'loginModal'
      ])
    },
    watch: {
      '$route'(newRoute) {
        if (newRoute.name === '首页商品') {
          this.getGoodsList();
          Toast.clear();
        }
      },
      loginModal(newStatus) {
        if (newStatus === false) {
          this._getAlwaysBuyGoods();
        }
      },
      goodsList() {
        if (!this.$refs.scroll) {
          return;
        }
        setTimeout(() => {
          this.$refs.scroll.scrollTo(0, 0);
        }, 20);
      }
    },
    methods: {
      getGoodsList(pageNumber) {
        const params = this.$route.params;
        if (params.type === GoodsListTypes.HOT) {
          this._getHotGoods(pageNumber);
          return false;
        }
        if (params.type === GoodsListTypes.RECOMMEND) {
          this._getRecommendGoods(pageNumber);
          return false;
        }
        if (params.type === GoodsListTypes.ALWAYS_BUY) {
          this._getAlwaysBuyGoods();
          return false;
        }
        if (params.type === GoodsListTypes.NEW_PRODUCTS) {
          this._getNewProducts(pageNumber);
          return false;
        }
      },
      _getHotGoods(pageNumber) {
        getHotGoods(pageNumber).then((res) => {
          if (res.code === ERR_OK) {
            this.setGoodsImg(res);
            this.concat(pageNumber, res);
          }
        });
      },
      _getNewProducts(pageNumber) {
        getNewProducts(pageNumber).then((res) => {
          if (res.code === ERR_OK) {
            this.setGoodsImg(res);
            this.concat(pageNumber, res);
          }
        });
      },
      _getRecommendGoods(pageNumber) {
        getRecommendGoods(pageNumber).then((res) => {
          if (res.code === ERR_OK) {
            this.setGoodsImg(res);
            this.concat(pageNumber, res);
          }
        });
      },
      _getAlwaysBuyGoods() {
        if (!getToken()) {
          this.goodsList = null;
          return;
        }

        getAlwaysBuyGoods(getToken()).then((res) => {
          if (res.code === ERR_OK) {
            if (res.data.length >= 1) {
              res.data.forEach((item) => {
                item.image = res.imageUrl + res.image;
              });
            }
            this.goodsList = res.data;
          }
        });
      },
      setGoodsImg(res) {
        if (res.datum && res.datum.list.length >= 1) {
          res.datum.list.forEach((item) => {
            item.image = res.imageUrl + item.image;
          });
        }
      },
      pullupMore() {
        if (this.goodsList.lastPage) {
          return;
        }
        const pageNumber = this.goodsList.pageNumber + 1;
        if (pageNumber === this.goodsList.pageNumber) {
          return;
        }
        if (pageNumber - this.goodsList.pageNumber >= 2) {
          return;
        }
        this.getGoodsList(pageNumber);
      },
      concat(pageNumber, res) {
        const params = this.$route.params;

        if (params.type === GoodsListTypes.HOT) {
          res.datum.list.forEach((goods) => {
            this.$set(goods, 'promotions_name', '热销');
          });
        }
        if (!pageNumber) {
          this.goodsList = res.datum;
        } else {
          this.goodsList.lastPage = res.datum.lastPage;
          this.goodsList.pageNumber = res.datum.pageNumber;
          this.goodsList.list = this.goodsList.list.concat(res.datum.list);
        }
      },
      _login() {
        this.setLoginModal(true);
      },
      ...mapMutations({
        setLoginModal: 'SET_LOGIN_MODAL'
      })
    },
    components: {
      [Loading.name]: Loading,
      Navbar,
      Goods,
      Scroll,
      Empty,
      LoadedBottom
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/slide'
  @import '~common/stylus/mixin'

  .container
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: $zIndex-s
    background: $color-background
    .wrapper
      position: absolute
      top: 1rem
      left: 0
      right: 0
      bottom: 0
      .goods
        position: relative
        &::after
          border-bottom-1px(#ddd)
      .loading-container
        .loading
          margin: 0 auto

  .login-btn
    margin: .2rem auto
    width: 1.6rem
    height: .5rem
    line-height: .5rem
    border-radius: 5px
    background: #ffeb03
    font-size: $font-size-medium
</style>
