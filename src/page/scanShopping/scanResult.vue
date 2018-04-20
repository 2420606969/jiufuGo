<template>
  <div class="scan_result" ref='scn'>
    <div class="scan_header">
      <div class="header_box">
        <img v-if="oneGoods.img_url" :src="oneGoods.img_url">
      </div>
    </div>
    <div class="scan_footer">
      <h4 class="goods_title">{{oneGoods.desc_word}}</h4>
      <p class="goods_price">￥{{oneGoods.goods_price}}</p>
      <div class="cartbutton-wrapper">
        <i @click="scanReduce()" class="icon iconfont icon-jianhao1"></i>
        <span>{{oneGoods.count}}</span>
        <i class="icon iconfont icon-iconfontxinzeng" @click.stop="scanAdd($event)"></i>
      </div>
      <button class="add_shop_car" @click="addShopCar()">加入购物车</button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import cartbuttonscan from "components/cartbuttonscan";
export default {
  data() {
    return {
      oneGoods: Object.assign({}, this.scanGoodsResultAttr)
    };
  },
  props: {
    scanGoodsResultAttr: {
      type: Object
    }
  },
  mounted() {},
  created() {},
  computed: {
    ...mapGetters({
     selectedFoods: "getSelectedFoods",
      goods_type: "getGoodsType",
      openShadow: "getOpenShadow",
      isShow: "getIsShow",
      isScanShow: "getIsScanShow",
      isOpenActivity: "getisOpenActivity",
      totalprice: "getTotalprice", 
      yhprice: "getYhprice" 
    })
  },
  methods: {
    ...mapActions([
      "upDateSelectedFoods",
      "upDateOpenShadow",
      "upDateIsScanShow",
      "upDateGoodsType",
      "upDateYhprice",
      "upDateTotalprice"
    ]),
    scanAdd() {
      // console.log("jia");
      if (this.oneGoods.count >= 99) {
        this.$vux.toast.text("该商品最多只允许购买99件！", "top");
        return;
      }
      this.oneGoods.count++;
      this.oneGoods.goods_num++;
    },
    scanReduce() {
      if (this.oneGoods.count <= 1) {
        return;
      }
      this.oneGoods.count--;
      this.oneGoods.goods_num--;
    },
    addShopCar() {
      this.oneGoods.flag = true;
      this.upDateSelectedFoods(this.oneGoods);
      this.upDateGoodsType(this.oneGoods);
      this.upDateOpenShadow(false);
      this.upDateIsScanShow(false);
      this.getisOpenActivity();
    },
      getisOpenActivity() {
      let data = {
        header: {
          open_id: localStorage.getItem("open_id"),
          store_serial: localStorage.getItem("store_serial"),
          trade_type: "calculateAmt"
        },
        body: { goods_list: this.selectedFoods }
      };
      this.$postAjax("wx/general/interface", data).then(
        response => {
          if (response.header.ret_code == 200) {
            let yhprice = response.body.yhunit_price;
            let totalprice = response.body.totalunit_price;
            this.upDateYhprice(yhprice);
            this.upDateTotalprice(totalprice);
          }
        }
      );
    },
  },
  components: {
    cartbuttonscan
  }
};
</script>
<style lang="less" scoped>
@import "../../../static/less/var.less";
.scan_result {
  position: absolute;
  z-index: 90;
  height: 3.9rem;
  width: 3.06rem;
  left: 50%;
  top: 0.6rem;
  margin-left: -1.53rem;
  overflow: hidden;
  border-radius: 0.08rem;
  padding-bottom: 0.08rem;
  background-color: #f09938;
  .scan_header {
    height: 2rem;
    width: 100%;
    .header_box {
      margin-top: 0.14rem;
      margin-left: 0.29rem;
      width: 2.48rem;
      border-radius: 0.08rem;
      height: 1.7rem;
      overflow: hidden;
      padding: 10%;
      img {
        width: 80%;
        height: 80%;
      }
    }
  }
  .scan_footer {
    height: 1.9rem;
    width: 100%;
    background-color: #fff;
    .goods_title {
      color: #383838;
      font-size: 0.16rem;
      padding-top: 0.18rem;
      padding-bottom: 0.13rem;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding-left: 0.6rem;
      padding-right: 0.6rem;
    }
    .goods_price {
      padding: 0.1rem;
      text-align: center;
      color: #f09654;
      font-size: 18px;
      font-weight: 700;
    }
    .cartbutton-wrapper {
      text-align: center;
      position: relative;
      width: 100%;
      height: 0.3rem;
      color: red;
      > i:first-child {
        position: absolute;
        left: 35%;
        // top: .01rem;
        font-size: 0.25rem;
        bottom: 0;
        z-index: 999;
      }
      > i:last-child {
        position: absolute;
        font-size: 0.24rem;
        left: 57%;
        bottom: 0.03rem;
        z-index: 999;
      }
      > span {
        position: absolute;
        font-size: 0.25rem;
        width: 1rem;
        bottom: 0.005rem;
        margin-left: -0.5rem;
        left: 50%;
        line-height: 0.34rem;
      }
    }
    .add_shop_car {
      background-color: #f19a39;
      width: 2.2rem;
      height: 0.38rem;
      border-radius: 0.08rem;
      text-align: center;
      line-height: 0.38rem;
      margin-left: 0.4rem;
      margin-top: 0.09rem;
      margin-bottom: 0.09rem;
    }
  }
}
</style>
