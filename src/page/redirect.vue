<template>
  <div class="content_box">
    <!--  <p>hello王者荣耀主页</p> -->
  </div>
</template>
<script type="text/javascript">
import { URL } from "../lib/util.js";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {
    //1.截取用户open_id
    let openid = URL.get("open_id");
    localStorage.setItem("open_id", openid);
    //1.截取门店store_serial
    let store_serial = URL.get("store_serial");
    localStorage.setItem("store_serial", store_serial);
    //判断是否注册
    let isRge = URL.get("is_rge");
    //判断是否隐藏开门按钮
    let isOpenDoor = URL.get("is_open_door");

    let data = {
      header: {
        open_id: openid,
        store_serial: store_serial,
        trade_type: "whetherMaintain"
      },
      body: {}
    };

    this.$postAjax("/wx/general/interface", data).then(response => {
      if (response.body.is_maintain != 1) {
        this.$router.replace({ name: "failPage" });
        return;
      } else {
        if (isOpenDoor == "Y") {
          if (isRge == "Y") {
            this.$router.replace({ name: "opendoor" });
          } else {
            this.$router.replace({ name: "login" });
          }
        } else {
          //会隐藏开门按钮
          if (isRge == "Y") {
            this.$router.replace({ name: "opendoor" });
          } else {
            this.$router.replace({ name: "login" });
          }
        }
      }
    });
  }
};
</script>
<style type="text/css" scoped>

</style>
