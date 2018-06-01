<template>
  <transition name="slide">
    <div class="address">
      <navbar title="我的地址"></navbar>
      <scroll class="address-list" ref="scroll" :data="addressList.list">
        <ul>
          <li class="list-item" v-for="(item,index) in addressList.list" :key="index">
            <div class="row-container" @click="selectedAddress(item)">
              <div class="row">
                <div class="area">{{item.area_name}}</div>
                <div class="detail">{{item.address}}</div>
              </div>
              <div class="row">
                <div class="name">{{item.consignee}}</div>
                <div class="phone">{{item.phone}}</div>
              </div>
            </div>
            <div class="operates">
              <div class="operate-item" v-if="!item.is_default" @click="_setDefalutAddress(index)">
                <img class="img" src="./choice_address_nor.png"/>
                <div class="text">设置默认</div>
              </div>
              <div class="operate-item" v-if="item.is_default">
                <img class="img" src="./choice_address_choice.png"/>
                <div class="text">默认地址</div>
              </div>
              <div class="operate-item" @click="reviseAddress(item)">
                <img class="img" src="./address_edit.png" alt="修改"/>
                <div class="text">修改</div>
              </div>
              <div class="operate-item" @click="_deleteAddress(item.id)">
                <img class="img" src="./address_del.png" alt="删除"/>
                <div class="text">删除</div>
              </div>
            </div>
          </li>
        </ul>
      </scroll>
      <empty src="address" text="亲，你还没有地址" v-if="addressList && addressList.length === 0"></empty>
      <FixedBotoomBtn :text="'新增地址'" :active="true" @click.native="toAddAddressPage"></FixedBotoomBtn>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar';
  import FixedBotoomBtn from 'base/fixed-bottom-btn/fixed-bottom-btn';
  import Scroll from 'base/scroll/scroll';
  import Empty from 'base/empty/empty';
  import { mapMutations } from 'vuex';
  import { getAddressList, deleteAddress, reviseAddress } from 'api/address';
  import { getToken } from 'common/js/cache';
  import { ERR_OK } from 'api/config';
  import { Toast, Dialog } from 'vant';

  export default {
    data() {
      return {
        addressList: {}
      };
    },
    created() {
      if (!this.check) {
        this._getAddressList();
        this.check = true;
      }
    },
    watch: {
      '$route'(newRoute) {
        if (newRoute.name === '地址列表' && this.check) {
          this._getAddressList();
        }
      }
    },
    methods: {
      reviseAddress(item) {
        this.setReviseAddress(item);
        this.setArea({
          name: item.area_name,
          id: item.area_id
        });
        this.$router.push('/address_edit/edit');
      },
      _getAddressList() {
        getAddressList(getToken()).then((res) => {
          if (res.code === ERR_OK) {
            this.addressList = res.datum;
          }
        });
      },
      toAddAddressPage() {
        this.setArea(null);
        this.setReviseAddress({
          consignee: null,
          phone: null,
          address: null
        });
        this.$router.push('/address_edit/add');
      },
      _deleteAddress(id) {
        Dialog.confirm({
          title: '提示',
          message: '是否确认删除该地址?'
        }).then(() => {
          deleteAddress(getToken(), id).then((res) => {
            if (res.code === ERR_OK) {
              this._getAddressList();
              Toast.success('删除成功!');
            }
          });
        }).catch(() => {
          // on cancel
        });
      },
      _setDefalutAddress(index) {
        const receiver = {
          id: this.addressList.list[index].id,
          consignee: this.addressList.list[index].consignee,
          phone: this.addressList.list[index].phone,
          area_id: this.addressList.list[index].area_id,
          address: this.addressList.list[index].address,
          is_default: true
        };

        reviseAddress(getToken(), receiver).then((res) => {
          if (res.code === ERR_OK) {
            this._getAddressList();
            Toast.success('设置默认地址成功!');
          }
        });
      },
      selectedAddress(address) {
        if (this.$route.params.type === 'order') {
          this.setSelectAddress(address);
          this.$router.back();
        }
      },
      ...mapMutations({
        setReviseAddress: 'SET_REVISE_ADDRESS',
        setArea: 'SET_AREA',
        setSelectAddress: 'SET_SELECT_ADDRESS'
      })
    },
    components: {
      [Toast.name]: Toast,
      [Dialog.name]: Dialog,
      Navbar,
      FixedBotoomBtn,
      Scroll,
      Empty
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/slide'
  @import '~common/stylus/mixin'

  .address
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 500
    .address-list
      position: fixed
      top: 12vw
      left: 0
      right: 0
      bottom: 1rem
      overflow: hidden
      background: $color-background
      .list-item
        padding: 3.5vw
        margin-bottom: .2rem
        background: #fff
        .row-container
          .row
            line-height: .4rem
            margin-bottom: .2rem
            font-size: $font-size-medium
            div
              display: inline
              &.area
                font-size: $font-size-medium-x
        .operates
          display: flex
          border-top: 1px dashed #ddd
          .operate-item
            flex: 1
            display: flex
            align-items: center
            height: .8rem
            &:first-child
              flex: 3
            .img, .text
              display: inline-block
            .text
              position: relative
              top: .04rem
            .img
              width: .35rem
              height: .35rem
            .text
              position: relative
              top: -0.3px
              font-size: $font-size-medium
</style>
