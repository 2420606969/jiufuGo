<template>
  <div class="amountdetail_box">
    <div class="shop_list">
      <div class="order_box" v-for="(item,index) in order_list" :key="index">
        <div class="order_info oH">
          <div class="left_info fl">
            <p>订单编码：{{item.order_id}}</p>
            <p style="color: #999;font-size: 0.16rem;">{{item.create_time}}</p>
          </div>
          <div class="right_info fr">
            <span style="color: red;margin-right: 0.2rem;">￥{{item.order_amt}}</span>
            <span style="text-decoration: line-through;color: #999">￥{{item.old_order_amt}}</span>
          </div>
        </div>
        <div class="good_list oH" v-for="(good,index) in item.goods_list" :key="index">
          <div class="good_left fl">
            <img :src="good.img_url" class="gd_img md" style="width: 0.6rem;height:0.8m;">
            <div class="price_box md">
              <p>{{good.goods_name}}</p>
              <p style="color: red">￥{{good.unit_price}}
                <span style="text-decoration: line-through;color: #999">￥{{good.old_goods_price}}</span>
              </p>
            </div>
          </div>
          <div class="good_right fr">
            <p style="line-height: 0.4rem">x{{good.unit}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      order_list: [] //订单详情记录
    };
  },
  created() {
    let data = {
      header: {
        open_id: localStorage.getItem("open_id"),
        store_serial: localStorage.getItem("store_serial"),
        trade_type: "memberOrderHistory"
      },
      body: {}
    };
    this.$postAjax("wx/general/interface", data).then(response => {
      console.log(response);
      if (response.header.ret_code == 200) {
        this.order_list = response.body.order_list;
      } else {
        this.$vux.toast.text(response.header.msg, "top");
      }
    });
  }
};
</script>
<style lang="less" scoped>
.amountdetail_box {
  width: 100%;
  .shop_list {
    padding: 0.1rem;
    .order_box {
      border-bottom: 1px solid #ccc;
      .order_info {
        padding: 0.1rem 0;
        border-bottom: 1px solid #f2f1f1;
      }
      .good_list {
        padding-bottom: 0.15rem;
      }
    }
  }
}
</style>
