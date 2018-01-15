Page({
  data: {
    array:[1,2,3],
    tabNum:0
  },
  tabClick (e) {
    this.setData({
      tabNum:e.currentTarget.id
    })
  },
  onLoad() {},
});
