//index.js
const http = require('../../utils/httpClient.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    hidden: false,
    topicList: [],
  },
  //事件处理函数
  bindViewTap: function(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  onLoad: function() {
    this.fetchData();
    wx.setNavigationBarTitle({
      title: 'CNodePlus',
      success: (res) => {
        console.log('设置成功');
      }
    });
  },
  fetchData: function() {
    wx.request({
        method: 'get',
        url: 'https://cnodejs.org/api/v1/topics?tab=good',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: (res) => {
          var list = res.data.data;
          console.log(list);
          this.setData({
            topicList: list,
            hidden: true,
          });
      },
      fail: (res) => {
        console.log(res);
        this.setData({
          hidden: true,
        });
        wx.showToast({
          topicList: [],
          title: 'request failed',
        });
      },
    })
  },
});