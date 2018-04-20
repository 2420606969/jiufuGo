<template>
  <div class="cartbutton-wrapper">
    <i @click.stop="reduce()" v-show="deepFood.count>0" class="icon iconfont icon-jianhao1" style="margin-bottom: -0.04rem;
    font-size: 0.25rem;"></i>
    <span v-show="deepFood.count>0">{{deepFood.count}}</span>
    <i class="icon iconfont icon-iconfontxinzeng" @click.stop="add($event)" style="font-size:0.24rem;"></i>
  </div>
</template>
<script>
import { mapActions} from 'vuex'
export default {
  data () {
    return {
      deepFood: Object.assign({},this.food)
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  watch: {
    food(value){
      this.deepFood = Object.assign({},value)
    }
  },
  computed: {
  },
  created () {
    this.food.watch()
  },
  updated () {
  },
  methods: {
    ...mapActions([
      "upDateSelectedFoods",
      "dropSelectedFoods",
      "upDateGoodsType",
      "dropGoodsType"
      
    ]),
    add(event) {
      if (this.deepFood.count >= 99) {
        this.$vux.toast.text('该商品最多只允许购买99件！', 'top')
        return
      }
      this.deepFood.count ++
      this.deepFood.goods_num ++
      this.upDateGoodsType(this.deepFood)
      this.upDateSelectedFoods(this.deepFood)
      this.$emit('ball-event', event.target)
    },
    reduce() {
      this.dropSelectedFoods(this.deepFood)
      this.dropGoodsType(this.deepFood)
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
