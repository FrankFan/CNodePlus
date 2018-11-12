//index.js
const util = require('../../utils/util.js')

//获取应用实例
const app = getApp()

Page({
  data: {
    all: {
      list: [],
      page: 1,
    },
    good: {
      list: [],
      page: 1,
    },
    share: {
      list: [],
      page: 1,
    },
    ask: {
      list: [],
      page: 1,
    },
    job: {
      list: [],
      page: 1,
    },
    hasMore: false,
    noMore: false,
    currentTab: 0,
  },
  bindViewTap: function(e) {
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    });
    if (options.id) {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${options.id}`
      })
    }
    this.fetchData('all', this.data.all.page);
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        });
      }
    });
  },
  fetchData: function(tab, page) {
    wx.request({
      method: 'GET',
      url: `https://cnodejs.org/api/v1/topics`,
      data: {
        tab,
        page,
        mdrender: false,
        limit: 15,
      },
      dataType: 'json',
      success: (res) => {
        var data = res.data;
        var list = [];
        // if(typeof data === 'string') {
        //   data = todo here
        // https://developers.weixin.qq.com/community/develop/doc/65e75c21d2fc4c97a12faafb92ee05b9
        // }
        if(data.data && data.data.length > 0) {
          list = data.data;
        }
        list = list.map((item, index) => {
          const {
            tagClass,
            tagText,
          } = util.formatTagData(item.top, item.good, item.tab)
          return {
            author: item.author,
            title: item.title,
            content: item.content && item.content.substring(0, 100),
            id: item.id,
            tagClass,
            tagText,
            replyCount: item.reply_count,
            visitCount: item.visit_count,
            createAt: util.formatTime(new Date(item.create_at)),
          }
        });

        if (list.length < 15 && this.data.all.page > 1) {
          console.log('最后一页');
          this.setData({
            all: {
              list,
            },
            noMore: true,
            hasMore: false,
          });
        } else {
          var newList = []

          if (tab === 'all') {
            newList = this.data.all.list.concat(list);
            this.setData({
              all: {
                list: newList,
                page: page + 1,
              },
              noMore: false,
              hasMore: false,
            });
          } else if (tab === 'good') {
            newList = this.data.good.list.concat(list);

            this.setData({
              good: {
                list: newList,
                page: page + 1,
              },
              noMore: false,
              hasMore: false,
            });
          } else if (tab === 'share') {
            newList = this.data.share.list.concat(list);
            const share = this.data.share;
            this.setData({
              share: {
                list: newList,
                page: page + 1,
              },
              noMore: false,
              hasMore: false,
            });
          } else if (tab === 'ask') {
            newList = this.data.ask.list.concat(list);
            this.setData({
              ask: {
                list: newList,
                page: page + 1,
              },
              noMore: false,
              hasMore: false,
            });
          } else if (tab === 'job') {
            newList = this.data.job.list.concat(list);
            this.setData({
              job: {
                list: newList,
                page: page + 1,
              },
              noMore: false,
              hasMore: false,
            });
          }
        }
        wx.hideLoading();
      },
      fail: (res) => {
        console.log(res);
        wx.showToast({
          goodList: [],
          title: 'request failed',
        });
      },
    })
  },
  loadMore: function(e) {
    const tab = e.target.dataset.tab;
    console.log(`loadmore tab = ${tab}  page = ` + this.data[tab].page);
    this.setData({
      hasMore: true,
    });
    this.fetchData(tab, this.data[tab].page);
  },
  refresh: function() {
    console.log('scrolltoupper');
  },
  //滑动切换
  swiperTab: function(e) {
    const currentTabIndex = e.detail.current;
    this.setData({
      currentTab: currentTabIndex
    });
    const tab = this.getTabNameByIndex(currentTabIndex);
    if (this.data[tab].page <= 3) {
      this.loadWithTab(currentTabIndex);
    }
  },
  //点击切换
  clickTab: function(e) {
    const currentTab = this.data.currentTab;
    const currentTabIndex = e.target.dataset.current;
    if (currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      });
    }
    this.loadWithTab(currentTabIndex);
  },

  loadWithTab: function(currentTabIndex) {
    wx.showLoading({
      title: '加载中...',
    });
    let tab = this.getTabNameByIndex(currentTabIndex);
    this.fetchData(tab, this.data[tab].page);
  },

  getTabNameByIndex: function(index) {
    let tab = '';
    if (index == '0') {
      tab = 'all';
    } else if (index == '1') {
      tab = 'good';
    } else if (index == '2') {
      tab = 'share';
    } else if (index == '3') {
      tab = 'ask';
    } else if (index == '4') {
      tab = 'job';
    }
    return tab;
  }
});