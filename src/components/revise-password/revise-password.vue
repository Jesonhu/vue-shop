<template>
  <transition name="slide">
    <div class="login-password-wrapper">
      <navbar title="修改密码"></navbar>
      <div class="password-form">
        <div class="form-item">
          <img class="img" src="./login_mobile_21x21.png"/>
          <input class="input" type="number" placeholder="请输入手机号码" disabled v-model="phone">
        </div>
        <div class="form-item">
          <img class="img" src="./login_code_21x21.png"/>
          <input class="input" type="password" placeholder="请输入旧密码" v-model="oldPassword" @blur="_checkPassword">
        </div>
        <div class="form-item">
          <img class="img" src="./login_code_21x21.png"/>
          <input class="input" type="password" placeholder="请输入新密码" v-model="newPassword1">
        </div>
        <div class="form-item">
          <img class="img" src="./login_code_21x21.png"/>
          <input class="input" type="password" placeholder="请输入新密码" v-model="newPassword2">
        </div>
        <fixed-bottom-btn text="修改密码" :active="active" @click.native="_upatePassword">
        </fixed-bottom-btn>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar';
  import LBtn from 'base/btns/l-btn';
  import FixedBottomBtn from 'base/fixed-bottom-btn/fixed-bottom-btn';
  import { Toast } from 'vant';
  import { checkPassword, upatePassword } from 'api/password';
  import { ERR_OK } from 'api/config';
  import { getToken } from 'common/js/cache';

  export default {
    data() {
      return {
        phone: 18148789239,
        oldPassword: null,
        newPassword1: null,
        newPassword2: null,
        check: false
      };
    },
    computed: {
      active() {
        if (this.check && (this.newPassword1 === this.newPassword2)) {
          return true;
        }
        return false;
      }
    },
    methods: {
      _checkPassword() {
        checkPassword(getToken(), this.oldPassword).then((res) => {
          if (res.code === ERR_OK) {
            if (!res.datum) {
              Toast('旧密码不正确!');
            } else {
              this.check = res.datum;
              Toast('旧密码正确!');
            }
          }
        });
      },
      _upatePassword() {
        upatePassword(getToken(), this.oldPassword, this.newPassword2).then((res) => {
          if (res.code === ERR_OK) {
            Toast('修改成功!');
            this.$router.push('/member');
          }
        });
      }
    },
    components: {
      Navbar,
      LBtn,
      FixedBottomBtn
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/slide'
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .login-password-wrapper
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 300
    background: #fff
    .password-form
      padding: 10px
      .form-item
        display: flex
        align-items: center
        height: 50px
        .img
          width: 30px
          height: 30px
        .input
          flex: 1
          position: relative
          padding-left: 10px
          height: 40px
          outline: none
          border: none
          font-size: $font-size-medium
          border-bottom: 1px solid rgba(221, 221, 221, 0.5)
      .btn-wrapper
        margin-top: 10px
</style>
