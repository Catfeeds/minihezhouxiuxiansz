var app = getApp();
Page({
  data: {
    youhui:false,
    itemData:{},
    productData:[],
    supplierId:0,
    vid:0,
    productId:0,//proId
    buyCount:0,
    paytype:0,//0线下1微信
    remark:'',
    cartId:0,
    btnDisabled:false,
    one:0,
    num:666,
    noNum:false
  },
  youhuiClick (e) {
    this.setData({
      youhui:!this.data.youhui
    })
  },
  hui(e){
     var i=1;
     if(this.data.one==0){
        this.setData({
           youhui: true,
           one:i,
        });
     }else{
        this.setData({
           youhui: false,
           one: 0,
        });
     }
     this.setData({
         total: this.data.total2,
     });

  },
  onLoad(options) {
    var cart_id = options.cartId;
    this.setData({
        cartId: cart_id,
    });
  },
  onShow(){
      var that = this;
    my.httpRequest({
        url: app.data.ceshiUrl + '/Api/Payment/buy_cart', 
        data: {
            uid: app.data.userId,
            cart_id: that.data.cartId,
        },
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
            var adds = res.data.adds;
            if(adds){
              var address_id = adds.id;
            }else{
              var address_id = 0;
            }
            that.setData({
                productData: res.data.pro,
                address: adds,
                address_id: address_id,
                total: res.data.price,
                total2: res.data.price,
            });
            my.httpRequest({
                url: app.data.ceshiUrl + '/Api/Voucher/getQuan2',
                data: {
                    user_id: app.data.userId,
                    cartId: that.data.cartId,
                },
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    console.log(res.data);
                    that.setData({
                        quan: res.data.quan,
                    });
                }
            });
        }
    });
  },
  radioChangeNo (e) {
    this.setData({
      noNum:false,
      num:999,
      total: this.data.total2,
    })
  },
  radioChange (e) {
      console.log(e.target.dataset.rid);
      var i = e.target.dataset.rid;
      var amount = e.currentTarget.dataset.value;
        var vid = e.currentTarget.dataset.vid;
        this.setData({
            vid:vid,
            num:i,
            noNum:true

        });
        // console.log(amount);
        if(!amount){
            
            this.setData({
                total: this.data.total2,
            });
        }else{
            this.setData({
                total: this.data.total2 - amount,
            });
        }
        
      },
    remarkInput(e){
      this.setData({
        remark: e.detail.value,
    })
  },
  createProductOrderByAli(e){
    this.setData({
      paytype: 'alipay',
    });

    this.createProductOrder();
  },
  createProductOrder (){
    this.setData({
      btnDisabled:false,
    })
    //创建订单
    var that = this;
    console.log(this.data);
    if (!that.data.address){
      my.showToast({
        content: '请选择收货地址!',
        duration: 2000,
      })
    }
    my.httpRequest({
      url: app.data.ceshiUrl + '/Api/Payment/payment',
      method:'post',
      data: {
        uid:app.data.userId,
        cart_id:that.data.cartId,
        vid:that.data.vid,
        paytype:that.data.paytype,
        aid: that.data.address_id,//地址的id
        remark: that.data.remark,//用户备注
        price: that.data.total,//总价
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var data = res.data;
        console.log(data);
        
        if(data.status == 1){
          //创建订单成功
          if(data.arr.pay_type == 'alipay'){
            that.alipay(data.arr);
          }
          //跳转到订单详情//不能跳转此处，因为没有orderID，只能跳转到待支付
          // wx.navigateTo({
          //   url: '/pages/order/detail?orderId='+data.OrderID,
          // });
          // wx.navigateTo({
          //   url: '/pages/user/dingdan?currentTab=0',
          // });
        }else{
          my.showToast({
              content: res.data.err,
              duration: 2000
          })
        }
      },
    });

  },
  alipay (order){
      my.httpRequest({
        url: app.data.ceshiUrl + '/Api/Pay/doalipay',
        data: {
          order_id:order.order_id,
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
                    url: '../orderform/orderform?currentTab=1&otype=deliver',
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
