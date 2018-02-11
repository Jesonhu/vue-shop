<template>
  <transition name="slide">
    <div class="favorite-container" v-if="favoriteList">
      <navbar title="收藏列表">
      </navbar>
      <scroll class="favorite-list">
        <div>
          <goods :goods-type="'category'"
                 v-for="(goods, index) in favoriteList.list" :key="index"
                 :goods="goods"
                 :pullup="true"
                 @scrollToEnd="loadMore">
          </goods>
          <empty src="category" text="哭瞎,您还没有收藏商品" v-if="favoriteList && favoriteList.list.length === 0">
          </empty>
          <loaded-bottom v-if="favoriteList && favoriteList.lastPage">
          </loaded-bottom>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar';
  import Scroll from 'base/scroll/scroll';
  import Goods from 'base/goods/goods';
  import LoadedBottom from 'base/loaded-bottom/loaded-bottom';
  import Empty from 'base/empty/empty';
  import { getFavoriteList } from 'api/favorite';
  import { ERR_OK } from 'api/config';
  import { getToken } from 'common/js/cache';

  export default {
    data() {
      return {
        favoriteList: null
      };
    },
    created() {
      this._getFavoriteList();
    },
    watch: {
      '$route'(newRoute) {
        if (newRoute.name === '收藏') {
          this._getFavoriteList();
        }
      }
    },
    methods: {
      _getFavoriteList(pageNumber) {
        getFavoriteList(getToken(), pageNumber).then((res) => {
          if (res.code === ERR_OK) {
            if (res.datum.list.length >= 1) {
              res.datum.list.forEach((item) => {
                item.image = res.imageUrl + item.image;
              });
            }

            if (pageNumber) {
              this.favoriteList.lastPage = res.datum.lastPage;
              this.favoriteList.pageNumber = res.datum.pageNumber;
              this.favoriteList.list = this.favoriteList.list.concat(res.datum.list);
            } else {
              this.favoriteList = res.datum;
            }
          }
        });
      },
      loadMore() {
        if (this.goodsList.lastPage) {
          return;
        }

        const pageNumber = this.goodsList.pageNumber + 1;

        this._getFavoriteList(pageNumber);
      }
    },
    components: {
      Navbar,
      Scroll,
      Goods,
      LoadedBottom,
      Empty
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/slide'

  .favorite-container
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: $zIndex-d
    background: $color-background
    .favorite-list
      position: absolute
      top: 50px
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
</style>
