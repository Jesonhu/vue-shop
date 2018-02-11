<template>
  <transition name="slide2">
    <div class="revise-wrapper">
      <navbar :title="title"></navbar>
      <div class="revise">
        <div class="revise-form">
          <div class="form-item">
            <div class="text">收货人：</div>
            <input class="input" type="text" placeholder="请输入收货人" v-model="consignee" autofocus>
          </div>
          <div class="form-item">
            <div class="text">手机号码：</div>
            <input class="input" type="number" placeholder="请输入手机号码" v-model="phone">
          </div>
          <div class="form-item" @click="toAreaPage">
            <div class="text">收货区域：</div>
            <input class="input" type="text" placeholder="请输入收货区域" disabled v-model="areaName">
          </div>
          <div class="form-item">
            <div class="text">收货地址：</div>
            <input class="input" type="text" placeholder="请输入收货地址" v-model="address">
          </div>
        </div>
      </div>
      <FixedBotoomBtn :text="buttontText" :active="active" v-if="show" @click.native="editAddress"></FixedBotoomBtn>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar';
  import FixedBotoomBtn from 'base/fixed-bottom-btn/fixed-bottom-btn';
  import { mapGetters, mapMutations } from 'vuex';
  import { ERR_OK } from 'api/config';
  import { getToken } from 'common/js/cache';
  import { addAddress, reviseAddress } from 'api/address';
  import { Toast } from 'vant';
  import { windowResize } from 'common/js/util';

  const clientHeight = window.innerHeight;

  export default {
    data() {
      return {
        consignee: null,
        phone: null,
        address: null,
        show: true
      };
    },
    created() {
      if (!this.reviseAddress && this.$route.params.type === 'edit') {
        this.$router.back();
      }
      if (this.$route.params.type === 'edit' && this.reviseAddress) {
        this.consignee = this.reviseAddress.consignee;
        this.phone = this.reviseAddress.phone;
        this.address = this.reviseAddress.address;
      }
      this._windowResize();
    },
    computed: {
      active() {
        if (this.consignee && this.phone && this.phone.length === 11 && this.address) {
          return true;
        }
        return false;
      },
      areaName() {
        return this.area && this.area.name;
      },
      title() {
        if (this.$route.params.type === 'edit') {
          return '编辑地址';
        } else {
          return '新增地址';
        }
      },
      buttontText() {
        if (this.$route.params.type === 'edit') {
          return '修改';
        } else {
          return '新增地址';
        }
      },
      ...mapGetters([
        'area',
        'reviseAddress'
      ])
    },
    watch: {
      '$route'(newRoute) {
        if (newRoute.name === '编辑地址') {
          if (this.reviseAddress) {
            this.consignee = this.reviseAddress.consignee;
            this.phone = this.reviseAddress.phone;
            this.address = this.reviseAddress.address;
          }
        }
        // if (newRoute.name === '编辑地址' && newRoute.params.type === 'add') {
        //   this.consignee = null;
        //   this.phone = null;
        //   this.address = null;
        // }
      }
    },
    methods: {
      editAddress() {
        const type = this.$route.params.type;

        if (type === 'add') {
          this._addAddress();
        }

        if (type === 'edit') {
          this._reviseAddress();
        }
      },
      _addAddress() {
        if (!this.active) {
          Toast('请填写正确的地址信息');
          return;
        }

        const receiver = {
          consignee: this.consignee,
          phone: this.phone,
          area_id: this.area.id,
          address: this.address
        };

        addAddress(getToken(), receiver).then((res) => {
          if (res.code === ERR_OK) {
            Toast.success('新增地址成功!');
            this.$router.back();
          }
        });
      },
      _reviseAddress() {
        if (!this.active) {
          Toast('请填写正确的地址信息');
          return;
        }

        const receiver = {
          id: this.reviseAddress.id,
          consignee: this.consignee,
          phone: this.phone,
          area_id: this.area.id,
          address: this.address
        };

        reviseAddress(getToken(), receiver).then((res) => {
          if (res.code === ERR_OK) {
            Toast.success('修改成功!');
            this.$router.back();
          }
        });
      },
      toAreaPage() {
        this.setReviseAddress({
          consignee: this.consignee,
          phone: this.phone,
          address: this.address
        });
        this.$router.push('/area');
      },
      _windowResize() {
        windowResize(clientHeight, () => {
          this.show = true;
        }, () => {
          this.show = false;
        });
      },
      ...mapMutations({
        setArea: 'SET_AREA',
        setReviseAddress: 'SET_REVISE_ADDRESS'
      })
    },
    components: {
      Navbar,
      FixedBotoomBtn
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/slide2'
  @import '~common/stylus/mixin'

  .revise-wrapper
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 300
    background: $color-background
    .revise
      position: relative
      top: 0
      left: 0
      right: 0
      bottom: 1rem
      overflow: hidden
      .revise-form
        padding: .2rem
        font-size: $font-size-medium
        background: #fff
        .form-item
          position: relative
          display: flex
          height: .7rem
          line-height: .7rem
          &::after
            border-bottom-1px(#ddd)
          .text
            flex: 0 0 1.6rem
          .input
            flex: 1
            background: #fff
</style>
