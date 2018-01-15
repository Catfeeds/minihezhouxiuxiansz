var app = getApp();
Page({
  data: {
    address: [],
    radioindex: '',
    pro_id:0,
    num:0,
    cartId:0,

  },
  onLoad(options) {
    console.log(options);
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    var cartId = options.cartId;
    var temp = options.temp;
    // console.log(app.d.userId);
    my.httpRequest({
      url: app.data.ceshiUrl + '/Api/Address/index',
      data: {
        user_id:app.data.userId,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      
      success: function (res) {
        // success
        var address = res.data.adds;
        if (address == '') {
          var address = []
        }
        that.setData({
          address: address,
          cartId: cartId,
          temp: temp,
        })
      },
      fail: function () {
        // fail
        my.showToast({
          content: '网络异常！',
          duration: 2000
        });
      }
    })
  },
  setDefault(e) {
    var that = this;
    var addrId = e.currentTarget.dataset.id;
    var atype = e.currentTarget.dataset.atype;
    my.httpRequest({
      url: app.data.ceshiUrl + '/Api/Address/set_default',
      data: {
        uid:app.data.userId,
        addr_id:addrId
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      
      success: function (res) {
        // success
        var status = res.data.status;
        var cartId = that.data.cartId;
        var temp = that.data.temp;
        console.log(temp);
        if(status==1){
          if (cartId > 0) {
            my.redirectTo({
              url: '../orderAffirm/orderAffirm?cartId=' + cartId,
            });
            return false;
          }
        //   if (temp==1) {
        //       wx.redirectTo({
        //           url: '../../pay/pay??cartId=' + cartId,
        //       });
        //       return false;
        //   }

          my.showToast({
            content: '操作成功！',
            duration: 2000
          });
          if(atype == 'radio'){
            setTimeout(function(){
                 my.navigateBack({
              
                });
            },2000);
           
          }else{
            that.DataonLoad();
          }
          
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
    })
  },
  delAddress(e) {
    var that = this;
    var addrId = e.currentTarget.dataset.id;
    my.confirm({
      title: '提示',
      content: '你确认移除吗',
      success: function(res) {
        res.confirm && my.httpRequest({
          url: app.data.ceshiUrl + '/Api/Address/del_adds',
          data: {
            user_id:app.data.userId,
            id_arr:addrId
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {// 设置请求的 header
            'Content-Type':  'application/x-www-form-urlencoded'
          },
          
          success: function (res) {
            // success
            var status = res.data.status;
            if(status==1){
              that.DataonLoad();
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
  DataonLoad() {
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    my.httpRequest({
      url: app.data.ceshiUrl + '/Api/Address/index',
      data: {
        user_id:app.data.userId,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      
      success: function (res) {
        // success
        var address = res.data.adds;
        if (address == '') {
          var address = []
        }
        that.setData({
          address: address,
        })
      },
      fail: function () {
        // fail
        my.showToast({
          content: '网络异常！',
          duration: 2000
        });
      }
    })
    
  },
});
