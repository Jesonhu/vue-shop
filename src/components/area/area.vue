<template>
  <transition name="slide">
    <div class="area-container">
      <navbar title="区域选择"></navbar>
      <van-notice-bar :scrollable="false">
        {{ area.name ? area.name : '暂未选择区域'}}
      </van-notice-bar>
      <scroll class="area-list">
        <ul>
          <li class="list-item"
              v-for="(area, index) in areaList"
              :key="index"
              @click="selectArea(area.name, area.value)">
            {{ area.name }}
          </li>
        </ul>
      </scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar';
  import Scroll from 'base/scroll/scroll';
  import { mapMutations } from 'vuex';
  import { getArea } from 'api/address';
  import { ERR_OK } from 'api/config';
  import { getToken } from 'common/js/cache';
  import { NoticeBar } from 'vant';

  export default {
    data() {
      return {
        areaList: [],
        area: {
          name: '',
          id: null
        }
      };
    },
    created() {
      this._getArea();
    },
    watch: {
      '$route'(newRoute) {
        if (newRoute.name === '区域') {
          this._getArea();
          this.area = {
            name: '',
            id: null
          };
        }
      }
    },
    methods: {
      _getArea(parentId) {
        const token = getToken();

        getArea(token, parentId).then((res) => {
          if (res.code === ERR_OK) {
            if (res.datum.length === 0) {
              this.setArea(this.area);
              this.$router.back();
            }
            this.areaList = res.datum;
          }
        });
      },
      selectArea(name, parentId) {
        if (this.area.name === name) {
          return;
        }
        this.area = {
          name: this.area.name + name,
          id: parentId
        };
        this._getArea(parentId);
      },
      ...mapMutations({
        setArea: 'SET_AREA'
      })
    },
    components: {
      [NoticeBar.name]: NoticeBar,
      Navbar,
      Scroll
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/slide'
  @import '~common/stylus/mixin'

  .area-container
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: $zIndex-xl
    font-size: $font-size-medium-x
    background: $color-background
    .area-list
      position: fixed
      top: 86px
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
      .list-item
        position: relative
        box-sizing: border-box
        padding: 0 .2rem
        width: 100%
        height: .7rem
        line-height: .7rem
        background: rgb(246, 246, 246)
        &::after
          border-bottom-1px(#ddd)
</style>
