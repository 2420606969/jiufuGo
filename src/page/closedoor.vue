<template>
  <div class="closedoor_content">
    <!-- <swiper class="swiper"  auto :aspect-ratio="300/800" @on-index-change="onSwiperItemIndexChange" v-model="swiperItemIndex">
            <swiper-item class="swiper-demo-img" show-dots=false v-for="(item, index) in demo04_list" :key="index">
                <img :src="item">
            </swiper-item>
        </swiper> -->
    <!-- <div class="img">
      <img src="http://jfgo.oss-cn-beijing.aliyuncs.com/banner/banner_01.png" alt="">
    </div> -->
    <div class="index-wrap" >
        <slide-show :slides="slides" :bannerType="bannerType" ></slide-show>
    </div>

    <div class="person_info">
      <div class="person_img">
        <img :src="head_img_url" alt="">
      </div>
      <div class="person_nickname">{{nick_name}}</div>
    </div>
    <div class="button">
      <span class="leavedoor" @click="leavedoor">开门</span>
      <span class="goshoping" @click="goshoping">购物</span>
    </div>
    <div class="footer_info">悟空便利版权所有</div>
  </div>
</template>
<script>
import slideShow from "@/components/slideShow";
// import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from "vux";
// const imgList = [
//   "http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff",
//   "http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff",
//   "http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff"
// ];
export default {
  // components: {
  //   Swiper,
  //   SwiperItem
  // },
  data() {
    return {
      // demo04_list: imgList
      nick_name: "",
      head_img_url: "",
      slides: [
        {
          banner_img_url: require("@/assets/shanghai_2.jpg"),
          banner_source:'1',
          banner_jump_url: "" //广告跳转url
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
          banner_jump_url:"" ,//广告跳转url
          banner_source:'1'

        }
      ],
      bannerType: 3
    };
  },
  components: {
    slideShow
  },
  created() {
    this.getbanner();
    this.getclosedoor();
  },
  methods: {
    // onSwiperItemIndexChange(index) {
    //   console.log("demo item change", index);
    // },
    //banner初始化
    getbanner() {
      let imgData = {
        header: {
          open_id: localStorage.getItem("open_id"),
          store_serial: localStorage.getItem("store_serial"),
          trade_type: "storeBannerLoad",
          ip: ""
        },
        body: {
          banner_type: this.bannerType
        }
      };
      this.$postAjax("/wx/general/interface", imgData).then(response => {
        if (response.body.banner_list) {
          this.slides = response.body.banner_list;
        }
      });
    },
    //初始化
    getclosedoor() {
      let data = {
        header: {
          open_id: localStorage.getItem("open_id"),
          store_serial: localStorage.getItem("store_serial"),
          trade_type: "wechatNameImg"
        },
        body: {}
      };
      this.$postAjax("wx/general/interface", data).then(response => {
        if (response.header.ret_code == 200) {
          console.log(response);
          this.nick_name = response.body.nick_name;
          this.head_img_url = response.body.head_img_url;
        } else {
        }
      });
    },
    //点击开门
    leavedoor() {
      this.$vux.toast.text("门已打开,请携带好您的私人物品,随手关门", "top");
      setTimeout(() => {
        this.$router.push({ name: "opendoor" });
      }, 3000);
    },
    //点击购物
    goshoping() {
      this.$router.push({ name: "index" });
    }
  }
};
</script>
<style lang="less" scoped>
.closedoor_content {
  position: relative;
  text-align: center;
  // .swiper {
  //   width: 100%;
  //   // height: 2rem;
  //   background-color: green;
  //   .swiper-demo-img {
  //     width: 100%;
  //     height: 2rem;
  //     img {
  //       width: 100%;
  //     }
  //   }
  // }
  .img {
    width: 100%;
    height: 1.7rem;
    img {
      width: 100%;
    }
  }
  .person_info {
    margin-top: 0.1rem;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .person_img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .person_nickname {
      margin-top: 0.1rem;
      font-size: 0.1rem;
    }
  }
  .button {
    margin-top: 0.5rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    .leavedoor,
    .goshoping {
      display: inline-block;
      width: 1.2rem;
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      //   font-weight: bold;
      font-size: 0.4rem;
      background-color: #ff9933;
    }
  }
  .footer_info {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1.5rem;
    text-align: center;
    color: #666;
    font-size: 0.16rem;
  }
}
.slide-img > a > img {
  left: 0 !important;
}
</style>
