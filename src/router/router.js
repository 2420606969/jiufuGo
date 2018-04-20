import Vue from 'vue'
import VRouter from 'vue-router'
Vue.use(VRouter)
const router = new VRouter({
  // mode:'history',
  routes: [{
      path: '/redirect',
      name: 'redirect',
      meta: { title: '悟空生活之家' },
      component: resolve => { require(['@/page/redirect'], resolve) }
    },{
      path: '/index',
      name: 'index',
      meta: { title: '悟空生活之家' },
      component: resolve => { require(['@/components/index'], resolve) }
    },{
      path: '/opendoor',
      name: 'opendoor',
      meta: { title: '悟空生活之家' },
      component: resolve => { require(['@/page/opendoor'], resolve) }
    },{
      path: '/login',
      name: 'login',
      meta: { title: '悟空生活之家' },
      component: resolve => { require(['@/page/login'], resolve) }
    },{
      path: '/failpage',
      name: 'failPage',
      meta: { title: '悟空生活之家' },
      component: resolve => { require(['@/page/failPage'], resolve) }
    },{
      path: '/scanShopping/scanResult',
      name: 'scanResult',
      meta: { title: '悟空便利' },
      component: resolve => { require(['@/page/scanShopping/scanResult'], resolve) }
    },{
      path: '/notFind404',
      name: 'notFind404',
      meta: { title: '页面没找到404' },
      component: resolve => { require(['@/page/notFind404'], resolve) }
    },{
      path: '/vipindex',
      name: 'vipIndex',
      meta: { title: '个人中心' },
      component: resolve => { require(['@/page/vipIndex'], resolve) } //个人中心
    }, {
      path: '/vipinfo',
      name: 'vipInfo',
      meta: { title: '会员信息' },
      component: resolve => { require(['@/page/vipInfo'], resolve) } //会员信息
    }, {
      path: '/orderdetail',
      name: 'orderDetail',
      meta: { title: '订单详情' },
      component: resolve => { require(['@/page/orderDetail'], resolve) } //订单详情
    },  {
      path: '/vouchers',
      name: 'vouchers',
      meta: { title: '优惠券' },
      component: resolve => { require(['@/page/vouchers'], resolve) } //优惠券
    },
    {
      path: '/openrecode',
      name: 'openRecode',
      meta: { title: '开门记录' },
      component: resolve => { require(['@/page/openRecode'], resolve) } //开门记录
    }, {
      path: '/closedoor',
      name: 'closedoor',
      meta: { title: '悟空生活之家' },
      component: resolve => { require(['@/page/closedoor'], resolve) }
    }, {
      path: '/waitcheck',
      name: 'waitcheck',
      meta: { title: '获取进店权限' },
      component: resolve => { require(['@/page/waitcheck'], resolve) }
    }
  ]
})

router.afterEach(route => {
  document.body.scrollTop = 0
  if (route.meta.title) {
    window.document.title = route.meta.title
  }
})

export default router