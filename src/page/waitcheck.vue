<template>
    <div class="check_content">
        <div class="wait">
            <div class="person">身份信息已提交,店主确认中</div>
            <div class="waitfor">请稍等!</div>
        </div>
    </div>
</template>
<script>
export default {
  data(){
    return {
      openTimer:"",
    }
  },
  created() {
       let data = {
          header: {
            open_id: localStorage.getItem("open_id"),
            store_serial: localStorage.getItem("store_serial"),
            trade_type: "approvalResult"
          },
          body: {}
        };
        this.$postAjax( "/wx/general/interface", data).then(
          response => {
            if (response.header.ret_code == 200) {
              if (response.body.apply_result == "2") {
                this.$router.push({ name: "opendoor" });
                clearInterval(this.openTimer);
              }
            } else {

            }
          }
        );
    this.rouerGo();
  },
  methods: {
    rouerGo() {
      this.openTimer=setInterval(() => {
        let data = {
          header: {
            open_id: localStorage.getItem("open_id"),
            store_serial: localStorage.getItem("store_serial"),
            trade_type: "approvalResult"
          },
          body: {}
        };
        this.$postAjax( "/wx/general/interface", data).then(
          response => {
            if (response.header.ret_code == 200) {
              if (response.body.apply_result == "2") {
                this.$router.push({ name: "opendoor" });
                clearInterval(this.openTimer);
              }
            } else {

            }
          }
        );
      }, 3000);
    }
  }
};
</script>
<style lang="less" scoped>
.check_content {
  .wait {
    margin-top: 1rem;
    .person,
    .waitfor {
      text-align: center;
      font-size: 0.2rem;
      margin-bottom: 0.1rem;
    }
  }
}
</style>

