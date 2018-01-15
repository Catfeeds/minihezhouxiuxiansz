var app = getApp();
Page({
  data: {
    shopList:[],
    page:2,
  },
  onLoad() {
    var that = this;
    my.httpRequest({
      url: app.data.ceshiUrl + '/Api/Shangchang/index',
      method:'post',
      data: {},
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {  
        console.log(res.data.store_list);
        var store_list = res.data.store_list;
        that.setData({
          shopList:store_list,
        });
      },
      fail:function(e){
        my.showToast({
          content: '网络异常！',
          duration: 2000
        });
      },
    })
  },

   //点击加载更多
getMore:function(e){
  var that = this;
  var page = that.data.page;
  my.httpRequest({
      url: app.data.ceshiUrl + '/Api/Shangchang/get_more',
      method:'post',
      data: {page:page},
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {  
        var store_list = res.data.store_list;
        var status = res.data.status;
        if(status==0){
          my.showToast({
            content: '没有更多数据！',
            duration: 2000
          });
          return false;
        }
        //that.initProductData(data);
        that.setData({
          page: page+1,
          shopList:that.data.shopList.concat(store_list)
        });
      },
      fail:function(e){
        my.showToast({
          content: '网络异常！',
          duration: 2000
        });
      },
    });
  }
});
