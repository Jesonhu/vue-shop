<template>
  <div class="category-container">
    <router-link to="/search" tag="div" class="search-wrapper">
      <img class="img" src="./category_search.png"/>
    </router-link>
    <div class="category-wrapper">
      <scroll class="category-left">
        <div>
          <div class="left-item"
               v-for="(first,index) in firstCategory"
               :key="index"
               @click="changeFirstIndex(index)">
            <span :class="index === firstIndex && 'active'">{{ first.name }}</span>
          </div>
        </div>
      </scroll>
      <div class="category-right" v-if="goodsList">
        <div class="right-title">
          <div class="title-wrapper">
            <span class="title" @click="toggleModal('all')">
                {{ allText }}
               <img class="arrow" src="./ic_filter_arrow.png" v-show="modal === 'all'">
               <img class="arrow" src="./ic_filter_up.png" v-show="modal !== 'all'">
            </span>
            <span class="title" @click="toggleModal('sort')">
                {{ sortText }}
                <img class="arrow" src="./ic_filter_arrow.png" v-show="modal === 'sort'">
                <img class="arrow" src="./ic_filter_up.png" v-show="modal !== 'sort'">
            </span>

            <div class="grid-list" @click="toggleGoodsListType">
              <img class="img" src="./ic_goods_list_grid.png" v-show="goodsListType === 'grid'"/>
              <img class="img" src="./ic_goods_list_list.png" v-show="goodsListType === 'list'"/>
            </div>
          </div>
        </div>
        <div class="modal" v-show="modalStatus && modal === 'all'" @click="toggleModal()">
          <div class="types">
            <span class="type-item"
                  v-for="(second, index) in secondCategory"
                  :key="index"
                  :class="index === secondIndex && 'active'"
                  @click="changeSecondIndex(index)">
              {{ second.name }}
            </span>
          </div>
        </div>

        <div class="modal" v-show="modalStatus && modal === 'sort'" @click="toggleModal()">
          <div class="types">
            <span class="type-item"
                  v-for="(type, index) in sortTypes"
                  :key="index"
                  :class="index === typeIndex && 'active'"
                  @click="changeTypeIndex(index)">
              {{ type.name }}
            </span>
          </div>
        </div>

        <scroll class="goods-list"
                v-if="goodsListType === 'grid' &&  goodsList.list.length >= 1"
                :pullup="true"
                :data="goodsList.list"
                @scrollToEnd="loadMore"
                ref="scroll">
          <div>
            <goods v-for="(goods, index) in goodsList.list"
                   :key="index"
                   :goods="goods"
                   class="grid-goods">
            </goods>
            <loaded-bottom v-show="goodsList.lastPage"></loaded-bottom>
            <loading v-show="!goodsList.lastPage"></loading>
          </div>
        </scroll>

        <scroll class="goods-list"
                v-if="goodsListType === 'list' && goodsList.list.length >= 1"
                :data="goodsList.list"
                ref="scroll">
          <div>
            <goods v-for="(goods, index) in goodsList.list"
                   :key="index"
                   :goods-type="'category'"
                   :goods="goods"
                   :pullup="true"
                   @scrollToEnd="loadMore"
                   class="list-goods">
            </goods>
            <loaded-bottom v-show="goodsList.lastPage">
            </loaded-bottom>
          </div>
        </scroll>

        <empty src="category" text="哭瞎,没有该商品" v-if="goodsList.list.length === 0">
        </empty>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { ERR_OK } from 'api/config';
  import { findRoots, findChildren, findProducts } from 'api/category';
  import Scroll from 'base/scroll/scroll';
  import Goods from 'base/goods/goods';
  import LoadedBottom from 'base/loaded-bottom/loaded-bottom';
  import Empty from 'base/empty/empty';
  import Loading from 'base/loading/loading';

  const TYPE = {
    grid: 'grid',
    list: 'list'
  };

  export const sortType = [
    { name: '综合排序', type: 'topDesc' },
    { name: '价格升序', type: 'priceAsc' },
    { name: '价格降序', type: 'priceDesc' },
    { name: '销量降序', type: 'salesDesc' },
    { name: '评分降序', type: 'scoreDesc' },
    { name: '日期降序', type: 'dateDesc' }
  ];

  export default {
    data() {
      return {
        firstIndex: 0,
        secondIndex: null,
        typeIndex: null,
        modal: null,
        modalStatus: false,
        goodsListType: TYPE.grid,
        firstCategory: [],
        secondCategory: [],
        sortTypes: null,
        goodsList: null,
        allText: '全部分类',
        sortText: '全部排序'
      };
    },
    created() {
      this._findRoots();
      this.sortTypes = sortType;
    },
    methods: {
      changeFirstIndex(index) {
        this.allText = '全部分类';
        this.sortText = '综合排序';
        this.modalStatus = false;
        this.secondIndex = null;

        this.firstIndex = index;
        this._findChildren(this.firstCategory[index].id);
        this._findProducts(this.firstCategory[index].id);
      },
      changeSecondIndex(index) {
        this.secondIndex = index;
        this.allText = this.secondCategory[index].name;
        this._findProducts(this.secondCategory[index].id);
        this.$refs.scroll.scrollTo(0, 0);
      },
      changeTypeIndex(index) {
        this.typeIndex = index;
        this.sortText = this.sortTypes[index].name;
        const id = this.firstCategory[this.firstIndex].id;
        const orderType = this.sortTypes[index].type;
        const pageNumber = 1;
        this._findProducts(id, pageNumber, orderType);
        this.$refs.scroll.scrollTo(0, 0);
      },
      toggleModal(modal) {
        if (!this.modalStatus) {
          this.modal = modal;
        }

        if (this.modalStatus) {
          this.modal = '';
        }

        this.modalStatus = !this.modalStatus;
      },
      toggleGoodsListType() {
        if (this.goodsListType === TYPE.grid) {
          this.goodsListType = TYPE.list;
        } else {
          this.goodsListType = TYPE.grid;
        }
        setTimeout(() => {
          this.$refs.scroll.refresh();
        }, 20);
      },
      _findRoots() {
        findRoots().then((res) => {
          if (res.code === ERR_OK) {
            this.firstCategory = res.datum;
            this._findChildren(this.firstCategory[0].id);
            this._findProducts(this.firstCategory[0].id);
          }
        });
      },
      _findChildren(firstCategoryId) {
        findChildren(firstCategoryId).then((res) => {
          if (res.code === ERR_OK) {
            this.secondCategory = res.data;
          }
        });
      },
      _findProducts(categoryId, pageNumber, orderType) {
        findProducts(categoryId, pageNumber, orderType).then((res) => {
          if (res.code === ERR_OK) {
            res.datum.list.forEach((item) => {
              item.image = res.imageUrl + item.image;
            });

            if (!pageNumber || pageNumber === 1) {
              this.goodsList = res.datum;
            } else {
              this.goodsList.pageNumber = res.datum.pageNumber;
              this.goodsList.lastPage = res.datum.lastPage;
              this.goodsList.list = this.goodsList.list.concat(res.datum.list);
            }
            this.currentCategoryId = categoryId;
            // setTimeout(() => {
            //   this.$refs.scroll.refresh();
            // }, 20);
          }
        });
      },
      loadMore() {
        if (this.goodsList.lastPage) {
          return;
        }
        const pageNumber = this.goodsList.pageNumber + 1;
        const orderType = this.typeIndex && this.sortTypes[this.typeIndex].type;
        this._findProducts(this.currentCategoryId, pageNumber, orderType);
      }
    },
    components: {
      Loading,
      Scroll,
      Goods,
      LoadedBottom,
      Empty
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .category-container
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 1rem
    background: $color-background
    .search-wrapper
      box-sizing: border-box
      padding: .1rem
      overflow: hidden
      text-align: center
      .img
        display: inline-block
        width: 100%
        height: .7rem
        float: left
    .category-wrapper
      position: absolute
      top: .9rem
      left: 0
      right: 0
      bottom: 0
      display: flex
      overflow: hidden
      &::after
        border-top-1px(#d6d6d6)
      .category-left
        flex: 0 0 1.8rem
        border-right: 1px solid #d6d6d6
        font-size: $font-size-small
        .left-item
          height: .8rem
          line-height: .8rem
          text-align: center
          span
            &.active
              padding: .06rem
              border-radius: 10px
              color: $color-text
              background: $color-price
      .category-right
        flex: 1
        position: relative
        .right-title
          .title-wrapper
            position: relative
            display: flex
            align-items: center
            text-align: center
            font-size: 0
            border-bottom: 1px solid rgba(221, 221, 221, 0.5)
            .title
              flex: 1
              height: .8rem
              line-height: .8rem
              font-size: $font-size-medium
              .arrow
                position: relative
                top: .04rem
                right: .04rem
                width: .3rem
                height: .3rem
            .grid-list
              flex: 0 0 .8rem
              .img
                width: .4rem
                height: .4rem
        .modal
          position: absolute
          top: .8rem
          left: 0
          right: 0
          bottom: 0
          z-index: $zIndex-s
          background: rgba(0, 0, 0, .6)
          .types
            background: $color-text
            font-size: $font-size-medium
            .type-item
              display: inline-block
              width: 33.333333333%
              height: .6rem
              line-height: .6rem
              text-align: center
              &.active
                color: $color-price
        .goods-list
          position: absolute
          top: .85rem
          left: 0
          right: 0
          bottom: 0
          overflow: hidden
          .grid-goods
            width: 36vw
            margin: 2.5px
          .list-goods
            position: relative
            &::after
              border-bottom-1px(#ddd)
          .loading-contaner
            text-align: center
</style>
