"use strict";
var varSet;
function intervalsetImporte(num) {
    var textArea = 'clipboard';

    clearInterval(varSet);

    if (isNaN(num)) {
        /*global importeMesuresDepuisPressePapier*/
        //importeMesuresDepuisPressePapier('', textArea);
        /*global copieTableauDepuisPressePapier*/
        copieTableauDepuisPressePapier(textArea);
    } else {
        importeMesuresDepuisPressePapier(num, textArea);
    }
}
function rechercheTableau(event, element) {
    // on recherche div_tableau
    var i, retour, str = "", num,
        textarea;
    // recheche la class div_tableau
    retour = element.indexOf("div_tableau");
    if (retour > 0 && retour < 70) {  //doit retourner 58
        retour = element.indexOf("div_tableau", retour + 12);
        if (retour > 0  && retour < 100) {
            str = element.substring(retour, retour + 12);
            str = str.trim();
            num = Number(element.substring(retour + 11, retour + 12).trim());
            if (event === 'copy') {
                if (isNaN(num)) {
                    /*global copieTableauVersPressePapier*/
                    copieTableauVersPressePapier();
                } else {
                    /*global copieMesuresVersPressePapier*/
                    copieMesuresVersPressePapier(num);
                }
            } else {
                // met le presse papier dans le textarea collerClipboard
                if (isNaN(num)) {
                    textarea = document.getElementById("clipboard");
                } else {
                    textarea = document.getElementById("clipboard" + num);
                }
                textarea.value = "";
                textarea.focus(); // le ctrl+V paste dans le textarea 
                varSet = setInterval(function () {
                    intervalsetImporte(num);
                }, 500);
            }
        }
    }
}
function clipboard() { // num =1 pour mesure, num = 2 pour tableau
    
//    ['cut', 'copy', 'paste'].forEach(
    ['copy', 'paste'].forEach(
        function (event) {
            document.addEventListener(event, function (e) {
                //contient div_tableau si on paste sur le tableau
                if (e.path.length > 4) {
                    rechercheTableau(event, e.path[5].innerHTML);
                }
            });
        }
    );
}