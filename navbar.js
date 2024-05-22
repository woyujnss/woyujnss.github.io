window.onresize = (function () {
    document.getElementById('fcenter').style.height = window.innerHeight - 104 + 'px';
});
window.onresize();

var lastclicknav = '';
var lastnavid = localStorage.lastnavid;

const $ = function (x) {
    return document.getElementById(x);
};

function navclick(target) {
    if (target) {
        if (target.id != lastclicknav) {
            $(lastnavid) && $(lastnavid).className != '' ?
                $(lastnavid).removeAttribute("class") : 0;
            target.className = 'active';
            $('fcenter').firstChild.src = './' + target.id + '/';
            lastclicknav = localStorage.lastclicknav =
                lastnavid = localStorage.lastnavid =
                target.id;
        }
    }
};

function addnav(navid, navtitle, navname) {
    if ((!$(navid)) && $('topnav')) {
        const newatag = document.createElement('a');
        newatag.innerText = navname;
        newatag.href = 'javascript:;';
        newatag.id = navid;
        newatag.title = navtitle;
        newatag.addEventListener("click", function (ev) {
            navclick(ev.target);
        });
        const newli = document.createElement('li');
        newli.appendChild(newatag)
        $('topnav').appendChild(newli);
        $('topnav').appendChild($('wabout').parentNode);
    }
    return [$(navid), $(navtitle)];
}; //导航栏增加一个菜单

$('whome').addEventListener("click", function (ev) {
    navclick(ev.target);
});


if (!localStorage.lastnavid) {
    localStorage.lastnavid = 'whome';
}

