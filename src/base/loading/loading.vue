<template>
  <div class="loading-contaner">
    <van-loading type="gradient-circle" color="black"  class="loading" />
  </div>
</template>

<script type="text/ecmascript-6">
  import { Loading } from 'vant';

  export default {
    components: {
      [Loading.name]: Loading
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .loading-contaner
    .loading
      margin: 0 auto
</style>
