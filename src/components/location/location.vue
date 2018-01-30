<template>
  <transition name="slide">
    <div class="location-container">
      <navbar title="店铺选择"></navbar>
      <div class="city-wrapper">
        <div class="city">佛山市</div>
        <div class="search-wrapper">
          <input class="search-input" v-model="storeKeyword" type="text" placeholder="请输入店铺名称或者区域">
          <div class="search">
            <img width="100%" height="100%" src="./title_bar_search.png" alt="搜索icon">
          </div>
        </div>
        <div class="text">搜索</div>
      </div>

      <scroll class="shop-list">
        <ul>
          <li class="shop-item">
            <div class="shop-name">
              <img class="img" src="./shop.png" alt="店铺">
             花园一期店
            </div>
            <div class="name">嘉信城市广场</div>
            <div class="time">开店时间：2017-09-08 12:00:10</div>
          </li>
        </ul>
        <div class="no-store" v-show="storeList && storeList.list.length === 0">抱歉,没有搜索到该店铺</div>
      </scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar';
  import Scroll from 'base/scroll/scroll';

  export default {
    data() {
      return {
        storeList: null,
        storeKeyword: null
      };
    },
    methods: {},
    components: {
      Navbar,
      Scroll
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/slide'

  .location-container
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 300
    background: $color-background
    color: #333
    .city-wrapper
      display: flex
      padding: 0 .2rem
      height: 1.2rem
      line-height: 1.2rem
      background: #f8f8f8
      font-size: $font-size-medium-x
      .city
        flex: 0 0 1.2rem
      .search-wrapper
        position: relative
        flex: 1
        .search-input
          width: 100%
          height: .8rem
          line-height: .8rem
          box-sizing: border-box
          padding-left: .6rem
          border: 1px solid #e9e9e9
          border-radius: 5px
        .search
          position: absolute
          top: .16rem
          left: 0
          width: .6rem
          height: .6rem
      .text
        flex: 0 0 1.2rem
        text-align: center
    .shop-list
      position: fixed
      top: 2rem
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
      .shop-item
        box-sizing: border-box
        padding: .2rem
        margin: 10px auto
        width: 95%
        line-height: .6rem
        border-radius: 10px
        font-size: $font-size-medium-x
        background: #fff
        box-shadow: 0 0 10px 2px #e0e0e0
        .shop-name
          line-height: .8rem
          .img
            display: inline-block
            vertical-align: middle
            width: .6rem
            height: .6rem
        .name
          border-bottom: 1px solid rgb(224, 224, 244)
        .time
          font-size: $font-size-medium
          color: rgb(146, 146, 146)
      .no-store
        position: absolute
        top: 30%
        left: 50%
        transform: translate(-50%, -50%)
        font-size: $font-size-medium-x
</style>
