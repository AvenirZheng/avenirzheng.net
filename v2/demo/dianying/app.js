 var webview = Titanium.UI.createWebView({url:'http://www.avenirzheng.net/demo/dianying'});
    var window = Titanium.UI.createWindow();
    window.add(webview);
    window.open({modal:true});