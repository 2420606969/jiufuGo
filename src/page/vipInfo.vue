<template>
  <div class="vip_box">
    <div class="header_info">
      <h1>VIP会员</h1>
      <div class="left_info">
        <img :src="head_img_url" class="header_img">
        <p class="we_name">{{nick_name}}</p>
      </div>
    </div>
    <div class="grade">
      <div class="grade_text">
        <div class="grade_round">{{vip_level}}</div>
        <div class="grade_info">
          <p>{{vip_level_desc}}</p>
          <p>{{vip_privilege}}</p>
        </div>
      </div>
    </div>
    <div class="tip">
      <h3>会员规则：</h3>
      <p>{{vip_privilege_desc}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vip_card_img: "", //VIP卡牌
      head_img_url: "", //微信头像
      nick_name: "", //微信昵称
      // vip_card:'',   //卡号
      // vip_integral:'', //积分
      vip_level: "", //vip等级
      vip_level_desc: "", //vip等级名称
      vip_privilege: "", //权限文案
      vip_privilege_desc: "",

    };
  },
  created() {
    let data = {
      header: {
        open_id: localStorage.getItem("open_id"),
        store_serial: localStorage.getItem("store_serial"),
        trade_type: "memberCenter"
      },
      body: {}
    };
    this.$postAjax( "/wx/general/interface", data).then(response => {
      if (response.header.ret_code == 200) {
        console.log(response);
        this.vip_card_img = response.body.vip_card_img;
        this.head_img_url = response.body.head_img_url;
        this.nick_name = response.body.nick_name;
        // this.vip_card = response.body.vip_card;
        // this.vip_integral = response.body.vip_integral;
        this.vip_level = response.body.vip_level;
        this.vip_privilege = response.body.vip_privilege;
        this.vip_level_desc=response.body.vip_level_desc;
        this.vip_privilege=response.body.vip_privilege
        this.vip_privilege_desc=response.body.vip_privilege_desc
      } else {
        this.$vux.toast.text(response.header.msg, "top");
      }
    });
  }
};
</script>
<style lang="less" scoped>
.vip_box {
  width: 100%;
  .header_info {
    height: 1.2rem;
    line-height: 1.2rem;
    background: linear-gradient(
      180deg,
      rgba(153, 204, 102, 1) 0%,
      rgba(153, 204, 102, 1) 0%,
      rgba(228, 228, 228, 1) 100%,
      rgba(228, 228, 228, 1) 100%
    );
    position: relative;
    h1 {
      text-align: center;
      color: #fff;
    }
    .left_info {
      position: absolute;
      top: -0.2rem;
      left: 0.2rem;
      .header_img,
      .we_name {
        display: inline-block;
        vertical-align: middle;
      }
      .header_img {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
      }
    }
  }
  .grade {
    height: 1.2rem;
    border-bottom: 1px solid #ccc;
    .grade_text {
      padding-left: 0.2rem;
      padding-top: 0.4rem;
      .grade_round,
      .grade_info {
        display: inline-block;
        vertical-align: middle;
      }
      .grade_round {
        width: 0.4rem;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        border-radius: 50%;
        background: #ff9933;
        color: #fff;
      }
      .grade_info {
        font-size: 0.18rem;
        margin-left: 0.1rem;
      }
    }
  }
  .tip {
    padding: 0.2rem;
    p {
      padding-top: 0.1rem;
      color: #666;
    }
  }
}
</style>
