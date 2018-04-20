<template>
  <div class="vip_box">
    <div class="bg_member">
      <img :src="vip_card_img" class="card_img">
      <div class="card_text">VIP会员</div>
      <div class="card_num">卡号：{{vip_card}}</div>
    </div>
    <div class="middle_info oH">
      <div class="integral fl">
        <p>积分</p>
        <p>{{vip_integral}}</p>
      </div>
      <div class="grade fr">
        <p>等级</p>
        <p>{{vip_level}}</p>
      </div>
    </div>
    <group>
      <cell :title="('会员特权')" is-link @click.native="memberInfo">
        <img slot="icon" src="../../static/images/member@2x.png" style="width: 0.2rem;height: 0.2rem;">
      </cell>
      <cell :title="('开门记录')" is-link @click.native="openDoorInfo">
        <img slot="icon" src="../../static/images/open@2x.png" style="width: 0.2rem;height: 0.2rem;">
      </cell>
      <cell :title="('订单详情')" is-link @click.native="goGoodsDetail">
        <img slot="icon" src="../../static/images/order@2x.png" style="width: 0.2rem;height: 0.2rem;">
      </cell>
      <cell :title="('优惠券')" is-link @click.native="vouchers">
        <img slot="icon" src="../../static/images/voucher@2x.png" style="width: 0.2rem;height: 0.2rem;">
      </cell>
      <cell :title="('在线客服')" :value="('18928492616')" is-link>
        <img slot="icon" src="../../static/images/kefu@2x.png" style="width: 0.2rem;height: 0.2rem;">
      </cell>
    </group>
  </div>
</template>
<script>
import { Cell, Group } from "vux";
export default {
  data() {
    return {
      vip_card_img: "", //VIP卡牌
      head_img_url: "", //微信头像
      nick_name: "", //微信昵称
      vip_card: "", //卡号
      vip_integral: "", //积分
      vip_level: "", //vip等级
      vip_privilege: "" //权限文案
    };
  },
  components: {
    Cell,
    Group
  },
  created() {
    let data = {
      header: {
        //  open_id: "onN431O8EYh4kJayczr8uoh4Z5g0",
        // store_serial: "cf838998-7a9e-4268-b187-2ebc563f67b1",
        open_id: localStorage.getItem("open_id"),
        store_serial: localStorage.getItem("store_serial"),
        trade_type: "memberCenter"
      },
      body: {}
    };
    this.$postAjax("/wx/general/interface", data).then(response => {
      console.log(response);
      if (response.header.ret_code == 200) {
        this.vip_card_img = response.body.vip_card_img;
        this.head_img_url = response.body.head_img_url;
        this.nick_name = response.body.nick_name;
        this.vip_card = response.body.vip_card;
        this.vip_integral = response.body.vip_integral;
        this.vip_level = response.body.vip_level;
        this.vip_privilege = response.body.vip_privilege;
      } else {
        this.$vux.toast.text(response.header.msg, "top");
      }
    });
  },
  methods: {
    //会员信息
    memberInfo() {
      this.$router.push({ name: "vipInfo" });
    },
    openDoorInfo() {
      this.$router.push({ name: "openRecode" });
    },
    goGoodsDetail() {
      this.$router.push({ name: "orderDetail" });
    },
    vouchers() {
      this.$router.push({ name: "vouchers" });
    }
  }
};
</script>
<style type="text/css">
.vux-label,
.weui-cell__hd img {
  display: inline-block;
  vertical-align: middle;
}

.vux-label {
  margin-left: 0.1rem;
}
</style>
<style lang="less" scoped>
.vip_box {
  width: 100%;
  .bg_member {
    padding: 0.2rem;
    position: relative;
    .card_img {
      width: 100%;
      height: 100%;
    }
    .card_text {
      font-size: 0.3rem;
      letter-spacing: 0.1rem;
      color: #fff;
      position: absolute;
      top: 1rem;
      left: 36%;
    }
    .card_num {
      font-size: 0.16rem;
      color: #ffff;
      position: absolute;
      left: 0.4rem;
      bottom: 0.3rem;
    }
  }
  .middle_info {
    padding: 0.2rem;
    border-bottom: 1px solid #ccc;
    .integral {
      width: 50%;
      text-align: center;
      border-right: 1px solid #999;
      box-sizing: border-box;
    }
    .grade {
      text-align: center;
      width: 50%;
    }
  }
}
</style>
