import Vue from 'vue'
import Vuex from 'vuex'

const UPALLDATE = 'UPALLDATE'                             // 更新所有数据
const UPDATEGOODSTYPE = 'UPDATEGOODSTYPE'                 // 添加所有商品和分类数据
const DROPGOODSTYPE = 'DROPGOODSTYPE'                     // 删除所有商品和分类数据
const UPDATESELECTEDFOODS = 'UPDATESELECTEDFOODS'         // 添加购物车
const DROPSELECTEDFOODS = 'DROPSELECTEDFOODS'             // 删除购物车
const UPDATEOPENSHADOW = 'UPDATEOPENSHADOW'               // 更新遮罩层状态
const UPDATEISSHOW = 'UPDATEISSHOW'                       // 更新购物车商品列表是否显示
const UPDATEISSCANSHOW = 'UPDATEISSCANSHOW'               // 更新扫描结果页是否隐藏
const UPDATESCANNULLISSHOW = 'UPDATESCANNULLISSHOW'       // 更新扫描结果页是否隐藏
const UPDATEISOPENACTIVITY = 'UPDATEISOPENACTIVITY'       // 更新是否开启活动

const UPDATEYHPRICE = 'UPDATEYHPRICE'       // 更新是否开启活动
const UPDATETOTALPRICE = 'UPDATETOTALPRICE'       // 更新是否开启活动
const UPDATEACTIVITYMSG = 'UPDATEACTIVITYMSG'       // 更新是否开启活动

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    selectedFoods: [],          // 购物车商品
    goods_type: [],             // 全部商品和分类
    openShadow: false,          // 遮罩层状态
    isShow: false,              // 购物车商品列表是否显示
    isScanShow: false,          // 扫描结果页是否显示
    isOpenActivity:false,       //判断是否开启活动
    totalprice: "0.00", //原价
    yhprice: "0.00", //优惠价
    activityMsg:""
  },
  getters: {
    // 获取原价
    getTotalprice (state) {
      return state.totalprice
    },
    //获取优惠价
    getYhprice (state) {
      return state.yhprice
    },
    getActivityMsg (state) {
      return state.activityMsg
    },
    // 获取购物车数据
    getSelectedFoods (state) {
      // console.log("////"+state);
      // console.log(state)
      return state.selectedFoods
    },
    // 获取所有商品和分类数据
    getGoodsType (state) {
      return state.goods_type
    },
    // 获取整个vuex数据
    getAllDate (state) {
      return state
    },
    // 获取遮罩层状态
    getOpenShadow (state) {
      return state.openShadow
    },
    // 获取购物车内商品列表是否展示状态
    getIsShow (state) {
      return state.isShow
    },
    // 获取扫描结果页是否隐藏
    getIsScanShow (state) {
      return state.isScanShow
    },
    //获取是否开启活动
    getisOpenActivity (state) {
      return state.isOpenActivity
    }
  },
  mutations: {
   [UPDATEYHPRICE] (state, obj) {
    state.yhprice = obj
    // console.log(state.yhprice)
   },
   [UPDATETOTALPRICE] (state, obj) {
    state.totalprice = obj
    // console.log(state.totalprice)
   },
   [UPDATEACTIVITYMSG](state, obj) {
    state.activityMsg = obj
    console.log(state.activityMsg)
  },
    // 更新所有数据
    [UPALLDATE] (state, obj) {
      // console.log("更新所有数据")
      // console.log(state)
      // console.log(obj)
      state.goods_type = obj
    },
    // upDateSelectedFoods 加入购物车
    [UPDATESELECTEDFOODS] (state, obj) {
      // console.log("加入购物车")
      // console.log(state)
      // console.log(obj)
      for (let i = 0; i < state.selectedFoods.length; i++) {
        if (state.selectedFoods[i].goods_id == obj.goods_id) {
          if (obj.flag) {
            state.selectedFoods[i].goods_num += obj.count
            state.selectedFoods[i].count += obj.goods_num  
            return
          } else {
            state.selectedFoods[i].goods_num ++
            state.selectedFoods[i].count ++
          }
          return
        }
      }
      if (obj.flag) {
        let tempObj = Object.assign({},obj,{flag: false})
        state.selectedFoods.push(tempObj)
        return
      }
      obj.goods_num = 1
      obj.count = 1
      state.selectedFoods.push(obj)
      return
    },
    //dropSelectedFoods 删除购物车
    [DROPSELECTEDFOODS] (state, obj) {
      // console.log("删除购物车")
      // console.log(state)
      // console.log(obj)
      for (let i = state.selectedFoods.length-1; i >= 0; i--) {
        if (obj.goods_id == state.selectedFoods[i].goods_id) {
          state.selectedFoods[i].count --
          state.selectedFoods[i].goods_num --
          if (state.selectedFoods[i].count == 0){
            state.selectedFoods.splice(i,1)
            if (state.selectedFoods.length == 0) {
              state.openShadow = false
              state.isShow = false
            }
            return
          }
        }
      }
    },
    // 更新遮罩层状态
    [UPDATEOPENSHADOW] (state, obj) {
      // console.log("更新遮罩层状态")
      // console.log(state)
      state.openShadow = obj
    },
    // 更新购物车商品列表是否显示
    [UPDATEISSHOW] (state, obj) {
      console.log("更新购物车商品列表是否显示")
      console.log(state)
      state.openShadow = obj
      state.isShow = obj
    },
    // 更新扫描结果页是否隐藏
    [UPDATEISSCANSHOW] (state, obj) {
      state.isScanShow = obj
    },
    //更新是否开启活动
    [UPDATEISOPENACTIVITY] (state, obj) {
      state.isOpenActivity = obj
    },
    // upDateGoodsType
    [UPDATEGOODSTYPE] (state, obj) {
      // console.log('--------')
      let tempGoodsLength = state.goods_type.length
      for (let i = 0; i < tempGoodsLength; i++) {
        for (let j = 0; j < state.goods_type[i].goods_list.length; j++) {
          if (state.goods_type[i].goods_list[j].goods_id == obj.goods_id) {
            //如果是在扫描商品组件过来的
            if (obj.flag) {
              if (i == 0) {
                state.goods_type[i].goods_list[j].count += obj.count
                state.goods_type[i].goods_list[j].goods_num += obj.goods_num;
              } else {
                state.goods_type[i].goods_list[j].count += obj.count
                state.goods_type[i].goods_list[j].goods_num += obj.goods_num;
                return
              }
            } else {
              if (i == 0) {
                state.goods_type[i].goods_list[j].count ++
                state.goods_type[i].goods_list[j].goods_num ++
              } else {
                state.goods_type[i].goods_list[j].count ++
                state.goods_type[i].goods_list[j].goods_num ++
                return
              }
            }
            
          }
        }
      }
    },
    // dropGoodsType 删除所有商品分类数据
    [DROPGOODSTYPE] (state, obj) {
      let tempGoods = state.goods_type            //  goods_type本身
      let templength = state.goods_type.length    //  goods_type的长度3
      for (let i = 0; i < templength; i++) {
        let tempGoodsType = state.goods_type[i].goods_list
        let tempGoodsTypeLen = state.goods_type[i].goods_list.length
        for (let j = 0; j < tempGoodsTypeLen; j++) {
          if (tempGoodsType[j].goods_id == obj.goods_id) {
            if (i == 0) {
              tempGoodsType[j].count --
              tempGoodsType[j].goods_num --
            } else {
              tempGoodsType[j].count --
              tempGoodsType[j].goods_num --
              return
            }
          }
        }
      }
    },

  },
  actions: {
    upDateActivityMsg  ({ commit }, ...args) {
      commit('UPDATEACTIVITYMSG', ...args)
    },
    upDateYhprice ({ commit }, ...args) {
      commit('UPDATEYHPRICE', ...args)
    },
    upDateTotalprice ({ commit }, ...args) {
      commit('UPDATETOTALPRICE', ...args)
    },
     // 更新所有数据
    upAllDate ({ commit }, ...args) {
      commit('UPALLDATE', ...args)
    },
    // 添加购物车
    upDateSelectedFoods ({ commit }, ...args) {
      commit('UPDATESELECTEDFOODS', ...args)
    },
    // 删除购物车内数据
    dropSelectedFoods ({ commit }, ...args) {
      commit('DROPSELECTEDFOODS', ...args)
    },
    // 添加所有商品和分类信息
    upDateGoodsType ({ commit }, ...args) {
      commit('UPDATEGOODSTYPE', ...args)
    },
    // 删除商品和分类信息
    dropGoodsType ({ commit }, ...args) {
      commit('DROPGOODSTYPE', ...args)
    },
    // 更新遮罩层状态
    upDateOpenShadow ({ commit }, args) {
      commit('UPDATEOPENSHADOW', args)
    },
    // 更新购物车商品列表是否显示
    upDateIsShow ({ commit }, args) {
      commit('UPDATEISSHOW', args)
    },
    // 更新扫描结果页是否隐藏
    upDateIsScanShow ({ commit }, args) {
      commit('UPDATEISSCANSHOW', args)
    },
    //更新是否开启活动
    upDateIsOpenActivity ({ commit }, args) {
      commit('UPDATEISOPENACTIVITY', args)
    },
  }
})

export default store