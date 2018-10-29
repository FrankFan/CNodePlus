//index.js
const http = require('../../utils/httpClient.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    goodList: [],
    jobList: [],
    shareList: [],
    page: 1,
    hasMore: false,
    currentTab: 0,
  },
  //事件处理函数
  bindViewTap: function(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  onLoad: function() {
    wx.showLoading({
      title: '加载中...',
    });
    this.fetchData('good', this.data.page);
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
            newList = this.data.goodList.concat(list);
            this.setData({
              goodList: newList,
              page: page + 1,
              hasMore: false,
            });
          } else if (tab === 'share') {
            newList = this.data.shareList.concat(list);
            this.setData({
              shareList: newList,
              page: page + 1,
              hasMore: false,
            });
          } else if (tab === 'job') {
            newList = this.data.jobList.concat(list);
            this.setData({
              jobList: newList,
              page: page + 1,
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
    console.log('loadmore ' + this.data.page);
    this.setData({
      hasMore: true,
    });
    console.log(tab);
    this.fetchData(tab, this.data.page);
  },
  //滑动切换
  swiperTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
    if(this.data.page <= 3 ) {
      this.loadWithTab(e.detail.current);
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
    console.log('loadWithTab');
    let tab = '';
    if (currentTabIndex == '0') {
      tab = 'good';
    } else if (currentTabIndex == '1') {
      tab = 'share';
    } else if (currentTabIndex == '2') {
      tab = 'job';
    }
    console.log(`tab = ${tab}`);
    this.fetchData(tab, this.data.page);
  }
});