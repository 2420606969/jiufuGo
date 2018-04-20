<template>
  <div class="shopcart-wrapper" @click="openShadowList">
    <div class="cartlogo" :class="{animated:dropDown,bounceIn:dropDown}">
      <div class="out">
        <span class="total" v-if="totalCount>0">{{totalCount}}</span>
        <div class="in" :class="{act:totalCount}">
          <i class="icon iconfont icon-gouwuche"></i>
        </div>
      </div>
    </div>
    <div class="price-box" v-show="!isOpenActivity">
      <div style="height: 0.4rem;line-height: 0.2rem;width: 1rem;">
        <p class="price" style="color: red">￥{{oldTotalPrice}}元</p>
        <p class="fee">优惠价:￥{{totalPrice}}元</p>
      </div>
    </div>
    <div class="price-box" v-show="isOpenActivity">
      <div style="height: 0.4rem;line-height: 0.2rem;width: 1rem;">
        <p class="price" style="color: red">￥{{totalprice}}元</p>
        <p class="fee">优惠价:￥{{yhprice}}元</p>
      </div>
    </div>
    <div class="topay" :class="{open_door:totalPrice}" @click.stop="openDoor" v-if="opensDoor">
      开门
    </div>
    <div class="topay" :class="{act:totalPrice}" @click.stop="goAccounts">
      去结算
    </div>
    <transition name="slide">
      <div class="cart-list" v-if="isShow&&selectedFoods.length>0" ref="list">
        <div class="cart-list-header">
          <span class="car">已选商品({{totalCount}})</span>
          <span class="clear">{{activityMsg}}</span>
        </div>
        <div class="shopcar-content">
          <div v-for="(food,index) in selectedFoods" :key="food.goods_id" class="item_box">
            <div style="height: .8rem;width:.8rem;display: flex;flex-direction: row;justify-content: center;align-items: center;">
              <img :src="food.img_url" alt="" class="food_img" style="max-height: 100%;max-width:100%;">
            </div>
            <div class="food-info">
              <p class="desc" v-if="food.desc_word">{{food.desc_word}}</p>
              <p class="desc" v-else-if="food.desc_word.length>20">{{food.desc_word.substr(0,20)+'...'}}</p>
              <div class="price overflow_H">
                <span class="price_show">￥{{food.goods_price}}</span>
                <span class="old_price">￥{{food.old_goods_price}}</span>
                <!-- cartbutton 不抽出来 -->
                <div class="cartbutton-wrapper">
                  <i @click.stop="reduce(index)" v-show="food.count>0" class="icon iconfont icon-jianhao1"></i>
                  <span v-show="food.count>0">{{food.count}}</span>
                  <i class="icon iconfont icon-iconfontxinzeng" @click.stop="add($event,index)"></i>
                </div>
                <!-- <cartbutton @reduceClick="reduceClickFun" @ball-event="ballClick" @addFood="addFoodFun" :food="food"></cartbutton> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 音频 -->
      <audio ref="musc" id="audio" controls="controls" autoplay="autoplay" preload="auto" style="display: none" v-if="audioAuto">
        <source src="../../static/audio/openDoor3.mp3" type="audio/mpeg">
      </audio>
    </transition>
    <!-- 小球的外围盒子 -->
    <transition v-for="(ball,index) in balls" :key="index" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball-wrapper" v-show="ball.show">
        <div class="inner"></div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import cartbutton from "@/components/cartbutton";
export default {
  data() {
    return {
      audioAuto: false, //音频
      opensDoor: true, //开门是否显示
      counts: "",
      good_id: "",
      goods_num: "", //商品数量
      appId: "", //微信公众号id唯一
      timestamp: "", //时间戳
      nonceStr: "", //生成签名的随机串
      signature: "", //签名
      signType: "", //签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: "", //支付签名
      package: "", //统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      dropDown: false,
      dropBall: [],
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      award_desc:''
      // isShow: false 原来购物车列表信息是否展示已存进仓库
      // totalprice: "", //原价
      // yhprice: "" //优惠价
    };
  },
  // props: ["inittotalprice", "inityhprice"],
  components: {
    cartbutton
  },
  created() {
  },
  computed: {
    ...mapGetters({
      selectedFoods: "getSelectedFoods",
      isShow: "getIsShow",
      openShadow: "getOpenShadow",
      isOpenActivity: "getisOpenActivity",
      totalprice: "getTotalprice",
      yhprice: "getYhprice",
      activityMsg: "getActivityMsg"
    }),
    totalCount() {
      let total = 0;
      this.selectedFoods.forEach(food => {
        this.good_id = food.goods_id;
        this.counts = food.count;
        this.goods_num = food.count;
        total += food.count;
      });
      return total;
    },
    //实际支付价格
    totalPrice() {
      let total = 0;
      this.selectedFoods.forEach(food => {
        total += food.count * food.goods_price;
      });
      return total.toFixed(2);
    },
    //原价
    oldTotalPrice() {
      let oldTotal = 0;
      this.selectedFoods.forEach(food => {
        oldTotal += food.count * food.old_goods_price;
      });
      return oldTotal.toFixed(2);
    }
    //已优惠价格
    // specialPrice() {
    //   let vipPrice = 0;
    //   this.selectedFoods.forEach(food => {
    //     let tempPrice = food.old_goods_price - food.goods_price;
    //     vipPrice += tempPrice * food.count;
    //   });
    //   console.log(vipPrice);
    //   return vipPrice.toFixed(2);
    // }
  },
  mounted() {
    let baseUrl = window.location.href.split("#")[0];
    let data = { header: {}, body: { url: baseUrl } };
    this.$postAjax("/wx/pay/getJsTicket", data).then(response => {
      // console.log(5555555555555555)
      // console.log(response.body)
      this.appId = response.body.appId;
      this.timestamp = response.body.timestamp;
      this.nonceStr = response.body.noncestr;
      this.signature = response.body.signature;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.appId, // 必填，公众号的唯一标识
        timestamp: this.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.nonceStr, // 必填，生成签名的随机串
        signature: this.signature, // 必填，签名，见附录1
        // jsApiList : [ 'chooseWXPay','scanQRCode' ]
        jsApiList: ["chooseWXPay", "scanQRCode"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    });
  },
  updated() {},
  methods: {
    ...mapActions([
      "upDateOpenShadow",
      "upDateGoodsType",
      "dropGoodsType",
      "upDateIsShow",
      "dropSelectedFoods",
      "upDateSelectedFoods",
      "upDateYhprice",
      "upDateTotalprice",
      "upDateActivityMsg"
    ]),
    //打开购物车商品列表
    openShadowList() {
      if (this.selectedFoods.length <= 0) {
        return;
      }
      this.isShowStatus = !this.openShadow;
      this.upDateIsShow(this.isShowStatus);
      this.upDateOpenShadow(this.isShowStatus);
    },
    //去结算
    goAccounts() {
      let data = {
        header: {
          open_id: localStorage.getItem("open_id"),
          store_serial: localStorage.getItem("store_serial"),
          trade_type: "prepay"
        },
        body: { goods_list: this.selectedFoods }
      };
      if (this.totalCount > 0) {
        this.$postAjax( "/wx/pay/preOrder", data).then(response => {
          if (response.header.ret_code == 200) {
            this.appId = response.body.appId; // 必填，公众号的唯一标识
            this.timestamp = response.body.timestamp; // 必填，生成签名的时间戳
            this.nonceStr = response.body.nonceStr; // 必填，生成签名的随机串
            this.signature = response.body.signature; // 必填，签名，见附录1
            this.signType = response.body.signType; //签名方式
            this.paySign = response.body.paySign; //支付签名
            this.package = response.body.package; //统一支付接口返回的prepay_id参数值
            this.checkAPI();
          } else {
            this.$vux.toast.text(response.header.msg, "top");
          }
        });
      } else {
        this.$vux.toast.text("购物车为空,请选择商品", "top");
      }
    },
    // 微信支付
    wxPay() {
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: this.appId, //公众号名称，由商户传入
          timeStamp: this.timestamp, //时间戳，自1970年以来的秒数
          nonceStr: this.nonceStr, //随机串
          package: this.package,
          signType: this.signType, //微信签名方式：
          paySign: this.paySign //微信签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            window.location.reload();
            this.$router.push({ name: "index" });
          } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
        }
      );
    },
    //检测是否在微信浏览器内
    checkAPI() {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            onBridgeReady,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
          document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
        }
      } else {
        this.wxPay();
      }
    },
    ballClick(target) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.target = target;
          this.dropBall.push(ball);
          return;
        }
      }
    },
    beforeEnter(el) {
      let temp = this.dropBall.concat([]);
      let ball = temp.pop();
      if (ball.show) {
        let rect = ball.target.getBoundingClientRect();
        let left = rect.left - 32;
        let top = -(window.innerHeight - rect.top - 22);
        el.style.display = "";
        el.style.webkitTransform = `translate3d(0,${top}px,0)`;
        el.style.transform = `translate3d(0,${top}px,0)`;
        let inner = el.getElementsByClassName("inner")[0];
        inner.style.webkitTransform = `translate3d(${left}px,0,0)`;
        inner.style.transform = `translate3d(${left}px,0,0)`;
      }
    },
    enter(el, done) {
      let reset = el.offsetHeight;
      // let refresh = el.offsetHeight;
      this.$nextTick(() => {
        el.style.display = "";
        el.style.webkitTransform = "translate3d(0,0,0)";
        el.style.transform = "translate3d(0,0,0)";
        let inner = el.getElementsByClassName("inner")[0];
        inner.style.webkitTransform = "translate3d(0,0,0)";
        inner.style.transform = "translate3d(0,0,0)";
        el.addEventListener("transitionend", done);
      });
    },
    afterEnter(el) {
      let ball = this.dropBall.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
        this.dropDown = true;
        let self = this;
        clearTimeout(timer);
        let timer = setTimeout(() => {
          self.dropDown = false;
        }, 750);
      }
    },
    //开门
    openDoor() {
      let data = {
        header: {
          open_id: localStorage.getItem("open_id"),
          store_serial: localStorage.getItem("store_serial"),
          trade_type: "openDoor"
        },
        body: {}
      };
      this.$postAjax("wx/general/interface", data).then(
        response => {
          if (response.header.ret_code == 200 || response.body.is_rge == "Y") {
            this.$router.push({ name: "index" });
            this.$vux.toast.text("门已打开,请随手关门", "top");
            this.audioAuto = true;
            return false;
          } else {
            this.$vux.toast.text(
              "开门异常,请重试！(ErrorCode:" + response.header.ret_code + ")",
              "top"
            );
          }
        }
      );
    },
    add(event, index) {
      let deepCopyObj = Object.assign({}, this.selectedFoods[index]);
      // console.log(852+"++++")
      // console.log(this.selectedFoods);
      // console.log(this.selectedFoods[index]);
      // console.log(deepCopyObj);
      if (deepCopyObj.count >= 99) {
        this.$vux.toast.text("该商品最多只允许购买99件！", "top");
        return;
      }
      this.upDateGoodsType(deepCopyObj);
      this.upDateSelectedFoods(deepCopyObj);
      this.ballClick(event.target);
      this.getisOpenActivity();
    },
    reduce(index) {
      let deepCopyObj = Object.assign({}, this.selectedFoods[index]);
      // console.log(852+"----")
      // console.log(this.selectedFoods[index]);
      // console.log(deepCopyObj);
      this.dropSelectedFoods(deepCopyObj);
      this.dropGoodsType(deepCopyObj);
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
             this.award_desc = response.body.activityMsg;
             console.log(this.award_desc)
            let yhprice = response.body.yhunit_price;
            let totalprice = response.body.totalunit_price;
             let activityMsg = response.body.activityMsg;
            this.upDateYhprice(yhprice);
            this.upDateTotalprice(totalprice);
            this.upDateActivityMsg(activityMsg);
          }
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../static/less/var.less";
.shopcart-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 0.4rem;
  background: @bggray1;
  display: flex;
  justify-content: space-between;
  .ball-wrapper {
    position: fixed;
    bottom: 22px;
    left: 32px;
    z-index: 200;
    transition: 0.8s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    .inner {
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 50%;
      background: red;
      transition: 0.8s ease;
    }
  }
  .cartlogo {
    width: 0.8rem;
    position: relative;
    z-index: 10;
    .out {
      width: 0.4rem;
      height: 0.4rem;
      background: @bggray2;
      border-radius: 50%;
      margin-left: @base*32rem;
      position: relative;
      .total {
        background: red;
        color: #fff;
        position: absolute;
        top: -0.06rem;
        left: 0.2rem;
        width: 0.25rem;
        height: 0.25rem;
        line-height: 0.25rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.13rem;
      }
      .in {
        width: 0.4rem;
        height: 0.4rem;
        background: @bggray1;
        border-radius: 50%;
        text-align: center;
        margin-top: 0.02rem;
        line-height: 0.4rem;
        i {
          color: @bggray3;
          font-size: 0.3rem;
        }
        &.act {
          background: @mc;
          i {
            color: #fff;
          }
        }
      }
    }
  }
  .price-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    color: #fff;
    position: relative;
    line-height: 0.2rem;
    z-index: 100;
  }
  .topay {
    width: 1rem;
    font-size: 0.18rem;
    background: @bggray3;
    text-align: center;
    line-height: 0.4rem;
    color: #fff;
    position: relative;
    z-index: 100;
    &.act {
      background: #47b34e;
      color: #fff;
    }
    &.open_door {
      background: @mc;
      color: #fff;
    }
  }
  .cart-list {
    max-height: 2.8rem;
    width: 100%;
    position: absolute;
    bottom: 0.4rem;
    left: 0;
    background: #fff;
    overflow: auto;
    .cart-list-header {
      height: 0.4rem;
      width: 100%;
      background: #ff9933;
      line-height: 0.4rem;
      position: fixed;
      z-index: 100;
      .car {
        padding-left: 0.05rem;
        border-left: 0.1rem solid @mc;
        float: left;
      }
      .clear {
        float: right;
      }
    }
  }
}

.shopcar-content {
  background: #fff;
  padding-top: 0.4rem;
  flex: 1;
  .item_box {
    display: flex;
    padding: 0.1rem;
    height: 0.8rem;
    border-bottom: 1px solid #f7f7f7;
  }
  .price_show {
    color: red;
    font-size: 0.22rem;
    position: absolute;
    bottom: 0.1rem;
  }
  .old_price {
    text-decoration: line-through;
    color: #666;
    font-size: 0.18rem;
    position: absolute;
    bottom: 0.12rem;
    left: 0.6rem;
  }
  .cartbutton-wrapper {
    position: absolute;
    bottom: 0.1rem;
    right: 0.08rem;
    height: 0.3rem;
    line-height: 0.3rem;
    > i {
      height: 100%;
    }
    > i:before {
      color: red;
      margin-bottom: -0.04rem;
      font-size: 0.25rem;
      margin: 0 0.1rem;
      height: 100%;
      line-height: 0.3rem;
    }
    > span {
      font-size: 0.22rem;
      height: 100%;
      line-height: 0.3rem;
    }
  }
  .food-info {
    width: 2.8rem;
    height: 0.8rem;
    position: relative;
    left: 0.08rem;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: 0.5s;
  -moz-transition: 0.5s;
  /* Firefox 4 */
  -webkit-transition: 0.5s;
  /* Safari 和 Chrome */
  -o-transition: 0.5s;
  /* Opera */
}

.slide-enter {
  transform: translateY(100%);
  -ms-transform: translateY(100%);
  /* IE 9 */
  -moz-transform: translateY(100%);
  /* Firefox */
  -webkit-transform: translateY(100%);
  /* Safari 和 Chrome */
  -o-transform: translateY(100%);
  /* Opera */
  opacity: 0;
}

.slide-leave-active {
  transform: translateY(100%);
  -ms-transform: translateY(100%);
  /* IE 9 */
  -moz-transform: translateY(100%);
  /* Firefox */
  -webkit-transform: translateY(100%);
  /* Safari 和 Chrome */
  -o-transform: translateY(100%);
  /* Opera */
  opacity: 0;
}
</style>
