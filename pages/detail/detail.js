//detail.js
const app = getApp();

Page({
  data: {
    article: {},
  },
  tap() {
    console.log('tap')
  },
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    });
    var id = options.id;
    console.log('id= ' + id);
    this.getDetail(id);
    wx.setNavigationBarTitle({ title: 'Detail' });
  },
  onPullDownRefresh() {
    console.log('onPullDownRefresh');
  },
  onReachBottom() {
    console.log('onReachBottom');
  },
  getDetail(id) {
    wx.request({
      url: 'https://cnodejs.org/api/v1/topic/' + id + '?mdrender=false',
      method: 'get',
      success: (res) => {
        let article = res.data.data.content;
        let data = app.towxml.toJson(article, 'markdown');
        this.setData({
          article: data,
        });
        wx.hideLoading();
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