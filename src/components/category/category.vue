<template>
  <div class="category-container">
    <div class="search-wrapper">
      <img class="img" src="./category_search.png"/>
    </div>
    <div class="category-wrapper">
      <scroll class="category-left">
        <div>
          <div class="left-item" v-for="(n,index) in 20" :key="n" @click="changeIndex(index)">
            <span :class="n === currentLeftCategoryIndex && 'active'">测试分类</span>
          </div>
        </div>
      </scroll>
      <div class="category-right">
        <div class="right-title">
          <div class="title-wrapper">
            <span class="title" @click="toggleModal('all')">
                全部分类
               <img class="arrow" src="./ic_filter_arrow.png" v-show="modal === 'all'">
               <img class="arrow" src="./ic_filter_up.png" v-show="modal !== 'all'">
            </span>
            <span class="title" @click="toggleModal('sort')">
                综合排序
                <img class="arrow" src="./ic_filter_arrow.png" v-show="modal === 'sort'">
                <img class="arrow" src="./ic_filter_up.png" v-show="modal !== 'sort'">
            </span>

            <div class="grid-list" @click="toggleGoodsListType">
              <img class="img" src="./ic_goods_list_grid.png"/>
            </div>
          </div>
        </div>
        <div class="modal" v-show="modalStatus" @click="toggleModal()">
          <div class="types">
            <span class="type-item" v-for="n in 5" :key="n" :class="n === 1 && 'active'">
              百事可乐
            </span>
          </div>
        </div>

        <scroll class="goods-list" v-show="goodsListType === 'grid'">
          <div>
            <goods v-for="n in 15" :key="n" class="grid-goods"></goods>
            <loaded-bottom></loaded-bottom>
          </div>
        </scroll>

        <scroll class="goods-list" v-show="goodsListType === 'list'">
          <div>
            <goods v-for="n in 15" :key="n" :goods-type="'category'" class="list-goods"></goods>
            <loaded-bottom></loaded-bottom>
          </div>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll';
  import Goods from 'base/goods/goods';
  import LoadedBottom from 'base/loaded-bottom/loaded-bottom';

  const TYPE = {
    grid: 'grid',
    list: 'list'
  };

  export default {
    data() {
      return {
        currentLeftCategoryIndex: 3,
        modal: null,
        modalStatus: false,
        goodsListType: TYPE.grid
      };
    },
    methods: {
      changeIndex(index) {
        this.currentLeftCategoryIndex = index + 1;
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
      }
    },
    components: {
      Scroll,
      Goods,
      LoadedBottom
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
            width: 36.5vw
            margin: 2.5px
          .list-goods
            position: relative
            &::after
              border-bottom-1px(#ddd)
</style>
