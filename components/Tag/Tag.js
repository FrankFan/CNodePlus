// components/Tag/Tag.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tagType: {
      type: String,
      value: 'pop',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    text: '',
  },
  
  ready() {
    const type = this.data.tagType;
    let text = '';
    let clazz = '';
    if(type === 'top') {
      text = '置顶';
      clazz = 'green';
    } else if(type === 'good') {
      text = '精华';
      clazz = 'green';
    } else if (type === 'share') {
      text = '分享';
      clazz = 'gray';
    } else if (type === 'ask') {
      text = '问答';
      clazz = 'gray';
    } else if (type === 'job') {
      text = '招聘';
      clazz = 'gray';
    }
    this.setData({
      clazz,
      text,
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
