import { path } from '../config';
const errorIcon = "/images/icon/error.png";
function Request({ url, data, method, success, fail, complete }) {
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  wx.request({
    url: path + url,
    method: method,
    data: data,
    header: wx.getStorageSync("token") ?
      {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token")
      } : {
        'content-type': 'application/json'
      },
    success: (res) => {
      wx.hideLoading();
      let { data: { data, code, msg }, header: { token }, statusCode } = res;
      //校验服务端code 0正常，1异常
      if (!code && (statusCode < 400 && statusCode >= 200)) {
        if (success) {
          success(data);
        }
        //更新token
        if (token) {
          wx.setStorage({
            key: 'token',
            data: token,
          });
        }
      } else {
        if (statusCode < 200 || statusCode >= 400) {
          wx.showToast({
            title: "服务器故障",
            image: errorIcon,
            mask: true,
            duration: 3000
          });
          if (fail) {
            fail(res);
          }
        } else if (msg === "Token已过期" || msg === "Token不存在") {
          //抛出错误信息提示用户(最多7字)
          wx.showToast({
            title: msg === "Token已过期" ? '登录已过期' : "您尚未登录",
            image: errorIcon,
            mask: true,
            duration: 3000
          });
          wx.clearStorageSync();
        } else {
          //其他错误提示
          wx.showToast({
            title: msg,
            image: errorIcon,
            mask: true,
            duration: 3000
          });
        }
        //因服务器问题导致请求不到结果跳转fail
        if (fail) {
          fail(res);
        }
      }
    },
    fail: (res) => {
      wx.hideLoading();
      wx.showToast({
        title: "网络连接失败",
        image: errorIcon,
        mask: true,
        duration: 3000
      });
      if (fail) {
        fail(res);
      }
    },
    complete: (res) => {
      if (complete) {
        complete(res);
      }
    }
  });
}
module.exports = Request;