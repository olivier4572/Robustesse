"use strict";
function iframeRefresh() {
	var iframe;
    iframe = document.getElementById('iframeId');
	iframe.src = iframe.src; //actualise le iframe
}
function majCookie(CodeLangue) {
    if (CodeLangue === undefined) {
        CodeLangue = 'fr';
    }
    if (CodeLangue === '') {
        CodeLangue = 'fr';
    }
    /*global setCookie*/
    setCookie("Langue", CodeLangue, 365);
}
function majlangue(Code) {
    var RetourCode;
    //document.html.lang = Code;
    document.getElementsByTagName("html")[0].lang = Code;
    majCookie(Code);
    iframeRefresh();
}
function langue(Code) {
    var RetourCode;
    //document.html.lang = Code;
    document.getElementsByTagName("html")[0].lang = Code;
    majCookie(Code);
}
function recupCookieLangue() {
    var valeurCookie;
    /*global getCookie*/
    valeurCookie = getCookie("Langue");
    if (valeurCookie === "") {
        valeurCookie = 'fr';
    }
    return valeurCookie;
}