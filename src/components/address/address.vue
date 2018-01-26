<template>
  <transition name="slide">
    <div class="address-container">
      <navbar></navbar>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="selectAddress"
      />
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { mapMutations } from 'vuex';
  import { AddressList, Toast } from 'vant';
  import Navbar from 'base/navbar/navbar';

  export default {
    data() {
      return {
        chosenAddressId: '1',
        list: [
          {
            id: 0,
            name: '张三',
            tel: '13000000000',
            address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
          },
          {
            id: 1,
            name: '李四',
            tel: '1310000000',
            address: '浙江省杭州市拱墅区莫干山路 50 号'
          }
        ]
      };
    },
    methods: {
      onAdd() {
        this.$router.push('/address_edit');
      },
      onEdit(item, index) {
        Toast('编辑收货地址:' + index);
        this.$router.push('/address_edit');
      },
      selectAddress(item) {
        this.setContactId(item.id);
        this.$router.back();
      },
      ...mapMutations({
        setContactId: 'SET_CHOSEN_CONTACT_ID'
      })
    },
    components: {
      [AddressList.name]: AddressList,
      Navbar
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/slide'

  .address-container
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: $zIndex-x
    background: $color-text
</style>
