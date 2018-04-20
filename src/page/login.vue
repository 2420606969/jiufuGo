<template>
  <div class="content">
    <!-- <group>
      <x-input title="手机号" v-model="phone" :required=true :max=11 placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" :icon-type="iconType" @on-change="checkPhone" label-width="6em"></x-input>
      <x-input label-width="6em" title="图形验证码" :required=true :max=4 placeholder="请输入图形验证码" v-model="graphCode">
        <img slot="right" class="weui-vcode-img" :src="graphImg" style="height: 0.44rem;"></x-input>
      <x-input title="发送验证码" class="weui-vcode" label-width="6em" :required=true :max=4 placeholder="请输入验证码" v-model="code">
        <x-button slot="right" type="primary" mini @click.native="getVerifyCode" :disabled="start">
          <span v-text="codeTxt"></span>
        </x-button>
      </x-input>
      <x-input title="姓名" class="weui-vcode" label-width="6em" :required=true :max=10 placeholder="请输入姓名" v-model="name">
      </x-input>
    </group> -->
    <div class="phone">
      手机号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" placeholder="请输入手机号码" v-model="phone" @onchange="checkPhone">
    </div>
    <div class="graphCode">
      图形验证码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" placeholder="请输入图形验证码" v-model="graphCode">
      <img :src="graphImg" alt="" class="graphCodeImg">
    </div>
    <div class="code">
      发送验证码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" placeholder="请输入验证码" v-model="code">
      <!-- <span v-text="codeTxt"></span> -->
      <button slot="right" type="primary" mini @click="getVerifyCode" :disabled="start" class="click_code">
        <span v-text="codeTxt" class="click_codeTest"></span>
      </button>
    </div>
    <!-- <div class="name">
      姓名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" placeholder="请输入姓名" v-model="name">
    </div> -->
    <!-- <div class="store">
      门牌号/公司&nbsp;&nbsp;&nbsp;<input type="text" placeholder="请输入门牌号/公司" v-model="door_number">
    </div> -->
    <div class="r_btn">
      <x-button @click.native="register" type="primary" class="register">注册</x-button>
    </div>
    <!-- <div class="footer_info" v-if="footInfo">悟空便利版权所有</div> -->
    <div class="index-wrap banner-login" >
        <slide-show :slides="slides" :bannerType="bannerType"></slide-show>
    </div>
    
     <!--图片懒加载 -->
     <!-- <div v-for="(src,index) in slides"  :key="index" style="text-align:center;">
         <span style="font-size:20px;">Loading</span>
         <x-img :src="src.banner_img_url" :webp-src="`${src.banner_img_url}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body"></x-img>
    </div> -->

   </div>
</template>
<script type="text/javascript">
import slideShow from "@/components/slideShow";

import { XInput, Group, XButton, Cell } from "vux";
import { isSpecialPhone, URL, isIdCard, isName } from "../lib/util.js";
const nextTime = 60;
let timer;
export default {
  data() {
    return {
      iconType: "",
      codeTxt: "发送验证码",
      phone: "", //手机号码
      code: "", //验证码
      graphCode: "", //图形验证码
      graphImg: "",
      name: "", //姓名
      // cardCode: "", //身份证号码
      door_number: "", //门牌号
      start: false,
      footInfo: true, //解决底部信息随着输入框起来的问题
      slides: [
        {
          banner_img_url: require("@/assets/shanghai_2.jpg"),
          banner_jump_url:"", //广告跳转url
          banner_source:'1'


        },
        {
          banner_img_url: require("@/assets/banner_02.jpg"),
          banner_jump_url:"", //广告跳转url
           banner_source:'1'

        },
        {
          banner_img_url: require("@/assets/banner_01.png"),
          banner_jump_url:"",//广告跳转url
          banner_source:'1'

        },
        {
          banner_img_url: require("@/assets/banner_03.jpg"),
          banner_jump_url:"", //广告跳转url
          banner_source:'1'

        }
      ],
      bannerType:1
      
    };
  },
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    slideShow
   
  },
  computed: {
    isValid: function() {
      return this.iconType === "success" && this.code && this.pg_code;
    },
    disabled: function() {
      return this.iconType === "success";
    }
  },
  created() {
    //初始化banner数据
    let imgData = {
      header: {
        // open_id: "onN431BNnRvpUSXSAvJXHGFO3peE",
        // store_serial: "cf838998-7a9e-4268-b187-2ebc563f67b1",
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
      //防止后台没有banner;
      console.log(response.body.banner_list)
      if(response.body.banner_list){
        this.slides = response.body.banner_list;       
      }
    });
    //调用图形验证码接口
    let data = {
      header: {
        open_id: localStorage.getItem("open_id"),
        store_serial: localStorage.getItem("store_serial"),
        trade_type: "graphCode"
      },
      body: {}
    };
    this.$postAjax("wx/general/interface", data).then(response => {
      this.graphImg = "data:image/jpeg;base64," + response.body.img_base64;
    });
  },
  mounted() {
    // 定位遇上键盘飘窗解决
    let self = this;
       console.log(self)
    let originalHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    console.info("原始窗口的高度"+originalHeight);
    window.onresize = function() {
      //软键盘弹起与隐藏  都会引起窗口的高度发生变化
      let resizeHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      console.info("软键盘弹起后窗口的高度"+resizeHeight);
      console.log(this)
      if (resizeHeight * 1 < originalHeight * 1) {
        //resizeHeight<originalHeight证明窗口被挤压了
        console.log("被积压了")
        console.log(self.footInfo )
        self.footInfo = false;
      } else {
        self.footInfo = true;
      }
    };
  },
  methods: {
    //图片懒加载
    // success (src, ele) {
    //   console.log('success load', src)
    //   const span = ele.parentNode.querySelector('span')
    //   ele.parentNode.removeChild(span)
    // },
    // error (src, ele, msg) {
    //   console.log('error load', msg, src)
    //   const span = ele.parentNode.querySelector('span')
    //   span.innerText = '加载失败... ...'
    // },

    checkPhone(val) {
      if (!isSpecialPhone(val)) {
        this.start = false;
      } else {
        this.start = true;
      }
      this.iconType = isSpecialPhone(val) ? "success" : "error";
    },
    //获取短信验证码
    getVerifyCode() {
      if (this.start) {
        return;
      }
      let time = nextTime;
      this.disabled = true;
      this.start = true;
      this.codeTxt = `${nextTime}s后重试`;
      timer = setInterval(() => {
        time -= 1;
        if (time > 0) {
          this.codeTxt = `${time}s后重试`;
        } else {
          time = nextTime;
          clearInterval(timer);
          this.disabled = false;
          this.start = false;
          this.codeTxt = "发送验证码";
        }
      }, 1000);
      //调用短信接口
      let data = {
        header: {
          open_id: localStorage.getItem("open_id"),
          store_serial: localStorage.getItem("store_serial"),
          trade_type: "smsCode"
        },
        body: {
          phone: this.phone,
          img_code: this.graphCode
        }
      };
      this.$postAjax("wx/general/interface", data).then(response => {
        if (response.header.ret_code == 200) {
          this.$vux.toast.text("短信验证码发送成功", "top");
        } else {
          time = nextTime;
          clearInterval(timer);
          this.disabled = false;
          this.start = false;
          this.codeTxt = "发送验证码";
          this.$vux.toast.text("图形验证码输入有误", "top");
          this.graphImg = "data:image/jpeg;base64," + response.body.img_base64;
        }
      });
    },
    //登入注册
    register() {
      if (this.phone == "") {
        this.$vux.toast.text("手机号码不能为空", "top");
      } else if (!isSpecialPhone(this.phone)) {
        this.$vux.toast.text("请输入正确的手机号", "top");
      } else if (this.graphCode == "") {
        this.$vux.toast.text("请输入图形验证码", "top");
      } else if (this.name != "" && !isName(this.name)) {
        this.$vux.toast.text("姓名只能由中文或者英文", "top");
      } else {
        //调用注册接口
        let data = {
          header: {
            open_id: localStorage.getItem("open_id"),
            store_serial: localStorage.getItem("store_serial"),
            trade_type: "regist"
          },
          body: {
            phone: this.phone,
            smscode: this.code,
            // custname: this.name,
            cardid: this.cardCode
            // door_number: this.door_number
          }
        };
        this.$postAjax("wx/general/interface", data).then(response => {
          if (response.header.ret_code == 200) {
            if (response.body.is_open_door == "Y") {
              //显示开门按钮
              this.$router.replace({ name: "waitcheck" });
            } else {
              this.$router.replace({ name: "index" });
            }
          } else {
            this.$vux.toast.text(response.header.msg, "top");
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  .phone {
    margin-top: 0.2rem;
  }
  .phone,
  .graphCode,
  .code,
  .name,
  .store {
    position: relative;
    font-size: 0.16rem;
    height: 0.5rem;
    line-height: 0.5rem;
    border-top: 1px solid #afafad;
    padding: 0 0.1rem;
    input {
      padding: 0.01rem 0rem 0.01rem 0rem;
      width: 1.5rem;
      height: 0.35rem;
    }
  }
  .store,
  .code {
    border-bottom: 1px solid #afafad;
  }
  .graphCodeImg {
    vertical-align: middle;
  }
  .code {
    position: relative;
    .click_code {
      position: absolute;
      right: 0rem;
      background-color: #ff9934;
      height: 0.3rem;
      line-height: 0.3rem;
      width: 1.2rem;
      border-radius: 0.05rem;
      display: inline-block;
      margin-right: 0.1rem;
      margin-top: 0.1rem;
    }
    .click_codeTest {
      color: #fff;
    }
  }

  .r_btn {
    padding: 0.2rem 0.2rem;
    margin-top: 0.5rem;
    .register {
      background-color: #ff9934;
      height: 0.4rem;
    }
  }

  .footer_info {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.2rem;
    text-align: center;
    color: #666;
    font-size: 0.16rem;
  }
}

.login-banner {
  width: 100%;
  height: 160px;
  line-height: 160px;
  border: 1px solid red;
  position: absolute;
  bottom: 0;
  text-align: center;
}
.index-wrap {
  overflow: hidden;
  // position:absolute;
  left: 0;
  // bottom: 0;
}
.banner-login {
  margin-top: 1.6rem;
}


.ximg-demo {
  width: 100%;
  height: auto;
  background-color: #ccc!important;
}
.ximg-error {
  background-color: #ccc !important;
}
.ximg-error:after {
  content: '加载失败';
  color: red;
}
</style>
