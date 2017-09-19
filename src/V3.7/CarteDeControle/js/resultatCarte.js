"use strict";
//MainGen.js
/*global format*/
/*global recupMesureTableau*/
//adNormalityTest.js
/*global adNormalityTest*/
//GrapheCarte.js
/*global chartsIEM*/
/*global chartsXbarre*/
function resultatIEM(moyenne, ecarttype, sigmaC, moyenneR, pValue, normal, lscx, licx, lscr, licr) {
    var div, str;
    
    //pValue = pValue * 100; // %
    div = document.getElementById("div_Resultat_IEM");
    /*global format*/
    str = "<h4 class = Resultat>";
    str += "<p>";
    str += "<dl> La moyenne des données est de : " + format(moyenne, 5) + "</dl>";
    str += "<dl> avec pour écart type : " + format(ecarttype, 5) + "</dl>";
    str += "</p>";

    str += "<dl>Sigma estimé (carte I) " + format(sigmaC, 5) + "</dl>";
    str += "<dl>Rbarre " + format(moyenneR, 5) + "</dl>";

    str += "<dl></dl>";
    str += "<dl>lscx " + format(lscx, 5) + "</dl>";
    str += "<dl>licx " + format(licx, 5) + "</dl>";
    str += "<dl>lscr " + format(lscr, 5) + "</dl>";
    str += "<dl>licr " + format(licr, 5) + "</dl>";

    str += "<p>";
    
    if (pValue < 0.01) {
        str += "La p valeur est < à 0.01";
    } else {
        str += "<dl>La p value est de " + format(pValue, 5) + "</dl>";
    }
    
    str += "<dl>";
    if (normal) {
        str += "Les données suivent une loi normale";
    } else {
        str += "Les données ne suivent pas une loi normale";
    }
    str += "</dl>";
    str += "</p>";

    str += "</h4>";

    div.innerHTML = str;
    
}
function resultatXbarre(moyennemoyenneX, ecarttype, sigmaC, sigmaX, moyenneR, lscx, licx, lscr, licr, pValue, normal) {
    var div, str;
    
    //pValue = pValue * 100; // %
    
    div = document.getElementById("div_Resultat_Xbarre");
    /*global format*/
    str = "<h4 class = Resultat>";
    str += "<p>";
    str += "<dl> La moyenne des données est de : " + format(moyennemoyenneX, 5) + "</dl>";
    str += "<dl> avec pour écart type : " + format(ecarttype, 5) + "</dl>";
    str += "</p>";

    str += "<dl>Sigma estimé " + format(sigmaC, 5) + "</dl>";
    str += "<dl>Sigma Xbarre " + format(sigmaX, 5) + "</dl>";
    str += "<dl>Rbarre " + format(moyenneR, 5) + "</dl>";

    str += "<dl></dl>";
    str += "<dl>lscx " + format(lscx, 5) + "</dl>";
    str += "<dl>licx " + format(licx, 5) + "</dl>";
    str += "<dl>lscr " + format(lscr, 5) + "</dl>";
    str += "<dl>licr " + format(licr, 5) + "</dl>";

    str += "<p>";
    
    if (pValue < 0.01) {
        str += "La p valeur est < à 0.01";
    } else {
        str += "<dl>La p value est de " + format(pValue, 3) + "</dl>";
    }
    
    str += "<dl>";
    if (normal) {
        str += "Les données suivent une loi normale";
    } else {
        str += "Les données ne suivent pas une loi normale";
    }
    str += "</dl>";
    str += "</p>";

    str += "</h4>";

    div.innerHTML = str;
    
}
function calculCarteIEM() {
    var t, tnormal, nmes, i,
        lscx, licx, valeurX = [], moyenneX, lscr, licr, valeurR = [], moyenneR,
        D4, D3, d2,
        normalDist, sigmaC, lsc, lic;

    
    D4 = [3.267, 2.574, 2.282, 2.114, 2.004, 1.924, 1.864, 1.816, 1.777, 1.744, 1.717, 1.693, 1.672, 1.653, 1.585];
    D3 = [0, 0, 0, 0, 0, 0.076, 0.136, 0.184, 0.223, 0.256, 0.283, 0.307, 0.328, 0.347, 0.415];
    
    //K1 = [0.8862, 0.5908]; // on prend pour un produit piece, opérateur >20 et le nombre d'essai est la position 
    d2 = [1.12838, 1.69257, 2.05875, 2.32593, 2.53441, 2.70436, 2.8472, 2.97003, 3.07751];
    
    nmes = Number(document.getElementById("selectMesure").innerHTML);
    /*global recupMesureTableau*/
    t = recupMesureTableau(nmes, 1);
    tnormal = t.slice(0);
    /*global adNormalityTest*/
    normalDist = adNormalityTest.check(tnormal);

    //resultatIEM(normalDist.mean, normalDist.stdS, normalDist.pValue, normalDist.normal);
    
    moyenneX = t[0];
    moyenneR = 0;
    for (i = 1; i < t.length; i = i + 1) {
        moyenneX += t[i];
        valeurR.push(Math.abs(t[i] - t[i - 1]));
        moyenneR += valeurR[i - 1];
    }
    
    valeurX = t;
    moyenneX = moyenneX / valeurX.length;
    moyenneR = moyenneR / valeurR.length;

    
    
    sigmaC = moyenneR / d2[0];
    lscx = moyenneX + 3 * sigmaC;
    licx = moyenneX - 3 * sigmaC;
    lscr = D4[0] * moyenneR;
    licr = D3[0] * moyenneR;
    resultatIEM(moyenneX, normalDist.stdS, sigmaC, moyenneR, normalDist.pValue, normalDist.normal, lscx, licx, lscr, licr);
    

    
    /*global chartsIEM*/
    
    valeurR.splice(0, 0, "X");
    
    chartsIEM(lscx, licx, valeurX, moyenneX, lscr, licr, valeurR, moyenneR); //global
    
}
function calculCarteXbarre() {

    var t, tnormal, nsg, nIndividusg, i, j,
        lscx, licx,  moyenneX = [], lscr, licr, valeurR = [], moyenneR, valeurMin, valeurMax, moyenne, moyennemoyenneX,
        d3, d2,
        normalDist, sigmaC, sigmaX, sigmaR;

    d3 = [0.82, 0.8525, 0.8884, 0.8794, 0.8641, 0.848, 0.8332, 0.8198, 0.8078, 0.7971, 0.7873, 0.7785, 0.7704, 0.763, 0.7562, 0.7499, 0.7441, 0.7386, 0.7335, 0.7287, 0.7242, 0.7199, 0.7159, 0.7121, 0.7084];

    //K1 = [0.8862, 0.5908]; // on prend pour un produit piece, opérateur >20 et le nombre d'essai est la position 
    d2 = [1.12838, 1.69257, 2.05875, 2.32593, 2.53441, 2.70436, 2.8472, 2.97003, 3.07751];
    
    nsg = Number(document.getElementById("selectSg").innerHTML);
    nIndividusg = Number(document.getElementById("selectIndividuSg").innerHTML);
    t = recupMesureTableau(nsg * nIndividusg, 2);
    tnormal = t.slice(0);
    /*global adNormalityTest*/
    normalDist = adNormalityTest.check(tnormal);

    //resultatIEM(normalDist.mean, normalDist.stdS, normalDist.pValue, normalDist.normal);
    
    moyenneR = 0;
    for (i = 0; i < nsg; i = i + 1) {
        moyenne = 0;
        valeurMax = t[i * nIndividusg];
        valeurMin = t[i * nIndividusg];
        for (j = 0; j < nIndividusg; j = j + 1) {
            moyenne += t[i * nIndividusg + j];
            moyenneR += valeurR[i - 1];
            if (valeurMax < t[i * nIndividusg + j]) {
                valeurMax = t[i * nIndividusg + j];
            }
            if (valeurMin > t[i * nIndividusg + j]) {
                valeurMin = t[i * nIndividusg + j];
            }
        }
        moyenneX.push(moyenne / nIndividusg);
        valeurR.push(valeurMax - valeurMin);
    }
    moyenneR = 0;
    moyennemoyenneX = 0;
    for (i = 0; i < valeurR.length; i = i + 1) {
        moyenneR += valeurR[i];
        moyennemoyenneX += moyenneX[i];
    }
    moyennemoyenneX = moyennemoyenneX / valeurR.length;
    moyenneR = moyenneR / valeurR.length;

    sigmaC = moyenneR / d2[nIndividusg - 2];
    sigmaX = sigmaC / Math.sqrt(nIndividusg);

    lscx = moyennemoyenneX + 3 * sigmaX;
    licx = moyennemoyenneX - 3 * sigmaX;
    lscr = moyenneR + 3 * d3[nIndividusg - 1] * sigmaC;
    licr = moyenneR - 3 * d3[nIndividusg - 1] * sigmaC;
    if (licr < 0) {
        licr = 0;
    }

    
    resultatXbarre(moyennemoyenneX, normalDist.stdS, sigmaC, sigmaX, moyenneR, lscx, licx, lscr, licr, normalDist.pValue, normalDist.normal);
    
    /*global chartsXbarre*/
    chartsXbarre(lscx, licx, moyenneX, moyennemoyenneX, lscr, licr, valeurR, moyenneR); //global

    
}