<template>
  <div class="voucher">
  
     <div class=" voucher-single"  v-show="!(award_list.length>0)">
         <div class="voucher-logo">
             <div class="empty-logo"><img src="../../static/images/logo.png" alt=""></div>
             <p>你好,暂无优惠券</p>
         </div>
     </div>
    <div class="voucher-border voucher-single" v-for="(item,index) in award_list" :key="index" v-show="award_list.length>0">
      <div class="voucher-title">
        <p>{{item.award_name}}</p>
      </div>
      <div class="voucher-money">
        <span class="vou-symbol">￥</span>
        <span class="vou-amount">{{item.award_amt}}</span>
        <span class="vou-full">{{item.award_rule_desc}}</span>
      </div>
      <div class="voucher-date">
        <span>有效期:{{item.expiry_time}}</span>
        <span class="vou-status" v-show="redstatus">{{title}}</span>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      award_list: [],
      title: "未使用", //判断状态
      redstatus: true
    };
  },
  created() {
    let redPacket = {
      header: {
        open_id: "onN431O8EYh4kJayczr8uoh4Z5g0",
        store_serial: "cf838998-7a9e-4268-b187-2ebc563f67b1",
        // open_id: localStorage.getItem("open_id"),
        // store_serial: localStorage.getItem("store_serial"),
        trade_type: "redPacketQuery",
        ip: ""
      },
      body: {}
    };
    this.$postAjax("/wx/general/interface", redPacket).then(response => {
      console.log(response.body);
      this.award_list = response.body.award_list;
      //0未使用,1已使用,2已过期
      //for (let i = 0; i <this.award_list.length; i++) {
      //if (this.award_list[i].award_status=="0") {
      //this.title="未使用"
      //}else if(this.award_list[i].award_status=="1"){
      // this.redBol = true;
      //this.title="已使用"
      // }else{
      //   this.title="已过期"
      // }
      //}
    });
  }
};
</script>


<style lang="less" scoped>
.voucher {
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  padding: 0 0.2rem 0 0.15rem;
}
.voucher-border {
  width: 90%;
  // width:3.3rem;
  height: 125px;
  margin-top: 0.3rem;
  border-radius: 2%;
  border-left: 5px solid #f85f42;
  border-top: 1px solid #ccc;
  border-right: 5px solid #ccc;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
}
.voucher-title {
  width: 100%;
  height: 30px;
  font-size: 0.2rem;
  padding: 0.1rem 0 0 0.2rem;
  p {
    width: 80%;
  }
}
.voucher-money {
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-left: 0.2rem;
  // background-color:red;
  .vou-symbol {
    font-size: 0.2rem;
    color: #f85f42;
  }
  .vou-amount {
    font-size: 0.5rem;
    color: #f85f42;
  }
  .vou-full {
    width: 120px;
    height: 20px;
    line-height: 20px;
    background-color: #f85f42;
    display: inline-block;
    border-radius: 15px;
    color: #fff;
    font-size: 10px;
    text-align: center;
    // padding-left:.1rem;
  }
}
.voucher-date {
  margin-left: 0.2rem;
  color: #c0c0c0;
}
.voucher-logo {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: absolute;
  top: 30%;
  left: 30%;
  p {
    padding-top: 10px;
    margin-left: 5px;
  }
}
.empty-logo {
  width: 120px;
  height: 110px;
  line-height: 110px;
  text-align: center;

  img {
    width: 100%;
    height: 100%;
  }
}
.vou-status {
  display: inline-block;
  width: 50px;
  height: 16px;
  line-height: 16px;
  background-color: #eea394;
  color: #fff;
  border-radius: 12px;
  text-align: center;
  font-size: 10px;
}
</style>
