{
    const $ = function (x) {
        return document.getElementById(x);
    };
    const verticallyRadio = new Array(9),
        horizontallyRadio = new Array(9),
        overflowInput = new Array(9),
        overflowRange = new Array(9),
        downBtn = new Array(9);
    for (let i = 0; i < 9; i++) {
        const mainTable = document.getElementsByTagName('table')[0];
        const newTr = document.createElement('tr');
        {
            const j = i + 1;
            const newTd = document.createElement('td');
            newTd.innerHTML = '图' + j + '：';
            verticallyRadio[i] = document.createElement('input');
            verticallyRadio[i].type = 'radio';
            verticallyRadio[i].id = 'p' + j + 'v';
            verticallyRadio[i].name = 'pic' + j;
            verticallyRadio[i].value = '纵向';
            verticallyRadio[i].checked = 'checked';
            newTd.appendChild(verticallyRadio[i]);
            const vLabel = document.createElement('label');
            vLabel.setAttribute('for', 'p' + j + 'v');
            vLabel.innerText = '纵向';
            newTd.appendChild(vLabel);
            horizontallyRadio[i] = document.createElement('input');
            horizontallyRadio[i].type = 'radio';
            horizontallyRadio[i].id = 'p' + j + 'h';
            horizontallyRadio[i].name = 'pic' + j;
            horizontallyRadio[i].value = '横向';
            newTd.appendChild(horizontallyRadio[i]);
            const hLabel = document.createElement('label');
            hLabel.setAttribute('for', 'p' + j + 'h');
            hLabel.innerText = '横向';
            newTd.appendChild(hLabel);
            newTr.appendChild(newTd);
        }
        {
            const newTd = document.createElement('td');
            newTd.innerHTML = '图外溢出量：';
            overflowInput[i] = document.createElement('input');
            overflowInput[i].type = 'number';
            overflowInput[i].min = '0';
            overflowInput[i].max = '128';
            overflowInput[i].value = '64';
            overflowInput[i].style = 'width:64px';
            newTd.appendChild(overflowInput[i]);
            overflowRange[i] = document.createElement('input');
            overflowRange[i].type = 'range';
            overflowRange[i].className = 'picRange';
            overflowRange[i].min = '0';
            overflowRange[i].max = '128';
            overflowRange[i].step = '8'
            overflowRange[i].value = '64';
            overflowRange[i].style = 'width:100%';
            newTd.appendChild(overflowRange[i]);
            newTr.appendChild(newTd);
        }
        {
            const newTd = document.createElement('td');
            downBtn[i] = document.createElement('input');
            downBtn[i].type = 'button';
            downBtn[i].value = '下载图片';
            newTd.appendChild(downBtn[i]);
            newTr.appendChild(newTd);
        }
        mainTable.appendChild(newTr);
    } // 最后面加9个图的设置项
    const hidecanvas = document.createElement('canvas');
    const hctx = hidecanvas.getContext("2d");
    const lc = $("linesCanvas");
    const lctx = lc.getContext("2d");
    const clc = $("cropLinesCanvas");
    const clctx = clc.getContext("2d");
    clctx.strokeStyle = 'cyan';
    for (let i = 1; i < 7; i++) {
        lctx.beginPath();
        lctx.moveTo(i * 64, 0);
        lctx.lineTo(i * 64, 448);
        lctx.moveTo(0, i * 64);
        lctx.lineTo(448, i * 64);

        if (i == 2 || i == 5) {
            lctx.strokeStyle = 'magenta';
        } else {
            lctx.strokeStyle = '#5F0A9C';
        }
        lctx.lineWidth = 1;
        lctx.stroke();
        lctx.stroke();
    } // 绘制canvas内的分割线
    const inputPointChange = function () {
        const sx = $('sx');
        const sy = $('sy');
        const sz = $('sz');
        if ($('fileInput').files.length === 0) {
            console.log('No file selected.');
            return;
        }
        if (sx.value == '' || sy.value == '' || sz.value == '') {
            // console.log('has null');
            return;
        }
        if (sz.value < 64) {
            sz.value = 64;
        }
        if (sz.value > 896) {
            sz.value = 896;
        }
        let ctxw = sz.value, ctxh = sz.value;
        if (hidecanvas.width > hidecanvas.height) {
            ctxh = (ctxw / hidecanvas.width * hidecanvas.height) >> 0;
        } else {
            ctxw = (ctxh / hidecanvas.height * hidecanvas.width) >> 0;
        }
        const c = $("BackCanvas");
        const ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(hidecanvas, parseInt(sx.value) + 128,
            parseInt(sy.value) + 128, ctxw, ctxh);
    }; // 修改图片输入参数时改变图片大小和位置
    $('fileInput').addEventListener('change', (ev) => {
        if (ev.target.files.length === 0) {
            console.log('No file selected.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function fileReadCompleted() {
            const img = new Image();
            img.src = reader.result;
            img.onload = function () {
                $('sz').value = 448;
                $('sx').value = -128;
                $('sy').value = -128;
                $('rz').value = 448;
                $('rx').value = -128;
                $('ry').value = -128;
                for (let i = 0; i < 9; i++) {
                    verticallyRadio[i].checked = 'checked';
                    // horizontallyRadio
                    overflowInput[i].value = '64';
                    overflowRange[i].value = '64';
                }
                clctx.clearRect(0, 0, 448, 448);
                hidecanvas.width = img.width;
                hidecanvas.height = img.height;
                // hctx.clearRect(0, 0, hidecanvas.width, hidecanvas.height);
                hctx.drawImage(img, 0, 0);
                inputPointChange();
            }
        };
        reader.readAsDataURL(ev.target.files[0]);
    });
    {
        const picRanges = document.getElementsByClassName('picRange');
        for (let i = 0; i < picRanges.length; i++) {
            picRanges[i].addEventListener('input', (ev) => {
                ev.target.previousElementSibling.value = ev.target.value;
            });
            picRanges[i].previousElementSibling.addEventListener('input', (ev) => {
                ev.target.nextElementSibling.value = ev.target.value;
            });
        }
    }
    const drawCropRange = function (picNum, isVertically, overflowVar) {
        // 128,192,256
        clctx.clearRect(0, 0, 448, 448);
        let x = 128, y = 128, w = 64, h = 64;
        x += picNum % 3 * 64;
        y += (picNum / 3 >> 0) * 64;
        if (isVertically) {
            y -= overflowVar;
            h += overflowVar * 2;
        } else {
            x -= overflowVar;
            w += overflowVar * 2;
        }
        clctx.beginPath();
        clctx.rect(x, y, w, h);
        clctx.stroke();
    };
    const createImg = function (picNum, isVertically, overflowVar) {
        if ($('fileInput').files.length === 0) {
            console.log('No file selected.');
            return;
        }
        const tc = document.createElement('canvas');
        const tctx = tc.getContext('2d');
        const imgMul = (hidecanvas.width > hidecanvas.height ? hidecanvas.width : hidecanvas.height) / $('sz').value;
        let x = -$('sx').value, y = -$('sy').value, w = 64, h = 64;
        x += picNum % 3 * 64;
        y += (picNum / 3 >> 0) * 64;
        if (isVertically) {
            y -= overflowVar;
            h += overflowVar * 2;
        } else {
            x -= overflowVar;
            w += overflowVar * 2;
        }
        x = (x * imgMul) >> 0;
        y = (y * imgMul) >> 0;
        w = (w * imgMul) >> 0;
        h = (h * imgMul) >> 0;
        tc.width = w;
        tc.height = h;
        let scx, scy, scw, sch, stx, sty, stw, sth;
        scx = (x < 0 ? 0 : x);
        scy = (y < 0 ? 0 : y);
        scw = (x + w > hidecanvas.width ? hidecanvas.width - x : w);
        sch = (y + h > hidecanvas.height ? hidecanvas.height - y : h);
        stx = (x < 0 ? -x : 0);
        sty = (y < 0 ? -y : 0);
        stw = scw;
        sth = sch;
        tctx.fillRect(0, 0, tc.width, tc.height);
        tctx.drawImage(hidecanvas, scx, scy, scw, sch, stx, sty, stw, sth);
        const url = tc.toDataURL("image/png");
        const arr = url.split(","),
            mime = arr[0].match(/:(.*?);/)[1], // 此处得到的为文件类型
            bstr = atob(arr[1]); // 此处将base64解码
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        // 通过以下方式将以上变量生成文件对象，三个参数分别为文件内容、文件名、文件类型
        const file = new File([u8arr], "Image" + picNum, { type: mime });
        const aDom = document.createElement("a"); // 创建一个 a 标签
        aDom.download = file.name; // 设置文件名
        let href = URL.createObjectURL(file); // 将file对象转成 UTF-16 字符串
        aDom.href = href; // 放入href
        document.body.appendChild(aDom); // 将a标签插入 body
        aDom.click(); // 触发 a 标签的点击
        document.body.removeChild(aDom); // 移除刚才插入的 a 标签
        URL.revokeObjectURL(href); // 释放刚才生成的 UTF-16 字符串
        tc.remove();
    };
    for (let i = 0; i < 9; i++) {
        // clc
        // clctx
        // verticallyRadio
        // horizontallyRadio
        // overflowInput
        // overflowRange
        // downBtn
        verticallyRadio[i].addEventListener('click', (ev) => {
            drawCropRange(i, verticallyRadio[i].checked, overflowInput[i].value);
        });
        horizontallyRadio[i].addEventListener('click', (ev) => {
            drawCropRange(i, verticallyRadio[i].checked, overflowInput[i].value);
        });
        overflowInput[i].addEventListener('input', (ev) => {
            drawCropRange(i, verticallyRadio[i].checked, overflowInput[i].value);
        });
        overflowRange[i].addEventListener('input', (ev) => {
            drawCropRange(i, verticallyRadio[i].checked, overflowInput[i].value);
        });
        downBtn[i].addEventListener('click', (ev) => {
            createImg(i, verticallyRadio[i].checked, overflowInput[i].value);
        });
    }
    $('rx').addEventListener('input', inputPointChange);
    $('ry').addEventListener('input', inputPointChange);
    $('rz').addEventListener('input', inputPointChange);
    $('sx').addEventListener('change', inputPointChange);
    $('sy').addEventListener('change', inputPointChange);
    $('sz').addEventListener('change', inputPointChange);
}
