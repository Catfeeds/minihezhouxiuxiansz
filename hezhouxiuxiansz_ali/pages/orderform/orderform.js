var app = getApp();
Page({
  data: {
    tab:0,
    // tab切换  
    currentTab: 0,  
    isStatus:'pay',//10待付款，20待发货，30待收货 40、50已完成
    page:2,
    refundpage:2,
    orderList:[],
    orderId:0
  },
  onLoad(options) {
    if(options.isStatus){
      this.setData({
        isStatus:isStatus
      });
    }
    this.loadOrderList();
  },
  tabClick (e) {
    console.log(e.currentTarget.dataset.otype)
    var otype = e.currentTarget.dataset.otype;
    this.setData({
      tab:e.target.id,
      isStatus: otype,
    });
    this.loadOrderList();
  },
  loadOrderList (){
      my.showToast({
          content: '加载中...',
          icon: 'loading',
      })
    var that = this;
    console.log(that.data.isStatus);
    my.httpRequest({
      url: app.data.ceshiUrl + '/Api/Order/index',
      method:'post',
      data: {
        uid:app.data.userId,
        order_type:that.data.isStatus,
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
          console.log(res.data)
        //--init data        
        var status = res.data.status;
        var list = res.data.ord;
        that.setData({
            orderList: list,
        });
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
  removeOrder (e){
    var that = this;
    var orderId = e.currentTarget.dataset.orderId;
    my.confirm({
      title: '提示',
      content: '你确定要取消订单吗？',
      success: function(res) {
        res.confirm && my.httpRequest({
          url: app.data.ceshiUrl + '/Api/Order/orders_edit',
          method:'post',
          data: {
            id: orderId,
            type:'cancel',
          },
          header: {
            'Content-Type':  'application/x-www-form-urlencoded'
          },
          success: function (res) {
            //--init data
            var status = res.data.status;
            if(status == 1){
              my.showToast({
                content: '操作成功！',
                duration: 2000
              });
              that.loadOrderList();
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

      }
    });
  },
  alipay (e){
      var orderId = e.currentTarget.dataset.orderId;
      my.httpRequest({
        url: app.data.ceshiUrl + '/Api/Pay/doalipay',
        data: {
          order_id:orderId,
          uid:app.data.userId,
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'Content-Type':  'application/x-www-form-urlencoded'
        }, // 设置请求的 header
        success: function(res){
          if(res.data.status==1){
            var order=res.data.success;
            console.log(order); 
            my.tradePay({
              orderStr: 'myOrderStr',
              success: function(res){
                my.showToast({
                  content:"支付成功!",
                  duration: 2000,
                })
                setTimeout(function(){
                  my.navigateTo({
                    url: '../orderform/orderform?isStatus=deliver',
                  })
                },2500);
              },
              fail: function() { 
                my.showToast({
                  content:"支付失败!",
                })
              }
            })
          }
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  },
});
