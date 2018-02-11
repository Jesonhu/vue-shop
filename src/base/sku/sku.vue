<template>
  <van-sku
    v-if="skuGoods"
    v-model="show"
    :sku="sku"
    :goods="skuGoods"
    :goods-id="skuGoodsId"
    :hide-stock="sku.hide_stock"
    :reset-stepper-on-hide="true"
    @buy-clicked="_buyClicked"
    @add-cart="_addCart"
  />
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapMutations, mapActions } from 'vuex';
  import { Sku, Toast } from 'vant';
  import { addShopcart, getShopcartCount } from 'api/shopcart';
  import { ERR_OK } from 'api/config';
  import { getCartKey, saveCartKey } from 'common/js/cache';

  export default {
    data() {
      return {
        show: false
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
        'skuStatus',
        'skuGoods',
        'sku',
        'skuGoodsId'
      ])
    },
    methods: {
      _buyClicked(obj) {
        this.buyClick(obj);
      },
      _addCart(obj) {
        console.log(obj);
        this._addShopcart(obj.goodsId, obj.selectedNum);
        this.show = false;
      },
      _addShopcart(goodsId, selectedNum) {
        const productId = goodsId;
        const quantity = selectedNum;
        const cartKey = getCartKey();

        addShopcart(productId, quantity, cartKey).then((res) => {
          if (res.code === ERR_OK) {
            if (cartKey !== res.datum.cart_key || !cartKey) {
              saveCartKey(res.datum.cart_key);
            }
            this._getShopcartCount(res.datum.cart_key);
          }
        });
      },
      _getShopcartCount(cartKey) {
        getShopcartCount(cartKey).then((res) => {
          if (res.code === ERR_OK) {
            this.setShopcartCount(res.datum);
            Toast.success('添加成功!');
          }
        });
      },
      ...mapMutations({
        setSkuStatus: 'SET_SKU_STATUS',
        setShopcartCount: 'SET_SHOPCART_COUNT',
        setCheckOrder: 'SET_CHECK_ORDER',
        setSelectAddress: 'SET_SELECT_ADDRESS'
      }),
      ...mapActions([
        'buyClick'
      ])
    },
    components: {
      [Sku.name]: Sku
    }
  };
</script>
