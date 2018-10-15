//detail.js
var WxParse = require('../../pages/wxParse/wxParse.js');
console.log(WxParse);

Page({
  data: {
    loading: true,
    content: '...',
  },
  onLoad(options) {
    var id = options.id;
    console.log('id= ' + id);
    this.getDetail(id);
  },
  getDetail(id) {
    wx.request({
      url: 'https://cnodejs.org/api/v1/topic/' + id + '?mdrender=true',
      method: 'get',
      success: (res) => {
        console.log(res);
        var article = res.data.data.content;
        this.setData({
          content: article || '暂无内容',
          loading: false,
        });
        WxParse.wxParse('article', 'md', article, this, 5);
      },
      fail: (res) => {
        console.log(res);
      },
      complete: res => {
        console.log(res);
        this.setData({
          loading: false,
        });
      }
    })
  }
})