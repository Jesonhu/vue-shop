<template>
  <transition name="slide">
    <div class="login-password-wrapper">
      <navbar title="注册"></navbar>
      <div class="password-form">
        <div class="form-item">
          <img class="img" src="./login_mobile_21x21.png"/>
          <input class="input" type="number" placeholder="请输入手机号码" v-model="username">
        </div>
        <div class="form-item">
          <img class="img" src="./login_mobile_21x21.png" style="visibility: hidden"/>
          <input class="input" type="number" placeholder="请输入验证码" v-model="sms">
          <div class="send-code" :class="sendSmsActive" @click="_sendSms">{{ smsText }}</div>
        </div>
        <div class="form-item">
          <img class="img" src="./login_code_21x21.png"/>
          <input class="input" type="password" placeholder="请输入密码" v-model="password">
        </div>
        <fixed-bottom-btn :active="registerBtn" :text="'注册'" @click.native="_registerApi"></fixed-bottom-btn>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar';
  import FixedBottomBtn from 'base/fixed-bottom-btn/fixed-bottom-btn';
  import { sendSms } from 'api/sendSms';
  import { register } from 'api/register';
  import { ERR_OK } from 'api/config';
  import { smsType } from 'common/js/smsType';
  import { Toast } from 'vant';
  import { sendSmsMixin } from 'common/js/mixin';

  export default {
    mixins: [sendSmsMixin],
    data() {
      return {
        username: '',
        sms: '',
        smsText: '获取验证码',
        password: ''
      };
    },
    computed: {
      registerBtn() {
        if (this.username.length === 11 && this.sms.length === 4) {
          return true;
        }
        return false;
      }
    },
    methods: {
      _sendSms() {
        if (this.sendSmsActive === '') {
          return;
        }

        sendSms(this.username, smsType.MEMBER_REGISTER).then((res) => {
          if (res.code === ERR_OK) {
            this.countDown();
            Toast.success(res.message);
          }
        });
      },
      _registerApi() {
        if (!this.registerBtn) {
          return;
        }

        register(this.username, this.sms, this.password).then((res) => {
          if (res.code === ERR_OK) {
            Toast.success(res.message);
            this.$router.push('/member');
          }
        });
      }
    },
    components: {
      Navbar,
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
    background: $color-background
    .password-form
      padding: .2rem
      .form-item
        position: relative
        display: flex
        align-items: center
        height: .8rem
        margin: .2rem 0
        .img
          width: .6rem
          height: .6rem
        .send-code
          position: absolute
          top: .1rem
          right: .2rem
          width: 1.6rem
          height: .6rem
          line-height: .6rem
          text-align: center
          border-radius: 5px
          background: #ddd
          color: $color-text
          font-size: $font-size-small
          &.active
            background: #60c601
        .input
          flex: 1
          position: relative
          padding-left: .2rem
          height: .8rem
          font-size: $font-size-medium
          border: 1px solid rgba(221, 221, 221, 0.5)
      .btn-wrapper
        margin-top: .2rem
</style>
