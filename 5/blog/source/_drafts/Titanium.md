---
title: Titanium
url: 1478.html
id: 1478
tags:
---

Titanium 1.0及后续版本已经不再直接支持在HTML里与Titanium API通讯 与phoneGap对比

var win = Titanium.UI.createWindow();
var webview = Titanium.UI.createWebView({url: 'index.html'});
win.add(webview);
win.open();

Titanium.App.addEventListener('do\_something\_native', function(e) {
  // do something with "e" here, it contains the properties passed from the webview
  Ti.API.info('foo='+e.foo);
});

<html>

Titanium.App.fireEvent('do\_something\_native', {foo: 'bar'});

</html>