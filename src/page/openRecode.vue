<template>
  <div class="open_box">
    <ul>
      <li v-for="(item,index) in open_list" :key="index">
        <div class="time_box">
          <p>时间：{{item.create_time}}</p>
          <p>网点：{{item.store_name}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open_list: [] //开门记录
    };
  },
  created() {
    let data = {
      header: {
        open_id: localStorage.getItem("open_id"),
        store_serial: localStorage.getItem("store_serial"),
        trade_type: "memberOpenHistory"
      },
      body: {}
    };
    this.$postAjax("wx/general/interface", data).then(response => {
      console.log(response);
      if (response.header.ret_code == 200) {
        this.open_list = response.body.open_list;
      } else {
        this.$vux.toast.text(response.header.msg, "top");
      }
    });
  }
};
</script>
<style lang="less" scoped>
.open_box {
  width: 100%;
  ul {
    li {
      border-bottom: 1px solid #333;
      height: 1.2rem;
      position: relative;
      .time_box {
        height: 0.6rem;
        line-height: 0.3rem;
        font-size: 0.18rem;
        color: #666;
        position: absolute;
        top: 50%;
        left: 0.2rem;
        margin-top: -0.3rem;
      }
    }
  }
}
</style>
