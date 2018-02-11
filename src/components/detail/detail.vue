<template>
  <transition name="slide">
    <div class="goods-container" v-if="goodsDetail">
      <scroll class="goods" ref="scroll">
        <div>
          <van-swipe class="goods-swipe" :autoplay="3000">
            <van-swipe-item>
              <img v-lazy="goodsDetail.goods.image" @click="showImagePreview">
            </van-swipe-item>
          </van-swipe>

          <van-cell-group>
            <van-cell class="goods-title-price">
              <div class="goods-title">
                {{ goodsDetail.goods.brand + goodsDetail.goods.name }}
                ({{ goodsDetail.goods.unit }})
              </div>
              <div class="goods-price">￥{{ goodsDetail.goods.price.toFixed(2) }}</div>
            </van-cell>
            <van-cell class="goods-express">
              <van-col span="10">运费：{{ goods.express }}</van-col>
              <van-col span="14">剩余：{{ goodsDetail.goods.availableStock }}</van-col>
            </van-cell>
          </van-cell-group>

          <!--<van-cell-group class="goods-cell-group">-->
          <!--<van-cell value="进入店铺" icon="shop" is-link>-->
          <!--<template slot="title">-->
          <!--<span class="van-cell-text">有赞的店</span>-->
          <!--<van-tag type="danger">官方</van-tag>-->
          <!--</template>-->
          <!--</van-cell>-->
          <!--<van-cell title="线下门店" icon="location" is-link/>-->
          <!--</van-cell-group>-->

          <van-cell-group class="goods-cell-group">
            <van-cell title="查看商品详情" is-link/>
          </van-cell-group>

          <van-cell-group class="goods-cell-group">
            <van-cell title="推荐商品"/>
          </van-cell-group>

          <div class="recommend-list">
            <goods v-for="(goods, index) in goodsDetail.recommends"
                   :key="index"
                   :goods="goods"
                   class="goods-item">
            </goods>
          </div>

        </div>
      </scroll>

      <van-goods-action class="goods-action">
        <van-goods-action-mini-btn icon="like-o" @click.native="_addFavorite(goodsDetail.goods.id)">
          收藏
        </van-goods-action-mini-btn>
        <van-goods-action-mini-btn icon="cart" :info="count" @click.native="toShopcartPage">
          购物车
        </van-goods-action-mini-btn>
        <van-goods-action-big-btn @click="_showSku(goodsDetail.goods)">
          加入购物车
        </van-goods-action-big-btn>
        <van-goods-action-big-btn primary @click="_buyClick">
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
    ImagePreview,
    Toast
  } from 'vant';
  import Scroll from 'base/scroll/scroll';
  import Sku from 'base/sku/sku';
  import Goods from 'base/goods/goods';
  import { mapMutations, mapActions, mapGetters } from 'vuex';
  import { getGoodsDetail } from 'api/goods';
  import { ERR_OK } from 'api/config';
  import { skuMixin } from 'common/js/mixin';
  import { addFavorite } from 'api/favorite';
  import { getToken } from 'common/js/cache';

  export default {
    mixins: [skuMixin],
    data() {
      return {
        showBase: false,
        goods: {},
        goodsDetail: null
      };
    },
    created() {
      this._getGoodsDetail(this.$route.params.id);
      Toast.allowMultiple();
    },
    computed: {
      count() {
        if (this.shopcartCount === 0) {
          return null;
        }
        return this.shopcartCount + '';
      },
      ...mapGetters([
        'shopcartCount'
      ])
    },
    watch: {
      '$route'(newRoute) {
        if (newRoute.name === '商品详情') {
          this._getGoodsDetail(this.$route.params.id);
        }
      },
      goodsDetail() {
        if (!this.goodsDetail) {
          Toast.loading();
        } else {
          Toast.clear();
        }
      }
    },
    methods: {
      back() {
        this.$router.back();
      },
      _getGoodsDetail(goodsId) {
        getGoodsDetail(goodsId).then((res) => {
          if (res.code === ERR_OK) {
            res.datum.goods.image = res.imageUrl + res.datum.goods.image;
            res.datum.recommends.forEach((item) => {
              item.image = res.imageUrl + item.image;
            });
            this.goodsDetail = res.datum;

            setTimeout(() => {
              this.$refs.scroll.scrollTo(0, 0);
            }, 20);
          }
        });
      },
      toShopcartPage() {
        this.$router.push('/shopcart');
      },
      _buyClick() {
        const goods = {
          goodsId: this.goodsDetail.goods.id,
          selectedNum: 1
        };
        this.buyClick(goods);
      },
      _addFavorite(goodsId) {
        addFavorite(getToken(), goodsId).then((res) => {
          if (res.code === ERR_OK) {
            Toast.success('收藏成功!');
          }
        });
      },
      showImagePreview() {
        this.instance = ImagePreview([
          this.goodsDetail.goods.image,
          this.goodsDetail.goods.image
        ]);
      },
      ...mapMutations({
        setSkuStatus: 'SET_SKU_STATUS'
      }),
      ...mapActions([
        'showSku',
        'buyClick'
      ])
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
      Sku,
      Goods
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
      .goods-cell-group
        margin: 10px 0
      .goods-title-price
        padding: .2rem .3rem
        .goods-title
          font-size: $font-size-medium
        .goods-price
          font-size: $font-size-small
          color: #f44
      .recommend-list
        .goods-item
          width: 33.2vw
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
