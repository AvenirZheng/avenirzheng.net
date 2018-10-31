var canvas, context, totalGifFrames, buffer, gif, pixels;



function isPageHidden() {
    return document.hidden || document.msHidden || document.webkitHidden || document.mozHidden;
}

window.mobilecheck = function () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};


window.mobileAndTabletcheck = function () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1dGlsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBjYW52YXMsIGNvbnRleHQsIHRvdGFsR2lmRnJhbWVzLCBidWZmZXIsIGdpZiwgcGl4ZWxzO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBpc1BhZ2VIaWRkZW4oKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuaGlkZGVuIHx8IGRvY3VtZW50Lm1zSGlkZGVuIHx8IGRvY3VtZW50LndlYmtpdEhpZGRlbiB8fCBkb2N1bWVudC5tb3pIaWRkZW47XHJcbn1cclxuXHJcbndpbmRvdy5tb2JpbGVjaGVjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBjaGVjayA9IGZhbHNlO1xyXG4gICAgKGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgaWYgKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm8vaS50ZXN0KGEpIHx8IC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYS5zdWJzdHIoMCwgNCkpKVxyXG4gICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICB9KShuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93Lm9wZXJhKTtcclxuICAgIHJldHVybiBjaGVjaztcclxufTtcclxuXHJcblxyXG53aW5kb3cubW9iaWxlQW5kVGFibGV0Y2hlY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgY2hlY2sgPSBmYWxzZTtcclxuICAgIChmdW5jdGlvbiAoYSkge1xyXG4gICAgICAgIGlmICgvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vfGFuZHJvaWR8aXBhZHxwbGF5Ym9va3xzaWxrL2kudGVzdChhKSB8fCAvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsIDQpKSlcclxuICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgfSkobmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvdy5vcGVyYSk7XHJcbiAgICByZXR1cm4gY2hlY2s7XHJcbn07Il0sImZpbGUiOiJ1dGlsLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var SERVER = "/";

/*
if (window.location.hostname == 'codeology.lhx')
    SERVER = "http://codeology.lhx/";
if (window.location.hostname == '54.191.204.67')
    SERVER = "http://54.191.204.67/";
if (window.location.hostname == 'codeology.braintreepayments.com')
    SERVER = "http://codeology.braintreepayments.com/";
if (window.location.hostname == 'localhost')
    SERVER = "http://codeology.braintreepayments.com/";
*/
SERVER = SERVER.replace('http:', window.location.protocol);

var TYPES_STRING = 'unknown, JavaScript, HTML, Ruby, Java, PHP, Python, C, C++, CSS, Shell, C#, Objective-C, Perl, CoffeeScript, Go, Scala, VimL, R, Haskell, Clojure, Lua, Groovy, Emacs Lisp, Erlang, Puppet, TeX, Swift, Matlab, ActionScript, Arduino, Batchfile, GLSL, OCaml, Tcl, Visual Basic, TypeScript, D, Assembly, Common Lisp, Dart, Prolog, XSLT, PowerShell, Scheme, FORTRAN, Rust, ASP, Processing, Julia, F#, Elixir, ColdFusion, Vala, Apex, Racket, VHDL, Pascal, Smalltalk, Haxe, Verilog, Logos, Delphi, Makefile, Kotlin, AutoHotkey, CMake, QMake, UnrealScript, LiveScript, HaXe, BlitzBasic, IDL, Standard ML, XML, SQL, OpenEdge ABL, Objective-C++, AppleScript, SuperCollider, PureScript, Eiffel, Elm, Gosu, M, Smarty, Pure Data, nesC, XQuery, SQF, Scilab, DOT, Postscript, Cuda, Slash, Max, Game Maker Language, AutoIt, Mathematica, SourcePawn, Groff';
var TYPES = TYPES_STRING.split(', ');

var MOBILE_VERSION = window.mobileAndTabletcheck();
var SKIP_INTRO = false;
var HISTORY_ENABLED = true;
var MIN_FPS = 10;

var ZOOM_IN_MIN = 300;
var ZOOM_IN_MAX = 900;
var ZOOM_IN = 500;

var asciiShader = {enabled: true};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb25maWcuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIFNFUlZFUiA9IFwiL1wiO1xyXG5cclxuLypcclxuaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PSAnY29kZW9sb2d5LmxoeCcpXHJcbiAgICBTRVJWRVIgPSBcImh0dHA6Ly9jb2Rlb2xvZ3kubGh4L1wiO1xyXG5pZiAod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09ICc1NC4xOTEuMjA0LjY3JylcclxuICAgIFNFUlZFUiA9IFwiaHR0cDovLzU0LjE5MS4yMDQuNjcvXCI7XHJcbmlmICh3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT0gJ2NvZGVvbG9neS5icmFpbnRyZWVwYXltZW50cy5jb20nKVxyXG4gICAgU0VSVkVSID0gXCJodHRwOi8vY29kZW9sb2d5LmJyYWludHJlZXBheW1lbnRzLmNvbS9cIjtcclxuaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PSAnbG9jYWxob3N0JylcclxuICAgIFNFUlZFUiA9IFwiaHR0cDovL2NvZGVvbG9neS5icmFpbnRyZWVwYXltZW50cy5jb20vXCI7XHJcbiovXHJcblNFUlZFUiA9IFNFUlZFUi5yZXBsYWNlKCdodHRwOicsIHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCk7XHJcblxyXG52YXIgVFlQRVNfU1RSSU5HID0gJ3Vua25vd24sIEphdmFTY3JpcHQsIEhUTUwsIFJ1YnksIEphdmEsIFBIUCwgUHl0aG9uLCBDLCBDKyssIENTUywgU2hlbGwsIEMjLCBPYmplY3RpdmUtQywgUGVybCwgQ29mZmVlU2NyaXB0LCBHbywgU2NhbGEsIFZpbUwsIFIsIEhhc2tlbGwsIENsb2p1cmUsIEx1YSwgR3Jvb3Z5LCBFbWFjcyBMaXNwLCBFcmxhbmcsIFB1cHBldCwgVGVYLCBTd2lmdCwgTWF0bGFiLCBBY3Rpb25TY3JpcHQsIEFyZHVpbm8sIEJhdGNoZmlsZSwgR0xTTCwgT0NhbWwsIFRjbCwgVmlzdWFsIEJhc2ljLCBUeXBlU2NyaXB0LCBELCBBc3NlbWJseSwgQ29tbW9uIExpc3AsIERhcnQsIFByb2xvZywgWFNMVCwgUG93ZXJTaGVsbCwgU2NoZW1lLCBGT1JUUkFOLCBSdXN0LCBBU1AsIFByb2Nlc3NpbmcsIEp1bGlhLCBGIywgRWxpeGlyLCBDb2xkRnVzaW9uLCBWYWxhLCBBcGV4LCBSYWNrZXQsIFZIREwsIFBhc2NhbCwgU21hbGx0YWxrLCBIYXhlLCBWZXJpbG9nLCBMb2dvcywgRGVscGhpLCBNYWtlZmlsZSwgS290bGluLCBBdXRvSG90a2V5LCBDTWFrZSwgUU1ha2UsIFVucmVhbFNjcmlwdCwgTGl2ZVNjcmlwdCwgSGFYZSwgQmxpdHpCYXNpYywgSURMLCBTdGFuZGFyZCBNTCwgWE1MLCBTUUwsIE9wZW5FZGdlIEFCTCwgT2JqZWN0aXZlLUMrKywgQXBwbGVTY3JpcHQsIFN1cGVyQ29sbGlkZXIsIFB1cmVTY3JpcHQsIEVpZmZlbCwgRWxtLCBHb3N1LCBNLCBTbWFydHksIFB1cmUgRGF0YSwgbmVzQywgWFF1ZXJ5LCBTUUYsIFNjaWxhYiwgRE9ULCBQb3N0c2NyaXB0LCBDdWRhLCBTbGFzaCwgTWF4LCBHYW1lIE1ha2VyIExhbmd1YWdlLCBBdXRvSXQsIE1hdGhlbWF0aWNhLCBTb3VyY2VQYXduLCBHcm9mZic7XHJcbnZhciBUWVBFUyA9IFRZUEVTX1NUUklORy5zcGxpdCgnLCAnKTtcclxuXHJcbnZhciBNT0JJTEVfVkVSU0lPTiA9IHdpbmRvdy5tb2JpbGVBbmRUYWJsZXRjaGVjaygpO1xyXG52YXIgU0tJUF9JTlRSTyA9IGZhbHNlO1xyXG52YXIgSElTVE9SWV9FTkFCTEVEID0gdHJ1ZTtcclxudmFyIE1JTl9GUFMgPSAxMDtcclxuXHJcbnZhciBaT09NX0lOX01JTiA9IDMwMDtcclxudmFyIFpPT01fSU5fTUFYID0gOTAwO1xyXG52YXIgWk9PTV9JTiA9IDUwMDtcclxuXHJcbnZhciBhc2NpaVNoYWRlciA9IHtlbmFibGVkOiB0cnVlfTsiXSwiZmlsZSI6ImNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var alphabetTexture;
var fontWidth = 10;
var fontHeight = 14;
var uniforms;
var alphabetCanvas;
var dpr = 1;
var charNum = 128;
var renderWindow = {width: window.innerWidth, height: window.innerHeight};
var asciiMode = 0;

function initPostprocessing() {

    var image = new Image(), texture = new THREE.Texture(image);
    var hash = document.createElement("canvas");
    hash.style.opacity = 0;
    image.onload = function () {
        texture.needsUpdate = true;
    };
    image.src = hash.toDataURL();

    var alphabetImage = new Image();
    alphabetCanvas = document.createElement('canvas');
    alphabetCanvas.setAttribute("id", "alphabetCanvas");

    alphabetTexture = new THREE.Texture(alphabetCanvas);
    alphabetTexture.needsUpdate = true;
    alphabetTexture.minFilter = THREE.NearestFilter;

    updateAlphabet();

    asciiShader.scene = new THREE.Scene();
    asciiShader.camera = new THREE.OrthographicCamera(renderWindow.width / -2, renderWindow.width / 2, renderWindow.height / 2, renderWindow.height / -2, -10000, 10000);
    asciiShader.camera.position.z = 100;

    var pars = {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat};
    asciiShader.rtTextureDepth = new THREE.WebGLRenderTarget(renderWindow.width, renderWindow.height, pars);
    asciiShader.rtTextureColor = new THREE.WebGLRenderTarget(renderWindow.width, renderWindow.height, pars);
    asciiShader.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), null);
    asciiShader.quad.position.z = -500;
    asciiShader.scene.add(asciiShader.quad);
}

function updateAlphabet(string) {
    if (!string || string === "")
        string = '.\'`^",:;Il!i~+_-?][}{1)(/tfjrxnuvczmwqpdbkhaoXYUJCLQ0OZ#MW&8%B@$';
    alphabetCanvas.width = charNum * fontWidth * dpr;
    alphabetCanvas.height = fontHeight * dpr;
    var ctx = alphabetCanvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, alphabetCanvas.width, alphabetCanvas.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = '#FFFFFF';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 3 * dpr;
    ctx.font = fontHeight * 1.0 * dpr + "px arial";
    ctx.scale(1, -1);
    ctx.textAlign = 'center';
    for (var i = 0; i < charNum; i++) {
        var id = Math.floor(string.length * (1 - (i + 1) / (charNum)));
        var letter = string.substr(id, 1);
        for (var j = 0; j < 3; j++) {
            ctx.fillText(letter, (0.5 + i * fontWidth + fontWidth / 2 - 0.5) * dpr, -2.5 * dpr);
        }
    }
    alphabetTexture.needsUpdate = true;
}

function resizePostprocessing() {
    if (!asciiShader.camera)
        return;
    renderer.setSize(windowWidth, windowHeight);
    //renderer.domElement.style.position = "absolute";
    //renderer.domElement.style.top = headerHeight + "px";

    renderWindow = {width: windowWidth, height: windowHeight};

    asciiShader.camera.left = renderWindow.width / -2;
    asciiShader.camera.right = renderWindow.width / 2;
    asciiShader.camera.top = renderWindow.height / 2;
    asciiShader.camera.bottom = renderWindow.height / -2;
    asciiShader.camera.updateProjectionMatrix();

    asciiShader.quad.scale.x = renderWindow.width;
    asciiShader.quad.scale.y = renderWindow.height;

    var pars = {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat};
    asciiShader.rtTextureColor = new THREE.WebGLRenderTarget(renderWindow.width, renderWindow.height, pars);
    asciiShader.material = new THREE.ShaderMaterial({
        uniforms: {
            inputTexture: {type: 't', value: asciiShader.rtTextureColor},
            asciiTexture: {type: 't', value: alphabetTexture},
            hashTexture: {type: 't', value: THREE.ImageUtils.loadTexture("/assets/images/fontHash.png")}, //
            mode: {type: 'f', value: asciiMode},
            numChars: {type: 'f', value: charNum},
            rx: {type: 'f', value: renderWindow.width},
            ry: {type: 'f', value: renderWindow.height},
            charMapSize: {type: 'f', value: charNum * fontWidth},
            fontSize: {type: 'v2', value: new THREE.Vector2(fontWidth, fontHeight)}

        },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        side: THREE.DoubleSide
    });

    uniforms = asciiShader.material.uniforms;

    var material = new THREE.ShaderMaterial({
        fragmentShader: asciiShader.material.fragmentShader,
        vertexShader: asciiShader.material.vertexShader,
        uniforms: uniforms
    });

    asciiShader.quad.material = material;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhc2NpaS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYWxwaGFiZXRUZXh0dXJlO1xyXG52YXIgZm9udFdpZHRoID0gMTA7XHJcbnZhciBmb250SGVpZ2h0ID0gMTQ7XHJcbnZhciB1bmlmb3JtcztcclxudmFyIGFscGhhYmV0Q2FudmFzO1xyXG52YXIgZHByID0gMTtcclxudmFyIGNoYXJOdW0gPSAxMjg7XHJcbnZhciByZW5kZXJXaW5kb3cgPSB7d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodH07XHJcbnZhciBhc2NpaU1vZGUgPSAwO1xyXG5cclxuZnVuY3Rpb24gaW5pdFBvc3Rwcm9jZXNzaW5nKCkge1xyXG5cclxuICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpLCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUoaW1hZ2UpO1xyXG4gICAgdmFyIGhhc2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgaGFzaC5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgIH07XHJcbiAgICBpbWFnZS5zcmMgPSBoYXNoLnRvRGF0YVVSTCgpO1xyXG5cclxuICAgIHZhciBhbHBoYWJldEltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICBhbHBoYWJldENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgYWxwaGFiZXRDYW52YXMuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJhbHBoYWJldENhbnZhc1wiKTtcclxuXHJcbiAgICBhbHBoYWJldFRleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZShhbHBoYWJldENhbnZhcyk7XHJcbiAgICBhbHBoYWJldFRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG4gICAgYWxwaGFiZXRUZXh0dXJlLm1pbkZpbHRlciA9IFRIUkVFLk5lYXJlc3RGaWx0ZXI7XHJcblxyXG4gICAgdXBkYXRlQWxwaGFiZXQoKTtcclxuXHJcbiAgICBhc2NpaVNoYWRlci5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xyXG4gICAgYXNjaWlTaGFkZXIuY2FtZXJhID0gbmV3IFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYShyZW5kZXJXaW5kb3cud2lkdGggLyAtMiwgcmVuZGVyV2luZG93LndpZHRoIC8gMiwgcmVuZGVyV2luZG93LmhlaWdodCAvIDIsIHJlbmRlcldpbmRvdy5oZWlnaHQgLyAtMiwgLTEwMDAwLCAxMDAwMCk7XHJcbiAgICBhc2NpaVNoYWRlci5jYW1lcmEucG9zaXRpb24ueiA9IDEwMDtcclxuXHJcbiAgICB2YXIgcGFycyA9IHttaW5GaWx0ZXI6IFRIUkVFLkxpbmVhckZpbHRlciwgbWFnRmlsdGVyOiBUSFJFRS5MaW5lYXJGaWx0ZXIsIGZvcm1hdDogVEhSRUUuUkdCRm9ybWF0fTtcclxuICAgIGFzY2lpU2hhZGVyLnJ0VGV4dHVyZURlcHRoID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0KHJlbmRlcldpbmRvdy53aWR0aCwgcmVuZGVyV2luZG93LmhlaWdodCwgcGFycyk7XHJcbiAgICBhc2NpaVNoYWRlci5ydFRleHR1cmVDb2xvciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlclRhcmdldChyZW5kZXJXaW5kb3cud2lkdGgsIHJlbmRlcldpbmRvdy5oZWlnaHQsIHBhcnMpO1xyXG4gICAgYXNjaWlTaGFkZXIucXVhZCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KDEsIDEpLCBudWxsKTtcclxuICAgIGFzY2lpU2hhZGVyLnF1YWQucG9zaXRpb24ueiA9IC01MDA7XHJcbiAgICBhc2NpaVNoYWRlci5zY2VuZS5hZGQoYXNjaWlTaGFkZXIucXVhZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUFscGhhYmV0KHN0cmluZykge1xyXG4gICAgaWYgKCFzdHJpbmcgfHwgc3RyaW5nID09PSBcIlwiKVxyXG4gICAgICAgIHN0cmluZyA9ICcuXFwnYF5cIiw6O0lsIWl+K18tP11bfXsxKSgvdGZqcnhudXZjem13cXBkYmtoYW9YWVVKQ0xRME9aI01XJjglQkAkJztcclxuICAgIGFscGhhYmV0Q2FudmFzLndpZHRoID0gY2hhck51bSAqIGZvbnRXaWR0aCAqIGRwcjtcclxuICAgIGFscGhhYmV0Q2FudmFzLmhlaWdodCA9IGZvbnRIZWlnaHQgKiBkcHI7XHJcbiAgICB2YXIgY3R4ID0gYWxwaGFiZXRDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xyXG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIGFscGhhYmV0Q2FudmFzLndpZHRoLCBhbHBoYWJldENhbnZhcy5oZWlnaHQpO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRkZGRlwiO1xyXG4gICAgY3R4LnNoYWRvd0NvbG9yID0gJyNGRkZGRkYnO1xyXG4gICAgY3R4LnNoYWRvd09mZnNldFggPSAwO1xyXG4gICAgY3R4LnNoYWRvd09mZnNldFkgPSAwO1xyXG4gICAgY3R4LnNoYWRvd0JsdXIgPSAzICogZHByO1xyXG4gICAgY3R4LmZvbnQgPSBmb250SGVpZ2h0ICogMS4wICogZHByICsgXCJweCBCVE1vbm9cIjtcclxuICAgIGN0eC5zY2FsZSgxLCAtMSk7XHJcbiAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJOdW07IGkrKykge1xyXG4gICAgICAgIHZhciBpZCA9IE1hdGguZmxvb3Ioc3RyaW5nLmxlbmd0aCAqICgxIC0gKGkgKyAxKSAvIChjaGFyTnVtKSkpO1xyXG4gICAgICAgIHZhciBsZXR0ZXIgPSBzdHJpbmcuc3Vic3RyKGlkLCAxKTtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDM7IGorKykge1xyXG4gICAgICAgICAgICBjdHguZmlsbFRleHQobGV0dGVyLCAoMC41ICsgaSAqIGZvbnRXaWR0aCArIGZvbnRXaWR0aCAvIDIgLSAwLjUpICogZHByLCAtMi41ICogZHByKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhbHBoYWJldFRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNpemVQb3N0cHJvY2Vzc2luZygpIHtcclxuICAgIGlmICghYXNjaWlTaGFkZXIuY2FtZXJhKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7XHJcbiAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS50b3AgPSBoZWFkZXJIZWlnaHQgKyBcInB4XCI7XHJcblxyXG4gICAgcmVuZGVyV2luZG93ID0ge3dpZHRoOiB3aW5kb3dXaWR0aCwgaGVpZ2h0OiB3aW5kb3dIZWlnaHR9O1xyXG5cclxuICAgIGFzY2lpU2hhZGVyLmNhbWVyYS5sZWZ0ID0gcmVuZGVyV2luZG93LndpZHRoIC8gLTI7XHJcbiAgICBhc2NpaVNoYWRlci5jYW1lcmEucmlnaHQgPSByZW5kZXJXaW5kb3cud2lkdGggLyAyO1xyXG4gICAgYXNjaWlTaGFkZXIuY2FtZXJhLnRvcCA9IHJlbmRlcldpbmRvdy5oZWlnaHQgLyAyO1xyXG4gICAgYXNjaWlTaGFkZXIuY2FtZXJhLmJvdHRvbSA9IHJlbmRlcldpbmRvdy5oZWlnaHQgLyAtMjtcclxuICAgIGFzY2lpU2hhZGVyLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XHJcblxyXG4gICAgYXNjaWlTaGFkZXIucXVhZC5zY2FsZS54ID0gcmVuZGVyV2luZG93LndpZHRoO1xyXG4gICAgYXNjaWlTaGFkZXIucXVhZC5zY2FsZS55ID0gcmVuZGVyV2luZG93LmhlaWdodDtcclxuXHJcbiAgICB2YXIgcGFycyA9IHttaW5GaWx0ZXI6IFRIUkVFLkxpbmVhckZpbHRlciwgbWFnRmlsdGVyOiBUSFJFRS5MaW5lYXJGaWx0ZXIsIGZvcm1hdDogVEhSRUUuUkdCRm9ybWF0fTtcclxuICAgIGFzY2lpU2hhZGVyLnJ0VGV4dHVyZUNvbG9yID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0KHJlbmRlcldpbmRvdy53aWR0aCwgcmVuZGVyV2luZG93LmhlaWdodCwgcGFycyk7XHJcbiAgICBhc2NpaVNoYWRlci5tYXRlcmlhbCA9IG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCh7XHJcbiAgICAgICAgdW5pZm9ybXM6IHtcclxuICAgICAgICAgICAgaW5wdXRUZXh0dXJlOiB7dHlwZTogJ3QnLCB2YWx1ZTogYXNjaWlTaGFkZXIucnRUZXh0dXJlQ29sb3J9LFxyXG4gICAgICAgICAgICBhc2NpaVRleHR1cmU6IHt0eXBlOiAndCcsIHZhbHVlOiBhbHBoYWJldFRleHR1cmV9LFxyXG4gICAgICAgICAgICBoYXNoVGV4dHVyZToge3R5cGU6ICd0JywgdmFsdWU6IFRIUkVFLkltYWdlVXRpbHMubG9hZFRleHR1cmUoXCIvYXNzZXRzL2ltYWdlcy9mb250SGFzaC5wbmdcIil9LCAvL1xyXG4gICAgICAgICAgICBtb2RlOiB7dHlwZTogJ2YnLCB2YWx1ZTogYXNjaWlNb2RlfSxcclxuICAgICAgICAgICAgbnVtQ2hhcnM6IHt0eXBlOiAnZicsIHZhbHVlOiBjaGFyTnVtfSxcclxuICAgICAgICAgICAgcng6IHt0eXBlOiAnZicsIHZhbHVlOiByZW5kZXJXaW5kb3cud2lkdGh9LFxyXG4gICAgICAgICAgICByeToge3R5cGU6ICdmJywgdmFsdWU6IHJlbmRlcldpbmRvdy5oZWlnaHR9LFxyXG4gICAgICAgICAgICBjaGFyTWFwU2l6ZToge3R5cGU6ICdmJywgdmFsdWU6IGNoYXJOdW0gKiBmb250V2lkdGh9LFxyXG4gICAgICAgICAgICBmb250U2l6ZToge3R5cGU6ICd2MicsIHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yMihmb250V2lkdGgsIGZvbnRIZWlnaHQpfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHZlcnRleFNoYWRlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZlcnRleFNoYWRlcicpLnRleHRDb250ZW50LFxyXG4gICAgICAgIGZyYWdtZW50U2hhZGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnJhZ21lbnRTaGFkZXInKS50ZXh0Q29udGVudCxcclxuICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlXHJcbiAgICB9KTtcclxuXHJcbiAgICB1bmlmb3JtcyA9IGFzY2lpU2hhZGVyLm1hdGVyaWFsLnVuaWZvcm1zO1xyXG5cclxuICAgIHZhciBtYXRlcmlhbCA9IG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCh7XHJcbiAgICAgICAgZnJhZ21lbnRTaGFkZXI6IGFzY2lpU2hhZGVyLm1hdGVyaWFsLmZyYWdtZW50U2hhZGVyLFxyXG4gICAgICAgIHZlcnRleFNoYWRlcjogYXNjaWlTaGFkZXIubWF0ZXJpYWwudmVydGV4U2hhZGVyLFxyXG4gICAgICAgIHVuaWZvcm1zOiB1bmlmb3Jtc1xyXG4gICAgfSk7XHJcblxyXG4gICAgYXNjaWlTaGFkZXIucXVhZC5tYXRlcmlhbCA9IG1hdGVyaWFsO1xyXG59Il0sImZpbGUiOiJhc2NpaS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var shading = THREE.FlatShading;//THREE.SmoothShading//
var shininess = 50;

var sphere, sphere2, plane, title;
var start = Date.now();
var geoms = [];
var materials = [];
var meshFaceMaterial;
var Seed;
var rolloverMesh;
var sampleMat;
var rollOverObject, rollOverObject2;
var timer = 0;

var size = 0.5;

function bugGlobals() {
    generateGeometries();

    rollOverObject = new THREE.Group();
    rollOverObject2 = new THREE.Group();
    scene.add(rollOverObject);
    scene.add(rollOverObject2);

    for (var i = 0; i < TYPES.length; i++) {
        var greymat = new THREE.MeshPhongMaterial({color: 0, shininess: shininess, shading: shading, wireframe: wireframe, wireframeLinewidth: 15,
            side: THREE.DoubleSide});

        setColor(greymat, i);
        materials.push(greymat);
    }
    meshFaceMaterial = new THREE.MeshFaceMaterial(materials);

    sampleMat = new THREE.MeshPhongMaterial({color: 0xffffff, shininess: shininess, shading: shading, wireframe: wireframe, wireframeLinewidth: 15,
        side: THREE.DoubleSide});
}

function setColor(sampleMat, id) {
    sampleMat.color.setHSL(Math.cos(id * 4.1) / 2 + 0.5, 0.8, 0.6);
}

function generateGeometries() {
    addGeom(new THREE.TetrahedronGeometry(20, 1), [0, 0, 0], [40, 0, 0], [1, 1, 1]);

    // TEST AREA
    for (var i = 0; i < 100; i++) {
        //addGeom(Minerals(new THREE.CircleGeometry(15, 6)), [0, 0, 0], [0, 20, 0], [2, 1, 1])

    }

    // MINERALS PETTLE
    addGeom(Minerals(Pettle()), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(Minerals(Pettle()), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.CircleGeometry(15, 6)), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.CircleGeometry(15, 6)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);

    // MINERALS HORNS
    addGeom(Minerals(new THREE.CylinderGeometry(3, 10, 20, 3, 1)), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.CylinderGeometry(3, 10, 20, 3, 1)), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.CylinderGeometry(3, 10, 20, 3, 1)), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.CylinderGeometry(3, 10, 20, 3, 1)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);

    // BUBBLES
    addGeom(Grid(new THREE.SphereGeometry(4, 6, 4)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.SphereGeometry(4, 6, 4)), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.SphereGeometry(4, 6, 4)), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.SphereGeometry(4, 6, 4)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

    // MINERALS TRIANGLES
    addGeom(Minerals(new THREE.TetrahedronGeometry(20, 0)), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.TetrahedronGeometry(20, 0)), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.TetrahedronGeometry(20, 0)), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.TetrahedronGeometry(20, 0)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);

    // SPIKES
    addGeom(new THREE.CylinderGeometry(0, 6, 60, 5), [-Math.PI / 2, 0, 0], [0, 0, -30], [1.5, 0.7, 1]);
    addGeom(new THREE.CylinderGeometry(0, 6, 60, 5), [-Math.PI / 2, 0, 0], [0, 0, -30], [1, 1, 1]);
    addGeom(new THREE.CylinderGeometry(0, 6, 60, 5), [-Math.PI / 2, 0, 0], [20, 20, 0], [1, 1, 1]);
    addGeom(new THREE.CylinderGeometry(0, 6, 70, 4), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(new THREE.CylinderGeometry(0, 6, 80, 4), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);

    // MINERALS DIAMONDS
    addGeom(Minerals(new THREE.OctahedronGeometry(15, 0)), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.OctahedronGeometry(15, 0)), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.OctahedronGeometry(15, 0)), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.OctahedronGeometry(15, 0)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);

    // GRID CUBES
    addGeom(Grid(new THREE.CylinderGeometry(5, 5, 7, 4, 1)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.CylinderGeometry(5, 5, 7, 4, 1)), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.CylinderGeometry(5, 5, 7, 4, 1)), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.CylinderGeometry(5, 5, 7, 4, 1)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

    // GRID TRIANGLES
    addGeom(Grid(new THREE.TetrahedronGeometry(6, 0)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TetrahedronGeometry(6, 0)), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TetrahedronGeometry(6, 0)), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TetrahedronGeometry(6, 0)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

    // SINGLE ROCKS
    addGeom(new THREE.OctahedronGeometry(15, 0), [0, 0, 0], [0, -40, 0], [1, 1, 1]);
    addGeom(new THREE.CylinderGeometry(15, 15, 20, 4, 1), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TetrahedronGeometry(20, 0), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TetrahedronGeometry(20, 0), [0, 0, 0], [20, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TetrahedronGeometry(20, 0), [0, 0, 0], [0, -40, 0], [1, 1, 1]);

    // CINDER BLOCKS
    addGeom(new THREE.CylinderGeometry(7, 7, 40, 3, 1), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(new THREE.CylinderGeometry(7, 7, 40, 3, 1), [0, 0, Math.PI / 2], [30, 0, 0], [1, 1, 1]);
    addGeom(new THREE.CylinderGeometry(3, 10, 40, 3, 1), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(new THREE.CylinderGeometry(10, 3, 40, 4, 1), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(new THREE.CylinderGeometry(10, 10, 40, 4, 1), [0, 0, 0], [0, -40, 30], [1, 1, 1]);

    // PETTLES
    addGeom(Pettle(), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Pettle(), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(new THREE.CircleGeometry(20, 10), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.CircleGeometry(30, 10), [0, 0, 0], [0, -30, 0], [1, 1, 1]);
    addGeom(new THREE.PlaneGeometry(30, 30), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(new THREE.PlaneGeometry(40, 30), [0, 0, 0], [30, -30, 0], [1, 1, 1]);
    addGeom(Pettle(), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Pettle(), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

    // MINERAL ANTENNAS
    addGeom(Minerals(Antenna(2)), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(Minerals(Antenna(2)), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);

    // DOUGHNUTS
    addGeom(new THREE.TorusGeometry(20, 7, 4, 10), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(new THREE.TorusGeometry(20, 7, 4, 10), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TorusGeometry(20, 7, 10, 10), [0, 0, 0], [20, 10, 0], [1, 1, 1]);
    addGeom(new THREE.TorusGeometry(20, 5, 4, 3), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TorusGeometry(20, 5, 4, 5), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TorusGeometry(20, 2, 4, 10), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TorusGeometry(20, 4, 4, 10), [0, 0, 0], [40, 0, 0], [1, 1, 1]);

    // TENTACLES
    addGeom(Tentacle(4), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Tentacle(5), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Tentacle(6), [0, Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);

    // LEGS
    addGeom(Leg(4, 3), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Leg(4, 6), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Leg(5, 3), [0, 0, Math.PI / 2], [0, 0, 0], [1, 1, 1]);
    addGeom(Leg(6, 4), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Leg(7, 3), [0, Math.PI / 2, Math.PI / 2], [0, 0, 0], [1, 1, 1]);
    addGeom(Leg(8, 5), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Leg(9, 2), [0, 0, Math.PI / 2], [0, 0, 0], [1, 1, 1]);
    addGeom(Leg(10, 6), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Leg(11, 3), [0, Math.PI / 2, Math.PI / 2], [0, 0, 0], [1, 1, 1]);

    // ANTENNAS
    addGeom(Antenna(4), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Antenna(5), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Antenna(6), [0, Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Antenna(7), [Math.PI / 2, Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);

    // GRID EMPTY TRIANGLES
    addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 3)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 3)), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 3)), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 3)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

    // GRID CIRCLES
    addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 5)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 5)), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 5)), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 5)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TorusGeometry(13, 3, 3, 5)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

    // MINERALS EMPTY TRIANGLES
    addGeom(Minerals(new THREE.TorusGeometry(10, 2, 4, 3)), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.TorusGeometry(10, 2, 4, 3)), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.TorusGeometry(10, 2, 4, 3)), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.TorusGeometry(10, 2, 4, 3)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);

    // LONG STRAIGHT LINES
    addGeom(TentacleStraight(), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(TentacleStraight(), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(TentacleStraight(), [0, Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);

    // PRETZELS
    addGeom(new THREE.TorusKnotGeometry(15, 3, 13, 3), [0, Math.PI / 2, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TorusKnotGeometry(15, 3, 10, 3), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TorusKnotGeometry(15, 3, 6, 3), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TorusKnotGeometry(15, 3, 13, 3), [0, 0, 0], [40, 0, 0], [1, 1, 1]);

    // MINERALS LINES
    addGeom(Minerals(TentacleStraight()), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(Minerals(TentacleStraight()), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
    addGeom(Minerals(TentacleStraight()), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
    addGeom(Minerals(TentacleStraight()), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
}

function addGeom(geom, rotationArray, translationArray, scaleArray) {
    geom.applyMatrix(new THREE.Matrix4().scale(new THREE.Vector3(scaleArray[0], scaleArray[1], scaleArray[2])));
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(rotationArray[0]));
    geom.applyMatrix(new THREE.Matrix4().makeRotationY(rotationArray[1]));
    geom.applyMatrix(new THREE.Matrix4().makeRotationZ(rotationArray[2]));
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(translationArray[0], translationArray[1], translationArray[2]));
    geoms.push(geom);
}

function bug(scene, db) {
    for (var i = 0; i < 1; i++) {
        var geometry = new THREE.Geometry();

        var globalSize = 0;

        for (var j = 0; j < db.files.length; j++) {
            var id = j % db.files.length;
            var type = db.files[id].type;
            var pregeom = geoms[type];
            var mat = materials[type];
            createPregeom(geometry, db.files[id].size, pregeom, type);
            globalSize += db.files[id].size;
        }

        var sizePerc = globalSize / 1000000;
        if (sizePerc > 1)
            sizePerc = 1;
        db.speed = 0.001 + (1 - sizePerc) * 0.01;

        db.object = new THREE.Mesh(geometry, meshFaceMaterial);
        scene.add(db.object);

        db.object2 = new THREE.Mesh(geometry, meshFaceMaterial);
        db.object2.scale.x = -db.object.scale.x;
        scene.add(db.object2);

    }
}

function createPregeom(geometry, size, pregeom, type) {
    var fileScale = 0.1;
    var fileScaleOrg = 0.1;
    if (size) {
        fileScale = size / 300000;
        fileScaleOrg = size / 300000;
    }
    if (fileScale < 0.4) {
        fileScale = 0.4;
    }
    if (fileScale > 1) {
        fileScale = 1;
    }

    for (var k = 0; k < fileScale * 4; k++) {
        var submesh = new THREE.Mesh(pregeom, null);

        submesh.scale.x *= fileScale * 4;
        submesh.scale.y *= fileScale * 4;
        submesh.scale.z *= fileScale * 4;

        var randoms = [Math.sin((-1 + k * 0.3) * fileScaleOrg * 687 + 0.1) / 2 + 0.5, Math.sin((2 + k * 0.9) * fileScaleOrg * 456 + 0.2) / 2 + 0.5, Math.sin((1 + k) * fileScaleOrg * 546 + 0.3) / 2 + 0.5];

        submesh.rotation.set(randoms[0] * 7, randoms[1] * 7, randoms[2] * 7);

        var randoms2 = [Math.sin((2 + k) * fileScaleOrg * 413 + 0.1) / 2 + 0.5, Math.sin((2 + k) * fileScaleOrg * 543 + 0.2) / 2 + 0.5, Math.sin((2 + k) * fileScaleOrg * 123 + 0.3) / 2 + 0.5];

        submesh.position.x = (randoms2[1] - 0.5) * 100 * fileScale;
        submesh.position.y = (randoms2[0] - 0.5) * 100 * fileScale;
        submesh.position.z = (randoms2[2] - 0.5) * 100 * fileScale;

        submesh.updateMatrix();
        if (pregeom) {
            geometry.merge(pregeom, submesh.matrix, type);
        }
    }
}

function rolloverLanguage(language) {
    var o = [rollOverObject, rollOverObject2];
    if (!language) {
        if (rolloverMesh) {
            o[0].remove(rolloverMesh[0]);
            o[1].remove(rolloverMesh[1]);
        }
        rolloverMesh = null;
        return;
    }
    var id = analyze(language);
    var pregeom = new THREE.Geometry();
    var size = 200000;
    if (globalDB[selected]) {
        for (var i = 0; i < globalDB[selected].files.length; i++) {
            if (globalDB[selected].files[i].type == id) {
                size = globalDB[selected].files[i].size;
            }
        }
    }
    createPregeom(pregeom, size, geoms[id], id);
    var mat = sampleMat;
    setColor(sampleMat, id);
    rolloverMesh = [];
    for (var i = 0; i < 2; i++) {
        rolloverMesh[i] = new THREE.Mesh(pregeom, mat);
        rolloverMesh[i].scale.set(1 - 2 * i, 1, 1);
        o[i].add(rolloverMesh[i]);
    }
}

function Pettle() {
    var tentacleGeom = new THREE.SphereGeometry(15, 3, 4);
    var mesh = new THREE.Mesh(tentacleGeom, null);
    mesh.scale.z = 0.2;
    mesh.updateMatrix();
    mesh.geometry.applyMatrix(mesh.matrix);
    return(mesh.geometry);
}

function Minerals(geom, max) {
    if (!max)
        max = 4;
    var tentacleGeom = new THREE.Geometry();
    var dis = 0;
    for (var j = 0; j < max; j++) {
        var mesh = new THREE.Mesh(geom.clone(), null);
        mesh.position.set((25 - dis) / 3, dis / 2, 0);
        dis += 25 * (1 - (j + 1) / max);
        mesh.scale.set(1 - j / max, 1 - j / max, 1 - j / max);
        mesh.rotation.set(0, 0, 1.5 * j / max);
        mesh.updateMatrix();
        tentacleGeom.merge(mesh.geometry, mesh.matrix);
    }
    return(tentacleGeom);
}

function Leg(num, radius) {
    var tentacleGeom = new THREE.Geometry();
    for (var j = 0; j < 2; j++) {
        var randomPoints = [];
        for (var i = 0; i < num; i++) {
            randomPoints.push(new THREE.Vector3(-30 * i, -40 * Math.sin(i * 2), 0));
        }
        var randomSpline = new THREE.SplineCurve3(randomPoints);
        var geometry = new THREE.TubeGeometry(randomSpline, 3, radius, 7);
        var mesh = new THREE.Mesh(geometry, null);
        mesh.rotation.set(Math.sin(j), Math.sin(j + 1), Math.sin(j + 0.5));
        mesh.updateMatrix();
        tentacleGeom.merge(geometry, mesh.matrix);
    }
    return(tentacleGeom);
}

function Antenna(num) {
    var tentacleGeom = new THREE.Geometry();
    for (var j = 0; j < 2; j++) {
        var randomPoints = [];
        for (var i = 0; i < num; i++) {
            randomPoints.push(new THREE.Vector3(20 * i, 15 * Math.sin(j+i * num), 0));
        }
        var randomSpline = new THREE.SplineCurve3(randomPoints);
        var geometry = new THREE.TubeGeometry(randomSpline, 5, 2, 5);
        var mesh = new THREE.Mesh(geometry, null);
        mesh.rotation.set(Math.sin(j), Math.sin(j + 1), Math.sin(j + 0.5));
        mesh.updateMatrix();
        tentacleGeom.merge(geometry, mesh.matrix);
    }
    return(tentacleGeom);
}

function Tentacle(num) {
    var tentacleGeom = new THREE.Geometry();
    for (var j = 0; j < 2; j++) {
        var randomPoints = [];
        for (var i = 0; i < num; i++) {
            randomPoints.push(new THREE.Vector3(20 * i, 15 * Math.sin(j+i * num / 2), 0));
        }
        var randomSpline = new THREE.SplineCurve3(randomPoints);
        var geometry = new THREE.TubeGeometry(randomSpline, 5, 2, 5);
        var mesh = new THREE.Mesh(geometry, null);
        mesh.rotation.set(Math.sin(j), Math.sin(j + 1), Math.sin(j + 0.5));
        mesh.updateMatrix();
        tentacleGeom.merge(geometry, mesh.matrix);
    }
    return(tentacleGeom);
}

function TentacleStraight() {
    var tentacleGeom = new THREE.Geometry();
    for (var j = 0; j < 1; j++) {
        var randomPoints = [];
        randomPoints.push(new THREE.Vector3(0, 0, 0));
        for (var i = 0; i < 2; i++) {
            randomPoints.push(new THREE.Vector3(0, 0 - 300 * i, 0));
        }
        var randomSpline = new THREE.SplineCurve3(randomPoints);
        var geometry = new THREE.TubeGeometry(randomSpline, 2, 3, 2);
        var mesh = new THREE.Mesh(geometry, null);
        mesh.position.set(10 * Math.sin(j), 10 * Math.sin(j + 1), 10 * Math.sin(j + 0.5));
        mesh.updateMatrix();
        tentacleGeom.merge(geometry, mesh.matrix);
    }
    return(tentacleGeom);
}

function Grid(geom) {
    var tentacleGeom = new THREE.Geometry();
    for (var j = 0; j < 4; j++) {
        var geometry = geom;
        var mesh = new THREE.Mesh(geometry, null);
        mesh.position.set(10 * Math.sin(j), 10 * Math.sin(j + 1), 10 * Math.sin(j + 0.5));
        mesh.updateMatrix();
        tentacleGeom.merge(geometry, mesh.matrix);
    }
    return(tentacleGeom);
}

function updateBug(db, offset) {
    if (!movement || !db || !db.object || !db.object2)
        return;
    var object = db.object;
    var object2 = db.object2;
    timer += 0.6;

    object.rotation.z = Math.sin(timer * db.speed + offset) / 10;
    object2.rotation.z = -Math.sin(timer * db.speed + offset) / 10;

    object.position.y = Math.sin(timer * db.speed + offset) * 10 / 2;
    object2.position.y = Math.sin(timer * db.speed + offset) * 10 / 2;

    if (offset == selected || offset === 0) {
        rollOverObject.rotation.z = object.rotation.z;
        rollOverObject2.rotation.z = object2.rotation.z;

        rollOverObject.position.y = object.position.y;
        rollOverObject2.position.y = object2.position.y;
    }
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(Math.floor(r)) + componentToHex(Math.floor(g)) + componentToHex(Math.floor(b));
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJvYmplY3RzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBzaGFkaW5nID0gVEhSRUUuRmxhdFNoYWRpbmc7Ly9USFJFRS5TbW9vdGhTaGFkaW5nLy9cclxudmFyIHNoaW5pbmVzcyA9IDUwO1xyXG5cclxudmFyIHNwaGVyZSwgc3BoZXJlMiwgcGxhbmUsIHRpdGxlO1xyXG52YXIgc3RhcnQgPSBEYXRlLm5vdygpO1xyXG52YXIgZ2VvbXMgPSBbXTtcclxudmFyIG1hdGVyaWFscyA9IFtdO1xyXG52YXIgbWVzaEZhY2VNYXRlcmlhbDtcclxudmFyIFNlZWQ7XHJcbnZhciByb2xsb3Zlck1lc2g7XHJcbnZhciBzYW1wbGVNYXQ7XHJcbnZhciByb2xsT3Zlck9iamVjdCwgcm9sbE92ZXJPYmplY3QyO1xyXG52YXIgdGltZXIgPSAwO1xyXG5cclxudmFyIHNpemUgPSAwLjU7XHJcblxyXG5mdW5jdGlvbiBidWdHbG9iYWxzKCkge1xyXG4gICAgZ2VuZXJhdGVHZW9tZXRyaWVzKCk7XHJcblxyXG4gICAgcm9sbE92ZXJPYmplY3QgPSBuZXcgVEhSRUUuR3JvdXAoKTtcclxuICAgIHJvbGxPdmVyT2JqZWN0MiA9IG5ldyBUSFJFRS5Hcm91cCgpO1xyXG4gICAgc2NlbmUuYWRkKHJvbGxPdmVyT2JqZWN0KTtcclxuICAgIHNjZW5lLmFkZChyb2xsT3Zlck9iamVjdDIpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgVFlQRVMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgZ3JleW1hdCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7Y29sb3I6IDAsIHNoaW5pbmVzczogc2hpbmluZXNzLCBzaGFkaW5nOiBzaGFkaW5nLCB3aXJlZnJhbWU6IHdpcmVmcmFtZSwgd2lyZWZyYW1lTGluZXdpZHRoOiAxNSxcclxuICAgICAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZX0pO1xyXG5cclxuICAgICAgICBzZXRDb2xvcihncmV5bWF0LCBpKTtcclxuICAgICAgICBtYXRlcmlhbHMucHVzaChncmV5bWF0KTtcclxuICAgIH1cclxuICAgIG1lc2hGYWNlTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEZhY2VNYXRlcmlhbChtYXRlcmlhbHMpO1xyXG5cclxuICAgIHNhbXBsZU1hdCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7Y29sb3I6IDB4ZmZmZmZmLCBzaGluaW5lc3M6IHNoaW5pbmVzcywgc2hhZGluZzogc2hhZGluZywgd2lyZWZyYW1lOiB3aXJlZnJhbWUsIHdpcmVmcmFtZUxpbmV3aWR0aDogMTUsXHJcbiAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZX0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRDb2xvcihzYW1wbGVNYXQsIGlkKSB7XHJcbiAgICBzYW1wbGVNYXQuY29sb3Iuc2V0SFNMKE1hdGguY29zKGlkICogNC4xKSAvIDIgKyAwLjUsIDAuOCwgMC42KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVHZW9tZXRyaWVzKCkge1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuVGV0cmFoZWRyb25HZW9tZXRyeSgyMCwgMSksIFswLCAwLCAwXSwgWzQwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuXHJcbiAgICAvLyBURVNUIEFSRUFcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgICAgICAvL2FkZEdlb20oTWluZXJhbHMobmV3IFRIUkVFLkNpcmNsZUdlb21ldHJ5KDE1LCA2KSksIFswLCAwLCAwXSwgWzAsIDIwLCAwXSwgWzIsIDEsIDFdKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyBNSU5FUkFMUyBQRVRUTEVcclxuICAgIGFkZEdlb20oTWluZXJhbHMoUGV0dGxlKCkpLCBbMCwgMCwgMF0sIFswLCAyMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKFBldHRsZSgpKSwgWzAsIDAsIC1NYXRoLlBJIC8gMl0sIFsyMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKG5ldyBUSFJFRS5DaXJjbGVHZW9tZXRyeSgxNSwgNikpLCBbMCwgMCwgTWF0aC5QSSAvIDJdLCBbNDAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShNaW5lcmFscyhuZXcgVEhSRUUuQ2lyY2xlR2VvbWV0cnkoMTUsIDYpKSwgWzAsIDAsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG5cclxuICAgIC8vIE1JTkVSQUxTIEhPUk5TXHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDMsIDEwLCAyMCwgMywgMSkpLCBbMCwgMCwgMF0sIFswLCAyMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDMsIDEwLCAyMCwgMywgMSkpLCBbMCwgMCwgLU1hdGguUEkgLyAyXSwgWzIwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oTWluZXJhbHMobmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMywgMTAsIDIwLCAzLCAxKSksIFswLCAwLCBNYXRoLlBJIC8gMl0sIFs0MCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDMsIDEwLCAyMCwgMywgMSkpLCBbMCwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gQlVCQkxFU1xyXG4gICAgYWRkR2VvbShHcmlkKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSg0LCA2LCA0KSksIFswLCAwLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoNCwgNiwgNCkpLCBbLU1hdGguUEkgLyAyLCAwLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoNCwgNiwgNCkpLCBbMCwgTWF0aC5QSSAvIDIsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShHcmlkKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSg0LCA2LCA0KSksIFswLCAtTWF0aC5QSSAvIDIsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG5cclxuICAgIC8vIE1JTkVSQUxTIFRSSUFOR0xFU1xyXG4gICAgYWRkR2VvbShNaW5lcmFscyhuZXcgVEhSRUUuVGV0cmFoZWRyb25HZW9tZXRyeSgyMCwgMCkpLCBbMCwgMCwgMF0sIFswLCAyMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKG5ldyBUSFJFRS5UZXRyYWhlZHJvbkdlb21ldHJ5KDIwLCAwKSksIFswLCAwLCAtTWF0aC5QSSAvIDJdLCBbMjAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShNaW5lcmFscyhuZXcgVEhSRUUuVGV0cmFoZWRyb25HZW9tZXRyeSgyMCwgMCkpLCBbMCwgMCwgTWF0aC5QSSAvIDJdLCBbNDAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShNaW5lcmFscyhuZXcgVEhSRUUuVGV0cmFoZWRyb25HZW9tZXRyeSgyMCwgMCkpLCBbMCwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gU1BJS0VTXHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAsIDYsIDYwLCA1KSwgWy1NYXRoLlBJIC8gMiwgMCwgMF0sIFswLCAwLCAtMzBdLCBbMS41LCAwLjcsIDFdKTtcclxuICAgIGFkZEdlb20obmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMCwgNiwgNjAsIDUpLCBbLU1hdGguUEkgLyAyLCAwLCAwXSwgWzAsIDAsIC0zMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAsIDYsIDYwLCA1KSwgWy1NYXRoLlBJIC8gMiwgMCwgMF0sIFsyMCwgMjAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLCA2LCA3MCwgNCksIFswLCAwLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLCA2LCA4MCwgNCksIFswLCAtTWF0aC5QSSAvIDIsIDBdLCBbMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gTUlORVJBTFMgRElBTU9ORFNcclxuICAgIGFkZEdlb20oTWluZXJhbHMobmV3IFRIUkVFLk9jdGFoZWRyb25HZW9tZXRyeSgxNSwgMCkpLCBbMCwgMCwgMF0sIFswLCAyMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKG5ldyBUSFJFRS5PY3RhaGVkcm9uR2VvbWV0cnkoMTUsIDApKSwgWzAsIDAsIC1NYXRoLlBJIC8gMl0sIFsyMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKG5ldyBUSFJFRS5PY3RhaGVkcm9uR2VvbWV0cnkoMTUsIDApKSwgWzAsIDAsIE1hdGguUEkgLyAyXSwgWzQwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oTWluZXJhbHMobmV3IFRIUkVFLk9jdGFoZWRyb25HZW9tZXRyeSgxNSwgMCkpLCBbMCwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gR1JJRCBDVUJFU1xyXG4gICAgYWRkR2VvbShHcmlkKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDUsIDUsIDcsIDQsIDEpKSwgWzAsIDAsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShHcmlkKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDUsIDUsIDcsIDQsIDEpKSwgWy1NYXRoLlBJIC8gMiwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKEdyaWQobmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoNSwgNSwgNywgNCwgMSkpLCBbMCwgTWF0aC5QSSAvIDIsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShHcmlkKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDUsIDUsIDcsIDQsIDEpKSwgWzAsIC1NYXRoLlBJIC8gMiwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gR1JJRCBUUklBTkdMRVNcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuVGV0cmFoZWRyb25HZW9tZXRyeSg2LCAwKSksIFswLCAwLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuVGV0cmFoZWRyb25HZW9tZXRyeSg2LCAwKSksIFstTWF0aC5QSSAvIDIsIDAsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShHcmlkKG5ldyBUSFJFRS5UZXRyYWhlZHJvbkdlb21ldHJ5KDYsIDApKSwgWzAsIE1hdGguUEkgLyAyLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuVGV0cmFoZWRyb25HZW9tZXRyeSg2LCAwKSksIFswLCAtTWF0aC5QSSAvIDIsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG5cclxuICAgIC8vIFNJTkdMRSBST0NLU1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuT2N0YWhlZHJvbkdlb21ldHJ5KDE1LCAwKSwgWzAsIDAsIDBdLCBbMCwgLTQwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20obmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMTUsIDE1LCAyMCwgNCwgMSksIFswLCAwLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuVGV0cmFoZWRyb25HZW9tZXRyeSgyMCwgMCksIFswLCAwLCAwXSwgWzQwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20obmV3IFRIUkVFLlRldHJhaGVkcm9uR2VvbWV0cnkoMjAsIDApLCBbMCwgMCwgMF0sIFsyMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5UZXRyYWhlZHJvbkdlb21ldHJ5KDIwLCAwKSwgWzAsIDAsIDBdLCBbMCwgLTQwLCAwXSwgWzEsIDEsIDFdKTtcclxuXHJcbiAgICAvLyBDSU5ERVIgQkxPQ0tTXHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDcsIDcsIDQwLCAzLCAxKSwgWzAsIDAsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSg3LCA3LCA0MCwgMywgMSksIFswLCAwLCBNYXRoLlBJIC8gMl0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDMsIDEwLCA0MCwgMywgMSksIFswLCAwLCAwXSwgWzAsIDIwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20obmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMTAsIDMsIDQwLCA0LCAxKSwgWzAsIDAsIDBdLCBbMCwgMjAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgxMCwgMTAsIDQwLCA0LCAxKSwgWzAsIDAsIDBdLCBbMCwgLTQwLCAzMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gUEVUVExFU1xyXG4gICAgYWRkR2VvbShQZXR0bGUoKSwgWzAsIDAsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShQZXR0bGUoKSwgWy1NYXRoLlBJIC8gMiwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5DaXJjbGVHZW9tZXRyeSgyMCwgMTApLCBbMCwgMCwgMF0sIFs0MCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5DaXJjbGVHZW9tZXRyeSgzMCwgMTApLCBbMCwgMCwgMF0sIFswLCAtMzAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSgzMCwgMzApLCBbMCwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDQwLCAzMCksIFswLCAwLCAwXSwgWzMwLCAtMzAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShQZXR0bGUoKSwgWzAsIE1hdGguUEkgLyAyLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oUGV0dGxlKCksIFswLCAtTWF0aC5QSSAvIDIsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG5cclxuICAgIC8vIE1JTkVSQUwgQU5URU5OQVNcclxuICAgIGFkZEdlb20oTWluZXJhbHMoQW50ZW5uYSgyKSksIFswLCAwLCAwXSwgWzAsIDIwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oTWluZXJhbHMoQW50ZW5uYSgyKSksIFswLCAwLCAtTWF0aC5QSSAvIDJdLCBbMjAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG5cclxuICAgIC8vIERPVUdITlVUU1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgyMCwgNywgNCwgMTApLCBbMCwgMCwgMF0sIFswLCAyMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5Ub3J1c0dlb21ldHJ5KDIwLCA3LCA0LCAxMCksIFswLCAwLCAwXSwgWzQwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20obmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMjAsIDcsIDEwLCAxMCksIFswLCAwLCAwXSwgWzIwLCAxMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5Ub3J1c0dlb21ldHJ5KDIwLCA1LCA0LCAzKSwgWzAsIDAsIDBdLCBbNDAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgyMCwgNSwgNCwgNSksIFswLCAwLCAwXSwgWzQwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20obmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMjAsIDIsIDQsIDEwKSwgWzAsIDAsIDBdLCBbNDAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgyMCwgNCwgNCwgMTApLCBbMCwgMCwgMF0sIFs0MCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gVEVOVEFDTEVTXHJcbiAgICBhZGRHZW9tKFRlbnRhY2xlKDQpLCBbMCwgLU1hdGguUEkgLyAyLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShUZW50YWNsZSg1KSwgWzAsIDAsIDBdLCBbMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKFRlbnRhY2xlKDYpLCBbMCwgTWF0aC5QSSAvIDIsIDBdLCBbMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gTEVHU1xyXG4gICAgYWRkR2VvbShMZWcoNCwgMyksIFswLCAwLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShMZWcoNCwgNiksIFswLCAwLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShMZWcoNSwgMyksIFswLCAwLCBNYXRoLlBJIC8gMl0sIFswLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oTGVnKDYsIDQpLCBbMCwgLU1hdGguUEkgLyAyLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShMZWcoNywgMyksIFswLCBNYXRoLlBJIC8gMiwgTWF0aC5QSSAvIDJdLCBbMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKExlZyg4LCA1KSwgWzAsIDAsIDBdLCBbMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKExlZyg5LCAyKSwgWzAsIDAsIE1hdGguUEkgLyAyXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShMZWcoMTAsIDYpLCBbMCwgLU1hdGguUEkgLyAyLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShMZWcoMTEsIDMpLCBbMCwgTWF0aC5QSSAvIDIsIE1hdGguUEkgLyAyXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG5cclxuICAgIC8vIEFOVEVOTkFTXHJcbiAgICBhZGRHZW9tKEFudGVubmEoNCksIFswLCAtTWF0aC5QSSAvIDIsIDBdLCBbMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKEFudGVubmEoNSksIFswLCAwLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShBbnRlbm5hKDYpLCBbMCwgTWF0aC5QSSAvIDIsIDBdLCBbMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKEFudGVubmEoNyksIFtNYXRoLlBJIC8gMiwgTWF0aC5QSSAvIDIsIDBdLCBbMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gR1JJRCBFTVBUWSBUUklBTkdMRVNcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgxMCwgMiwgNCwgMykpLCBbMCwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKEdyaWQobmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMTAsIDIsIDQsIDMpKSwgWy1NYXRoLlBJIC8gMiwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKEdyaWQobmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMTAsIDIsIDQsIDMpKSwgWzAsIE1hdGguUEkgLyAyLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgxMCwgMiwgNCwgMykpLCBbMCwgLU1hdGguUEkgLyAyLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuXHJcbiAgICAvLyBHUklEIENJUkNMRVNcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgxMCwgMiwgNCwgNSkpLCBbMCwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKEdyaWQobmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMTAsIDIsIDQsIDUpKSwgWy1NYXRoLlBJIC8gMiwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKEdyaWQobmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMTAsIDIsIDQsIDUpKSwgWzAsIE1hdGguUEkgLyAyLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgxMCwgMiwgNCwgNSkpLCBbMCwgLU1hdGguUEkgLyAyLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgxMywgMywgMywgNSkpLCBbMCwgLU1hdGguUEkgLyAyLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuXHJcbiAgICAvLyBNSU5FUkFMUyBFTVBUWSBUUklBTkdMRVNcclxuICAgIGFkZEdlb20oTWluZXJhbHMobmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMTAsIDIsIDQsIDMpKSwgWzAsIDAsIDBdLCBbMCwgMjAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShNaW5lcmFscyhuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgxMCwgMiwgNCwgMykpLCBbMCwgMCwgLU1hdGguUEkgLyAyXSwgWzIwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oTWluZXJhbHMobmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMTAsIDIsIDQsIDMpKSwgWzAsIDAsIE1hdGguUEkgLyAyXSwgWzQwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oTWluZXJhbHMobmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMTAsIDIsIDQsIDMpKSwgWzAsIDAsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG5cclxuICAgIC8vIExPTkcgU1RSQUlHSFQgTElORVNcclxuICAgIGFkZEdlb20oVGVudGFjbGVTdHJhaWdodCgpLCBbMCwgMCwgMF0sIFswLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oVGVudGFjbGVTdHJhaWdodCgpLCBbMCwgLU1hdGguUEkgLyAyLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShUZW50YWNsZVN0cmFpZ2h0KCksIFswLCBNYXRoLlBJIC8gMiwgMF0sIFswLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuXHJcbiAgICAvLyBQUkVUWkVMU1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuVG9ydXNLbm90R2VvbWV0cnkoMTUsIDMsIDEzLCAzKSwgWzAsIE1hdGguUEkgLyAyLCAwXSwgWzQwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20obmV3IFRIUkVFLlRvcnVzS25vdEdlb21ldHJ5KDE1LCAzLCAxMCwgMyksIFswLCAwLCAwXSwgWzQwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20obmV3IFRIUkVFLlRvcnVzS25vdEdlb21ldHJ5KDE1LCAzLCA2LCAzKSwgWzAsIDAsIDBdLCBbNDAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuVG9ydXNLbm90R2VvbWV0cnkoMTUsIDMsIDEzLCAzKSwgWzAsIDAsIDBdLCBbNDAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG5cclxuICAgIC8vIE1JTkVSQUxTIExJTkVTXHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKFRlbnRhY2xlU3RyYWlnaHQoKSksIFswLCAwLCAwXSwgWzAsIDIwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oTWluZXJhbHMoVGVudGFjbGVTdHJhaWdodCgpKSwgWzAsIDAsIC1NYXRoLlBJIC8gMl0sIFsyMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKFRlbnRhY2xlU3RyYWlnaHQoKSksIFswLCAwLCBNYXRoLlBJIC8gMl0sIFs0MCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKFRlbnRhY2xlU3RyYWlnaHQoKSksIFswLCAwLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkR2VvbShnZW9tLCByb3RhdGlvbkFycmF5LCB0cmFuc2xhdGlvbkFycmF5LCBzY2FsZUFycmF5KSB7XHJcbiAgICBnZW9tLmFwcGx5TWF0cml4KG5ldyBUSFJFRS5NYXRyaXg0KCkuc2NhbGUobmV3IFRIUkVFLlZlY3RvcjMoc2NhbGVBcnJheVswXSwgc2NhbGVBcnJheVsxXSwgc2NhbGVBcnJheVsyXSkpKTtcclxuICAgIGdlb20uYXBwbHlNYXRyaXgobmV3IFRIUkVFLk1hdHJpeDQoKS5tYWtlUm90YXRpb25YKHJvdGF0aW9uQXJyYXlbMF0pKTtcclxuICAgIGdlb20uYXBwbHlNYXRyaXgobmV3IFRIUkVFLk1hdHJpeDQoKS5tYWtlUm90YXRpb25ZKHJvdGF0aW9uQXJyYXlbMV0pKTtcclxuICAgIGdlb20uYXBwbHlNYXRyaXgobmV3IFRIUkVFLk1hdHJpeDQoKS5tYWtlUm90YXRpb25aKHJvdGF0aW9uQXJyYXlbMl0pKTtcclxuICAgIGdlb20uYXBwbHlNYXRyaXgobmV3IFRIUkVFLk1hdHJpeDQoKS5tYWtlVHJhbnNsYXRpb24odHJhbnNsYXRpb25BcnJheVswXSwgdHJhbnNsYXRpb25BcnJheVsxXSwgdHJhbnNsYXRpb25BcnJheVsyXSkpO1xyXG4gICAgZ2VvbXMucHVzaChnZW9tKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVnKHNjZW5lLCBkYikge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxOyBpKyspIHtcclxuICAgICAgICB2YXIgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuR2VvbWV0cnkoKTtcclxuXHJcbiAgICAgICAgdmFyIGdsb2JhbFNpemUgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRiLmZpbGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIHZhciBpZCA9IGogJSBkYi5maWxlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gZGIuZmlsZXNbaWRdLnR5cGU7XHJcbiAgICAgICAgICAgIHZhciBwcmVnZW9tID0gZ2VvbXNbdHlwZV07XHJcbiAgICAgICAgICAgIHZhciBtYXQgPSBtYXRlcmlhbHNbdHlwZV07XHJcbiAgICAgICAgICAgIGNyZWF0ZVByZWdlb20oZ2VvbWV0cnksIGRiLmZpbGVzW2lkXS5zaXplLCBwcmVnZW9tLCB0eXBlKTtcclxuICAgICAgICAgICAgZ2xvYmFsU2l6ZSArPSBkYi5maWxlc1tpZF0uc2l6ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzaXplUGVyYyA9IGdsb2JhbFNpemUgLyAxMDAwMDAwO1xyXG4gICAgICAgIGlmIChzaXplUGVyYyA+IDEpXHJcbiAgICAgICAgICAgIHNpemVQZXJjID0gMTtcclxuICAgICAgICBkYi5zcGVlZCA9IDAuMDAxICsgKDEgLSBzaXplUGVyYykgKiAwLjAxO1xyXG5cclxuICAgICAgICBkYi5vYmplY3QgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWVzaEZhY2VNYXRlcmlhbCk7XHJcbiAgICAgICAgc2NlbmUuYWRkKGRiLm9iamVjdCk7XHJcblxyXG4gICAgICAgIGRiLm9iamVjdDIgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWVzaEZhY2VNYXRlcmlhbCk7XHJcbiAgICAgICAgZGIub2JqZWN0Mi5zY2FsZS54ID0gLWRiLm9iamVjdC5zY2FsZS54O1xyXG4gICAgICAgIHNjZW5lLmFkZChkYi5vYmplY3QyKTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVByZWdlb20oZ2VvbWV0cnksIHNpemUsIHByZWdlb20sIHR5cGUpIHtcclxuICAgIHZhciBmaWxlU2NhbGUgPSAwLjE7XHJcbiAgICB2YXIgZmlsZVNjYWxlT3JnID0gMC4xO1xyXG4gICAgaWYgKHNpemUpIHtcclxuICAgICAgICBmaWxlU2NhbGUgPSBzaXplIC8gMzAwMDAwO1xyXG4gICAgICAgIGZpbGVTY2FsZU9yZyA9IHNpemUgLyAzMDAwMDA7XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsZVNjYWxlIDwgMC40KSB7XHJcbiAgICAgICAgZmlsZVNjYWxlID0gMC40O1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbGVTY2FsZSA+IDEpIHtcclxuICAgICAgICBmaWxlU2NhbGUgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZmlsZVNjYWxlICogNDsgaysrKSB7XHJcbiAgICAgICAgdmFyIHN1Ym1lc2ggPSBuZXcgVEhSRUUuTWVzaChwcmVnZW9tLCBudWxsKTtcclxuXHJcbiAgICAgICAgc3VibWVzaC5zY2FsZS54ICo9IGZpbGVTY2FsZSAqIDQ7XHJcbiAgICAgICAgc3VibWVzaC5zY2FsZS55ICo9IGZpbGVTY2FsZSAqIDQ7XHJcbiAgICAgICAgc3VibWVzaC5zY2FsZS56ICo9IGZpbGVTY2FsZSAqIDQ7XHJcblxyXG4gICAgICAgIHZhciByYW5kb21zID0gW01hdGguc2luKCgtMSArIGsgKiAwLjMpICogZmlsZVNjYWxlT3JnICogNjg3ICsgMC4xKSAvIDIgKyAwLjUsIE1hdGguc2luKCgyICsgayAqIDAuOSkgKiBmaWxlU2NhbGVPcmcgKiA0NTYgKyAwLjIpIC8gMiArIDAuNSwgTWF0aC5zaW4oKDEgKyBrKSAqIGZpbGVTY2FsZU9yZyAqIDU0NiArIDAuMykgLyAyICsgMC41XTtcclxuXHJcbiAgICAgICAgc3VibWVzaC5yb3RhdGlvbi5zZXQocmFuZG9tc1swXSAqIDcsIHJhbmRvbXNbMV0gKiA3LCByYW5kb21zWzJdICogNyk7XHJcblxyXG4gICAgICAgIHZhciByYW5kb21zMiA9IFtNYXRoLnNpbigoMiArIGspICogZmlsZVNjYWxlT3JnICogNDEzICsgMC4xKSAvIDIgKyAwLjUsIE1hdGguc2luKCgyICsgaykgKiBmaWxlU2NhbGVPcmcgKiA1NDMgKyAwLjIpIC8gMiArIDAuNSwgTWF0aC5zaW4oKDIgKyBrKSAqIGZpbGVTY2FsZU9yZyAqIDEyMyArIDAuMykgLyAyICsgMC41XTtcclxuXHJcbiAgICAgICAgc3VibWVzaC5wb3NpdGlvbi54ID0gKHJhbmRvbXMyWzFdIC0gMC41KSAqIDEwMCAqIGZpbGVTY2FsZTtcclxuICAgICAgICBzdWJtZXNoLnBvc2l0aW9uLnkgPSAocmFuZG9tczJbMF0gLSAwLjUpICogMTAwICogZmlsZVNjYWxlO1xyXG4gICAgICAgIHN1Ym1lc2gucG9zaXRpb24ueiA9IChyYW5kb21zMlsyXSAtIDAuNSkgKiAxMDAgKiBmaWxlU2NhbGU7XHJcblxyXG4gICAgICAgIHN1Ym1lc2gudXBkYXRlTWF0cml4KCk7XHJcbiAgICAgICAgaWYgKHByZWdlb20pIHtcclxuICAgICAgICAgICAgZ2VvbWV0cnkubWVyZ2UocHJlZ2VvbSwgc3VibWVzaC5tYXRyaXgsIHR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcm9sbG92ZXJMYW5ndWFnZShsYW5ndWFnZSkge1xyXG4gICAgdmFyIG8gPSBbcm9sbE92ZXJPYmplY3QsIHJvbGxPdmVyT2JqZWN0Ml07XHJcbiAgICBpZiAoIWxhbmd1YWdlKSB7XHJcbiAgICAgICAgaWYgKHJvbGxvdmVyTWVzaCkge1xyXG4gICAgICAgICAgICBvWzBdLnJlbW92ZShyb2xsb3Zlck1lc2hbMF0pO1xyXG4gICAgICAgICAgICBvWzFdLnJlbW92ZShyb2xsb3Zlck1lc2hbMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByb2xsb3Zlck1lc2ggPSBudWxsO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBpZCA9IGFuYWx5emUobGFuZ3VhZ2UpO1xyXG4gICAgdmFyIHByZWdlb20gPSBuZXcgVEhSRUUuR2VvbWV0cnkoKTtcclxuICAgIHZhciBzaXplID0gMjAwMDAwO1xyXG4gICAgaWYgKGdsb2JhbERCW3NlbGVjdGVkXSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ2xvYmFsREJbc2VsZWN0ZWRdLmZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChnbG9iYWxEQltzZWxlY3RlZF0uZmlsZXNbaV0udHlwZSA9PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IGdsb2JhbERCW3NlbGVjdGVkXS5maWxlc1tpXS5zaXplO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY3JlYXRlUHJlZ2VvbShwcmVnZW9tLCBzaXplLCBnZW9tc1tpZF0sIGlkKTtcclxuICAgIHZhciBtYXQgPSBzYW1wbGVNYXQ7XHJcbiAgICBzZXRDb2xvcihzYW1wbGVNYXQsIGlkKTtcclxuICAgIHJvbGxvdmVyTWVzaCA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICByb2xsb3Zlck1lc2hbaV0gPSBuZXcgVEhSRUUuTWVzaChwcmVnZW9tLCBtYXQpO1xyXG4gICAgICAgIHJvbGxvdmVyTWVzaFtpXS5zY2FsZS5zZXQoMSAtIDIgKiBpLCAxLCAxKTtcclxuICAgICAgICBvW2ldLmFkZChyb2xsb3Zlck1lc2hbaV0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBQZXR0bGUoKSB7XHJcbiAgICB2YXIgdGVudGFjbGVHZW9tID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDE1LCAzLCA0KTtcclxuICAgIHZhciBtZXNoID0gbmV3IFRIUkVFLk1lc2godGVudGFjbGVHZW9tLCBudWxsKTtcclxuICAgIG1lc2guc2NhbGUueiA9IDAuMjtcclxuICAgIG1lc2gudXBkYXRlTWF0cml4KCk7XHJcbiAgICBtZXNoLmdlb21ldHJ5LmFwcGx5TWF0cml4KG1lc2gubWF0cml4KTtcclxuICAgIHJldHVybihtZXNoLmdlb21ldHJ5KTtcclxufVxyXG5cclxuZnVuY3Rpb24gTWluZXJhbHMoZ2VvbSwgbWF4KSB7XHJcbiAgICBpZiAoIW1heClcclxuICAgICAgICBtYXggPSA0O1xyXG4gICAgdmFyIHRlbnRhY2xlR2VvbSA9IG5ldyBUSFJFRS5HZW9tZXRyeSgpO1xyXG4gICAgdmFyIGRpcyA9IDA7XHJcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1heDsgaisrKSB7XHJcbiAgICAgICAgdmFyIG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tLmNsb25lKCksIG51bGwpO1xyXG4gICAgICAgIG1lc2gucG9zaXRpb24uc2V0KCgyNSAtIGRpcykgLyAzLCBkaXMgLyAyLCAwKTtcclxuICAgICAgICBkaXMgKz0gMjUgKiAoMSAtIChqICsgMSkgLyBtYXgpO1xyXG4gICAgICAgIG1lc2guc2NhbGUuc2V0KDEgLSBqIC8gbWF4LCAxIC0gaiAvIG1heCwgMSAtIGogLyBtYXgpO1xyXG4gICAgICAgIG1lc2gucm90YXRpb24uc2V0KDAsIDAsIDEuNSAqIGogLyBtYXgpO1xyXG4gICAgICAgIG1lc2gudXBkYXRlTWF0cml4KCk7XHJcbiAgICAgICAgdGVudGFjbGVHZW9tLm1lcmdlKG1lc2guZ2VvbWV0cnksIG1lc2gubWF0cml4KTtcclxuICAgIH1cclxuICAgIHJldHVybih0ZW50YWNsZUdlb20pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBMZWcobnVtLCByYWRpdXMpIHtcclxuICAgIHZhciB0ZW50YWNsZUdlb20gPSBuZXcgVEhSRUUuR2VvbWV0cnkoKTtcclxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgMjsgaisrKSB7XHJcbiAgICAgICAgdmFyIHJhbmRvbVBvaW50cyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcclxuICAgICAgICAgICAgcmFuZG9tUG9pbnRzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoLTMwICogaSwgLTQwICogTWF0aC5zaW4oaSAqIDIpLCAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByYW5kb21TcGxpbmUgPSBuZXcgVEhSRUUuU3BsaW5lQ3VydmUzKHJhbmRvbVBvaW50cyk7XHJcbiAgICAgICAgdmFyIGdlb21ldHJ5ID0gbmV3IFRIUkVFLlR1YmVHZW9tZXRyeShyYW5kb21TcGxpbmUsIDMsIHJhZGl1cywgNyk7XHJcbiAgICAgICAgdmFyIG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbnVsbCk7XHJcbiAgICAgICAgbWVzaC5yb3RhdGlvbi5zZXQoTWF0aC5zaW4oaiksIE1hdGguc2luKGogKyAxKSwgTWF0aC5zaW4oaiArIDAuNSkpO1xyXG4gICAgICAgIG1lc2gudXBkYXRlTWF0cml4KCk7XHJcbiAgICAgICAgdGVudGFjbGVHZW9tLm1lcmdlKGdlb21ldHJ5LCBtZXNoLm1hdHJpeCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4odGVudGFjbGVHZW9tKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQW50ZW5uYShudW0pIHtcclxuICAgIHZhciB0ZW50YWNsZUdlb20gPSBuZXcgVEhSRUUuR2VvbWV0cnkoKTtcclxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgMjsgaisrKSB7XHJcbiAgICAgICAgdmFyIHJhbmRvbVBvaW50cyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcclxuICAgICAgICAgICAgcmFuZG9tUG9pbnRzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoMjAgKiBpLCAxNSAqIE1hdGguc2luKGoraSAqIG51bSksIDApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJhbmRvbVNwbGluZSA9IG5ldyBUSFJFRS5TcGxpbmVDdXJ2ZTMocmFuZG9tUG9pbnRzKTtcclxuICAgICAgICB2YXIgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuVHViZUdlb21ldHJ5KHJhbmRvbVNwbGluZSwgNSwgMiwgNSk7XHJcbiAgICAgICAgdmFyIG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbnVsbCk7XHJcbiAgICAgICAgbWVzaC5yb3RhdGlvbi5zZXQoTWF0aC5zaW4oaiksIE1hdGguc2luKGogKyAxKSwgTWF0aC5zaW4oaiArIDAuNSkpO1xyXG4gICAgICAgIG1lc2gudXBkYXRlTWF0cml4KCk7XHJcbiAgICAgICAgdGVudGFjbGVHZW9tLm1lcmdlKGdlb21ldHJ5LCBtZXNoLm1hdHJpeCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4odGVudGFjbGVHZW9tKTtcclxufVxyXG5cclxuZnVuY3Rpb24gVGVudGFjbGUobnVtKSB7XHJcbiAgICB2YXIgdGVudGFjbGVHZW9tID0gbmV3IFRIUkVFLkdlb21ldHJ5KCk7XHJcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IDI7IGorKykge1xyXG4gICAgICAgIHZhciByYW5kb21Qb2ludHMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJhbmRvbVBvaW50cy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKDIwICogaSwgMTUgKiBNYXRoLnNpbihqK2kgKiBudW0gLyAyKSwgMCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmFuZG9tU3BsaW5lID0gbmV3IFRIUkVFLlNwbGluZUN1cnZlMyhyYW5kb21Qb2ludHMpO1xyXG4gICAgICAgIHZhciBnZW9tZXRyeSA9IG5ldyBUSFJFRS5UdWJlR2VvbWV0cnkocmFuZG9tU3BsaW5lLCA1LCAyLCA1KTtcclxuICAgICAgICB2YXIgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBudWxsKTtcclxuICAgICAgICBtZXNoLnJvdGF0aW9uLnNldChNYXRoLnNpbihqKSwgTWF0aC5zaW4oaiArIDEpLCBNYXRoLnNpbihqICsgMC41KSk7XHJcbiAgICAgICAgbWVzaC51cGRhdGVNYXRyaXgoKTtcclxuICAgICAgICB0ZW50YWNsZUdlb20ubWVyZ2UoZ2VvbWV0cnksIG1lc2gubWF0cml4KTtcclxuICAgIH1cclxuICAgIHJldHVybih0ZW50YWNsZUdlb20pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBUZW50YWNsZVN0cmFpZ2h0KCkge1xyXG4gICAgdmFyIHRlbnRhY2xlR2VvbSA9IG5ldyBUSFJFRS5HZW9tZXRyeSgpO1xyXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCAxOyBqKyspIHtcclxuICAgICAgICB2YXIgcmFuZG9tUG9pbnRzID0gW107XHJcbiAgICAgICAgcmFuZG9tUG9pbnRzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJhbmRvbVBvaW50cy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAgLSAzMDAgKiBpLCAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByYW5kb21TcGxpbmUgPSBuZXcgVEhSRUUuU3BsaW5lQ3VydmUzKHJhbmRvbVBvaW50cyk7XHJcbiAgICAgICAgdmFyIGdlb21ldHJ5ID0gbmV3IFRIUkVFLlR1YmVHZW9tZXRyeShyYW5kb21TcGxpbmUsIDIsIDMsIDIpO1xyXG4gICAgICAgIHZhciBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG51bGwpO1xyXG4gICAgICAgIG1lc2gucG9zaXRpb24uc2V0KDEwICogTWF0aC5zaW4oaiksIDEwICogTWF0aC5zaW4oaiArIDEpLCAxMCAqIE1hdGguc2luKGogKyAwLjUpKTtcclxuICAgICAgICBtZXNoLnVwZGF0ZU1hdHJpeCgpO1xyXG4gICAgICAgIHRlbnRhY2xlR2VvbS5tZXJnZShnZW9tZXRyeSwgbWVzaC5tYXRyaXgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuKHRlbnRhY2xlR2VvbSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEdyaWQoZ2VvbSkge1xyXG4gICAgdmFyIHRlbnRhY2xlR2VvbSA9IG5ldyBUSFJFRS5HZW9tZXRyeSgpO1xyXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICB2YXIgZ2VvbWV0cnkgPSBnZW9tO1xyXG4gICAgICAgIHZhciBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG51bGwpO1xyXG4gICAgICAgIG1lc2gucG9zaXRpb24uc2V0KDEwICogTWF0aC5zaW4oaiksIDEwICogTWF0aC5zaW4oaiArIDEpLCAxMCAqIE1hdGguc2luKGogKyAwLjUpKTtcclxuICAgICAgICBtZXNoLnVwZGF0ZU1hdHJpeCgpO1xyXG4gICAgICAgIHRlbnRhY2xlR2VvbS5tZXJnZShnZW9tZXRyeSwgbWVzaC5tYXRyaXgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuKHRlbnRhY2xlR2VvbSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUJ1ZyhkYiwgb2Zmc2V0KSB7XHJcbiAgICBpZiAoIW1vdmVtZW50IHx8ICFkYiB8fCAhZGIub2JqZWN0IHx8ICFkYi5vYmplY3QyKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIHZhciBvYmplY3QgPSBkYi5vYmplY3Q7XHJcbiAgICB2YXIgb2JqZWN0MiA9IGRiLm9iamVjdDI7XHJcbiAgICB0aW1lciArPSAwLjY7XHJcblxyXG4gICAgb2JqZWN0LnJvdGF0aW9uLnogPSBNYXRoLnNpbih0aW1lciAqIGRiLnNwZWVkICsgb2Zmc2V0KSAvIDEwO1xyXG4gICAgb2JqZWN0Mi5yb3RhdGlvbi56ID0gLU1hdGguc2luKHRpbWVyICogZGIuc3BlZWQgKyBvZmZzZXQpIC8gMTA7XHJcblxyXG4gICAgb2JqZWN0LnBvc2l0aW9uLnkgPSBNYXRoLnNpbih0aW1lciAqIGRiLnNwZWVkICsgb2Zmc2V0KSAqIDEwIC8gMjtcclxuICAgIG9iamVjdDIucG9zaXRpb24ueSA9IE1hdGguc2luKHRpbWVyICogZGIuc3BlZWQgKyBvZmZzZXQpICogMTAgLyAyO1xyXG5cclxuICAgIGlmIChvZmZzZXQgPT0gc2VsZWN0ZWQgfHwgb2Zmc2V0ID09PSAwKSB7XHJcbiAgICAgICAgcm9sbE92ZXJPYmplY3Qucm90YXRpb24ueiA9IG9iamVjdC5yb3RhdGlvbi56O1xyXG4gICAgICAgIHJvbGxPdmVyT2JqZWN0Mi5yb3RhdGlvbi56ID0gb2JqZWN0Mi5yb3RhdGlvbi56O1xyXG5cclxuICAgICAgICByb2xsT3Zlck9iamVjdC5wb3NpdGlvbi55ID0gb2JqZWN0LnBvc2l0aW9uLnk7XHJcbiAgICAgICAgcm9sbE92ZXJPYmplY3QyLnBvc2l0aW9uLnkgPSBvYmplY3QyLnBvc2l0aW9uLnk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJnYlRvSGV4KHIsIGcsIGIpIHtcclxuICAgIHJldHVybiBcIiNcIiArIGNvbXBvbmVudFRvSGV4KE1hdGguZmxvb3IocikpICsgY29tcG9uZW50VG9IZXgoTWF0aC5mbG9vcihnKSkgKyBjb21wb25lbnRUb0hleChNYXRoLmZsb29yKGIpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcG9uZW50VG9IZXgoYykge1xyXG4gICAgdmFyIGhleCA9IGMudG9TdHJpbmcoMTYpO1xyXG4gICAgcmV0dXJuIGhleC5sZW5ndGggPT0gMSA/IFwiMFwiICsgaGV4IDogaGV4O1xyXG59Il0sImZpbGUiOiJvYmplY3RzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var globalDB = [];
var id = -1;
var featured = false;
var currentLocation = "/";



function preload(author, project) {
    
    loading = true;
    featured = false;
    loadingFeatured = false;
    var url = SERVER + "api/repos.json";

    loadingFeatured = true;
  
    $.getJSON(url, function (data) {
        loading = false;
		
        if (data.items.message) {
            // no results
            hidePreloader();
            console.log(data.items.message)
            return;
        }


        globalDB = data.items;
        featured = loadingFeatured;

		
        for (var i = 0; i < globalDB.length; i++) {
            if (project && globalDB[i] && globalDB[i].link) {
                var last = globalDB[i].link.split('/');
                last = last[last.length - 1].toLowerCase();
                if (last == project && !MOBILE_VERSION) {
                    selected = i;
                }
            }

            var p = globalDB[i].languages;
			
			
            if (p.length === 0 || p.message == "Repository access blocked") {
                p = {
                    unknown: 1000
                };
            }
            var converted = [];
            for (var key in p) {
                if (p.hasOwnProperty(key)) {
                    converted.push({
                        type: analyze(key),
                        size: p[key],
                        name: key
                    });
                }
            }
            globalDB[i].files = converted;
        }

        for (var j = 0; j < viewsNum; j++) {
            prepare(j, j);
        }
		hidePreloader();

    });
}



function analyze(extension) {
    var type = 0;

    for (var i = 0; i < TYPES.length; i++)
        if (TYPES[i] == extension)
            type = i;

    // if (type === 0 && extension != 'unknown')
    //     console.log('ANALYZE: ' + extension + ' not found');

    return type;
}





function prepare(id, staticid) {

    var db = globalDB[id];
    
    
    
    var prevScale = 1;
    if (groups[staticid]) {
        var obj, i;
        for (i = groups[staticid].children.length - 1; i >= 0; i--) {
            obj = groups[staticid].children[i];
            groups[staticid].remove(obj);

        }
        prevScale = groups[staticid].scale.x;
        scene.remove(groups[staticid]);
        groups[staticid] = null;
    }

    if (db) {
        groups[staticid] = new THREE.Group();
        groups[staticid].scale.x = groups[staticid].scale.y = groups[staticid].scale.z = prevScale;
        TweenMax.killDelayedCallsTo(groups[staticid]);
        TweenMax.killTweensOf(groups[staticid]);
        TweenMax.to(groups[staticid].scale, 0.3, {delay: 0.5 * Math.random(), x: 1, y: 1, z: 1, ease: Back.easeOut});
        scene.add(groups[staticid]);

        bug(groups[staticid], db);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcGkuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGdsb2JhbERCID0gW107XHJcbnZhciBpZCA9IC0xO1xyXG52YXIgZmVhdHVyZWQgPSBmYWxzZTtcclxudmFyIGN1cnJlbnRMb2NhdGlvbiA9IFwiL1wiO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBwcmVsb2FkKGF1dGhvciwgcHJvamVjdCkge1xyXG4gICAgXHJcbiAgICBsb2FkaW5nID0gdHJ1ZTtcclxuICAgIGZlYXR1cmVkID0gZmFsc2U7XHJcbiAgICBsb2FkaW5nRmVhdHVyZWQgPSBmYWxzZTtcclxuICAgIHZhciB1cmwgPSBTRVJWRVIgKyBcImFwaS9yZXBvcy5qc29uXCI7XHJcblxyXG4gICAgbG9hZGluZ0ZlYXR1cmVkID0gdHJ1ZTtcclxuICBcclxuICAgICQuZ2V0SlNPTih1cmwsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgbG9hZGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5pdGVtcy5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIC8vIG5vIHJlc3VsdHNcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5pdGVtcy5tZXNzYWdlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZ2xvYmFsREIgPSBkYXRhLml0ZW1zO1xyXG4gICAgICAgIGZlYXR1cmVkID0gbG9hZGluZ0ZlYXR1cmVkO1xyXG5cclxuXHRcdFxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ2xvYmFsREIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHByb2plY3QgJiYgZ2xvYmFsREJbaV0gJiYgZ2xvYmFsREJbaV0ubGluaykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxhc3QgPSBnbG9iYWxEQltpXS5saW5rLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgICAgICBsYXN0ID0gbGFzdFtsYXN0Lmxlbmd0aCAtIDFdLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdCA9PSBwcm9qZWN0ICYmICFNT0JJTEVfVkVSU0lPTikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHAgPSBnbG9iYWxEQltpXS5sYW5ndWFnZXM7XHJcblx0XHRcdFxyXG5cdFx0XHRcclxuICAgICAgICAgICAgaWYgKHAubGVuZ3RoID09PSAwIHx8IHAubWVzc2FnZSA9PSBcIlJlcG9zaXRvcnkgYWNjZXNzIGJsb2NrZWRcIikge1xyXG4gICAgICAgICAgICAgICAgcCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1bmtub3duOiAxMDAwXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjb252ZXJ0ZWQgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHApIHtcclxuICAgICAgICAgICAgICAgIGlmIChwLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb252ZXJ0ZWQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGFuYWx5emUoa2V5KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogcFtrZXldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBrZXlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnbG9iYWxEQltpXS5maWxlcyA9IGNvbnZlcnRlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmlld3NOdW07IGorKykge1xyXG4gICAgICAgICAgICBwcmVwYXJlKGosIGopO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gYW5hbHl6ZShleHRlbnNpb24pIHtcclxuICAgIHZhciB0eXBlID0gMDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IFRZUEVTLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGlmIChUWVBFU1tpXSA9PSBleHRlbnNpb24pXHJcbiAgICAgICAgICAgIHR5cGUgPSBpO1xyXG5cclxuICAgIC8vIGlmICh0eXBlID09PSAwICYmIGV4dGVuc2lvbiAhPSAndW5rbm93bicpXHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ0FOQUxZWkU6ICcgKyBleHRlbnNpb24gKyAnIG5vdCBmb3VuZCcpO1xyXG5cclxuICAgIHJldHVybiB0eXBlO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gcHJlcGFyZShpZCwgc3RhdGljaWQpIHtcclxuXHJcbiAgICB2YXIgZGIgPSBnbG9iYWxEQltpZF07XHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICB2YXIgcHJldlNjYWxlID0gMTtcclxuICAgIGlmIChncm91cHNbc3RhdGljaWRdKSB7XHJcbiAgICAgICAgdmFyIG9iaiwgaTtcclxuICAgICAgICBmb3IgKGkgPSBncm91cHNbc3RhdGljaWRdLmNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIG9iaiA9IGdyb3Vwc1tzdGF0aWNpZF0uY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGdyb3Vwc1tzdGF0aWNpZF0ucmVtb3ZlKG9iaik7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwcmV2U2NhbGUgPSBncm91cHNbc3RhdGljaWRdLnNjYWxlLng7XHJcbiAgICAgICAgc2NlbmUucmVtb3ZlKGdyb3Vwc1tzdGF0aWNpZF0pO1xyXG4gICAgICAgIGdyb3Vwc1tzdGF0aWNpZF0gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkYikge1xyXG4gICAgICAgIGdyb3Vwc1tzdGF0aWNpZF0gPSBuZXcgVEhSRUUuR3JvdXAoKTtcclxuICAgICAgICBncm91cHNbc3RhdGljaWRdLnNjYWxlLnggPSBncm91cHNbc3RhdGljaWRdLnNjYWxlLnkgPSBncm91cHNbc3RhdGljaWRdLnNjYWxlLnogPSBwcmV2U2NhbGU7XHJcbiAgICAgICAgVHdlZW5NYXgua2lsbERlbGF5ZWRDYWxsc1RvKGdyb3Vwc1tzdGF0aWNpZF0pO1xyXG4gICAgICAgIFR3ZWVuTWF4LmtpbGxUd2VlbnNPZihncm91cHNbc3RhdGljaWRdKTtcclxuICAgICAgICBUd2Vlbk1heC50byhncm91cHNbc3RhdGljaWRdLnNjYWxlLCAwLjMsIHtkZWxheTogMC41ICogTWF0aC5yYW5kb20oKSwgeDogMSwgeTogMSwgejogMSwgZWFzZTogQmFjay5lYXNlT3V0fSk7XHJcbiAgICAgICAgc2NlbmUuYWRkKGdyb3Vwc1tzdGF0aWNpZF0pO1xyXG5cclxuICAgICAgICBidWcoZ3JvdXBzW3N0YXRpY2lkXSwgZGIpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var preloaderAnimationInterval;
var preloaderAnimationStep = 0;
var preloaderVisible = false;
var dropTimeout = null;
var aboutOpen = false;
var isDescOpen = true;


function hidePreloader() {
    $('.loading').fadeOut();
}

























//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1aS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcHJlbG9hZGVyQW5pbWF0aW9uSW50ZXJ2YWw7XHJcbnZhciBwcmVsb2FkZXJBbmltYXRpb25TdGVwID0gMDtcclxudmFyIHByZWxvYWRlclZpc2libGUgPSBmYWxzZTtcclxudmFyIGRyb3BUaW1lb3V0ID0gbnVsbDtcclxudmFyIGFib3V0T3BlbiA9IGZhbHNlO1xyXG52YXIgaXNEZXNjT3BlbiA9IHRydWU7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdLCJmaWxlIjoidWkuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var camera, view, controls = [];
var selectedZoom = ZOOM_IN;
var deviceControlsEnabled = false;
var nextRenderScreenshot = {enabled: false};
var i, ii, min, max, newid;
var backgroundRocks, thisLoop;
var skipFPSCheck = false
var filterStrength = 2, dis = 300, spd = 5, animSpd = 5;
var frameTime = 80, lastLoop = new Date, slowCount = 0, tempPosition = new THREE.Vector3();

function setupScene() {

    container = document.getElementById('ascii-background');

    // multiple views
    for (ii = 0; ii < viewsNum; ii++) {
        var view = {};
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        view.camera = camera;
        view.width = 0;
        view.height = 0;
        view.left = 0;
        view.top = 0;
        view.topDiff = 0;
        if (!MOBILE_VERSION) {
            view.relativeDiff = -Math.floor(ii / 3) * 0.5;
        } else {
            view.relativeDiff = -ii - 1;
        }
        view.id = ii;
        view.i = ii;

        controls.push(new THREE.DeviceOrientationControls(camera, true));
        views.push(view);
    }

    // scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0, 0, 10000);

    scene.add(new THREE.AmbientLight(0x444444));

    light = new THREE.SpotLight(0xffffff, 2);
    light.position.set(0, 500, 2000);

    scene.add(light);

    // background rocks
    var greymat = new THREE.MeshBasicMaterial({color: 0x444444,
        side: THREE.DoubleSide});

    for (var i = 0; i < 1; i++) {
        var geometry = new THREE.Geometry();

        for (var j = 0; j < 30; j++) {
            var pregeom;
            if (j % 2 === 0)
                pregeom = new THREE.BoxGeometry(600, 600, 600);//
            if (j % 2 == 1)
                pregeom = new THREE.TetrahedronGeometry(600, 0);
            //change_uvs( pregeom, 1/zoom1, 1/zoom2, Math.floor(Math.random()*zoom1), Math.floor(Math.random()*zoom2) );
            var submesh = new THREE.Mesh(pregeom);
            submesh.scale.x = submesh.scale.y = submesh.scale.z = 0.2 + Math.random() * 1;
            submesh.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
            while (submesh.position.distanceTo(scene.position) < 2000) {
                submesh.position.x = (Math.random() - 0.5) * 6000;
                submesh.position.y = (Math.random() - 0.5) * 6000;
                submesh.position.z = (Math.random() - 0.5) * 6000;
            }
            submesh.updateMatrix();
            geometry.merge(pregeom, submesh.matrix);
        }
    }

    backgroundRocks = new THREE.Mesh(geometry, greymat);
    TweenMax.from(backgroundRocks.scale, 3, {delay: 1.5, x: 4, y: 4, z: 4});
    scene.add(backgroundRocks);

    // core
    renderer = new THREE.WebGLRenderer({antialias: false, alpha: false});
    //renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight - headerHeight);
    //renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = headerHeight + "px";
    container.appendChild(renderer.domElement);
    
    // events
    document.body.addEventListener('mousemove', onDocumentMouseMove, false);
    
   

   
    $(window).bind('DOMMouseScroll', function (event) {
        onMouseWheel(event.originalEvent);
    });

    document.body.addEventListener('touchstart', touchstart, false);
    document.body.addEventListener('touchend', touchend, false);
    document.body.addEventListener('touchmove', touchmove, false);

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('deviceorientation', initControls, false);

    document.onkeydown = checkKey;

    onWindowResize();

    lastLoop = new Date;
}

function initControls(event) {
    if (event.alpha) {
        window.removeEventListener('deviceorientation', initControls, false);
        deviceControlsEnabled = true;
        controls.connect();
        controls.update();
    }
}


function updateSize() {
    if (windowWidth != window.innerWidth || windowHeight != window.innerHeight - headerHeight) {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight - headerHeight;
        renderer.setSize(windowWidth, windowHeight);
    }

}

function animate() {
    
    if (timer <= 20) {
        lastLoop = new Date();
    }
    if (timer > 20 && timer < 2000) {
        var thisFrameTime = (thisLoop = new Date()) - lastLoop;
        if (thisFrameTime < 10000) {
            frameTime += (thisFrameTime - frameTime) / filterStrength;
            lastLoop = thisLoop;

            fps = (1000 / frameTime);
            if (fps < MIN_FPS && !skipFPSCheck) {
                slowCount++;
                if (slowCount > 10) {
                    noWebGL();
                    return;
                }
            } else {
                slowCount = 0;
            }
        }
    }

    for (var i = 0; i < globalDB.length; i++) {
        updateBug(globalDB[i], i);
    }
    render();
    requestAnimationFrame(animate);
}

function render(fast) {
    rendertime -= mouseX / 80;

    updateSize();
    if (nextRenderScreenshot.enabled) {
        windowWidth = nextRenderScreenshot.width;
        windowHeight = nextRenderScreenshot.height;
        renderer.setSize(windowWidth, windowHeight);
        resizePostprocessing();
    }

    for (i = 0; i < viewsNum; i++) {
        if (groups[i])
            groups[i].visible = false;
    }

    topGlobal -= delta;

    min = 0;
    if (topGlobal < min)
        topGlobal -= (topGlobal - min) / 5;

    max = Math.floor(((globalDB.length / viewsNum * 3 / 2) - 1) * 2) / 2 + 0.5;
    if (globalDB.length % 3 === 0 )
        max -= 0.5;
    if (topGlobal > max) {
        topGlobal -= (topGlobal - max) / 5;
    }
    if (globalDB.length <= 6)
        topGlobal = min;

    renderer.clear();
    for (ii = 0; ii < viewsNum; ++ii) {

        view = views[ii];
        camera = view.camera;

        if (groups[ii] && !rolloverMesh) {
            groups[ii].visible = true;
        }
        if (i > 0 && groups[ii - 1])
            groups[ii - 1].visible = false;

        view.topDiff = 0;
        dis = topGlobal + view.relativeDiff;
        if (!MOBILE_VERSION) {
            while ((dis) > 0.5) {
                view.topDiff -= 1.5;
                dis -= 1.5;
            }
        } else {
            while ((dis) > 0) {
                view.topDiff -= 2;
                dis -= 2;
            }
        }
        newid = view.i + Math.floor(-view.topDiff / 1.5 * viewsNum);
        if (view.id != newid) {
            view.id = newid;
            TweenMax.delayedCall(view.i / 100, prepare, [view.id, view.i]);
        }

        if (!MOBILE_VERSION) {
            newWidth = {width: 0.333, height: 0.5, left: 0.333 * (ii % 3), top: topGlobal + view.topDiff + view.relativeDiff};
        } else {
            newWidth = {width: 1, height: 1, left: 0, top: topGlobal + view.topDiff + view.relativeDiff};
        }
        if (!loading) {
            backgroundRocks.material.color.setHSL(0.5 + Math.sin(ii), 0.10, 0.25);
        } else {
            backgroundRocks.material.color.setRGB(0, 0, 0);
        }
        light.color.setHSL(Math.sin(ii * 123.2) / 2 + 0.5, 1, 0.8);

        // renderer sizes
        if (aboutOpen) {
            if (ii === 0) {
                newWidth.width = 0.6;
                newWidth.height = 1;
                newWidth.left = 0.4;
                newWidth.top = -1;
            } else {
                newWidth.width = 0;
                if (ii % 3 == 1)
                    newWidth.width = 1;
                newWidth.height = 0;
                if (ii % 3 === 0 || ii % 3 == 2)
                    newWidth.height = 1;
                newWidth.left = 0;
                if (ii % 3 == 2)
                    newWidth.left = 1;
                newWidth.top = 1;
            }
        } else if (selected != -1) {
            if (selected == view.id) {
                newWidth.width = 1;
                newWidth.height = 1;
                newWidth.left = 0;
                newWidth.top = -1;
            } else {
                newWidth.width = 0;
                if (ii % 3 == 1)
                    newWidth.width = 1;
                newWidth.height = 0;
                if (ii % 3 === 0 || ii % 3 == 2)
                    newWidth.height = 1;
                newWidth.left = 0;
                if (ii % 3 == 2)
                    newWidth.left = 1;
                newWidth.top = 1;

            }
        }

        animSpd = 5;
        if (MOBILE_VERSION || nextRenderScreenshot.enabled || fast) {
            animSpd = 1;
        }
        
        // animate views
        view.width -= (view.width - newWidth.width) / animSpd;
        view.height -= (view.height - newWidth.height) / animSpd;
        view.left -= (view.left - newWidth.left) / animSpd;
        view.top -= (view.top - newWidth.top) / animSpd;
        if (view.height < 0.55) {
            view.top = newWidth.top;
        }

        

        // animate camera
        dis = 300;
        tempPosition = new THREE.Vector3();
        if (!MOBILE_VERSION && (view.id == selected || (-view.top < 0.5 + mouseY && -view.top + view.height > 0.5 + mouseY && view.left < 0.5 + mouseX && view.left + view.width > 0.5 + mouseX))) {
            if (view.id == selected)
                dis = selectedZoom;
            tempPosition.x = -Math.sin(ii + -mouseX * 5 + rendertime) * dis;
            tempPosition.y = -Math.sin(-mouseY * 2) * dis;
            tempPosition.z = -Math.cos(ii + -mouseX * 5 + rendertime) * dis;

            rolledover = view.id;
        } else {
            dis = 500;
            tempPosition.x = -Math.sin(ii + mouseX * 0 + rendertime) * dis;
            tempPosition.y = -Math.sin(mouseY * 0) * dis;
            tempPosition.z = -Math.cos(ii + mouseX * 0 + rendertime) * dis;
        }
        if (!deviceControlsEnabled) {
            camera.position.x -= (camera.position.x - tempPosition.x) / animSpd;
            camera.position.y -= (camera.position.y - tempPosition.y) / animSpd;
            camera.position.z -= (camera.position.z - tempPosition.z) / animSpd;
        } else {
            controls[ii].update();

            camera.position.set(0, 0, 0)
            camera.translateZ(cameraDistance);
        }
        if (nextRenderScreenshot.enabled) {
            if (nextRenderScreenshot.type == "wallpaper") {
                dis = ZOOM_IN_MIN + Math.random() * (ZOOM_IN_MAX - ZOOM_IN_MIN);
                camera.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
                camera.position.set(0, 0, 0);
                camera.translateZ(dis);
            } else if (nextRenderScreenshot.type == "gif") {
                dis = (ZOOM_IN_MIN + ZOOM_IN_MAX) / 2;
                camera.rotation.set(0, Math.PI * 2 * nextRenderScreenshot.id / nextRenderScreenshot.num, 0);
                camera.position.set(0, 0, 0);
                camera.translateZ(dis);
            } else if (nextRenderScreenshot.type == "thumbnail") {
                dis = ZOOM_IN_MIN;
                camera.rotation.set(-.1, .1, 0);
                camera.position.set(0, 0, 0);
                camera.translateZ(dis);
            }
        }
        camera.lookAt((scene.position));

        light.position.x = camera.position.x + 100;
        light.position.y = camera.position.y + 100;
        light.position.z = camera.position.z;

        //and render

        var left = Math.floor(windowWidth * view.left);
        var bottom = Math.floor((windowHeight) * (view.top + (view.height)));
        var width = Math.floor(windowWidth * view.width);
        var height = Math.floor(windowHeight * view.height);
        if (view.width > 0.1 && view.height > 0.1 && view.id < globalDB.length) {
            renderer.setViewport(left, bottom, width, height);
            renderer.setScissor(left, bottom, width, height);
            renderer.enableScissorTest(true);

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            if (asciiShader.enabled) {
                renderer.render(scene, camera, asciiShader.rtTextureColor, true);
            } else {
                renderer.render(scene, camera);
            }
        }
    }

    // postprocessing
    if (asciiShader.enabled) {
        var size = (0.2 + 0.8 * windowHeight / 600 / 4) * 1.5;
        if (size < .5)
            size = .5;
        //if (window.devicePixelRatio)
        //    size /= window.devicePixelRatio
        if (selected != -1 && !MOBILE_VERSION) {
            size *= 1.3;
        }
        if (nextRenderScreenshot.enabled) {
            size *= 0.8;
            if (nextRenderScreenshot.type == "gif") {
                size *= 1.2;
            }
            if (nextRenderScreenshot.type == "thumbnail") {
                size *= 1.5;
            }
        }
        if (MOBILE_VERSION) {
            size *= 1.5;
        }
        uniforms[ 'fontSize'].value = new THREE.Vector2(Math.floor(size * fontWidth), Math.floor(size * fontHeight));
        uniforms[ 'charMapSize'].value = charNum * Math.floor(fontWidth * size);

        renderer.setViewport(0, 0, windowWidth, windowHeight);
        renderer.setScissor(0, 0, windowWidth, windowHeight);
        renderer.render(asciiShader.scene, asciiShader.camera);

        renderer.render(scene, camera, asciiShader.rtTextureColor, true);
    }
    
    
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY2VuZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY2FtZXJhLCB2aWV3LCBjb250cm9scyA9IFtdO1xyXG52YXIgc2VsZWN0ZWRab29tID0gWk9PTV9JTjtcclxudmFyIGRldmljZUNvbnRyb2xzRW5hYmxlZCA9IGZhbHNlO1xyXG52YXIgbmV4dFJlbmRlclNjcmVlbnNob3QgPSB7ZW5hYmxlZDogZmFsc2V9O1xyXG52YXIgaSwgaWksIG1pbiwgbWF4LCBuZXdpZDtcclxudmFyIGJhY2tncm91bmRSb2NrcywgdGhpc0xvb3A7XHJcbnZhciBza2lwRlBTQ2hlY2sgPSBmYWxzZVxyXG52YXIgZmlsdGVyU3RyZW5ndGggPSAyLCBkaXMgPSAzMDAsIHNwZCA9IDUsIGFuaW1TcGQgPSA1O1xyXG52YXIgZnJhbWVUaW1lID0gODAsIGxhc3RMb29wID0gbmV3IERhdGUsIHNsb3dDb3VudCA9IDAsIHRlbXBQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcblxyXG5mdW5jdGlvbiBzZXR1cFNjZW5lKCkge1xyXG5cclxuICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxuXHJcbiAgICAvLyBtdWx0aXBsZSB2aWV3c1xyXG4gICAgZm9yIChpaSA9IDA7IGlpIDwgdmlld3NOdW07IGlpKyspIHtcclxuICAgICAgICB2YXIgdmlldyA9IHt9O1xyXG4gICAgICAgIGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg0NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDEsIDEwMDAwKTtcclxuICAgICAgICB2aWV3LmNhbWVyYSA9IGNhbWVyYTtcclxuICAgICAgICB2aWV3LndpZHRoID0gMDtcclxuICAgICAgICB2aWV3LmhlaWdodCA9IDA7XHJcbiAgICAgICAgdmlldy5sZWZ0ID0gMDtcclxuICAgICAgICB2aWV3LnRvcCA9IDA7XHJcbiAgICAgICAgdmlldy50b3BEaWZmID0gMDtcclxuICAgICAgICBpZiAoIU1PQklMRV9WRVJTSU9OKSB7XHJcbiAgICAgICAgICAgIHZpZXcucmVsYXRpdmVEaWZmID0gLU1hdGguZmxvb3IoaWkgLyAzKSAqIDAuNTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2aWV3LnJlbGF0aXZlRGlmZiA9IC1paSAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZpZXcuaWQgPSBpaTtcclxuICAgICAgICB2aWV3LmkgPSBpaTtcclxuXHJcbiAgICAgICAgY29udHJvbHMucHVzaChuZXcgVEhSRUUuRGV2aWNlT3JpZW50YXRpb25Db250cm9scyhjYW1lcmEsIHRydWUpKTtcclxuICAgICAgICB2aWV3cy5wdXNoKHZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNjZW5lIHNldHVwXHJcbiAgICBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xyXG4gICAgc2NlbmUuZm9nID0gbmV3IFRIUkVFLkZvZygwLCAwLCAxMDAwMCk7XHJcblxyXG4gICAgc2NlbmUuYWRkKG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHg0NDQ0NDQpKTtcclxuXHJcbiAgICBsaWdodCA9IG5ldyBUSFJFRS5TcG90TGlnaHQoMHhmZmZmZmYsIDIpO1xyXG4gICAgbGlnaHQucG9zaXRpb24uc2V0KDAsIDUwMCwgMjAwMCk7XHJcblxyXG4gICAgc2NlbmUuYWRkKGxpZ2h0KTtcclxuXHJcbiAgICAvLyBiYWNrZ3JvdW5kIHJvY2tzXHJcbiAgICB2YXIgZ3JleW1hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7Y29sb3I6IDB4NDQ0NDQ0LFxyXG4gICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGV9KTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE7IGkrKykge1xyXG4gICAgICAgIHZhciBnZW9tZXRyeSA9IG5ldyBUSFJFRS5HZW9tZXRyeSgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDMwOyBqKyspIHtcclxuICAgICAgICAgICAgdmFyIHByZWdlb207XHJcbiAgICAgICAgICAgIGlmIChqICUgMiA9PT0gMClcclxuICAgICAgICAgICAgICAgIHByZWdlb20gPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoNjAwLCA2MDAsIDYwMCk7Ly9cclxuICAgICAgICAgICAgaWYgKGogJSAyID09IDEpXHJcbiAgICAgICAgICAgICAgICBwcmVnZW9tID0gbmV3IFRIUkVFLlRldHJhaGVkcm9uR2VvbWV0cnkoNjAwLCAwKTtcclxuICAgICAgICAgICAgLy9jaGFuZ2VfdXZzKCBwcmVnZW9tLCAxL3pvb20xLCAxL3pvb20yLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqem9vbTEpLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqem9vbTIpICk7XHJcbiAgICAgICAgICAgIHZhciBzdWJtZXNoID0gbmV3IFRIUkVFLk1lc2gocHJlZ2VvbSk7XHJcbiAgICAgICAgICAgIHN1Ym1lc2guc2NhbGUueCA9IHN1Ym1lc2guc2NhbGUueSA9IHN1Ym1lc2guc2NhbGUueiA9IDAuMiArIE1hdGgucmFuZG9tKCkgKiAxO1xyXG4gICAgICAgICAgICBzdWJtZXNoLnJvdGF0aW9uLnNldChNYXRoLnJhbmRvbSgpICogMywgTWF0aC5yYW5kb20oKSAqIDMsIE1hdGgucmFuZG9tKCkgKiAzKTtcclxuICAgICAgICAgICAgd2hpbGUgKHN1Ym1lc2gucG9zaXRpb24uZGlzdGFuY2VUbyhzY2VuZS5wb3NpdGlvbikgPCAyMDAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJtZXNoLnBvc2l0aW9uLnggPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiA2MDAwO1xyXG4gICAgICAgICAgICAgICAgc3VibWVzaC5wb3NpdGlvbi55ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogNjAwMDtcclxuICAgICAgICAgICAgICAgIHN1Ym1lc2gucG9zaXRpb24ueiA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDYwMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3VibWVzaC51cGRhdGVNYXRyaXgoKTtcclxuICAgICAgICAgICAgZ2VvbWV0cnkubWVyZ2UocHJlZ2VvbSwgc3VibWVzaC5tYXRyaXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiYWNrZ3JvdW5kUm9ja3MgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgZ3JleW1hdCk7XHJcbiAgICBUd2Vlbk1heC5mcm9tKGJhY2tncm91bmRSb2Nrcy5zY2FsZSwgMywge2RlbGF5OiAxLjUsIHg6IDQsIHk6IDQsIHo6IDR9KTtcclxuICAgIHNjZW5lLmFkZChiYWNrZ3JvdW5kUm9ja3MpO1xyXG5cclxuICAgIC8vIGNvcmVcclxuICAgIHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe2FudGlhbGlhczogZmFsc2UsIGFscGhhOiBmYWxzZX0pO1xyXG4gICAgLy9yZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcclxuICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCAtIGhlYWRlckhlaWdodCk7XHJcbiAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS50b3AgPSBoZWFkZXJIZWlnaHQgKyBcInB4XCI7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XHJcbiAgICBcclxuICAgIC8vIGV2ZW50c1xyXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbkRvY3VtZW50TW91c2VNb3ZlLCBmYWxzZSk7XHJcbiAgICBcclxuICAgXHJcblxyXG4gICBcclxuICAgICQod2luZG93KS5iaW5kKCdET01Nb3VzZVNjcm9sbCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIG9uTW91c2VXaGVlbChldmVudC5vcmlnaW5hbEV2ZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoc3RhcnQsIGZhbHNlKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaGVuZCwgZmFsc2UpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaG1vdmUsIGZhbHNlKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25XaW5kb3dSZXNpemUsIGZhbHNlKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VvcmllbnRhdGlvbicsIGluaXRDb250cm9scywgZmFsc2UpO1xyXG5cclxuICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGNoZWNrS2V5O1xyXG5cclxuICAgIG9uV2luZG93UmVzaXplKCk7XHJcblxyXG4gICAgbGFzdExvb3AgPSBuZXcgRGF0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdENvbnRyb2xzKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQuYWxwaGEpIHtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLCBpbml0Q29udHJvbHMsIGZhbHNlKTtcclxuICAgICAgICBkZXZpY2VDb250cm9sc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnRyb2xzLmNvbm5lY3QoKTtcclxuICAgICAgICBjb250cm9scy51cGRhdGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVNpemUoKSB7XHJcbiAgICBpZiAod2luZG93V2lkdGggIT0gd2luZG93LmlubmVyV2lkdGggfHwgd2luZG93SGVpZ2h0ICE9IHdpbmRvdy5pbm5lckhlaWdodCAtIGhlYWRlckhlaWdodCkge1xyXG4gICAgICAgIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gaGVhZGVySGVpZ2h0O1xyXG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBhbmltYXRlKCkge1xyXG4gICAgXHJcbiAgICBpZiAodGltZXIgPD0gMjApIHtcclxuICAgICAgICBsYXN0TG9vcCA9IG5ldyBEYXRlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGltZXIgPiAyMCAmJiB0aW1lciA8IDIwMDApIHtcclxuICAgICAgICB2YXIgdGhpc0ZyYW1lVGltZSA9ICh0aGlzTG9vcCA9IG5ldyBEYXRlKCkpIC0gbGFzdExvb3A7XHJcbiAgICAgICAgaWYgKHRoaXNGcmFtZVRpbWUgPCAxMDAwMCkge1xyXG4gICAgICAgICAgICBmcmFtZVRpbWUgKz0gKHRoaXNGcmFtZVRpbWUgLSBmcmFtZVRpbWUpIC8gZmlsdGVyU3RyZW5ndGg7XHJcbiAgICAgICAgICAgIGxhc3RMb29wID0gdGhpc0xvb3A7XHJcblxyXG4gICAgICAgICAgICBmcHMgPSAoMTAwMCAvIGZyYW1lVGltZSk7XHJcbiAgICAgICAgICAgIGlmIChmcHMgPCBNSU5fRlBTICYmICFza2lwRlBTQ2hlY2spIHtcclxuICAgICAgICAgICAgICAgIHNsb3dDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3dDb3VudCA+IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9XZWJHTCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNsb3dDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBnbG9iYWxEQi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHVwZGF0ZUJ1ZyhnbG9iYWxEQltpXSwgaSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKTtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyKGZhc3QpIHtcclxuICAgIHJlbmRlcnRpbWUgLT0gbW91c2VYIC8gODA7XHJcblxyXG4gICAgdXBkYXRlU2l6ZSgpO1xyXG4gICAgaWYgKG5leHRSZW5kZXJTY3JlZW5zaG90LmVuYWJsZWQpIHtcclxuICAgICAgICB3aW5kb3dXaWR0aCA9IG5leHRSZW5kZXJTY3JlZW5zaG90LndpZHRoO1xyXG4gICAgICAgIHdpbmRvd0hlaWdodCA9IG5leHRSZW5kZXJTY3JlZW5zaG90LmhlaWdodDtcclxuICAgICAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQpO1xyXG4gICAgICAgIHJlc2l6ZVBvc3Rwcm9jZXNzaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHZpZXdzTnVtOyBpKyspIHtcclxuICAgICAgICBpZiAoZ3JvdXBzW2ldKVxyXG4gICAgICAgICAgICBncm91cHNbaV0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRvcEdsb2JhbCAtPSBkZWx0YTtcclxuXHJcbiAgICBtaW4gPSAwO1xyXG4gICAgaWYgKHRvcEdsb2JhbCA8IG1pbilcclxuICAgICAgICB0b3BHbG9iYWwgLT0gKHRvcEdsb2JhbCAtIG1pbikgLyA1O1xyXG5cclxuICAgIG1heCA9IE1hdGguZmxvb3IoKChnbG9iYWxEQi5sZW5ndGggLyB2aWV3c051bSAqIDMgLyAyKSAtIDEpICogMikgLyAyICsgMC41O1xyXG4gICAgaWYgKGdsb2JhbERCLmxlbmd0aCAlIDMgPT09IDAgJiYgIU1PQklMRV9WRVJTSU9OKVxyXG4gICAgICAgIG1heCAtPSAwLjU7XHJcbiAgICBpZiAodG9wR2xvYmFsID4gbWF4KSB7XHJcbiAgICAgICAgdG9wR2xvYmFsIC09ICh0b3BHbG9iYWwgLSBtYXgpIC8gNTtcclxuICAgIH1cclxuICAgIGlmIChnbG9iYWxEQi5sZW5ndGggPD0gNilcclxuICAgICAgICB0b3BHbG9iYWwgPSBtaW47XHJcblxyXG4gICAgcmVuZGVyZXIuY2xlYXIoKTtcclxuICAgIGZvciAoaWkgPSAwOyBpaSA8IHZpZXdzTnVtOyArK2lpKSB7XHJcblxyXG4gICAgICAgIHZpZXcgPSB2aWV3c1tpaV07XHJcbiAgICAgICAgY2FtZXJhID0gdmlldy5jYW1lcmE7XHJcblxyXG4gICAgICAgIGlmIChncm91cHNbaWldICYmICFyb2xsb3Zlck1lc2gpIHtcclxuICAgICAgICAgICAgZ3JvdXBzW2lpXS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGkgPiAwICYmIGdyb3Vwc1tpaSAtIDFdKVxyXG4gICAgICAgICAgICBncm91cHNbaWkgLSAxXS52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHZpZXcudG9wRGlmZiA9IDA7XHJcbiAgICAgICAgZGlzID0gdG9wR2xvYmFsICsgdmlldy5yZWxhdGl2ZURpZmY7XHJcbiAgICAgICAgaWYgKCFNT0JJTEVfVkVSU0lPTikge1xyXG4gICAgICAgICAgICB3aGlsZSAoKGRpcykgPiAwLjUpIHtcclxuICAgICAgICAgICAgICAgIHZpZXcudG9wRGlmZiAtPSAxLjU7XHJcbiAgICAgICAgICAgICAgICBkaXMgLT0gMS41O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2hpbGUgKChkaXMpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdmlldy50b3BEaWZmIC09IDI7XHJcbiAgICAgICAgICAgICAgICBkaXMgLT0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdpZCA9IHZpZXcuaSArIE1hdGguZmxvb3IoLXZpZXcudG9wRGlmZiAvIDEuNSAqIHZpZXdzTnVtKTtcclxuICAgICAgICBpZiAodmlldy5pZCAhPSBuZXdpZCkge1xyXG4gICAgICAgICAgICB2aWV3LmlkID0gbmV3aWQ7XHJcbiAgICAgICAgICAgIFR3ZWVuTWF4LmRlbGF5ZWRDYWxsKHZpZXcuaSAvIDEwMCwgcHJlcGFyZSwgW3ZpZXcuaWQsIHZpZXcuaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFNT0JJTEVfVkVSU0lPTikge1xyXG4gICAgICAgICAgICBuZXdXaWR0aCA9IHt3aWR0aDogMC4zMzMsIGhlaWdodDogMC41LCBsZWZ0OiAwLjMzMyAqIChpaSAlIDMpLCB0b3A6IHRvcEdsb2JhbCArIHZpZXcudG9wRGlmZiArIHZpZXcucmVsYXRpdmVEaWZmfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdXaWR0aCA9IHt3aWR0aDogMSwgaGVpZ2h0OiAxLCBsZWZ0OiAwLCB0b3A6IHRvcEdsb2JhbCArIHZpZXcudG9wRGlmZiArIHZpZXcucmVsYXRpdmVEaWZmfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFsb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRSb2Nrcy5tYXRlcmlhbC5jb2xvci5zZXRIU0woMC41ICsgTWF0aC5zaW4oaWkpLCAwLjEwLCAwLjI1KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kUm9ja3MubWF0ZXJpYWwuY29sb3Iuc2V0UkdCKDAsIDAsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsaWdodC5jb2xvci5zZXRIU0woTWF0aC5zaW4oaWkgKiAxMjMuMikgLyAyICsgMC41LCAxLCAwLjgpO1xyXG5cclxuICAgICAgICAvLyByZW5kZXJlciBzaXplc1xyXG4gICAgICAgIGlmIChhYm91dE9wZW4pIHtcclxuICAgICAgICAgICAgaWYgKGlpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdXaWR0aC53aWR0aCA9IDAuNjtcclxuICAgICAgICAgICAgICAgIG5ld1dpZHRoLmhlaWdodCA9IDE7XHJcbiAgICAgICAgICAgICAgICBuZXdXaWR0aC5sZWZ0ID0gMC40O1xyXG4gICAgICAgICAgICAgICAgbmV3V2lkdGgudG9wID0gLTE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdXaWR0aC53aWR0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWkgJSAzID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3V2lkdGgud2lkdGggPSAxO1xyXG4gICAgICAgICAgICAgICAgbmV3V2lkdGguaGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgIGlmIChpaSAlIDMgPT09IDAgfHwgaWkgJSAzID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3V2lkdGguaGVpZ2h0ID0gMTtcclxuICAgICAgICAgICAgICAgIG5ld1dpZHRoLmxlZnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlpICUgMyA9PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1dpZHRoLmxlZnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgbmV3V2lkdGgudG9wID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWQgIT0gLTEpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkID09IHZpZXcuaWQpIHtcclxuICAgICAgICAgICAgICAgIG5ld1dpZHRoLndpZHRoID0gMTtcclxuICAgICAgICAgICAgICAgIG5ld1dpZHRoLmhlaWdodCA9IDE7XHJcbiAgICAgICAgICAgICAgICBuZXdXaWR0aC5sZWZ0ID0gMDtcclxuICAgICAgICAgICAgICAgIG5ld1dpZHRoLnRvcCA9IC0xO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3V2lkdGgud2lkdGggPSAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlpICUgMyA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1dpZHRoLndpZHRoID0gMTtcclxuICAgICAgICAgICAgICAgIG5ld1dpZHRoLmhlaWdodCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWkgJSAzID09PSAwIHx8IGlpICUgMyA9PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1dpZHRoLmhlaWdodCA9IDE7XHJcbiAgICAgICAgICAgICAgICBuZXdXaWR0aC5sZWZ0ID0gMDtcclxuICAgICAgICAgICAgICAgIGlmIChpaSAlIDMgPT0gMilcclxuICAgICAgICAgICAgICAgICAgICBuZXdXaWR0aC5sZWZ0ID0gMTtcclxuICAgICAgICAgICAgICAgIG5ld1dpZHRoLnRvcCA9IDE7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbmltU3BkID0gNTtcclxuICAgICAgICBpZiAoTU9CSUxFX1ZFUlNJT04gfHwgbmV4dFJlbmRlclNjcmVlbnNob3QuZW5hYmxlZCB8fCBmYXN0KSB7XHJcbiAgICAgICAgICAgIGFuaW1TcGQgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBhbmltYXRlIHZpZXdzXHJcbiAgICAgICAgdmlldy53aWR0aCAtPSAodmlldy53aWR0aCAtIG5ld1dpZHRoLndpZHRoKSAvIGFuaW1TcGQ7XHJcbiAgICAgICAgdmlldy5oZWlnaHQgLT0gKHZpZXcuaGVpZ2h0IC0gbmV3V2lkdGguaGVpZ2h0KSAvIGFuaW1TcGQ7XHJcbiAgICAgICAgdmlldy5sZWZ0IC09ICh2aWV3LmxlZnQgLSBuZXdXaWR0aC5sZWZ0KSAvIGFuaW1TcGQ7XHJcbiAgICAgICAgdmlldy50b3AgLT0gKHZpZXcudG9wIC0gbmV3V2lkdGgudG9wKSAvIGFuaW1TcGQ7XHJcbiAgICAgICAgaWYgKHZpZXcuaGVpZ2h0IDwgMC41NSkge1xyXG4gICAgICAgICAgICB2aWV3LnRvcCA9IG5ld1dpZHRoLnRvcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvLyBhbmltYXRlIGNhbWVyYVxyXG4gICAgICAgIGRpcyA9IDMwMDtcclxuICAgICAgICB0ZW1wUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG4gICAgICAgIGlmICghTU9CSUxFX1ZFUlNJT04gJiYgKHZpZXcuaWQgPT0gc2VsZWN0ZWQgfHwgKC12aWV3LnRvcCA8IDAuNSArIG1vdXNlWSAmJiAtdmlldy50b3AgKyB2aWV3LmhlaWdodCA+IDAuNSArIG1vdXNlWSAmJiB2aWV3LmxlZnQgPCAwLjUgKyBtb3VzZVggJiYgdmlldy5sZWZ0ICsgdmlldy53aWR0aCA+IDAuNSArIG1vdXNlWCkpKSB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3LmlkID09IHNlbGVjdGVkKVxyXG4gICAgICAgICAgICAgICAgZGlzID0gc2VsZWN0ZWRab29tO1xyXG4gICAgICAgICAgICB0ZW1wUG9zaXRpb24ueCA9IC1NYXRoLnNpbihpaSArIC1tb3VzZVggKiA1ICsgcmVuZGVydGltZSkgKiBkaXM7XHJcbiAgICAgICAgICAgIHRlbXBQb3NpdGlvbi55ID0gLU1hdGguc2luKC1tb3VzZVkgKiAyKSAqIGRpcztcclxuICAgICAgICAgICAgdGVtcFBvc2l0aW9uLnogPSAtTWF0aC5jb3MoaWkgKyAtbW91c2VYICogNSArIHJlbmRlcnRpbWUpICogZGlzO1xyXG5cclxuICAgICAgICAgICAgcm9sbGVkb3ZlciA9IHZpZXcuaWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGlzID0gNTAwO1xyXG4gICAgICAgICAgICB0ZW1wUG9zaXRpb24ueCA9IC1NYXRoLnNpbihpaSArIG1vdXNlWCAqIDAgKyByZW5kZXJ0aW1lKSAqIGRpcztcclxuICAgICAgICAgICAgdGVtcFBvc2l0aW9uLnkgPSAtTWF0aC5zaW4obW91c2VZICogMCkgKiBkaXM7XHJcbiAgICAgICAgICAgIHRlbXBQb3NpdGlvbi56ID0gLU1hdGguY29zKGlpICsgbW91c2VYICogMCArIHJlbmRlcnRpbWUpICogZGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRldmljZUNvbnRyb2xzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICBjYW1lcmEucG9zaXRpb24ueCAtPSAoY2FtZXJhLnBvc2l0aW9uLnggLSB0ZW1wUG9zaXRpb24ueCkgLyBhbmltU3BkO1xyXG4gICAgICAgICAgICBjYW1lcmEucG9zaXRpb24ueSAtPSAoY2FtZXJhLnBvc2l0aW9uLnkgLSB0ZW1wUG9zaXRpb24ueSkgLyBhbmltU3BkO1xyXG4gICAgICAgICAgICBjYW1lcmEucG9zaXRpb24ueiAtPSAoY2FtZXJhLnBvc2l0aW9uLnogLSB0ZW1wUG9zaXRpb24ueikgLyBhbmltU3BkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xzW2lpXS51cGRhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGNhbWVyYS5wb3NpdGlvbi5zZXQoMCwgMCwgMClcclxuICAgICAgICAgICAgY2FtZXJhLnRyYW5zbGF0ZVooY2FtZXJhRGlzdGFuY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV4dFJlbmRlclNjcmVlbnNob3QuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBpZiAobmV4dFJlbmRlclNjcmVlbnNob3QudHlwZSA9PSBcIndhbGxwYXBlclwiKSB7XHJcbiAgICAgICAgICAgICAgICBkaXMgPSBaT09NX0lOX01JTiArIE1hdGgucmFuZG9tKCkgKiAoWk9PTV9JTl9NQVggLSBaT09NX0lOX01JTik7XHJcbiAgICAgICAgICAgICAgICBjYW1lcmEucm90YXRpb24uc2V0KE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMiwgTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyLCBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDIpO1xyXG4gICAgICAgICAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnNldCgwLCAwLCAwKTtcclxuICAgICAgICAgICAgICAgIGNhbWVyYS50cmFuc2xhdGVaKGRpcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dFJlbmRlclNjcmVlbnNob3QudHlwZSA9PSBcImdpZlwiKSB7XHJcbiAgICAgICAgICAgICAgICBkaXMgPSAoWk9PTV9JTl9NSU4gKyBaT09NX0lOX01BWCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgY2FtZXJhLnJvdGF0aW9uLnNldCgwLCBNYXRoLlBJICogMiAqIG5leHRSZW5kZXJTY3JlZW5zaG90LmlkIC8gbmV4dFJlbmRlclNjcmVlbnNob3QubnVtLCAwKTtcclxuICAgICAgICAgICAgICAgIGNhbWVyYS5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBjYW1lcmEudHJhbnNsYXRlWihkaXMpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRSZW5kZXJTY3JlZW5zaG90LnR5cGUgPT0gXCJ0aHVtYm5haWxcIikge1xyXG4gICAgICAgICAgICAgICAgZGlzID0gWk9PTV9JTl9NSU47XHJcbiAgICAgICAgICAgICAgICBjYW1lcmEucm90YXRpb24uc2V0KC0uMSwgLjEsIDApO1xyXG4gICAgICAgICAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnNldCgwLCAwLCAwKTtcclxuICAgICAgICAgICAgICAgIGNhbWVyYS50cmFuc2xhdGVaKGRpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2FtZXJhLmxvb2tBdCgoc2NlbmUucG9zaXRpb24pKTtcclxuXHJcbiAgICAgICAgbGlnaHQucG9zaXRpb24ueCA9IGNhbWVyYS5wb3NpdGlvbi54ICsgMTAwO1xyXG4gICAgICAgIGxpZ2h0LnBvc2l0aW9uLnkgPSBjYW1lcmEucG9zaXRpb24ueSArIDEwMDtcclxuICAgICAgICBsaWdodC5wb3NpdGlvbi56ID0gY2FtZXJhLnBvc2l0aW9uLno7XHJcblxyXG4gICAgICAgIC8vYW5kIHJlbmRlclxyXG5cclxuICAgICAgICB2YXIgbGVmdCA9IE1hdGguZmxvb3Iod2luZG93V2lkdGggKiB2aWV3LmxlZnQpO1xyXG4gICAgICAgIHZhciBib3R0b20gPSBNYXRoLmZsb29yKCh3aW5kb3dIZWlnaHQpICogKHZpZXcudG9wICsgKHZpZXcuaGVpZ2h0KSkpO1xyXG4gICAgICAgIHZhciB3aWR0aCA9IE1hdGguZmxvb3Iod2luZG93V2lkdGggKiB2aWV3LndpZHRoKTtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gTWF0aC5mbG9vcih3aW5kb3dIZWlnaHQgKiB2aWV3LmhlaWdodCk7XHJcbiAgICAgICAgaWYgKHZpZXcud2lkdGggPiAwLjEgJiYgdmlldy5oZWlnaHQgPiAwLjEgJiYgdmlldy5pZCA8IGdsb2JhbERCLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZW5kZXJlci5zZXRWaWV3cG9ydChsZWZ0LCBib3R0b20sIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICByZW5kZXJlci5zZXRTY2lzc29yKGxlZnQsIGJvdHRvbSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIHJlbmRlcmVyLmVuYWJsZVNjaXNzb3JUZXN0KHRydWUpO1xyXG5cclxuICAgICAgICAgICAgY2FtZXJhLmFzcGVjdCA9IHdpZHRoIC8gaGVpZ2h0O1xyXG4gICAgICAgICAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFzY2lpU2hhZGVyLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhLCBhc2NpaVNoYWRlci5ydFRleHR1cmVDb2xvciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcG9zdHByb2Nlc3NpbmdcclxuICAgIGlmIChhc2NpaVNoYWRlci5lbmFibGVkKSB7XHJcbiAgICAgICAgdmFyIHNpemUgPSAoMC4yICsgMC44ICogd2luZG93SGVpZ2h0IC8gNjAwIC8gNCkgKiAxLjU7XHJcbiAgICAgICAgaWYgKHNpemUgPCAuNSlcclxuICAgICAgICAgICAgc2l6ZSA9IC41O1xyXG4gICAgICAgIC8vaWYgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKVxyXG4gICAgICAgIC8vICAgIHNpemUgLz0gd2luZG93LmRldmljZVBpeGVsUmF0aW9cclxuICAgICAgICBpZiAoc2VsZWN0ZWQgIT0gLTEgJiYgIU1PQklMRV9WRVJTSU9OKSB7XHJcbiAgICAgICAgICAgIHNpemUgKj0gMS4zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV4dFJlbmRlclNjcmVlbnNob3QuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBzaXplICo9IDAuODtcclxuICAgICAgICAgICAgaWYgKG5leHRSZW5kZXJTY3JlZW5zaG90LnR5cGUgPT0gXCJnaWZcIikge1xyXG4gICAgICAgICAgICAgICAgc2l6ZSAqPSAxLjI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5leHRSZW5kZXJTY3JlZW5zaG90LnR5cGUgPT0gXCJ0aHVtYm5haWxcIikge1xyXG4gICAgICAgICAgICAgICAgc2l6ZSAqPSAxLjU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1PQklMRV9WRVJTSU9OKSB7XHJcbiAgICAgICAgICAgIHNpemUgKj0gMS41O1xyXG4gICAgICAgIH1cclxuICAgICAgICB1bmlmb3Jtc1sgJ2ZvbnRTaXplJ10udmFsdWUgPSBuZXcgVEhSRUUuVmVjdG9yMihNYXRoLmZsb29yKHNpemUgKiBmb250V2lkdGgpLCBNYXRoLmZsb29yKHNpemUgKiBmb250SGVpZ2h0KSk7XHJcbiAgICAgICAgdW5pZm9ybXNbICdjaGFyTWFwU2l6ZSddLnZhbHVlID0gY2hhck51bSAqIE1hdGguZmxvb3IoZm9udFdpZHRoICogc2l6ZSk7XHJcblxyXG4gICAgICAgIHJlbmRlcmVyLnNldFZpZXdwb3J0KDAsIDAsIHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQpO1xyXG4gICAgICAgIHJlbmRlcmVyLnNldFNjaXNzb3IoMCwgMCwgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7XHJcbiAgICAgICAgcmVuZGVyZXIucmVuZGVyKGFzY2lpU2hhZGVyLnNjZW5lLCBhc2NpaVNoYWRlci5jYW1lcmEpO1xyXG5cclxuICAgICAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSwgYXNjaWlTaGFkZXIucnRUZXh0dXJlQ29sb3IsIHRydWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxufVxuIl0sImZpbGUiOiJzY2VuZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var state = 0;
var rotateStart = new THREE.Vector2();
var rotateEnd = new THREE.Vector2();

var dollyStart = new THREE.Vector2();
var dollyEnd = new THREE.Vector2();
var dollyDelta = new THREE.Vector2();

var cameraDistance = 650;

var touching = false;



function onMouseWheel(event) {
    if ($(event.target).closest('.has-scroll').length <= 0) {
        event.preventDefault();
        event.stopPropagation();

        if (event.wheelDelta !== undefined) {
            selectedZoom -= event.wheelDelta / 10;
        } else {
            selectedZoom -= event.detail / 10 * 20;
        }
        if (selectedZoom < ZOOM_IN_MIN)
            selectedZoom = ZOOM_IN_MIN;
        if (selectedZoom > ZOOM_IN_MAX)
            selectedZoom = ZOOM_IN_MAX;
        if (selected != -1)
            return;

        delta = 0;

        if (event.wheelDelta !== undefined) { // WebKit / Opera / Explorer 9

            delta = event.wheelDelta;

        } else if (event.detail !== undefined) { // Firefox

            delta = -event.detail * 20;

        }

        if (window.devicePixelRatio)
            delta *= window.devicePixelRatio;

        delta /= 5000;
    }

}

function touchstart(event) {
    touching = !$(event.target).closest('.header').length && !$(event.target).closest('.popup').length;
    if (!!touching) {
        switch (event.touches.length) {
            case 1:
                state = 1;
                rotateStart.set(event.touches[ 0 ].pageX, event.touches[ 0 ].pageY);
                break;
            case 2:
                state = 2;
                var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
                var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
                var distance = Math.sqrt(dx * dx + dy * dy);
                dollyStart.set(0, distance);
                break;
            case 3:
                break;
            default:
                state = 0;
        }
    }

}

function touchmove(event) {
    if (!!touching) {
        event.preventDefault();
        event.stopPropagation();
        switch (event.touches.length) {
            case 1:
                if (state !== 1)
                    return;
                rotateEnd.set(event.touches[ 0 ].pageX, event.touches[ 0 ].pageY);
                delta = -(rotateStart.y - rotateEnd.y) / 500;
                deltaX = (rotateStart.x - rotateEnd.x) / 500;
                rotateStart.set(event.touches[ 0 ].pageX, event.touches[ 0 ].pageY);
                if (selected != -1)
                    delta = -delta;
                break;
            case 2:
                if (state !== 2)
                    return;
                var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
                var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
                var distance = Math.sqrt(dx * dx + dy * dy);
                dollyEnd.set(0, distance);
                dollyDelta.subVectors(dollyEnd, dollyStart);
                if (dollyDelta.y > 0) {
                    cameraDistance -= dollyDelta.y * cameraDistance / 100;
                } else if (dollyDelta.y < 0) {
                    cameraDistance -= dollyDelta.y * cameraDistance / 100;
                }
                if (cameraDistance < ZOOM_IN_MIN)
                    cameraDistance = ZOOM_IN_MIN;
                if (cameraDistance > ZOOM_IN_MAX)
                    cameraDistance = ZOOM_IN_MAX;
                dollyStart.copy(dollyEnd);
                break;
            case 3:
                break;
            default:
                state = 0;
        }
    }

}

function touchend( ) {
    state = 0;
}

function checkKey(e) {
    var keynum;
    if (window.event) { // IE					
        keynum = e.keyCode;
    } else
    if (e.which) { // Netscape/Firefox/Opera					
        keynum = e.which;
    }
    var k = String.fromCharCode(keynum).toLowerCase();
    if (Number(k) == k) {
        asciiMode = Number(k);
        asciiShader.enabled = true;
        uniforms[ 'mode' ].value = Number(k);
    }
    if (keynum == '192') {
        asciiShader.enabled = !asciiShader.enabled;
    }
    if (keynum == '191') {
        geoms = shuffle(geoms)
        var tempTopGlobal = topGlobal;
        topGlobal = 100;
        render(false)
        topGlobal = tempTopGlobal;

    }
    if (keynum == '38')
        prevSuggestion();
    else if (keynum == '40')
        nextSuggestion();
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowWidth / 2) / windowWidth;
    mouseY = ((event.clientY - headerHeight) - windowHeight / 2) / windowHeight;
}

function onWindowResize() {
    updateSize();
    resizePostprocessing();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJldmVudHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHN0YXRlID0gMDtcclxudmFyIHJvdGF0ZVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcclxudmFyIHJvdGF0ZUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XHJcblxyXG52YXIgZG9sbHlTdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XHJcbnZhciBkb2xseUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XHJcbnZhciBkb2xseURlbHRhID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcclxuXHJcbnZhciBjYW1lcmFEaXN0YW5jZSA9IDY1MDtcclxuXHJcbnZhciB0b3VjaGluZyA9IGZhbHNlO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBvbk1vdXNlV2hlZWwoZXZlbnQpIHtcclxuICAgIGlmICgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmhhcy1zY3JvbGwnKS5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIGlmIChldmVudC53aGVlbERlbHRhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRab29tIC09IGV2ZW50LndoZWVsRGVsdGEgLyAxMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxlY3RlZFpvb20gLT0gZXZlbnQuZGV0YWlsIC8gMTAgKiAyMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkWm9vbSA8IFpPT01fSU5fTUlOKVxyXG4gICAgICAgICAgICBzZWxlY3RlZFpvb20gPSBaT09NX0lOX01JTjtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRab29tID4gWk9PTV9JTl9NQVgpXHJcbiAgICAgICAgICAgIHNlbGVjdGVkWm9vbSA9IFpPT01fSU5fTUFYO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZCAhPSAtMSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBkZWx0YSA9IDA7XHJcblxyXG4gICAgICAgIGlmIChldmVudC53aGVlbERlbHRhICE9PSB1bmRlZmluZWQpIHsgLy8gV2ViS2l0IC8gT3BlcmEgLyBFeHBsb3JlciA5XHJcblxyXG4gICAgICAgICAgICBkZWx0YSA9IGV2ZW50LndoZWVsRGVsdGE7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuZGV0YWlsICE9PSB1bmRlZmluZWQpIHsgLy8gRmlyZWZveFxyXG5cclxuICAgICAgICAgICAgZGVsdGEgPSAtZXZlbnQuZGV0YWlsICogMjA7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKVxyXG4gICAgICAgICAgICBkZWx0YSAqPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcclxuXHJcbiAgICAgICAgZGVsdGEgLz0gNTAwMDtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvdWNoc3RhcnQoZXZlbnQpIHtcclxuICAgIHRvdWNoaW5nID0gISQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuaGVhZGVyJykubGVuZ3RoICYmICEkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnBvcHVwJykubGVuZ3RoO1xyXG4gICAgaWYgKCEhdG91Y2hpbmcpIHtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvdWNoZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gMTtcclxuICAgICAgICAgICAgICAgIHJvdGF0ZVN0YXJ0LnNldChldmVudC50b3VjaGVzWyAwIF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgdmFyIGR4ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgdmFyIGR5ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VZO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcclxuICAgICAgICAgICAgICAgIGRvbGx5U3RhcnQuc2V0KDAsIGRpc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiB0b3VjaG1vdmUoZXZlbnQpIHtcclxuICAgIGlmICghIXRvdWNoaW5nKSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvdWNoZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSAhPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICByb3RhdGVFbmQuc2V0KGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCwgZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZKTtcclxuICAgICAgICAgICAgICAgIGRlbHRhID0gLShyb3RhdGVTdGFydC55IC0gcm90YXRlRW5kLnkpIC8gNTAwO1xyXG4gICAgICAgICAgICAgICAgZGVsdGFYID0gKHJvdGF0ZVN0YXJ0LnggLSByb3RhdGVFbmQueCkgLyA1MDA7XHJcbiAgICAgICAgICAgICAgICByb3RhdGVTdGFydC5zZXQoZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYLCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkICE9IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhID0gLWRlbHRhO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSAhPT0gMilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB2YXIgZHggPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVggLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVg7XHJcbiAgICAgICAgICAgICAgICB2YXIgZHkgPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG4gICAgICAgICAgICAgICAgZG9sbHlFbmQuc2V0KDAsIGRpc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGRvbGx5RGVsdGEuc3ViVmVjdG9ycyhkb2xseUVuZCwgZG9sbHlTdGFydCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9sbHlEZWx0YS55ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbWVyYURpc3RhbmNlIC09IGRvbGx5RGVsdGEueSAqIGNhbWVyYURpc3RhbmNlIC8gMTAwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2xseURlbHRhLnkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FtZXJhRGlzdGFuY2UgLT0gZG9sbHlEZWx0YS55ICogY2FtZXJhRGlzdGFuY2UgLyAxMDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FtZXJhRGlzdGFuY2UgPCBaT09NX0lOX01JTilcclxuICAgICAgICAgICAgICAgICAgICBjYW1lcmFEaXN0YW5jZSA9IFpPT01fSU5fTUlOO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbWVyYURpc3RhbmNlID4gWk9PTV9JTl9NQVgpXHJcbiAgICAgICAgICAgICAgICAgICAgY2FtZXJhRGlzdGFuY2UgPSBaT09NX0lOX01BWDtcclxuICAgICAgICAgICAgICAgIGRvbGx5U3RhcnQuY29weShkb2xseUVuZCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gdG91Y2hlbmQoICkge1xyXG4gICAgc3RhdGUgPSAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0tleShlKSB7XHJcbiAgICB2YXIga2V5bnVtO1xyXG4gICAgaWYgKHdpbmRvdy5ldmVudCkgeyAvLyBJRVx0XHRcdFx0XHRcclxuICAgICAgICBrZXludW0gPSBlLmtleUNvZGU7XHJcbiAgICB9IGVsc2VcclxuICAgIGlmIChlLndoaWNoKSB7IC8vIE5ldHNjYXBlL0ZpcmVmb3gvT3BlcmFcdFx0XHRcdFx0XHJcbiAgICAgICAga2V5bnVtID0gZS53aGljaDtcclxuICAgIH1cclxuICAgIHZhciBrID0gU3RyaW5nLmZyb21DaGFyQ29kZShrZXludW0pLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAoTnVtYmVyKGspID09IGspIHtcclxuICAgICAgICBhc2NpaU1vZGUgPSBOdW1iZXIoayk7XHJcbiAgICAgICAgYXNjaWlTaGFkZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdW5pZm9ybXNbICdtb2RlJyBdLnZhbHVlID0gTnVtYmVyKGspO1xyXG4gICAgfVxyXG4gICAgaWYgKGtleW51bSA9PSAnMTkyJykge1xyXG4gICAgICAgIGFzY2lpU2hhZGVyLmVuYWJsZWQgPSAhYXNjaWlTaGFkZXIuZW5hYmxlZDtcclxuICAgIH1cclxuICAgIGlmIChrZXludW0gPT0gJzE5MScpIHtcclxuICAgICAgICBnZW9tcyA9IHNodWZmbGUoZ2VvbXMpXHJcbiAgICAgICAgdmFyIHRlbXBUb3BHbG9iYWwgPSB0b3BHbG9iYWw7XHJcbiAgICAgICAgdG9wR2xvYmFsID0gMTAwO1xyXG4gICAgICAgIHJlbmRlcihmYWxzZSlcclxuICAgICAgICB0b3BHbG9iYWwgPSB0ZW1wVG9wR2xvYmFsO1xyXG5cclxuICAgIH1cclxuICAgIGlmIChrZXludW0gPT0gJzM4JylcclxuICAgICAgICBwcmV2U3VnZ2VzdGlvbigpO1xyXG4gICAgZWxzZSBpZiAoa2V5bnVtID09ICc0MCcpXHJcbiAgICAgICAgbmV4dFN1Z2dlc3Rpb24oKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb25Eb2N1bWVudE1vdXNlTW92ZShldmVudCkge1xyXG4gICAgbW91c2VYID0gKGV2ZW50LmNsaWVudFggLSB3aW5kb3dXaWR0aCAvIDIpIC8gd2luZG93V2lkdGg7XHJcbiAgICBtb3VzZVkgPSAoKGV2ZW50LmNsaWVudFkgLSBoZWFkZXJIZWlnaHQpIC0gd2luZG93SGVpZ2h0IC8gMikgLyB3aW5kb3dIZWlnaHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uV2luZG93UmVzaXplKCkge1xyXG4gICAgdXBkYXRlU2l6ZSgpO1xyXG4gICAgcmVzaXplUG9zdHByb2Nlc3NpbmcoKTtcclxufSJdLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=


var wireframe = false;
var movement = true;
var delta = 0,deltaX = 0
var rendertime = 0
var groups = []
var container, stats;
var difference = 0;
var views, scene, renderer;
var mesh, light;
var mouseX = 0, mouseY = 0;
var windowWidth, windowHeight;
var selected = -1;
var rolledover = -1;
var views = [];
var topGlobal = 0;
var introPlayed = false;
var preloader;
var headerHeight = 0;

var viewsNum = 9;

var newWidth;


$(document).ready(function () {
    
     $.ajaxSetup({cache: true});

    FastClick.attach(document.body);

    if (!Detector.webgl) {
        noWebGL();
    }else{
	   preload();
	   selected = Math.floor(Math.random() * 6);
	   
	  
	   setupScene();
	   initPostprocessing();
	   resizePostprocessing();
	   bugGlobals();
	    
	   animate();
	   
	   $('#video-background').remove(); 
    }

    
});



function noWebGL() {
    $('#ascii-background').remove();
    hidePreloader();
    
    $('#video-rock').find('source').attr('src','assets/media/ink.mp4');
    $('#video-rock').load();
    
    $('#video-background').show();
}

window.addEventListener("load",function() {
  setTimeout(function(){
    window.scrollTo(0, 1); // Hide the address bar!
  }, 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG52YXIgd2lyZWZyYW1lID0gZmFsc2U7XHJcbnZhciBtb3ZlbWVudCA9IHRydWU7XHJcbnZhciBkZWx0YSA9IDAsZGVsdGFYID0gMFxyXG52YXIgcmVuZGVydGltZSA9IDBcclxudmFyIGdyb3VwcyA9IFtdXHJcbnZhciBjb250YWluZXIsIHN0YXRzO1xyXG52YXIgZGlmZmVyZW5jZSA9IDA7XHJcbnZhciB2aWV3cywgc2NlbmUsIHJlbmRlcmVyO1xyXG52YXIgbWVzaCwgbGlnaHQ7XHJcbnZhciBtb3VzZVggPSAwLCBtb3VzZVkgPSAwO1xyXG52YXIgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodDtcclxudmFyIHNlbGVjdGVkID0gLTE7XHJcbnZhciByb2xsZWRvdmVyID0gLTE7XHJcbnZhciB2aWV3cyA9IFtdO1xyXG52YXIgdG9wR2xvYmFsID0gMDtcclxudmFyIGludHJvUGxheWVkID0gZmFsc2U7XHJcbnZhciBwcmVsb2FkZXI7XHJcbnZhciBoZWFkZXJIZWlnaHQgPSAwO1xyXG5cclxudmFyIHZpZXdzTnVtID0gOTtcclxuaWYgKE1PQklMRV9WRVJTSU9OKSB7XHJcbiAgICB2aWV3c051bSA9IDI7XHJcbn1cclxudmFyIG5ld1dpZHRoO1xyXG5cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAkLmFqYXhTZXR1cCh7Y2FjaGU6IHRydWV9KTtcclxuXHJcbiAgICBGYXN0Q2xpY2suYXR0YWNoKGRvY3VtZW50LmJvZHkpO1xyXG5cclxuICAgIGlmICghRGV0ZWN0b3Iud2ViZ2wpIHtcclxuICAgICAgICBub1dlYkdMKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHJlbG9hZCgpO1xyXG4gICAgc2VsZWN0ZWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KTtcclxuICAgXHJcbiAgXHJcbiAgICBzZXR1cFNjZW5lKCk7XHJcbiAgICBpbml0UG9zdHByb2Nlc3NpbmcoKTtcclxuICAgIHJlc2l6ZVBvc3Rwcm9jZXNzaW5nKCk7XHJcbiAgICBidWdHbG9iYWxzKCk7XHJcbiAgICBcclxuICAgIGFuaW1hdGUoKTtcclxuICAgIFxyXG4gICAgXHJcbn0pO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBub1dlYkdMKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9lcnJvclwiO1xyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixmdW5jdGlvbigpIHtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMSk7IC8vIEhpZGUgdGhlIGFkZHJlc3MgYmFyIVxyXG4gIH0sIDApO1xyXG59KTsiXSwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
