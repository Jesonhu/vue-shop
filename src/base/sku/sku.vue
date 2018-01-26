<template>
  <van-sku
    v-model="show"
    :sku="sku"
    :goods="goods"
    :goods-id="goodsId"
    :hide-stock="sku.hide_stock"
    :quota="quota"
    :quota-used="quotaUsed"
    :reset-stepper-on-hide="true"
    @buy-clicked="_buyClicked"
    @add-cart="_addCart"
  />
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapMutations } from 'vuex';
  import { Sku, Toast } from 'vant';

  export default {
    data() {
      return {
        show: false,
        goods: {
          title: '美国伽力果（约680g/3个）',
          price: 2680,
          express: '免运费',
          remain: 19,
          thumb: [
            'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
            'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
          ],
          picture: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg'
        },
        goodsId: 1000,
        quota: 10,
        quotaUsed: 5,
        sku: {
          // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
          // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
          tree: [
            {
              k: '颜色', // skuKeyName：规格类目名称
              v: [
                {
                  id: '30349', // skuValueId：规格值 id
                  name: '红色', // skuValueName：规格值名称
                  imgUrl: 'https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
                },
                {
                  id: '1215',
                  name: '蓝色',
                  imgUrl: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg'
                },
                {
                  id: '1000',
                  name: '绿色',
                  imgUrl: 'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
                }
              ],
              k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            }
          ],
          // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
          list: [
            {
              id: 2259, // skuId，下单时后端需要
              price: 2300, // 价格（单位分）
              s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
              stock_num: 110 // 当前 sku 组合对应的库存
            },
            {
              id: 2259, // skuId，下单时后端需要
              price: 3400, // 价格（单位分）
              s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
              stock_num: 120 // 当前 sku 组合对应的库存
            },
            {
              id: 2259, // skuId，下单时后端需要
              price: 5100, // 价格（单位分）
              s1: '1000', // 规格类目 k_s 为 s1 的对应规格值 id
              stock_num: 220 // 当前 sku 组合对应的库存
            }
          ],
          price: '26.80', // 默认价格（单位元）
          stock_num: 227, // 商品总库存
          collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          none_sku: false, // 是否无规格商品
          messages: [
            {
              // 商品留言
              datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
              multiple: '1', // 留言类型为 text 时，是否多行文本。'1' 表示多行
              name: '留言', // 留言名称
              type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
              required: '0' // 是否必填 '1' 表示必填
            }
          ],
          hide_stock: false // 是否隐藏剩余库存
        }
      };
    },
    watch: {
      skuStatus() {
        this.show = this.skuStatus;
      },
      show(newShow) {
        if (!newShow) {
          this.setSkuStatus(false);
        }
      }
    },
    computed: {
      ...mapGetters([
        'skuStatus'
      ])
    },
    methods: {
      _buyClicked(obj) {
        this.$emit('buyClicked', obj);
      },
      _addCart(obj) {
        Toast.success('添加成功!');
        this.show = false;
      },
      ...mapMutations({
        setSkuStatus: 'SET_SKU_STATUS'
      })
    },
    components: {
      [Sku.name]: Sku
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .van-sku-header__img-wrap
    margin-top: -.2rem
    width: 1.6rem
    height: 1.6rem
    border-radius: 0.04rem
  .van-sku-header__goods-info
    padding: .2rem 1.2rem .2rem .2rem
    min-height: 1.64rem
    .van-sku__goods-name
      font-size: $font-size-small
      line-height: .52rem
    .van-sku__goods-price
      margin-top: .2rem
      font-size: $font-size-medium
      .van-sku__price-symbol
        font-size: $font-size-medium
  .van-sku-row-group
    margin: 0 .3rem .2rem 0
  .van-sku-group-container
    margin-left: .3rem
    padding: .24rem 0 .04rem
  .van-sku-row__title
    font-size: $font-size-medium
    padding-bottom: .2rem
  .van-sku-row__item
    display: inline-block
    padding: .1rem .18rem
    margin: 0 .2rem .2rem 0
    height: .56rem
    min-width: 52px
    line-height: .32rem
    font-size: $font-size-small
  .van-sku-stepper-stock
    padding: .24rem 0
    margin-left: .3rem
</style>
