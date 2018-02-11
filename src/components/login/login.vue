<template>
  <transition name="login-fade">
    <div class="login-modal" v-if="loginModal">
      <div class="login-form">
        <div class="form-item">
          <img class="img" src="./login_mobile_21x21.png" alt="手机">
          <div class="input-wrapper">
            <input class="input" type="number" placeholder="请输入手机号码" v-model="username">
            <div class="sms" :class="sendSmsActive" @click="_sendSms">
              {{ smsText }}
            </div>
          </div>
        </div>
        <div class="form-item">
          <img class="img" src="./login_code_21x21.png" alt="密码">
          <div class="input-wrapper">
            <input class="input" type="number" placeholder="请输4位验证码" v-model="sms">
          </div>
        </div>
        <div class="info" @click="toRegisterPage">
          还没有账号？点击注册账号
        </div>
        <img class="close" src="./close.png" alt="关闭" @click="closeLoginModal">
        <div class="btn-wrapper">
          <l-btn :text="'登陆'" :active="loginBtn" @click.native="_login"></l-btn>
        </div>

        <div class="other-login">
          <div class="other-title">
            <div class="line"></div>
            <div class="other-text">其它方式登陆</div>
            <div class="line"></div>
          </div>
          <div class="other-list">
            <div class="list-item" @click="toLoginPasswordPage">
              <img class="password" src="./login_code_21x21.png"/>
              <div class="list-text">密码登陆</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapMutations } from 'vuex';
  import LBtn from 'base/btns/l-btn';
  import { sendSms } from 'api/sendSms';
  import { login } from 'api/login';
  import { ERR_OK } from 'api/config';
  import { smsType } from 'common/js/smsType';
  import { sendSmsMixin } from 'common/js/mixin';
  import { Toast } from 'vant';
  import { saveUserInfo, saveToken } from 'common/js/cache';

  export default {
    mixins: [sendSmsMixin],
    data() {
      return {
        username: '',
        sms: '',
        smsText: '获取验证码'
      };
    },
    computed: {
      loginBtn() {
        if (this.username.length === 11 && this.sms.length === 4) {
          return true;
        }
        return false;
      },
      ...mapGetters([
        'loginModal'
      ])
    },
    methods: {
      closeLoginModal() {
        this.setLoginModal(false);
      },
      toRegisterPage() {
        this.setLoginModal(false);
        this.$router.push('/register');
      },
      toLoginPasswordPage() {
        this.setLoginModal(false);
        this.$router.push('/login_password');
      },
      _sendSms() {
        let mPattern = /^1[34578]\d{9}$/;
        if (!mPattern.test(this.username)) {
          Toast('请输入正确的手机号码');
          return;
        }
        if (this.sendSmsActive === '') {
          return;
        }

        sendSms(this.username, smsType.MEMBER_LOGIN).then((res) => {
          if (res.code === ERR_OK) {
            this.countDown();
            Toast.success(res.message);
          }
        });
      },
      _login() {
        if (!this.loginBtn) {
          return;
        }

        login(this.username, this.sms, this.password).then((res) => {
          if (res.code === ERR_OK) {
            saveUserInfo(JSON.stringify(res.info));
            this.setLoginModal(false);
            this.setUserInfo(res.info);
            this.username = null;
            this.sms = null;
            saveToken(res.token);
            Toast.success('登陆成功!');
          }
        });
      },
      ...mapMutations({
        setLoginModal: 'SET_LOGIN_MODAL',
        setUserInfo: 'SET_USER_INFO'
      })
    },
    components: {
      LBtn
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/mixin';
  @import '~common/stylus/variable';

  .login-modal
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 1000
    background: rgba(0, 0, 0, .7)
    &.login-fade-enter-active, .login-fade-leave-active
      opacity: 1
      transition: all 300ms
    &.login-fade-enter, .login-fade-leave-to
      opacity: 0
    .login-form
      box-sizing: border-box
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      padding: .2rem
      width: 90%
      /*height: 4.44rem*/
      border-radius: 5px
      font-size: $font-size-medium
      background: #fff
      .form-item
        position: relative
        display: flex
        align-items: center
        margin-bottom: .3rem
        &:first-child
          margin-top: .8rem
        .img
          flex: 0 0 .5rem
          width: .5rem
          height: .5rem
        .input-wrapper
          flex: 1
          display: flex
          position: relative
          height: .8rem
          &::after
            border-bottom-1px(#ddd)
          .input
            display: inline-block
            vertical-align: top
            flex: 1
            height: 1rem
            border: none
          .sms
            position: absolute
            top: .1rem
            right: 0
            z-index: 100
            flex: 0 0 1.6rem
            width: 1.6rem
            height: .6rem
            line-height: .6rem
            color: #fff
            font-size: $font-size-small
            border-radius: 5px
            text-align: center
            background: #c5c5c5
            &.active
              color: #fff
              background: #60c601
      .info
        height: 30px
        line-height: 30px
        margin-bottom: 5px
        text-align: center
        color: $color-price
      .other-login
        margin-top: .2rem
        .other-title
          display: flex
          height: .6rem
          line-height: .6rem
          .line
            position: relative
            top: -.28rem
            flex: 1
            border-bottom: 1px solid #ddd
          .other-text
            flex: 0 0 1.8rem
            text-align: center
            color: #c5c5c5
            font-size: $font-size-small
        .other-list
          text-align: center
          .list-item
            display: inline-block
            width: 1.6rem
            font-size: $font-size-small
            .password
              padding: .2rem
              margin-bottom: .1rem
              width: .5rem
              height: .5rem
              border: 1px solid #ddd
              border-radius: 50%
            .list-text
              text-align: center
      .close
        position: absolute
        top: .25rem
        right: .25rem
        width: .5rem
        height: .5rem
</style>
