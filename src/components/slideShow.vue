<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[nowIndex].href">
        <transition name="slide-trans">
          <img class="slide-imgurl" v-if="isShow" :src="slides[nowIndex].banner_img_url"  @click='dateImg'>
        </transition>
        <transition name="slide-trans-old">
          <img class="slide-imgurl" v-if="!isShow" :src="slides[nowIndex].banner_img_url"  @click='dateImg' >
        </transition>
      </a>
    </div>
    <!-- <h5>{{ slides[nowIndex].title }}</h5> -->
    <ul class="slide-pages">
      <!-- <li @click="goto(prevIndex)">&lt;</li> -->
      <li class=""  v-for="(item, index) in slides" @click="goto(index)" :key="index" >
        <a :class="{on: index === nowIndex}" class="IndexBoder"></a>
      </li>
      <!-- <li @click="goto(nextIndex)">&gt;</li> -->
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: []
    },
    inv: {
      type: Number,
      default: 2000
    },
    bannerType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      nowIndex: 0,
      isShow: true,
    };
  },
  computed: {
    prevIndex() {
      if (this.nowIndex === 0) {
        return this.slides.length - 1;
      } else {
        return this.nowIndex - 1;
      }
    },
    nextIndex() {
      if (this.nowIndex === this.slides.length - 1) {
        return 0;
      } else {
        return this.nowIndex + 1;
      }
    }
  },
  created() {},
  methods: {
    dateImg() {
      let imgData = {
        header: {
          open_id: localStorage.getItem("open_id"),
          store_serial: localStorage.getItem("store_serial"),
          trade_type: "countStoreBanner",
          ip: ""
        },
        body: {
          banner_type: 0,
          banner_source:'1'
        }
      };
      // console.log(this.count_url)
      this.$postAjax("wx/general/interface", imgData).then(response => {
        if (this.slides[this.nowIndex]["banner_jump_url"] != "") {
          window.location.href = this.slides[this.nowIndex]["banner_jump_url"];
          // this.slides[this.nowIndex]['banner_jump_url'] ="javascript:void(0)";
        }
      });
    },
   
    goto(index) {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
        this.nowIndex = index;
      }, 10);
    },
    runInv() {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex);
      }, this.inv);
    },
    clearInv() {
      clearInterval(this.invId);
    }
  },
  mounted() {
    this.runInv();
  }
}
</script>

<style lang="less" scoped>

@bannerWidth:100%;
@bannerHeight:1.5rem;
.slide-trans-enter-active {
  transition: all 0.5s;
}
.slide-trans-enter {
  transform: translateX(@bannerWidth);
}
.slide-trans-old-leave-active {
  transition: all 0.5s;
  transform: translateX(-@bannerWidth);
}
.slide-show {
  position: relative;
  /* margin-top: 180px; */
  width: @bannerWidth;
  height: @bannerHeight;
  overflow: hidden;
  border: 1px solid #ccc;
}
.slide-show h5 {
  position: absolute;
  width: 100%;
  color: #fff;
  background: #000;
  opacity: 0;
  bottom: 0;
  margin: 0;
  height: 32px;
  line-height: 32px;
  padding-left: 15px;
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
}
.slide-pages {
  width:120px;
  position: absolute;
  bottom: 4px;
  left: 35%;
  /* margin-bottom: 15px; */
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  // cursor: pointer;
  color: #000;
  font-size: 12px;
}
.slide-pages li .on {
  display: block;
  width: 8px;
  height:8px;
  line-height: 8px;
  text-align: center;
  background-color: #ff9934;
  border-radius: 50%;
  color: hsl(320, 96%, 48%);
  /* text-decoration: underline; */
}
.slide-imgurl {
  width: 400px;
}

.IndexBoder {
  display: block;
  width: 8px;
  height:8px;
  line-height: 8px;
  text-align: center;
  background-color: #ccc;
  border-radius: 50%;
}
</style>