var app = getApp();
Page({
  data: {
    userInfo:[],
  },
  onLoad() {},
  onShow() {
    var that = this;
    my.getAuthCode({
      scopes: 'auth_user',
      success: (res) => {
        my.getAuthUserInfo({
          success: (userInfo) => {
            this.setData({
              userInfo:userInfo
            });
        }
      });
    },
  });
  my.httpRequest({
          url: app.data.ceshiUrl + '/Api/Index/index',
          data: {},
          header: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
              that.setData({
                  groom: res.data.renqi,
              });
             
          }
      });
      my.httpRequest({
          url: app.data.ceshiUrl + '/Api/User/userinfo',
          data: {
              uid:app.data.userId,
          },
          header: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
              console.log(res.data.userinfo);
              that.setData({
                  user: res.data.userinfo,
              });

          }
      })
  },
});
