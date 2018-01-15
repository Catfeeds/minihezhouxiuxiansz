var app = getApp();
//引入这个插件，使html内容自动转换成wxml内容
// var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    circular:true,
    aa:[1,2,3],
    parData:true,
    num3:0,
    pid:0,
    itemData: {},
    bannerItem: '',
    num2:0,
      // 产品图片轮播
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    firstIndex: -1,
    quan:[],
    param:[],
    addNum:1,
    pictures: [],
    guigeNum:0
  },
  guigeClick (e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      guigeNum:e.currentTarget.dataset.id
    })
  },
  navigatorClick (e) {
    my.switchTab({
      url: '../cart/cart'
    })
  },
  imgClick (e) {
    var index = e.currentTarget.dataset.index
        //数据源
       var pictures = this.data.pictures;
    my.previewImage({
      current: index,
      urls: pictures
    });
  },
  addClick (e) {
    var that = this
    console.log(e.target.id)
    if(e.target.id == 'aa') {
      if(that.data.addNum > 1) {
        that.setData({
          addNum:that.data.addNum -1
        })
      }
    }else if(e.target.id == 'bb') {
        that.setData({
          addNum:that.data.addNum + 1
        })
    }
  },
  parClick (e) {
    var that = this
    that.setData({
      parData:!that.data.parData
    })
    if(that.data.parData) {
      that.setData({
        num:90
      })
    }else {
       that.setData({
        num:0
      })
    }
  },
  onLoad(options) {
    var pid = options.pid;
    var that = this;
    that.setData({
        pid: pid,
      });
    my.httpRequest({
          url: app.data.ceshiUrl + '/Api/Product/detail',
          method: 'post',
          data: {
              pro_id: pid,
          },
          header: {
            'Content-Type':'application/x-www-form-urlencoded'
          },

          success: function (res) {
              console.log(res.data.param2);
              //--init data 
              var status = res.data.status;
              if (status == 1) {
                  var content = res.data.content;
                //   WxParse.wxParse('content', 'html', content, that, 8);
                  that.setData({
                      pro: res.data.pro,
                      cate_id: res.data.pro.cid,
                      store: res.data.pro.store,
                      bannerItem:res.data.lun,
                      quan:res.data.quan,
                      param:res.data.param2,
                      prodetail: res.data.prodetail,
                      prodetail2: res.data.prodetail[0],
                      shu: res.data.shu,
                      guei:res.data.guei,
                      num3: res.data.num,
                      num2: res.data.num2,
                      ppid: res.data.ppid,
                  });
              } else {
                  my.showToast({
                      content: "没有数据",
                      duration: 2000,
                  });
              }
          },
          fail: function (e) {
              my.showToast({
                  content: '网络异常！',
                  duration: 2000,
              });
          },

      });
    },
    
    changPro (e) {
      console.log(e)
    var that = this;
    if(e.currentTarget.dataset.attrid){
        var attr_id = e.currentTarget.dataset.attrid;
    }else{
        var attr_id = that.data.num3;
    }
    if (e.currentTarget.dataset.specid) {
        var spec_id = e.currentTarget.dataset.specid;
    } else {
        var spec_id = that .data.num2;
    }
    this.setData({
        // prodetail2: this.data.prodetail[num],
        num3: attr_id,
        num2: spec_id,
    });
    my.httpRequest({
        url: app.data.ceshiUrl + '/Api/Product/getPrice',
        method: 'post',
        data: {
            attr_value_id: that.data.num3,
            spec_value_id: that.data.num2,
            pid: that.data.pid,
        },
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
            // //--init data        
            console.log(res.data.pro);
            if (res.data.pro) {
                that.setData({
                    prodetail2: res.data.pro,
                    ppid: res.data.ppid,
                });
            } else {
                my.showToast({
                    content: '库存不足！',
                    duration: 2000
                });
                var prodetail2 = that.data.prodetail2;
                prodetail2.store = 0;
                that.setData({
                    prodetail2: prodetail2,
                    ppid: 0,
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
addShopCart(e){ 
       var that = this;
    //    console.log(that.data.ppid);
       var prodetail2 = that.data.prodetail2;
       var addNum = that.data.addNum;
       var store = prodetail2.store;
       if (addNum > store) {
           my.showToast({
               content: '库存不足！',
               duration: 2000
           });
           return false;
       }
       var ptype = e.currentTarget.dataset.type;
       my.httpRequest({
         url: app.data.ceshiUrl + '/Api/Shopping/add',
         method:'post',
         data: {
           uid: app.data.userId,
           pid: that.data.pid,
           ppid: that.data.ppid,
           num: addNum,
           ptype: ptype,
         },
         header: {
           'Content-Type':  'application/x-www-form-urlencoded'
         },
         success: function (res) {
           // //--init data        
           var data = res.data;
           if(data.status == 1){
             if(ptype == 'buynow'){
               my.redirectTo({
                 url: '../orderAffirm/orderAffirm?cartId='+data.cart_id
               });
               return;
             }else{
               my.showToast({
                   content: '加入购物车成功',
                   icon: 'success',
                   duration: 2000
               });
             }     
           }else{
             my.showToast({
                   content: data.err,
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
    gouCart () {
       my.switchTab({
           url: '../cart/cart',
       })
    },
    onShareAppMessage() {
        var title = this.data.pro.name;
        var id = this.data.pro.id;
        return {
            title: title,
            path: '/pages/product/product?pid='+id
        };
    },
});
