//detail.js
const util = require('../../utils/util.js')

const app = getApp();

Page({
  data: {
    article: {},
  },
  tap() {
    console.log('tap')
  },
  onShareAppMessage: function (res) {
    console.log(`id = ${this.data.id}`);
    return {
      title: this.data.title,
      path: `/pages/index/index?id=${this.data.id}`
    }
  },
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    });
    var id = options.id;
    this.getDetail(id);
    wx.setNavigationBarTitle({ title: 'Detail' });
  },
  onPullDownRefresh() {
    console.log('onPullDownRefresh');
    setTimeout(function() {
      wx.stopPullDownRefresh();
    } ,1500);
  },
  onReachBottom() {
    console.log('onReachBottom');
  },
  getDetail(id) {
    wx.request({
      url: `https://cnodejs.org/api/v1/topic/${id}?mdrender=false`,
      method: 'get',
      success: (res) => {
        let article = res.data.data.content;
        const {
          id,
          author,
          title,
          create_at,
        } = res.data.data;
        let data = app.towxml.toJson(article, 'markdown');
        this.setData({
          id,
          article: data,
          author,
          title,
          create_at: util.formatTime(new Date(create_at))
        });
        wx.hideLoading();
      },
      fail: (res) => {
        console.log(res);
      },
      complete: res => {
      }
    })
  }
})