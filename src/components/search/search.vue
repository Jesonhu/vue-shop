<template>
  <transition name="slide">
    <div class="search-wrapper">
      <div class="search-input-wrapper">
        <div class="back-wrapper" @click="back">
          <img class="back" src="./back_icon.png" alt="返回">
        </div>
        <div class="search-input">
          <input class="input" type="text" placeholder="请输入搜索内容" v-model="searchWord">
          <img class="search-img" src="./title_bar_search.png" alt="搜搜"/>
          <div class="close">x</div>
        </div>
        <div class="search">搜索</div>
      </div>

      <scroll class="search-container" v-show="false">
        <div>
          <div class="search-content">
            <div class="search-header">
              <img class="header-img" src="./goodSearch_temp_hitstory@2x.png" alt="历史">
              <div class="header-text">搜索历史</div>
              <img class="delete" src="./goodSearch_temp_delete@2x.png" alt="删除">
            </div>
            <div class="content-wrapper">
              <div class="content">history</div>
            </div>
          </div>

          <div class="search-content">
            <div class="search-header">
              <img class="header-img" src="./goodSearch_temp_hot@2x.png" alt="热门">
              <div class="header-text">热门搜索</div>
            </div>
            <div class="content-wrapper">
              <div class="content">hot</div>
            </div>
          </div>
        </div>
      </scroll>

      <scroll class="goods-list-wrapper"
              ref="scroll">
        <ul class="goods-list">
          <goods v-for="n in 20" :key="n" :goods-type="'medium'"></goods>
          <!--<ten-height></ten-height>-->
        </ul>
        <!--<div class="no-search-goods" v-show="searchGoods && searchGoods.length === 0 && searchWord">对不起,暂无该商品!</div>-->
      </scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll';
  import Goods from 'base/goods/goods';

  export default {
    data() {
      return {
        searchWord: null,
        historySearch: null,
        searchGoods: null
      };
    },
    created() {
      this.searchGoods = null;
      this.searchWord = null;
    },
    methods: {
      back() {
        this.$router.back();
      }
    },
    components: {
      Scroll,
      Goods
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  @import '~common/stylus/slide'

  .search-wrapper
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 300
    background: #fff
    .search-input-wrapper
      display: flex
      height: 1rem
      line-height: 1rem
      font-size: $font-size-medium
      background: #f8f8f8
      .back-wrapper
        display: flex
        align-items: center
        padding: 0 .2rem
        flex: 0 0 .6rem
        .back
          width: .4rem
          height: .4rem
      .search-input
        position: relative
        flex: 1
        .input
          box-sizing: border-box
          padding: 0 .3rem 0 .6rem
          width: 100%
          height: .8rem
          border: 1px solid #e9e9e9
          border-radius: 5px
        .search-img
          position: absolute
          top: .26rem
          left: .1rem
          width: .5rem
          height: .5rem
        .close
          position: absolute
          top: .26rem
          right: .1rem
          width: .4rem
          height: .4rem
          line-height: .4rem
          text-align: center
          border-radius: 50%
          color: #fff
          background: rgb(187, 187, 187)
      .search
        flex: 0 0 1rem
        text-align: center

    .search-container
      position: fixed
      top: 1rem
      left: 0
      right: 0
      bottom: 0
      z-index: 300
      .search-content
        padding: .2rem
        font-size: $font-size-medium
        .search-header
          margin-bottom: .2rem
          height: .6rem
          line-height: .6rem
          .header-img
            display: inline-block
            vertical-align: middle
            width: .44rem
            height: .44rem
          .header-text
            display: inline-block
            vertical-align: middle
          .delete
            display: inline-block
            vertical-align: middle
            float: right
            width: .44rem
            height: .44rem
        .content-wrapper
          font-size: $font-size-small
          .content
            display: inline-block
            padding: .04rem
            margin: .1rem
            width: 20%
            height: .5rem
            line-height: .5rem
            text-align: center
            background: #fffa9a
            border: 1px solid #333
            border-radius: 5px
            no-wrap()
    .goods-list-wrapper
      position: fixed
      top: 1rem
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
      background: $color-background
      .goods-list
        text-align: center
        .goods-content
          display: inline-block
          width: 42%
          margin: .06rem
          text-align: left
          border: 1px solid #ebeaea
      .no-search-goods
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        font-size: $font-size-medium
</style>
