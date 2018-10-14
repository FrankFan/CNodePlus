//detail.js

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
        var content = res.data.data.content;
        this.setData({
          content: content || '暂无内容',
          loading: false,
        });
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