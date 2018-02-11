<template>
  <van-submit-bar
    :price="totalPrice"
    button-text="提交订单"
    @submit="onSubmit"
  >
    <van-checkbox v-model="checked" class="submit-all-btn" v-if="isSelectAll">全选</van-checkbox>
  </van-submit-bar>
</template>

<script type="text/ecmascript-6">
  import { SubmitBar, Checkbox } from 'vant';

  export default {
    data() {
      return {
        checked: false
      };
    },
    props: {
      totalPrice: {
        type: Number,
        default: null
      },
      isSelectAll: {
        type: Boolean,
        default: false
      },
      check: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onSubmit() {
        this.$emit('submit');
      }
    },
    components: {
      [SubmitBar.name]: SubmitBar,
      [Checkbox.name]: Checkbox
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'

  .submit-all-btn
    margin-left: .2rem
    font-size: $font-size-medium
</style>
