//index.js
import Request from '../../utils/Request';
Page({
  data: {
  },
  onLoad: function ({ a, v, c }) {
    Request({
      url: '/public/getcase',
      method: 'POST',
      success: (data) => {
      },
      fail: () => {
      },
      complete: () => {
      }
    });
  }
})
