<template>
  <div class="cartbutton-wrapper">
    <i @click.stop="reduce()" class="icon iconfont icon-jianhao1" style="margin-bottom: -0.04rem;
    font-size: 0.25rem;"></i>
    <span>{{food.count}}</span>
    <i class="icon iconfont icon-iconfontxinzeng" @click.stop="add($event)" style="font-size:0.24rem;"></i>
  </div>
</template>
<script>
import { mapActions} from 'vuex'
export default {
  data () {
    return {
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  computed: {
  },
  created () {
    console.log('----改变this.food222222222222222')
  },
  updated () {
    console.log(this.food)
    console.log('---cartbuttonscan-------update更新一次,查看this.food')
  },
  methods: {
    ...mapActions([
      "upDateSelectedFoods",
      "upDateGoodsType",
      "dropGoodsType"
    ]),
    add(event) {
      // var tempFood = this.food
      // if (tempFood.count) {
      //   // tempFood.count ++
      //   // tempFood.goods_num ++
      // } else {
      //   // tempFood.count = 1
      //   // tempFood.goods_num = 1
      // }
      // this.upDateGoodsType(tempFood)
      // if (!this.food.count) {
      //   this.$set(this.food, 'count', 1)
      //   this.$set(this.food, 'goods_num', 1)
      // } else {
      //   if (this.food.count >= 99) {
      //     this.$vux.toast.text('该商品最多只允许购买99件！', 'top')
      //   }
      // }
      // return
      var tempFood = this.food
      this.$emit('addFood', tempFood)
      this.$emit('ball-event', event.target)
    },
    reduce() {
      if (this.food.count == 1) {
        return
      }
      let tempFood = this.food
      tempFood.count --
      tempFood.goods_num ++
    }
  }
}

</script>
<style lang="less" scoped>
.cartbutton-wrapper {
  color: red;
  span {
    width: .3rem;
    color: #747474;
    line-height: .15rem;
    text-align: center;
    font-size: .2rem;
  }
  i,
  span {
    display: inline-block;
    vertical-align: middle;
  }
}

</style>
