{
    const $ = function (x) {
        return document.getElementById(x);
    };
    const gc = $("guidesCanvas");
    const gcsize = gc.getBoundingClientRect();
    const gctx = gc.getContext("2d");
    for (let i = 0; i < 5; i++) {
        const linew = gc.width / 4;
        const lineh = gc.height / 4;
        console.log(linew);
        console.log(lineh);
        gctx.beginPath();
        gctx.moveTo(i * linew, 0);
        gctx.lineTo(i * linew, gc.height);
        gctx.moveTo(0, i * lineh);
        gctx.lineTo(gc.width, i * lineh);
        gctx.stroke();
        gctx.stroke();
    } // 绘制canvas内的分割线
}
