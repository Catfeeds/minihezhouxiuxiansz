var app = getApp();
Page({
  data: {
    tabNum:0,
    cid:0,
    types:[],
    typeTree:[],
    hot:[],
  },
  tabClick (e) {
    this.setData({
      tabNum:e.currentTarget.id
    })
  },
  onLoad(options) {
    var that = this;
    
    my.httpRequest({
            url: app.data.ceshiUrl + '/Api/Category/index',
            method:'post',
            data: {
              
            },
            header: {
                'Content-Type':  'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(res)
                //--init data 
                var status = res.data.status;
                if(status==1) { 
                    var list = res.data.list;
                    var catList = res.data.catList;
                    that.setData({
                        types:list,
                        typeTree:catList,
                        hot:res.data.hot,
                    });
                } else {
                    my.showToast({
                        content:res.data.err,
                        duration:2000,
                    });
                }
            that.setData({
                     currType: 16
               });    
      console.log(list)
      console.log(catList)
            },
            fail:function(e){
                my.showToast({
                    content:'网络异常！',
                    duration:2000,
                });
            },

        });
      },
      
    ping (e) {
      var pid = e.currentTarget.dataset.id;
      my.navigateTo({
        url: '../product/product?pid='+pid
      })
    },
  
});
