var app = getApp();
Page({
  data: {
    bb:[1,2,3],
    iconImg:false,
    iconHidden:false,
    classifyHidden:false,
    showHidden:false,
    pro: [],
    key: '',
    catid: 0,
    array: [],
    searchValue:'',
    pname:'综合排序',
    pname2:'筛选',
    housetype_list: [
         {
            name: '综合排序',
            id: '0',
         },

         {
            name: '热度',
            id: '1',
         },
         {
            name: '价格最高',
            id: '2',
         },
         {
            name: '价格最低',
            id: '3',
         },
      ],
    site:'位置'
  },
  // 隐藏
  hiddenClick (e) {
    this.setData({
      iconHidden:false,
      showHidden:false,
      classifyHidden:false
    })
  },
  // 选项卡1
  tab01Click (e) {
    var that = this;
    if(that.data.classifyHidden) {
      that.setData({
        classifyHidden:false,
        showHidden:false
      })
      return false
    }
    that.setData({
      iconHidden:that.data.iconHidden == false?true:false,
      showHidden:that.data.showHidden == false?true:false
    })
    if(that.data.classifyHidden == true) {
      that.setData({
        classifyHidden:false
      })
    }
  },
  // 选项卡3
  tab03Click (e) {
    var that = this;
    if(that.data.iconHidden) {
      that.setData({
        iconHidden:false,
        showHidden:false
      })
      return false
    }
    that.setData({
      classifyHidden:that.data.classifyHidden == false? true:false,
      showHidden:that.data.showHidden == false? true : false
    })
    if(that.data.iconHidden == true) {
      that.setData({
        iconHidden:false
      })
    }
  },
  // 排序 --列表
  listClick (e) {
    var that = this;
    that.setData({
      iconImg:e.currentTarget.dataset.id,
      iconHidden:false,
      showHidden:false,
      pname:e.currentTarget.dataset.pname
    })
  },

  onLoad(options) {
    var that = this;
    var sou = options.temp;
       my.httpRequest({
           url: app.data.ceshiUrl + '/Api/Category/getProduct',
           method: 'post',
           data: {
               cate_id: options.cid,
               key:options.key,
           },
           header: {
             'Content-Type':'application/x-www-form-urlencoded'
           },

           success: function (res) {
               //--init data 
            //    console.log(res.data.pro);
               var status = res.data.status;
               if (status == 1) {
                    that.setData({
                        pro: res.data.pro,
                        key: res.data.key,
                        catid: res.data.catid,
                        array: res.data.category,
                    });
                   
               }else {
                   that.setData({
                       array: res.data.category,
                    });
                    if(sou == 'sou'){
                        my.showToast({
                            content: '请输入关键字',
                            duration: 2000,
                        }); 
                        return false;
                    }
                   my.showToast({
                       content: res.data.err,
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
  onReady() {
    // 页面加载完成
    
  },
  onShow() {
    var that = this
    my.getLocation({
       cacheTimeout:30,
       type:1,
      success(res) {
        my.hideLoading();
        that.setData({
          site:res.city
        })
      },
      fail() {
        // my.hideLoading();
        // my.alert({ title: '定位失败' });
      },
    })
  },
  searchValueInput (e) {
       var value = e.detail.value;
       this.setData({
           searchValue: value,
       });
   },
   doSearch2 () {
       var searchKey = this.data.searchValue;
    //    console.log(searchKey);
       my.navigateTo({
           url: '../screen/screen?key=' + searchKey,
       })

      
      },
    //筛选项点击操作
   filter(e) {
      var that = this;
      var self = this;
      
      
      switch (e.currentTarget.dataset.index) {
         case '0':
             that.setData({
              iconImg:e.currentTarget.dataset.id,
              iconHidden:false,
              showHidden:false,
              pname:e.currentTarget.dataset.pname
            })
            break;
         case '1':
            tabTxt[1].name = txt;

            self.setData({
               page: 1,
               data: [],
               tab: [true, true, true],
               tabTxt: tabTxt,
               house_style: id,
               his: true,
            });
            break;
         case '2':
            tabTxts[0].name = txt;
            self.setData({
               // tab: [true, true, true],
               tabTxts: tabTxts,
               house_area: id,
               // his: true,
               line: 2,
            });
            break;
      };
      
      //数据筛选
    //   self.loadShopData();
      switch (e.currentTarget.dataset.did){
        case '0':
            if(this.data.key=='undefined'){
                this.setData({
                    key:'',
                });
            }
            if (this.data.catid == 'undefined') {
                this.setData({
                    catid: '',
                });
            }
            my.httpRequest({
                url: app.data.ceshiUrl + '/Api/Category/getProduct',
                data: {
                    num: '0.1',
                    key: this.data.key,
                    catid: this.data.catid,
                },
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    var status = res.data.status;
                    if (status == 1) {
                        that.setData({
                            pro: res.data.pro,
                            key: res.data.key,
                            catid: res.data.catid,
                        });

                    } else {
                        my.showToast({
                            content: res.data.err,
                            duration: 2000,
                        });
                    }
                }
            });
            break;
        case '1':
            if (this.data.key == 'undefined') {
                this.setData({
                    key: '',
                });
            }
            if (this.data.catid == 'undefined') {
                this.setData({
                    catid: '',
                });
            }
            my.httpRequest({
                url: app.data.ceshiUrl + '/Api/Category/getProduct',
                data: {
                    num: '1',
                    key: this.data.key,
                    catid: this.data.catid,
                },
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    var status = res.data.status;
                    if (status == 1) {
                        that.setData({
                            pro: res.data.pro,
                            key: res.data.key,
                            catid: res.data.catid,
                        });

                    } else {
                        my.showToast({
                            content: res.data.err,
                            duration: 2000,
                        });
                    }
                }
            });
            break;
        case '2':
            if (this.data.key == 'undefined') {
                this.setData({
                    key: '',
                });
            }
            if (this.data.catid == 'undefined') {
                this.setData({
                    catid: '',
                });
            }
            my.httpRequest({
                url: app.data.ceshiUrl + '/Api/Category/getProduct',
                data: {
                    num: '2',
                    key: this.data.key,
                    catid: this.data.catid,
                },
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    var status = res.data.status;
                    if (status == 1) {
                        that.setData({
                            pro: res.data.pro,
                            key: res.data.key,
                            catid: res.data.catid,
                        });

                    } else {
                        my.showToast({
                            content: res.data.err,
                            duration: 2000,
                        });
                    }
                }
            });
            break;
        case '3':
            if (this.data.key == 'undefined') {
                this.setData({
                    key: '',
                });
            }
            if (this.data.catid == 'undefined') {
                this.setData({
                    catid: '',
                });
            }
            my.httpRequest({
                url: app.data.ceshiUrl + '/Api/Category/getProduct',
                data: {
                    num: '3',
                    key: this.data.key,
                    catid: this.data.catid,
                },
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    var status = res.data.status;
                    if (status == 1) {
                        that.setData({
                            pro: res.data.pro,
                            key: res.data.key,
                            catid: res.data.catid,
                        });

                    } else {
                        my.showToast({
                            content: res.data.err,
                            duration: 2000,
                        });
                    }
                }
            });
            break;
    }
  },
  threes(e){
     var that=this;
     that.setData({
       pname2:e.currentTarget.dataset.txt,
      classifyHidden:false,
      showHidden:false
     });
     
    
      my.httpRequest({
          url: app.data.ceshiUrl + '/Api/Category/getProduct',
          method: 'post',
          data: {
              cate_id: e.currentTarget.dataset.id,
          },
          header: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },

          success: function (res) {
              //--init data 
              //    console.log(res.data.pro);
              var status = res.data.status;
              if (status == 1) {
                  that.setData({
                      pro: res.data.pro,
                      catid: res.data.catid,
                      array: res.data.category,
                  });

              } else {
                  that.setData({
                      array: res.data.category,
                      pro: res.data.pro,
                  });
                  my.showToast({
                      content: res.data.err,
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
});
