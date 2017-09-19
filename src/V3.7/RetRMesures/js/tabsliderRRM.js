"use strict";
function activeTranslate(tab, content, numActive) {
    var i, strTranslate;
    return function () {
        for (i = 0; i < tab.length; i = i + 1) {
            tab[i].className = tab[i].className.replace('active', '');
        }

        strTranslate = Number(-numActive * (100 / tab.length));
    //    alert(strTranslate);
        content.style.transform = "translateX( " + strTranslate + "% )";
        tab[numActive].className += ' active';
    };
    
}
function translationTab(classeNavTab, classeContent) {
    // Resultat R et R  
    
    var tab = [], i, content, numtab;
  
    
    numtab = document.getElementsByClassName(classeNavTab).length;
    
    for (i = 1; i <= numtab; i = i + 1) {
        tab.push(document.querySelector("." + classeNavTab + ":nth-child( " + i + " )"));
    }
    
    content = document.querySelector("." + classeContent);

    for (i = 0; i < numtab; i = i + 1) {
        //tab[i].onclick = activeTranslate(tab, content, 0);
        tab[i].addEventListener("click", activeTranslate(tab, content, i));
    }
}
