<template>
  <div class="content">
    <!-- 头部logo 扫码 会员 -->
    <div class="header_info oH">
      <div class="header_left fl">
        <img src="../../static/images/logo.png" class="logo_img md">
        <p class="header_text md">悟空便利</p>
      </div>
      <div class="header_right fr">
        <span class="scan">扫一扫</span>
        <img src="../../static/images/saoyisoa.png" class="qrcode_img" @click="showScanResult">
        <img :src="head_img_url" class="wx_img" @click="goVip">
      </div>
    </div>
    <!-- <swiper :list="banner_list"></swiper> -->
    <!-- 轮播 <-->
    <!-- <div class="swiper-container position_A" dir="rtl">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in banner_list" :key="item.id">
          <img :src="item.banner_img_url" style="width: 100%;height: 1.35rem;">
        </div>
      </div> -->
    <!-- 如果需要分页器 -->
    <!-- <div v-if="banner_list.length>2" class="swiper-pagination"></div> -->
    <!-- </div> -->
    <div class="index-wrap banner-index">
      <slide-show :slides="slides" :bannerType="bannerType"></slide-show>
    </div>

    <!-- 商品列表 -->
    <div class="menuview-wrapper">
      <div class="menu-wrapper" ref="menuScroll">
        <div class="menu-box">
          <div v-for="(item,index) in goods_type" @click="scrollTab(index)" class="item" :class="{act:tabIndex===index}" :key=item.id>
            <p style="width: 0.2rem;">{{item.type_name}}</p>
          </div>
        </div>
      </div>
      <div class="food-wrapper" ref="foodScroll">
        <div class="goods_box">
          <div class="out_box" v-for="(item,index_one) in goods_type" :key="index_one">
            <div class="type_name">{{item.type_name}}</div>
            <div v-for="(food, index_two) in item.goods_list" :key="food.goods_id" class="item_box">
              <!-- 每一列的图片 -->
              <div style="height: .8rem;width:.8rem;display: flex;flex-direction: row;justify-content: center;align-items: center;">
                <img :src="food.img_url" alt="" class="food_img" style="max-height: 100%;max-width:100%;">
              </div>
              <div class="food-info">
                <p class="desc" v-if="food.desc_word">{{food.desc_word}}</p>
                <p class="desc" v-else-if="food.desc_word.length > 20">{{food.desc_word.substr(0,20)+'...'}}</p>
                <div class="price overflow_H">
                  <span class="old_price">￥{{food.old_goods_price}}</span>
                  <span class="price_show">￥{{food.goods_price}}</span>
                  <!-- cartbutton 不抽出来 -->
                  <div class="cartbutton-wrapper">
                    <i @click.stop="reduce(index_one, index_two)" v-show="food.count>0" class="icon iconfont icon-jianhao1" style="margin-bottom: -0.04rem;
                    font-size: 0.25rem;"></i>
                    <span v-show="food.count>0">{{food.count}}</span>
                    <i class="icon iconfont icon-iconfontxinzeng" @click.stop="add($event, index_one, index_two)" style="font-size:0.24rem;"></i>
                  </div>
                  <!-- <cartbutton @reduceClick="reduceClickFun" @ball-event="ballEvent" :food="food"></cartbutton> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 扫描结果页 -->
    <scanResult :scanGoodsResultAttr="scanGoodsResult" v-if="isScanShow"></scanResult>
    <!-- 遮罩层 -->
    <div class="shadow_box" ref="shadow" v-show="openShadow" @click="closeShadow"></div>
    <shopcart ref="shopCart"></shopcart>
    <!-- <shopcart ref="shopCart" :inittotalprice="totalprice" :inityhprice="yhprice"></shopcart> -->
  </div>
</template>
<script>
import slideShow from "@/components/slideShow";
// import { Swiper } from "vux";
import { mapGetters, mapActions, mapState } from "vuex";
import Vue from "vue";
import shopcart from "components/shopcart";
import BScroll from "better-scroll";
// import cartbutton from "components/cartbutton";
import scanResult from "page/scanShopping/scanResult";
export default {
  data() {
    return {
      openShadowStatus: false, // 自定义遮罩层状态点击切换
      head_img_url: "", //微信个人头像;
      scrollY: 0,
      heights: [],
      tabIndex:"0", 
      // banner_list: [], // banner图片
      // goods_type: [], // 商品列表和分类
      //openSign:''         // 是否显示开门
      appId: "", // 微信公众号id唯一
      timestamp: "", // 时间戳
      nonceStr: "", // 生成签名的随机串
      signature: "", // 签名
      scanGoodsResult: "", // 扫描商品后的结果
      // totalprice: "0.00", //原价
      // yhprice: "0.00", //优惠价
      slides: [
        {
          banner_img_url: require("@/assets/shanghai_2.jpg"),
          banner_jump_url: "", //广告跳转url
          banner_source:'1'
        },
        {
          banner_img_url: require("@/assets/banner_02.jpg"),
          banner_source:'1',
          banner_jump_url: "" //广告跳转url
        },
        {
          banner_img_url: require("@/assets/banner_01.png"),
          banner_source:'1',
          banner_jump_url: "" //广告跳转url
        },
        {
          banner_img_url: require("@/assets/banner_03.jpg"),
          banner_jump_url: "" ,//广告跳转url
          banner_source:'1'
        }
      ],
      bannerType: 2
    };
  },
  components: {
    shopcart,
    BScroll,
    scanResult,
    slideShow
  },
  mounted() {
    this.$nextTick(function() {
      var mySwiper = new Swiper(".swiper-container", {
        direction: "horizontal", //纵向vertical
        loop: true,
        pagination: ".swiper-pagination",
        autoplay: 3000,
        paginationClickable: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: false //修改swiper的父元素时，自动初始化swiper
      });
    });   
  },
  created() {
    //初始化
    this.initIndex();
    this.indexAll();
    this.scrollTabInit(0) 
  },
  computed: {
    ...mapGetters({
      selectedFoods: "getSelectedFoods",
      goods_type: "getGoodsType",
      openShadow: "getOpenShadow",
      isShow: "getIsShow",
      isScanShow: "getIsScanShow",
      isOpenActivity: "getisOpenActivity",
      totalprice: "getTotalprice",
      yhprice: "getYhprice",
      activityMsg: "getActivityMsg"
    }),
    tabIndex() {
      for (let i = 0; i < this.heights.length; i++) {
        let now = this.heights[i]; //当前的高度
        //console.log(now + '当前的高度')
        let next = this.heights[i + 1]; //下一个的高度
        //console.log(next + '下一个的高度')
        if (now <= this.scrollY && this.scrollY < next) {
          //console.log(i + '这是上面的')
          return i;
        } else if (!next) {
          //console.log(i + '这是下面的')
          return i;
        }
      }
      return 0;
    }
  },
  methods: {
    //初始化
    indexAll() {
      let data = {
        header: {
          open_id: localStorage.getItem("open_id"),
          store_serial: localStorage.getItem("store_serial"),
          trade_type: "newGoods"
        },
        body: { is_all: "Y" }
      };
      this.$postAjax("wx/general/interface", data).then(response => {
        if (response.header.ret_code == 200) {
          //this.banner_list = response.body.banner_list; // banner图片
          let goods_type = response.body.goods_type; // 商品列表和分类
          // console.log("0000001111111111");
          // console.log(goods_type); 
          this.head_img_url = response.body.head_img_url; //微信个人头像;
          for (let i = 0; i < goods_type.length; i++) {
            for (let j = 0; j < goods_type[i].goods_list.length; j++) {
              goods_type[i].goods_list[j].count = 0;
              goods_type[i].goods_list[j].goods_num = 0;
            }
          }
          this.upAllDate(goods_type);
          this.$nextTick(() => {
            this.initScroll();
            this.initHeight();
          });
          if (response.body.is_open_activity == "Y") {
            this.upDateIsOpenActivity(true);
          }
        } else {
          this.$vux.toast.text(response.header.msg, "top");
        }
      });
    },
    initIndex() {
      let imgData = {
        header: {
          //  open_id: "onN431BNnRvpUSXSAvJXHGFO3peE",
          //  store_serial: "cf838998-7a9e-4268-b187-2ebc563f67b1",
          open_id: localStorage.getItem("open_id"),
          store_serial: localStorage.getItem("store_serial"),
          trade_type: "storeBannerLoad",
          ip: ""
        },
        body: {
          banner_type: this.bannerType
        }
      };
      this.$postAjax("wx/general/interface", imgData).then(response => {
        if (response.body.banner_list) {
          this.slides = response.body.banner_list;
        }
      });
    },
    ...mapActions([
      "upAllDate",
      "upDateSelectedFoods",
      "dropSelectedFoods",
      "upDateGoodsType",
      "dropGoodsType",
      "upDateOpenShadow",
      "upDateIsShow",
      "upDateIsScanShow",
      "upDateIsOpenActivity",
      "upDateYhprice",
      "upDateTotalprice",
      "upDateActivityMsg"
    ]),
    getisOpenActivity() {
      let data = {
        header: {
          open_id: localStorage.getItem("open_id"),
          store_serial: localStorage.getItem("store_serial"),
          trade_type: "calculateAmt"
        },
        body: { goods_list: this.selectedFoods }
      };
      this.$postAjax( "/wx/general/interface", data).then(
        response => {
          if (response.header.ret_code == 200) {
            let yhprice = response.body.yhunit_price;
            let totalprice = response.body.totalunit_price;
            let activityMsg = response.body.activityMsg;
            this.upDateYhprice(yhprice);
            this.upDateTotalprice(totalprice);
            this.upDateActivityMsg(activityMsg);
          }
        }
      );
    },
    showScanResult() {
      // let tath = this
      var that = this;
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: res => {
          let result = res.resultStr.split(",")[1];
          if (result) {
            let data = {
              header: {
                open_id: localStorage.getItem("open_id"),
                store_serial: localStorage.getItem("store_serial"),
                trade_type: "newGoods"
              },
              body: { is_all: "N", goods_serial_no: result }
            };
            this.$postAjax("wx/general/interface", data).then(response => {
              if (response.header.ret_code == 200) {
                let { goods_type } = response.body; //商品类型
                let goodTYypeLeng = goods_type.length; //分类长度
                for (let n = 0; n < goodTYypeLeng; n++) {
                  if (goods_type[n].goods_list[0]) {
                    let { goods_id } = goods_type[n].goods_list[0]; //商品id
                    let tempObj = Object.assign(
                      {},
                      goods_type[n].goods_list[0],
                      { count: 1, goods_num: 1 }
                    );
                    this.scanGoodsResult = tempObj;
                    this.upDateOpenShadow(true);
                    this.upDateIsScanShow(true);
                    return;
                  }
                }
                this.$vux.toast.text("该商品条形码不存在", "top");
              } else {
                this.$vux.toast.text("服务器异常,请稍后重试", "top");
              }
            });
          } else {
            this.$vux.toast.text("无效的条形码,请重新尝试", "top");
          }
        },
        fail: res => {
          this.$vux.toast.text("扫码失败了,请重新尝试", "top");
        }
      });
    },
    // 跳转到会员中心页面
    goVip() {
      this.$router.push({ name: "vipIndex" });
    },
    //关闭蒙层
    closeShadow() {
      this.openShadowStatus = !this.openShadow;
      this.upDateOpenShadow(this.openShadowStatus);
      this.upDateIsShow(this.openShadowStatus);
      this.upDateIsScanShow(this.openShadowStatus);
    },
    //小球事件
    ballEvent(target) {
      this.$refs.shopCart.ballClick(target);
    },
    //初始化滚动条
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        probeType: 3,
        click: true
      });
      this.foodScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    initHeight() {
      let typeName = this.$refs.foodScroll.getElementsByClassName("type_name");
      let listLen = typeName.length;
      for (let i = 0; i < listLen; i++) {
        this.heights.push(typeName[i].offsetTop);
      }
    },
      scrollTabInit(index) {
      this.tabIndex = index;
    },
    scrollTab(index) {
      this.tabIndex = index;
      this.foodScroll.scrollTo(0, -this.heights[index]); //距离分类多少距离；
    },
    add(event, index_one, index_two) {
      // console.log("添加了")
      let deepCopyObj = Object.assign(
        {},
        this.goods_type[index_one].goods_list[index_two]
      );
      // console.log("000000000000");
      // console.log( this.goods_type[index_one].goods_list[index_two]);
      // console.log(deepCopyObj);
      if (deepCopyObj.count >= 99) {
        this.$vux.toast.text("该商品最多只允许购买99件！", "top");
        return;
      }
      this.upDateGoodsType(deepCopyObj);
      this.upDateSelectedFoods(deepCopyObj);
      this.ballEvent(event.target);
      this.getisOpenActivity();
    },
    reduce(index_one, index_two) {
      let deepCopyObj = Object.assign(
        {},
        this.goods_type[index_one].goods_list[index_two]
      );
      this.dropSelectedFoods(deepCopyObj);
      this.dropGoodsType(deepCopyObj);
      this.getisOpenActivity();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../static/less/var.less";
// 头部logo和扫码,会员
.header_info {
  height: 0.4rem;
  line-height: 0.4rem;
  background: #fff;
  border-bottom: 1px solid #f2f1f1;
  .header_left {
    margin-left: 0.2rem;
    .logo_img {
      width: 0.3rem;
      height: 0.3rem;
    }
    .header_text {
      font-size: 0.15rem;
    }
  }
  .header_right {
    // margin-top: 0.05rem;
    margin-right: 0.2rem;
    .scan {
      font-size: 0.2rem;
      color: #898989;
      vertical-align: bottom;
    }
    .qrcode_img {
      width: 0.27rem;
      height: 0.27rem;
      margin-right: 0.1rem;
      vertical-align: middle;
    }
    .wx_img {
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}
.banner-img {
  width: 100%;
}
// 遮罩层
.shadow_box {
  position: absolute;
  background: #000;
  filter: alpha(opacity=50);
  /* IE的透明度 */
  opacity: 0.5;
  /* 透明度 */
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 80;
}
// 轮播图
.swiper-container {
  position: absolute;
  top: 0.4rem;
  width: 100%;
}
// 商品列表
.menuview-wrapper {
  position: absolute;
  top: 1.85rem;
  bottom: 0.48rem;
  width: 100%;
  display: flex;
  overflow: hidden;
  .menu-wrapper {
    height: 100%;
    background: #fff;
    border-right: 1px solid #f7f7f7;
    .item {
      padding: @base*40rem @base*20rem;
      border-bottom: 1px solid @bc1;
      font-size: 0.14rem;
      color: @fc1;
      text-align: center;
      &.act {
        text-align: center;
        border-left: 0.02rem solid @mc;
      }
    }
  }
  .food-wrapper {
    background: #fff;
    flex: 1;
    .type_name {
      background: #f4f7f7;
      height: 0.3rem;
      line-height: 0.3rem;
      color: red;
      padding-left: 0.1rem;
    }
    .item_box {
      display: flex;
      padding: 0.1rem;
      height: 0.8rem;
      border-bottom: 1px solid #f7f7f7;
    }
    .old_price {
      text-decoration: line-through;
      color: #666;
      font-size: 0.18rem;
      position: absolute;
      bottom: 0.12rem;
      left: 0.6rem;
    }
    .price_show {
      color: red;
      font-size: 0.22rem;
      position: absolute;
      bottom: 0.1rem;
    }
    .cartbutton-wrapper {
      position: absolute;
      bottom: 0.1rem;
      right: 0.13rem;
      height: 0.22rem;
      line-height: 0.22rem;
    }
    .food-info {
      width: 2.4rem;
      height: 0.8rem;
      position: relative;
    }
  }
}
// 原cartbutton集成到index
.cartbutton-wrapper {
  color: red;
  span {
    width: 0.3rem;
    color: #747474;
    line-height: 0.15rem;
    text-align: center;
    font-size: 0.2rem;
  }
  i,
  span {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
