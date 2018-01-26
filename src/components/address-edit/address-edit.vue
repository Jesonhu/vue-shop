<template>
  <transition name="slide2">
    <div class="address-edit-container">
      <navbar></navbar>
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { AddressEdit, Toast } from 'vant';
  import Navbar from 'base/navbar/navbar';

  export default {
    data() {
      return {
        areaList: {},
        searchResult: []
      };
    },

    methods: {
      onSave() {
        Toast('save');
      },
      onDelete() {
        Toast('delete');
      },
      onChangeDetail(val) {
        if (val) {
          this.searchResult = [{
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }];
        } else {
          this.searchResult = [];
        }
      }
    },
    components: {
      [AddressEdit.name]: AddressEdit,
      [Toast.name]: Toast,
      Navbar
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/slide2'

  .address-edit-container
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: $zIndex-x
    background: $color-text
</style>
