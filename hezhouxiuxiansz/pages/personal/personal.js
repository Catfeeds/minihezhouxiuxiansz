var app = getApp();
Page({
  data: {
    img01:'',
    img02:'',
    img03:'',
    hiddenImg01:true,
    hiddenImg02:true,
    hiddenImg03:true,
    disabled: false,
    userver:false,
    index:1,
    name:'',
    uname:'',
    tel:'',
    address:'',
    audit:10,
    reason: '无',
    ptype:0,
    img1:'',
    img2: '',
    img3: '',
    imageSrc:'',
    image:'',
    img:''
  },
  img01Click (e) {
    var that = this;
    my.chooseImage({
      count: 1,
      success: (res) => {
        that.setData({
         imageSrc:res.apFilePaths[0]
        });
        var imageSrc = res.apFilePaths[0];
        my.uploadFile({
          url: app.data.ceshiUrl + '/Api/Shop/uploadbl',
          filePath: imageSrc,
          fileType: 'image',
          fileName: 'img',
          formData: {
            uid: app.data.userId,
            imgs: that.data.img1
          },
          header: {
            'Content-Type': 'multipart/form-data'
          },
          success: function (res) {
            console.log('uploadImage success, res is:', res);
            var statusCode = res.statusCode;
            if (statusCode==200){
              my.showToast({
                content: '上传成功',
                icon: 'success',
                duration: 2000
              })

              that.setData({
                img1:res.data,
                imageSrc
              })
            }
          },
          fail: function ({errMsg}) {
            console.log('uploadImage fail, errMsg is', errMsg)
            my.showToast({
              content: '上传失败',
              icon: 'success',
              duration: 2000
            })
          }
        })
      },
      fail (e) {
      }
    });
  },
  img02Click (e) {
    var that = this;
    my.chooseImage({
      count: 1,
      success: (res) => {
        that.setData({
         image : res.apFilePaths[0]
        })
        var image = res.apFilePaths[0];
        my.uploadFile({
          url: app.data.ceshiUrl + '/Api/Shop/uploadbl',
          fileType: 'image',
          filePath: image,
          fileName: 'img',
          formData: {
            uid: app.data.userId,
            imgs: that.data.img2
          },
          header: {
            'Content-Type': 'multipart/form-data'
          },
          success: function (res) {
            //console.log('uploadImage success, res is:', res);
            var statusCode = res.statusCode;
            if (statusCode == 200) {
              my.showToast({
                content: '上传成功',
                icon: 'success',
                duration: 2000
              })

              that.setData({
                img2: res.data,
                image
              })
            }
          },
          fail: function ({ errMsg }) {
            console.log('uploadImage fail, errMsg is', errMsg)
            my.showToast({
              content: '上传失败',
              icon: 'success',
              duration: 2000
            })
          }
        })
      },
      fail (e) {
      }
    });
  },
  img03Click (e) {
    var that = this;
    my.chooseImage({
      count: 1,
      success: (res) => {
        that.setData({
         img : res.apFilePaths[0]
        })
         var img = res.apFilePaths[0];
        my.uploadFile({
          url: app.data.ceshiUrl + '/Api/Shop/uploadbl',
          fileType: 'image',
          filePath: img,
          fileName: 'img',
          formData: {
            uid: app.data.userId,
            imgs: that.data.img3
          },
          header: {
            'Content-Type': 'multipart/form-data'
          },
          success: function (res) {
            //console.log('uploadImage success, res is:', res);
            var statusCode = res.statusCode;
            if (statusCode == 200) {
              my.showToast({
                content: '上传成功',
                icon: 'success',
                duration: 2000
              })

              that.setData({
                img3: res.data,
                img
              })
            }
          },
          fail: function ({ errMsg }) {
            console.log('uploadImage fail, errMsg is', errMsg)
            my.showToast({
              content: '上传失败',
              icon: 'success',
              duration: 2000
            })
          }
        })
      },
      fail (e) {
      }
    });
  },
  onLoad() {
    var that = this;
    var uid = app.data.userId;
    my.httpRequest({
      url: app.data.ceshiUrl + '/Api/Shop/index',
      method: 'post',
      data: {
        uid: uid
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var shopInfo = res.data.shop_info;
        if (shopInfo != '') {
          that.setData({
            name: shopInfo.name,
            uname: shopInfo.uname,
            tel: shopInfo.tel,
            audit: shopInfo.audit,
            address: shopInfo.address,
            logo: shopInfo.logo,
            reason: shopInfo.reason,
            imageSrc: shopInfo.zheng,
            image: shopInfo.fan,
            img:shopInfo.yyzz,
          });
        } 
      },
      fail: function (e) {
        my.showToast({
          content: '网络异常！',
          duration: 2000
        });
      },
    })
  },
  //店铺名 失焦事件
bindShopname (e) {
    this.setData({
      name: e.detail.value
    })
  },

//详细地址  失去焦点事件
addsInputEvent (e){
    this.setData({
      address:e.detail.value
    })
  },
  //联系人 失焦事件
bindKeyname(e) {
  this.setData({
    uname: e.detail.value,
  })
},

//手机焦点事件
bindTelInput (e){
    this.setData({
      tel: e.detail.value,
    }) 
  },
  //提交认证
formDataCommit (e) {
    var that = this;
    var name = that.data.name;
    var uname = that.data.uname;
    var tel = that.data.tel;
    var address = that.data.address;
    var logo = that.data.logo;
    if (!name){
        my.showToast({
          content: '请输入店铺名称！',
          duration: 2500
        });
        return false;
    }
    if (!tel) {
      my.showToast({
        content: '请输入联系电话！',
        duration: 2500
      });
      return false;
    }
    
    my.httpRequest({
      url: app.data.ceshiUrl + '/Api/Shop/audit',
      method: 'post',
      data: { 
        uid:app.data.userId,
        name: name,
        uname: uname,
        tel:tel,
        address: address,
        logo: logo,
        zheng: that.data.img1,
        fan: that.data.img2,
        yyzz:that.data.img3,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            disabled: true
          });
          my.showToast({
              content: '提交成功，请耐心等待审核！',
              duration: 2000
          });
          that.onLoad();
        } else {
          my.showToast({
            content: res.data.err,
            duration: 2000
          });
        }
        //endInitData
      },
      fail: function (e) {
        my.showToast({
          content: '网络异常！',
          duration: 2000
        });
      },
    })
  },
});
