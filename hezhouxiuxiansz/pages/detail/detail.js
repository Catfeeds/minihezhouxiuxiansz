var app = getApp();
Page({
  data: {
    orderId:0,
    orderData:[],
    proData:[],
    trues:false
  },
  onLoad(options) {
    this.setData({
      orderId: options.orderId,
    })
    this.loadProductDetail();
  },
  loadProductDetail (){
    var that = this;
    my.httpRequest({
      url: app.data.ceshiUrl + '/Api/Order/order_details',
      method:'post',
      data: {
        order_id: that.data.orderId,
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var status = res.data.status;
        if(status==1){
          var pro = res.data.pro;
          var ord = res.data.ord;
          that.setData({
            orderData: ord,
            proData:pro
          });
          console.log(that.data.proData)
        }else{
          my.showToast({
            content: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function () {
          // fail
          my.showToast({
            content: '网络异常！',
            duration: 2000
          });
      }
    });
  },
});
