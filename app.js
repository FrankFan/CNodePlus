//app.js
const Towxml = require('/towxml/main');

App({
  onLaunch: function () {
    console.log('App onLaunch');
  },
  towxml: new Towxml()
})