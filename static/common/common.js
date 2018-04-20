(function() {
  var common = {
      // 正式环境
      //url: location.origin
      // 测试环境
      //url:'http://192.168.150.199:8081/'//本地测试环境host
      url:'http://sitjfgo.9fchaoneng.cn/'  //  测试环境url
      // url:'http://jfgo.9fchaoneng.cn/'  //  生产环境url
  }
  var browser = {
    versions: function() {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      return { //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }

  window.common = common;
  window.browser = browser;
})()
