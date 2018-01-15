var app = getApp();
Page({
  data: {
    imgUrls:'',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    classify:'',
    shop: '',
    renqi:'',
    indicatorDots: true,
    autoplay: true,
    interval: 1000,
    circular:true
  },
  onLoad() {
    var that = this;
    my.httpRequest({
        url: app.data.ceshiUrl + '/Api/Index/index',
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
            that.setData({
                imgUrls: res.data.ggtop,
                classify: res.data.procat,
                shop: res.data.shop,
                renqi: res.data.renqi,
                tubiao: res.data.tubiao,
            })
        }
    });
  },
   jj (e) {
     var id = e.currentTarget.dataset.id;
     console.log(e);
     my.httpRequest({
         url: app.data.ceshiUrl + '/Api/Voucher/get_voucher',
         data: {
            uid: app.data.userId,
            vid: id,
         },
         header: {
                 'Content-Type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
             var status = res.data.status;
             if(status == 1){
                 my.showToast({
                     content: '已领取',
                     icon: '',
                     image: '',
                     duration: 2000,
                     mask: true,
                     success: function (res) { },
                     fail: function (res) { },
                     complete: function (res) { },
                 })
             }else{
                 my.showToast({
                     content: res.data.err,
                     duration: 2000,
                 });
             }
            
         }
     })
     


  },
});
