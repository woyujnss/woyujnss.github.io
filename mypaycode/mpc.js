{
    const $ = function (x) {
        return document.getElementById(x);
    };
    const isWeChat = function () {
        const ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('micromessenger') !== -1;
    }
    const isAlipay = function () {
        const ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('alipayclient') !== -1;
    }
    const isWeChatObj = function () {
        return typeof WeixinJSBridge !== 'undefined';
    }
    const isAlipayObj = function () {
        return typeof AlipayJSBridge !== 'undefined';
    }
    const isWeChatFeature = function () {
        return typeof wx !== 'undefined' && wx.config;
    }
    const isAlipayFeature = function () {
        return typeof ap !== 'undefined' && ap.config;
    }
    const detectBrowserComprehensive = function (wcFn, alFn, otFn) {
        if (isWeChat() || isWeChatObj() || isWeChatFeature()) {
            wcFn();
        } else if (isAlipay() || isAlipayObj() || isAlipayFeature()) {
            alFn();
        } else {
            otFn();
        }
    }
    detectBrowserComprehensive(() => {
        // location.replace('https://payapp.wechatpay.cn/sjt/qr/AQFekM36zmmtZocQSXpRh2PR');
        location.replace('wxp://f2f0Sc8TdE9JeO-zg0ZTvjTN9EfYVrlEp6lCzFlb2Q9gq1vL2Gpfsg-moHzQ0nbSGK0y');
    }, () => {
        location.replace('https://qr.alipay.com/tsx18738qu1ut53gqafni8f');
    }, () => {
        document.write(navigator.userAgent.toLowerCase());
    });
}
