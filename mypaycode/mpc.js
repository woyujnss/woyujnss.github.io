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
    const detectBrowserComprehensive = function (wcFn, alFn, qqFn, otFn) {
        if (isWeChat() || isWeChatObj() || isWeChatFeature()) {
            wcFn();
        } else if (isAlipay() || isAlipayObj() || isAlipayFeature()) {
            alFn();
        } else if (navigator.userAgent.toLowerCase().indexOf('qq/')) {
            qqFn();
        } else {
            otFn();
        }
    }
    detectBrowserComprehensive(() => {
        location.href = 'https://payapp.wechatpay.cn/sjt/qr/AQFekM36zmmtZocQSXpRh2PR';
        // location.replace('https://payapp.wechatpay.cn/sjt/qr/AQFekM36zmmtZocQSXpRh2PR');
        // location.replace('wxp://f2f0Sc8TdE9JeO-zg0ZTvjTN9EfYVrlEp6lCzFlb2Q9gq1vL2Gpfsg-moHzQ0nbSGK0y');
    }, () => {
        location.href = 'https://qr.alipay.com/tsx18738qu1ut53gqafni8f';
        // location.replace('https://qr.alipay.com/tsx18738qu1ut53gqafni8f');
    }, () => {
        location.href = 'https://i.qianbao.qq.com/wallet/sqrcode.htm?m=tenpay&f=wallet&a=1&u=479434&n=J-thirteen&ac=CAEQyqEdGP2VgsIGMhjmtYHliqjmkYrkvY3nu4_okKXmlLbmrL44AUIgYTRjYWZjNjJiOTNkOTNjYWVlZmE1ZjU3YWEzMDI4ZmU%3D_xxx_sign';
    }, () => {
        document.write('我艹？？？\n');
    });
    document.write(navigator.userAgent);
}
