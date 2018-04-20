<template>
  <div class="content">
    <button class="round" @click="openDoor" id="btn">
      <span v-show="show">{{time_text}}</span>
      <span v-show="!show" class="time">{{timeTemp}} s</span>
    </button>
    <div class="tips">温馨提示:开门后请随手关门！</div>
    <audio ref="musc" id="audio" controls="controls" autoplay="autoplay" preload="auto" style="display: none" v-if="audioAuto">
      <source src="../../static/audio/openDoor3.mp3" type="audio/mpeg">
    </audio>
    <div class="footer_info">悟空便利版权所有</div>
  </div>
</template>
<script type="text/javascript">
const time_start = 3;
export default {
  data() {
    return {
      show: true,
      timeTemp: "",
      timer: null,
      time_text: "开门",
      audioAuto: false
    };
  },
  methods: {
    openDoor() {
      let self = this;
      let data = {
        header: {
          open_id: localStorage.getItem("open_id"),
          store_serial: localStorage.getItem("store_serial"),
          trade_type: "openDoor"
        },
        body: {}
      };
      this.$postAjax( "/wx/general/interface", data).then(
        response => {
          if (response.header.ret_code == 200 || response.body.is_rge == "Y") {
            if (!this.timer) {
              this.timeTemp = time_start;
              this.show = false;
              this.timer = setInterval(() => {
                if (this.timeTemp > 0 && this.timeTemp <= time_start) {
                  this.timeTemp--;
                  document.getElementById("btn").setAttribute("disabled", true);
                } else {
                  this.show = true;
                  clearInterval(this.timer);
                  this.time_text = "0s";
                  this.timer = null;
                }
              }, 1000);
            }
            this.$vux.toast.text("门已打开,请随手关门", "top");
            //安卓播放
            this.audioAuto = true;
            setTimeout(function() {
              self.$router.replace({ name: "closedoor"});
              // self.$router.replace({ name: "closedoor",query:{nickName:}});
            }, 3000);
            return false;
          } else {
            this.$vux.toast.text(
              "开门异常,请重试！(ErrorCode:" + response.header.ret_code + ")",
              "top"
            );
            document.getElementById("btn").setAttribute("disabled", true);
          }
        }
      );
    }
  },
  created() {
    //this.$router.replace({ name: "opendoor" })
  }
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  .round {
    color: #fff;
    width: 2.6rem;
    height: 2.6rem;
    line-height: 2.6rem;
    text-align: center;
    background: #f93;
    border-radius: 50%;
    font-size: 0.6rem;
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
  .tips {
    text-align: center;
    font-size: 0.26rem;
    margin-top: 0.48rem;
    color: #666;
  }
}
</style>
