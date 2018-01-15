var app = getApp();
Page({
  data: {
    aa:[1,2,3],
    allChoice:false,
    page:1,
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    total: 0,
    carts: [],
  },
  choiceClick (e) {
    this.setData({
      allChoice:!this.data.allChoice
    })
  },
  onShow:function(){
    this.loadProductData();
     this.sum();
  },
  onLoad() {
    
  },
  loadProductData(){
    var that = this;
    my.httpRequest({
      url: app.data.ceshiUrl + '/Api/Shopping/index',
      method:'post',
      data: {
        user_id: app.data.userId
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.cart);
        //--init data
        var cart = res.data.cart;
        that.setData({
          carts:cart,
        });
        //endInitData
      },
    });
  },
  sum() {
    var carts = this.data.carts;
    // 计算总金额
    var total = 0;
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        total += carts[i].num * carts[i].price;
      }
    }
    // 写回经点击修改后的数组
    this.setData({
      carts: carts,
      total: '¥ ' + total
    });
  },
  removeShopCard:function(e){
    var that = this;
    var cardId = e.currentTarget.dataset.cartid;
    my.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function(res) {
        res.confirm && my.httpRequest({
          url: app.data.ceshiUrl + '/Api/Shopping/delete',
          method:'post',
          data: {
            cart_id: cardId,
          },
          header: {
            'Content-Type':  'application/x-www-form-urlencoded'
          },
          success: function (res) {
            //--init data
            var data = res.data;
            if(data.status == 1){
              //that.data.productData.length =0;
              that.loadProductData();
            }else{
              my.showToast({
                content: '操作失败！',
                duration: 2000
              });
            }
          },
        });
      },
      fail: function() {
        // fail
        my.showToast({
          content: '网络异常！',
          duration: 2000
        });
      }
    });
  },
  bindCheckbox (e) {
  /*绑定点击事件，将checkbox样式改变为选中与非选中*/
  //拿到下标值，以在carts作遍历指示用
  var index = parseInt(e.currentTarget.dataset.index);
  //原始的icon状态
  var selected = this.data.carts[index].selected;
  var carts = this.data.carts;
  // 对勾选状态取反
  carts[index].selected = !selected;
  // 写回经点击修改后的数组
  this.setData({
    carts: carts
  });
  this.sum()
},
removeShopCard (e){
    var that = this;
    var cardId = e.currentTarget.dataset.cartid;
    my.confirm({
      title: '提示',
      content: '你确认移除吗',
      success: function(res) {
        res.confirm && my.httpRequest({
          url: app.data.ceshiUrl + '/Api/Shopping/delete',
          method:'post',
          data: {
            cart_id: cardId,
          },
          header: {
            'Content-Type':  'application/x-www-form-urlencoded'
          },
          success: function (res) {
            //--init data
            var data = res.data;
            if(data.status == 1){
              //that.data.productData.length =0;
              that.loadProductData();
            }else{
              my.showToast({
                content: '操作失败！',
                duration: 2000
              });
            }
          },
        });
      },
      fail: function() {
        // fail
        my.showToast({
          content: '网络异常！',
          duration: 2000
        });
      }
    });
  },
  bindMinus (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var num = that.data.carts[index].num;
    // 如果只有1件了，就不允许再减了
    if (num == 1) {
        return false;
    }
    if (num > 1) {
      num --;
    }
    console.log(num);
    var cart_id = e.currentTarget.dataset.cartid;
    my.httpRequest({
      url: app.data.ceshiUrl + '/Api/Shopping/up_cart',
      method:'post',
      data: {
        user_id: app.data.userId,
        num:num,
        cart_id:cart_id
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var status = res.data.status;
        if(status==1){
          // 只有大于一件的时候，才能normal状态，否则disable状态
          var minusStatus = num <= 1 ? 'disabled' : 'normal';
          // 购物车数据
          var carts = that.data.carts;
          carts[index].num = num;
          // 按钮可用状态
          var minusStatuses = that.data.minusStatuses;
          minusStatuses[index] = minusStatus;
          // 将数值与状态写回
          that.setData({
            minusStatuses: minusStatuses
          });
          that.sum();
        }else{
          my.showToast({
            content: '操作失败！',
            duration: 2000
          });
        }
      },
      fail: function() {
        // fail
        my.showToast({
          content: '网络异常！',
          duration: 2000
        });
      }
    });
},

bindPlus (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var num = that.data.carts[index].num;
    // 自增
    num ++;
    console.log(num);
    var cart_id = e.currentTarget.dataset.cartid;
    my.httpRequest({
      url: app.data.ceshiUrl + '/Api/Shopping/up_cart',
      method:'post',
      data: {
        user_id: app.data.userId,
        num:num,
        cart_id:cart_id
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var status = res.data.status;
        if(status==1){
          // 只有大于一件的时候，才能normal状态，否则disable状态
          var minusStatus = num <= 1 ? 'disabled' : 'normal';
          // 购物车数据
          var carts = that.data.carts;
          carts[index].num = num;
          // 按钮可用状态
          var minusStatuses = that.data.minusStatuses;
          minusStatuses[index] = minusStatus;
          // 将数值与状态写回
          that.setData({
            minusStatuses: minusStatuses
          });
          that.sum();
        }else{
          my.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function() {
        // fail
        my.showToast({
          content: '网络异常！',
          duration: 2000
        });
      }
    });
  },
  bindSelectAll () {
    this.setData({
      allChoice:!this.data.allChoice
    })
   var carts = this.data.carts;
   // 遍历
   for (var i = 0; i < carts.length; i++) {
     carts[i].selected = this.data.allChoice;
   }
   this.setData({
     carts: carts
   });
   this.sum()
  },
  bindCheckout () {
    var that = this; 
   // 初始化toastStr字符串
   var toastStr = '';
   // 遍历取出已勾选的cid
   for (var i = 0; i < this.data.carts.length; i++) {
     if (this.data.carts[i].selected) {
       toastStr += this.data.carts[i].id;
       toastStr += ',';
     }
   }
   if (toastStr==''){
     my.showToast({
       content: '请选择要结算的商品！',
       duration: 2000
     });
     return false;
   }

   //判断商品是否属于多个店铺
   my.httpRequest({
     url: app.data.ceshiUrl + '/Api/Shopping/check_shop',
     method: 'post',
     data: {
       cart_id: toastStr,
     },
     header: {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     success: function (res) {
       //--init data
       var status = res.data.status;
       if(status == 0){
         my.showToast({
           content: '请选择要结算的商品！',
           duration: 2000
         });
       }
       if (status == 2) {
         my.showToast({
           content: '只可以选择单个店铺的商品！',
           duration: 2000
         });
       }
       if(status == 1){
         //存回data
           my.navigateTo({
             url: '../orderAffirm/orderAffirm?cartId=' + toastStr,
           });
       }

     },
   });

 },
});
