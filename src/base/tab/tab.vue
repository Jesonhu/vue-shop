<template>
  <van-tabs :active="active">
    <van-tab v-for="index in 4" :title="'选项 ' + index" :key="index">
      内容 {{ index }}
    </van-tab>
  </van-tabs>
</template>

<script type="text/ecmascript-6">
  import { Tab, Tabs } from 'vant';

  export default {
    data() {
      return {
        active: 2
      };
    },
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
