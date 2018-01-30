<template>
  <transition name="slide">
    <div class="login-password-wrapper">
      <navbar></navbar>
      <div class="password-form">
        <div class="form-item">
          <img class="img" src="./login_mobile_21x21.png"/>
          <input class="input" type="number" placeholder="请输入手机号码" required>
        </div>
        <div class="form-item">
          <img class="img" src="./login_code_21x21.png"/>
          <input class="input" type="text" placeholder="请输入密码" required>
        </div>
        <div class="btn-wrapper">
          <l-btn :active="true" :text="'登陆'"></l-btn>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar';
  import LBtn from 'base/btns/l-btn';

  export default {
    components: {
      Navbar,
      LBtn
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
        display: flex
        align-items: center
        height: .8rem
        margin: .2rem 0
        .img
          width: .6rem
          height: .6rem
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
