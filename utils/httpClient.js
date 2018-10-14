/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function request(url, method, data, success, fail) {
  console.log("--------start-------");
  wx.request({
    url: url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: method,
    data: data,
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
  console.log("--------end---------");
}

module.exports = {
  request: request,
}