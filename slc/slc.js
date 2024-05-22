const $ = function (d) {
    return document.getElementById(d);
}
const mfgd = $('mfgd'), sli = $('sli');
const sld = $('sld'), slm = $('slm'), sly = $('sly');
const dnode = $('dnode'), opta = $('opta');
const slcalc = function () {
    if (!mfgd.valueAsDate || sli.value <= 0) {
        dnode.innerHTML = '等待输入...';
        opta.value = '';
        return;
    }
    let expdate = mfgd.valueAsDate;
    if (sld.checked) {
        expdate.setDate(expdate.getDate() - -sli.value);
    } else if (slm.checked) {
        expdate.setMonth(expdate.getMonth() - -sli.value);
    } else {
        expdate.setFullYear(expdate.getFullYear() - -sli.value);
    }
    dnode.innerHTML = expdate.getFullYear() + '/' + (expdate.getMonth() + 1) + '/' + expdate.getDate();
    const todayd = new Date();
    if (todayd.valueOf() > expdate.valueOf()) {
        opta.value = '于' + mfgd.valueAsDate.getFullYear() + '/' +
            (mfgd.valueAsDate.getMonth() + 1) + '/' +
            mfgd.valueAsDate.getDate() + '生产，' +
            dnode.innerHTML + '时已过期！';
        // return;
    }
    let standardDays = 45;
    let slUnit = '年';
    if (sld.checked) {
        slUnit = '天';
        if (sli.value < 10) {
            standardDays = 2;
        } else if (sli.value < 30) {
            standardDays = 5;
        } else if (sli.value < 90) {
            standardDays = 10;
        } else if (sli.value < 180) {
            standardDays = 20;
        } else if (sli.value < 360) {
            standardDays = 30;
        }
    } else if (slm.checked) {
        slUnit = '月';
        if (sli.value < 3) {
            standardDays = 10;
        } else if (sli.value < 6) {
            standardDays = 20;
        } else if (sli.value < 12) {
            standardDays = 30;
        }
    }
    let daysRemaining = expdate.valueOf() - todayd.valueOf();
    daysRemaining /= 1000;
    daysRemaining /= 60;
    daysRemaining /= 60;
    daysRemaining /= 24;
    daysRemaining >>= 0;

    if (todayd.valueOf() > expdate.valueOf()) {
    } else if (standardDays > daysRemaining) {
        opta.value = '已临期，' + mfgd.valueAsDate.getFullYear() + '/' +
            (mfgd.valueAsDate.getMonth() + 1) + '/' +
            mfgd.valueAsDate.getDate() + '生产，保质期' +
            sli.value + slUnit + '，剩余' +
            daysRemaining + '天。';
    } else {
        opta.value = '未过期或临期（临期标准为剩余' + standardDays +
            '天以下，商品保质期还剩余' + daysRemaining + '天）';
    }
    expdate.setDate(todayd.getDate() - standardDays);
    dnode.innerHTML = '于' + dnode.innerHTML + '过期，' +
        expdate.getFullYear() + '/' + (expdate.getMonth() + 1) + '/' + expdate.getDate()
        + '进入临期。';
};

mfgd.addEventListener('input', (ev) => {
    slcalc();
});
sli.addEventListener('input', (ev) => {
    if (sli.value <= 5) {
        sly.checked = true;
    } else if (sli.value <= 12 || (sli.value % 12 == 0 && sli.value % 30 != 0)) {
        slm.checked = true;
    } else {
        sld.checked = true;
    }
    slcalc();
});
sly.addEventListener('change', (ev) => {
    slcalc();
});
slm.addEventListener('change', (ev) => {
    slcalc();
});
sld.addEventListener('change', (ev) => {
    slcalc();
});
