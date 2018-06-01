<template>
  <transition name="slide">
    <div class="favorite-container" v-if="favoriteList">
      <navbar
        title="收藏列表"
        :rightText="rightText"
        @rightClick="edit">
      </navbar>
      <scroll class="favorite-list" v-if="favoriteList.list.length >= 1">
        <div>
          <div class="list-item" v-for="(goods, index) in favoriteList.list" :key="index">
            <goods
              :goods-type="'category'"
              :goods="goods"
              :pullup="true"
              :showDelete="true"
              @scrollToEnd="loadMore">
              <div class="delete" v-show="goods.is_delete" @click="_deleteFavorite(goods.id)">
                删除
              </div>
            </goods>
          </div>
          <loaded-bottom v-if="favoriteList && favoriteList.lastPage">
          </loaded-bottom>
        </div>
      </scroll>
      <empty src="category" text="哭瞎,您还没有收藏商品" v-if="favoriteList && favoriteList.list.length === 0">
      </empty>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar';
  import Scroll from 'base/scroll/scroll';
  import Goods from 'base/goods/goods';
  import LoadedBottom from 'base/loaded-bottom/loaded-bottom';
  import Empty from 'base/empty/empty';
  import { getFavoriteList, deleteFavorite } from 'api/favorite';
  import { ERR_OK } from 'api/config';
  import { getToken } from 'common/js/cache';

  export default {
    data() {
      return {
        favoriteList: null,
        rightText: '编辑'
      };
    },
    created() {
      this._getFavoriteList();
    },
    watch: {
      '$route'(newRoute) {
        if (newRoute.name === '收藏') {
          this._getFavoriteList();
          this.rightText = '编辑';
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
                this.$set(item, 'is_delete', false);
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
      },
      edit() {
        if (this.rightText === '编辑') {
          this.rightText = '完成';
        } else {
          this.rightText = '编辑';
        }
        this.favoriteList.list.forEach((item) => {
          item.is_delete = !item.is_delete;
        });
      },
      _deleteFavorite(id) {
        deleteFavorite(getToken(), id).then((res) => {
          if (res.code === ERR_OK) {
            this._getFavoriteList();
            this.rightText = '完成';
            this.favoriteList.list.forEach((item) => {
              item.is_delete = !item.is_delete;
            });
          }
        });
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
  @import '~common/stylus/mixin'

  .favorite-container
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: $zIndex-s
    background: $color-background
    .favorite-list
      position: absolute
      top: 50px
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
      .list-item
        position: relative
        &::after
          border-bottom-1px(#ddd)
        .delete
          position: absolute
          top: 0
          right: 0
          display: flex
          align-items: center
          justify-content: center
          width: 60px
          height: 100%
          text-align: center
          font-size: $font-size-medium
          color: $color-text
          background: $color-price
</style>
