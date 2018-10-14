//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    toplicList: [],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.fetchData();
  },
  fetchData: function () {
    wx.request({
      url: 'https://cnodejs.org/api/v1/topics',
      success: (res) => {
        console.log(res);
        var list = res.data.data;
        debugger;
        this.setData({
          toplicList: list,
        });
      }
    })
  }
})
