//detail.js
const util = require('../../utils/util.js')

const app = getApp();

Page({
  data: {
    article: {},
    reply: {},
  },
  tap() {
    console.log('tap')
  },
  onShareAppMessage: function(res) {
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
    wx.setNavigationBarTitle({
      title: 'Detail'
    });
  },
  onPullDownRefresh() {
    console.log('onPullDownRefresh');
    setTimeout(function() {
      wx.stopPullDownRefresh();
    }, 1500);
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
          replies,
        } = res.data.data;
        let data = app.towxml.toJson(article, 'markdown');
        let repliesFormatData = [];
        if (replies.length > 0) {
          repliesFormatData = replies.map((item, index) => {
            return {
              avatarUrl: item.author.avatar_url,
              loginname: item.author.loginname,
              index: index + 1,
              replyDate: util.formatTime(new Date(create_at)),
              content: item.content,
            }
          });
        }
        this.setData({
          id,
          article: data,
          author,
          title,
          create_at: util.formatTime(new Date(create_at)),
          replies: repliesFormatData,
        });
        wx.hideLoading();
      },
      fail: (res) => {
        console.log(res);
      },
      complete: res => {}
    })
  }
})