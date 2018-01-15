var app = getApp();
Page({
  data: {
    bb:[1,2,3],
    tabNum:0,
    proList:[],
    tjList:[],
    newList: [],
    tabArr: { 
      curHdIndex: 0, 
      curBdIndex: 0 
    }, 
    current: 0,
    shopInfo: {},
  },
  tabClick (e) {
    console.log(e.target.id)
    this.setData({
      tabNum:e.target.id
    })
  },
  //窗体加载事件  
onLoad(options) {
  var sid = options.shopId;
  var that = this;
    my.httpRequest({
      url: app.data.ceshiUrl + '/Api/Shangchang/shop_details',
      method:'post',
      data: {shop_id:sid},
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {  
        console.log(res.data);
        var shop_info = res.data.shop_info;
        var content=res.data.shop_info.content;
        var pro = res.data.pro;
        var tj_list = res.data.tj_list;
        var list = res.data.list;
        var status = res.data.status;
        if(status==1){
          // WxParse.wxParse('content', 'html', content, that, 3);
           that.setData({
            shopInfo:shop_info,
            proList:pro,
            tjList: tj_list,
            newList: list,
          });
        }else{
          my.showToast({
            content: res.data.err,
            duration: 2000
          });
        }
      },
      fail:function(e){
        my.showToast({
          content: '网络异常！',
          duration: 2000
        });
      },
    })
},
});
