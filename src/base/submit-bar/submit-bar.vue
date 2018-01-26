<template>
  <van-submit-bar
    :price="totalPrice"
    button-text="提交订单"
    @submit="onSubmit"
  >
    <van-checkbox v-model="checked" class="submit-all-btn" v-if="!selectAll">全选</van-checkbox>
  </van-submit-bar>
</template>

<script type="text/ecmascript-6">
  import { SubmitBar, Checkbox } from 'vant';

  export default {
    data() {
      return {
        checked: true,
        goods: [{
          id: '1',
          title: '进口香蕉',
          desc: '约250g，2根',
          price: 200,
          num: 1,
          thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
        }, {
          id: '2',
          title: '陕西蜜梨',
          desc: '约600g',
          price: 690,
          num: 1,
          thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'
        }, {
          id: '3',
          title: '美国伽力果',
          desc: '约680g/3个',
          price: 2680,
          num: 1,
          thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
        }]
      };
    },
    props: {
      totalPrice: {
        type: Number,
        default: null
      },
      selectAll: {
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
