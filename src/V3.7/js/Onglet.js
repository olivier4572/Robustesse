"use strict";
function setDisplayBlock() {
    var allOnglets = document.getElementById('onglets').getElementsByTagName('li'),
        allContenus = document.getElementById('contenuOnglet').getElementsByTagName('div'),
        i = allOnglets.length,
        j,
        savej = allContenus.length;
    while (i) {
        i = i - 1;
        for (j = savej - 1; j >= 0; j = j - 1) {
            if (allContenus[j] !== undefined) {
                if (allContenus[j].className === "item") {
                    savej = j;
                    j = 0;
                }
            }
        }
        if (allOnglets[i].className.indexOf('actif') === -1) {
            allContenus[savej].style.display = 'block';
        } else {
            allContenus[savej].style.display = 'block';
        }
    }
}
function setDisplay() {
    var allOnglets = document.getElementById('onglets').getElementsByTagName('li'),
        allContenus = document.getElementById('contenuOnglet').getElementsByTagName('div'),
        i = allOnglets.length,
        j,
        savej = allContenus.length;
    while (i) {
        i = i - 1;
        for (j = savej - 1; j >= 0; j = j - 1) {
            if (allContenus[j] !== undefined) {
                if (allContenus[j].className === "item") {
                    savej = j;
                    j = 0;
                }
            }
        }
        if (allOnglets[i].className.indexOf('actif') === -1) {
            allContenus[savej].style.display = 'none';
        } else {
            allContenus[savej].style.display = 'block';
        }
    }
}
function start_onglet() {
    document.getElementById('onglets').style.display = 'block';
    document.getElementById('onglets').onclick = function (e) {
        var actuel = e ? e.target : window.event.srcElement,
            allOnglets,
            i;
        if (!/li/i.test(actuel.nodeName) || actuel.className.indexOf('actif') > -1) {
            return;
        }
        allOnglets = document.getElementById('onglets').getElementsByTagName('li');
        i = allOnglets.length;
        while (i) {
            i = i - 1;
            if (allOnglets[i] === actuel) {
                allOnglets[i].className += ' actif';
                /*global loadPageHelp*/
//                loadPageHelp('html/doc/doc' + allOnglets[i].innerHTML + '.html');
                loadPageHelp('html/doc/doc' + Number(i + 1) + '.html');
            } else {
                allOnglets[i].className = allOnglets[i].className.replace('actif', '');
                if (String.trim) {
                    allOnglets[i].className.trim();
                }
            }
        }
        setDisplay();
    };
    setDisplay();
}