//app.js
const updateManager = wx.getUpdateManager();
App({
  globalData: {
  },
  onLaunch: function () {
    //检查版本更新
    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate();
    });
  }
})