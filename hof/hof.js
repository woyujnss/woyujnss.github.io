const $ = function (d) {
    return document.getElementById(d);
}
const nowdis = $('nowdis');
const hourLeft = $('hourLeft'), minLeft = $('minLeft');
const rangehl = $('rangehl'), rangeml = $('rangeml');
// const nortime = $('nortime'), norh = $('norh'), norm = $('norm');
const tds = [
    $('td30s'), $('td2m'), $('td5m'), $('td20m'),
    $('td1h'), $('td8h'), $('td16h'), $('td32h')
];
const tdt = [
    10000, 40000, 100000, 400000,
    1200000, 9600000, 19200000, 38400000
]; // 浇水能维持的总时长是种植时长的1/6
const moistureh = $('moistureh'), moisturem = $('moisturem');
const rangemh = $('rangemh'), rangemm = $('rangemm');
const calctime = $('calctime'), calch = $('calch'), calcm = $('calcm');

const calcTime = () => {
    const checkTime = (i) => {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };
    const disTime = (addms) => {
        const nt = new Date(t.getTime() + addms);
        const y = nt.getFullYear();
        const m = checkTime(nt.getMonth() + 1);
        const d = checkTime(nt.getDate());
        const h = checkTime(nt.getHours());
        const min = checkTime(nt.getMinutes());
        const s = checkTime(nt.getSeconds());
        return [
            y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s,
            ~~(addms / 3600000),
            ~~(addms / 60000) % 60
        ];
    };
    const t = new Date();
    {
        const y = t.getFullYear();
        const m = checkTime(t.getMonth() + 1);
        const d = checkTime(t.getDate());
        const h = checkTime(t.getHours());
        const min = checkTime(t.getMinutes());
        const s = checkTime(t.getSeconds());
        nowdis.innerText = y + '-' + m + '-' + d + ' ' +
            h + ':' + min + ':' + s;
    } // 刷新当前日期时间的显示
    let ams = hourLeft.value * 60;
    ams += +minLeft.value;
    ams *= 48000;
    // 前面是分钟，所以要乘成毫秒数再乘0.8得出成熟时间 60*1000*0.8 = 48000ms
    {
        const dt = disTime(ams);
        // nortime.innerText = dt[0];
        // norh.innerText = dt[1];
        // norm.innerText = dt[2];
        // 先让下面的时间和上面显示的一样，后面有计算结果再改变显示
        calctime.innerText = dt[0];
        calch.innerText = dt[1];
        calcm.innerText = dt[2];
    } // 刷新常规成熟时间的显示
    const calcMoistureTime = () => {
        let mms;
        for (let i = 0; i < tds.length; i++) {
            if (tds[i] && tds[i].checked) {
                mms = tdt[i]; // moisture millisecond
                break;
            }
        } // 确认选择的是哪个时长的种子
        let cms = moistureh.value * 60;
        cms += +moisturem.value;
        cms *= 60000; // 水分维持时长转为毫秒
        if (cms > mms) return; // 如果输入的时长比总共的时间还长就直接返回
        mms -= cms;
        mms = ~~(mms * 0.25 * 0.8);
        mms = ams - mms;
        if (mms < 0) mms = 0;
        const dt = disTime(mms);
        calctime.innerText = dt[0];
        calch.innerText = dt[1];
        calcm.innerText = dt[2];
    };
    calcMoistureTime();
    {
        const now = new Date();
        // 加 1 小时：1 * 60 * 60   * 1000 毫秒
        const oneHourLater = new Date(now.getTime() + 1 * 60 * 60 * 1000);
    }
    setTimeout(calcTime, 500);
};
{
    rangehl.related = hourLeft;
    rangeml.related = minLeft;
    rangemh.related = moistureh;
    rangemm.related = moisturem;
    hourLeft.related = rangehl;
    minLeft.related = rangeml;
    moistureh.related = rangemh;
    moisturem.related = rangemm;
    const inputPointChange = (ev) => {
        ev.target.related.value = ev.target.value;
    };
    rangehl.addEventListener('input', inputPointChange);
    rangeml.addEventListener('input', inputPointChange);
    rangemh.addEventListener('input', inputPointChange);
    rangemm.addEventListener('input', inputPointChange);
    hourLeft.addEventListener('input', inputPointChange);
    minLeft.addEventListener('input', inputPointChange);
    moistureh.addEventListener('input', inputPointChange);
    moisturem.addEventListener('input', inputPointChange);
} // 关联一下输入框和滑动条
calcTime();
