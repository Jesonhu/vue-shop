<template>
  <transition name="slide">
    <div class="setting-wrapper">
      <navbar title="设置"></navbar>
      <div class="setting-list" v-if="userInfo">
        <div class="userinfo">
          <img class="avatar" v-lazy="userInfo.avatar" alt="头像">
          <div class="phone">{{userInfo.username}}</div>
        </div>

        <router-link to="/revise_password" tag="div" class="list-item">
          <div class="text">修改密码</div>
        </router-link>
      </div>
      <fixed-bottom-btn :text="'退出登录'" :active="true" @click.native="logout"></fixed-bottom-btn>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { mapMutations, mapGetters } from 'vuex';
  import Navbar from 'base/navbar/navbar';
  import FixedBottomBtn from 'base/fixed-bottom-btn/fixed-bottom-btn';
  import { Dialog } from 'vant';
  import { clearStorage } from 'common/js/cache';

  export default {
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      logout() {
        Dialog.confirm({
          title: '提示',
          message: '是否确认退出登录?'
        }).then(() => {
          // on confirm
          clearStorage();
          this.setUserInfo(null);
          this.$router.back();
        }).catch(() => {
          // on cancel
        });
      },
      ...mapMutations({
        setUserInfo: 'SET_USER_INFO'
      })
    },
    components: {
      Navbar,
      FixedBottomBtn
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/slide'

  .setting-wrapper
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 300
    background: $color-background
    .setting-list
      .userinfo
        padding: .1rem
        height: 1rem
        line-height: 1rem
        background: #fff
        font-size: $font-size-medium
        .avatar
          display: inline-block
          vertical-align: top
          width: 1rem
          height: 1rem
          border-radius: 50%
        .phone
          display: inline-block
          vertical-align: top
    .list-item
      margin-top: 10px
      padding: 0 10px
      height: 40px
      line-height: 40px
      font-size: $font-size-medium
      background: #fff
</style>
