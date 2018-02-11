<template>
  <div class="contact">
    <!-- 联系人卡片 -->
    <van-contact-card
      :type="cardType"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="selectContact"
    >
    </van-contact-card>
    <div class="address" v-show="currentContact.address">联系地址: {{ currentContact.address }}</div>
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
        return this.selectAddress !== null ? 'edit' : 'add';
      },

      currentContact() {
        // const id = this.chosenContactId;
        // return id !== null ? this.list.filter(item => item.id === id)[0] : {};
        if (this.selectAddress) {
          return {
            id: this.selectAddress.id,
            name: this.selectAddress.consignee,
            tel: this.selectAddress.phone,
            address: this.selectAddress.area_name + this.selectAddress.address
          };
        } else {
          return {};
        }
      },
      ...mapGetters([
        'chosenContactId',
        'selectAddress'
      ])
    },
    methods: {
      selectContact() {
        this.$router.push('/address/order');
      }
    },
    components: {
      [ContactCard.name]: ContactCard
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .contact
    position: relative
    .van-contact-card__content
      padding: .1rem .2rem .3rem .2rem
      .van-contact-card__text
        vertical-align: top
    .address
      position: absolute
      bottom: .2rem
      left: .75rem
      background: $color-text
      font-size: $font-size-medium

  .van-contact-card__icon
    margin-right: .2rem

  .van-contact-card--edit
    .van-contact-card__icon
      font-size: $font-size-large

  .van-contact-card__text
    line-height: .4rem
    font-size: $font-size-medium

  .van-contact-card__arrow
    right: .2rem
    font-size: $font-size-small
</style>
