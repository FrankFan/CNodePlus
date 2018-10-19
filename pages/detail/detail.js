//detail.js
var WxParse = require('../../pages/wxParse/wxParse.js');

Page({
  data: {
    loading: true,
    content: '...',
  },
  onLoad(options) {
    var id = options.id;
    console.log('id= ' + id);
    this.getDetail(id);
    wx.setNavigationBarTitle({
      title: 'Detail',
      success: (res) => {
        console.log('设置成功');
      }
    });
  },
  onPullDownRefresh() {
    console.log('onPullDownRefresh');
  },
  onReachBottom() {
    console.log('onReachBottom');
  },
  getDetail(id) {
    wx.request({
      url: 'https://cnodejs.org/api/v1/topic/' + id + '?mdrender=true',
      method: 'get',
      success: (res) => {
        // console.log(res);
        var article = res.data.data.content;
        console.log(article);
        this.setData({
          content: article || '暂无内容',
          loading: false,
        });
        WxParse.wxParse('article', 'md', article, this, 5);
      },
      fail: (res) => {
        // console.log(res);
      },
      complete: res => {
        // console.log(res);
        // this.setData({
        //   loading: false,
        // });
      }
    })
  }
})