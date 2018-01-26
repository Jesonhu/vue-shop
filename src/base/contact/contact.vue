<template>
  <div>
    <!-- 联系人卡片 -->
    <van-contact-card
      :type="cardType"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="selectContact"
    />
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex';
  import { ContactCard } from 'vant';

  export default {
    data() {
      return {
        editingContact: {},
        list: [
          {
            id: 0,
            name: '张三',
            tel: '13000000000'
          },
          {
            id: 1,
            name: '李四',
            tel: '1310000000',
            address: '浙江省杭州市拱墅区莫干山路 50 号'
          }
        ]
      };
    },
    computed: {
      cardType() {
        return this.chosenContactId !== null ? 'edit' : 'add';
      },

      currentContact() {
        const id = this.chosenContactId;
        return id !== null ? this.list.filter(item => item.id === id)[0] : {};
      },
      ...mapGetters([
        'chosenContactId'
      ])
    },
    methods: {
      selectContact() {
        this.$router.push('/address');
      }
    },
    components: {
      [ContactCard.name]: ContactCard
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .van-contact-card__content
    padding: .1rem .2rem
    .van-contact-card__text
      vertical-align: top
</style>
