<template>
  <div @click="scan_click" class="scan_result_null">
    <div class="result_null_message">
      商品条形码不存在,点击任意位置返回
    </div>
  </div>
</template>
<style lang="less" scoped>
.scan_result_null {
  position: absolute;
  z-index: 90;
  height: 2.4rem;
  width: 2.82rem;
  left: 50%;
  margin-left: -1.41rem;
  top: 1.28rem;
  background-color: #ffffff;
  .result_null_message {
    position: absolute;
    width: 1.9rem;
    height: .42rem;
    font-size: .18rem;
    background-color: #d7d7d7;
    text-align: center;
    line-height: .42rem;
    left: 50%;
    margin-left: -0.95rem;
    top: 50%;
    margin-top: -0.21rem;
  }
}
</style>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    scan_click () {
    },
    sure () {
      
    },
    canbel () {
    }
  },
  methods: {
    
  }
}
</script>