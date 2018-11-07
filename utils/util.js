const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const formatTagData = (top, good, str) => {
  const mapping = {
    'top': '置顶',
    'good': '精华',
    'share': '分享',
    'ask': '问答',
    'job': '招聘',
  };
  let tagClass = '';
  let tagText = '';
  if(top === true) {
    tagClass = 'top';
    tagText = '置顶';
  } else if (good === true) {
    tagClass = 'good';
    tagText = '精华';
  } else {
    tagClass = 'gray';
    tagText = mapping[str];
  }
  return {
    tagText,
    tagClass,
  }
}

module.exports = {
  formatTime: formatTime,
  formatTagData: formatTagData,
}