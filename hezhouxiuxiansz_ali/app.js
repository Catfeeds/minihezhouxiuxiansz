App({
  todos: [
    { text: 'Learning Javascript', completed: true },
    { text: 'Learning ES2016', completed: true },
    { text: 'Learning 支付宝小程序', completed: false },
  ],
  userInfo: [],
  data:{
    userId: 1,
    userInfo:[],
    ceshiUrl: 'https://lerenmobile.com/minihezhouxiuxiansz/index.php',
    // ceshiUrl: 'http://127.0.0.1/minimeidea_duo/index.php',
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs);
    this.getUserInfo();
  },
  getUserInfo() {
    var that = this;
      my.getAuthCode({
        scopes: 'auth_user',
        success: (authcode) => {
          // console.info(authcode);
          var code = authcode.authCode;
          my.getAuthUserInfo({
            scopes: 'auth_user',
            success: (res) => {
              this.userInfo = res;
              // console.log(res)
              // resolve(this.userInfo);
              that.getUserSessionKey(code);
            },
            fail: () => {
              reject({});
            },
          });
        },
        fail: () => {
          reject({});
        },
      });

  },
  
  getUserSessionKey: function (code) {
    var that = this;
    my.httpRequest({
      url: that.data.ceshiUrl + '/Api/Login/a_getsessionkey',
      method: 'post',
      data: {
        code: code
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var data = res.data;
        if (data.status == 0) {
          my.showToast({
            content: data.err,
            duration: 2000
          });
          return false;
        }
        console.log(data)

        that.data.userInfo['access_token'] = data.info.access_token;
        that.data.userInfo['openid'] = data.info.user_id;
        that.getUserMessage(data.info.access_token);
      },
      fail: function (e) {
        console.log(e)
        my.showToast({
          content: '网络异常！',
          duration: 2000
        });
      },
    });
  },
   getUserMessage: function (access_token) {
    var that = this;
    my.httpRequest({
      url: that.data.ceshiUrl + '/Api/Login/a_getUserMessage',
      method: 'post',
      data: {
        access_token: access_token
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var data = res.data;
        if (data.status == 0) {
          my.showToast({
            content: data.err,
            duration: 2000
          });
          return false;
        }

        that.data.userInfo['nickName'] = data.info.nick_name;
        that.data.userInfo['avatarUrl'] = data.info.avatar;
        that.data.userInfo['gender'] = data.info.gender;
        that.onLoginUser();
      },
      fail: function (e) {
        my.showToast({
          content: '网络异常！',
          duration: 2000
        });
      },
    });
  },
  onLoginUser: function () {
    var that = this;
    var user = that.data.userInfo;
    my.httpRequest({
      url: that.data.ceshiUrl + '/Api/Login/a_authlogin',
      method: 'post',
      data: {
        NickName: user.nickName,
        gender: user.gender,
        HeadUrl: user.avatarUrl,
        openid: user.openid
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var data = res.data.arr;
        var status = res.data.status;
        if (status != 1) {
          my.showToast({
            content: res.data.err,
            duration: 3000
          });
          return false;
        }
        that.data.userInfo['id'] = data.ID;
        var userId = data.ID;
        if (!userId) {
          my.showToast({
            content: '登录失败！',
            duration: 3000
          });
          return false;
        }
        that.data.userId = userId;
      },
      fail: function (e) {
        my.showToast({
          content: '网络异常！',
          duration: 2000
        });
      },
    });
  },
});
