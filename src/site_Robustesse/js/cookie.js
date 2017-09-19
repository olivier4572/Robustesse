"use strict";
function getCookie(c_name) {
    /*
        var couleur = getCookie("couleur_favorie");
        alert("Votre couleur favorie est " + couleur);
    */
    
    var c_start,
        c_end;
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }
            /*return unescape(document.cookie.substring(c_start, c_end));*/
            return decodeURI(document.cookie.substring(c_start, c_end));
        }
    }
    return "";

}
function setCookie(c_name, value, expiredays) {
    var exdate;

    exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    /*document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires="+exdate.toGMTString());*/
    document.cookie = c_name + "=" + encodeURI(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());

}
