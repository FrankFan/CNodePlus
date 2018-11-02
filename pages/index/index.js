//index.js
const http = require('../../utils/httpClient.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    good: {
      list: [],
      page: 1,
    },
    share: {
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
      url: '../detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  onLoad: function() {
    wx.showLoading({
      title: '加载中...',
    });
    this.fetchData('good', this.data.good.page);
    wx.setNavigationBarTitle({
      title: 'CNodePlus'
    });
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
      method: 'get',
      url: `https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}`,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        var list = res.data.data;
        list = list.map((item, index) => {
          return {
            author: item.author,
            title: item.title,
            id: item.id,
          }
        });

        if (list.length < 40) {
          console.log('最后一页');
          this.setData({
            noMore: true,
            hasMore: false,
          });
        } else {
          var newList = []
          
          if (tab === 'good') {
            newList = this.data.good.list.concat(list);
            
            this.setData({
              good: {
                list: newList,
                page: page + 1,
              },
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
              hasMore: false,
            });
          } else if (tab === 'job') {
            newList = this.data.job.list.concat(list);
            this.setData({
              job: {
                list: newList,
                page: page + 1,
              },
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
  //滑动切换
  swiperTab: function(e) {
    const currentTabIndex = e.detail.current;
    this.setData({
      currentTab: currentTabIndex
    });
    const tab = this.getTabNameByIndex(currentTabIndex);
    if (this.data[tab].page <= 3 ) {
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

  loadWithTab: function (currentTabIndex) {
    wx.showLoading({
      title: '加载中...',
    });
    let tab = this.getTabNameByIndex(currentTabIndex);
    this.fetchData(tab, this.data[tab].page);
  },

  getTabNameByIndex: function(index) {
    let tab = '';
    if (index == '0') {
      tab = 'good';
    } else if (index == '1') {
      tab = 'share';
    } else if (index == '2') {
      tab = 'job';
    }
    return tab;
  }
});