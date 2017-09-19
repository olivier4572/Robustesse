//Onglet.js
/*global setDisplay*/
//MainGen.js
/*global format*/
/*global recupMesureTableau*/
//MainCap.js
/*global celluleEditable*/
//adNormalityTest.js
/*global adNormalityTest*/
//GrapheCap.js
/*global grapheCapaMachine*/
/*global grapheCapaSg*/

"use strict";
var varIntervalsetDisplay;
function intervalsetDisplay() {
    clearInterval(varIntervalsetDisplay);
    /*global setDisplay*/
    setDisplay();
}
function resultatCapaSg(mean, ecarttype, pValue, normal, cdflss, cdflsi, Pp, Ppk, Cp, Cpk, sigmaIntra) {
    var div, str;
    
    div = document.getElementById("div_Resultat_Capa_Sg");
    /*global format*/
    str = "<h4 class = Resultat>";
    str += "<p>";
    str += "<dl>La moyenne des données est de  : " + format(mean, 3) + "</dl>";
    str += "<dl>avec pour écart type : " + format(ecarttype, 3) + "</dl>";
    str += "</p>";
    str += "<dl>";
    if (pValue < 0.01) {
        str += "La p valeur est < à 0.01";
    } else {
        str += "La p value est de " + format(pValue, 3);
    }
    str += "</dl>";
    str += "<dl>";
    if (normal) {
        str += "Les données suivent une loi normale";
    } else {
        str += "Les données ne suivent pas une loi normale";
    }
    str += "</dl>";
    str += "<p>";
    str += "<dl>Ecart type intra: " + format(sigmaIntra, 3);
    str += "</dl>";
    str += "</p>";


    if (normal) {
    
        str += "<dt>";
        str += "Nombre hors spec prévisionnel";
        str += "</dt>";

        if (cdflss !== "X") {
            str += "<dl> > lss : ";
            str += "<dd>" + format(parseFloat(1 - cdflss) * 100, 2) + "%</dd>";
            str += "<dd>" + format(parseFloat(1 - cdflss) * 1000000, 0) + "ppm</dd>";
            str += "</dl>";
        }
        if (cdflsi !== "X") {
            str += "<dl> < lsi : ";
            str += "<dd>" + format(cdflsi * 100, 2) + "%</dd>";
            str += "<dd>" + format(cdflsi * 1000000, 0) + "ppm</dd>";
            str += "</dl>";
        }
        str += "<p>";
        str += "<dl>";
        if (Cp !== "X") {
            str += "<dd>Cp intra : " + format(Cp, 2) + "</dd>";
        }
        if (Cpk !== "X") {
            str += "<dd>Cpk intra : " + format(Cpk, 2) + "</dd>";
        }
        str += "</dl>";
        str += "<dl>";
        if (Pp !== "X") {
            str += "<dd>Pp : " + format(Pp, 2) + "</dd>";
        }
        if (Ppk !== "X") {
            str += "<dd>Ppk : " + format(Ppk, 2) + "</dd>";
        }
        str += "</dl>";
    } else {
        str += "<dl>";
        str += "Impossible de calculer les indicateurs car les données ne suivent pas une loi normal";
        str += "</dl>";
    }
    str += "</p>";

    str += "</h4>";

    div.innerHTML = str;
    
}
function resultatCapaMachine(mean, ecarttype, pValue, normal, cdflss, cdflsi, Cm, Cmk) {
    var div, str, valeur;
    
    //pValue = pValue * 100; // %
    
    div = document.getElementById("div_Resultat_Capa");
    /*global format*/
    str = "<h4 class = Resultat>";
    str += "<p>";
    str += "<dl> La moyenne des données est de : " + format(mean, 3) + "</dl>";
    str += "<dl> avec pour écart type : " + format(ecarttype, 3) + "</dl>";
    str += "</p>";

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

    str += "<p>";
    
    if (normal) {
        str += "<dt>";
        str += "Nombre hors spec prévisionnel";
        str += "</dt>";
        if (cdflss !== "X") {
            str += "<dl> > lss : ";
            valeur = parseFloat(1 - cdflss) * 100;
            if (valeur < 0.0001) {
                str += "<dd> <0.0001%</dd>";
            } else {
                str += "<dd>" + format(valeur, 4) + "%</dd>";
            }
            valeur = parseFloat(1 - cdflss) * 1000000;
            if (valeur < 1) {
                str += "<dd> <1ppm</dd>";
            } else {
                str += "<dd>" + format(valeur, 0) + "ppm</dd>";
            }
            str += "</dl>";
        }
        if (cdflsi !== "X") {
            str += "<dl> < lsi : ";
            valeur = cdflsi * 100;
            if (valeur < 0.0001) {
                str += "<dd> <0.0001%</dd>";
            } else {
                str += "<dd>" + format(valeur, 4) + "%</dd>";
            }
            valeur = cdflsi * 1000000;
            if (valeur < 1) {
                str += "<dd> <1ppm</dd>";
            } else {
                str += "<dd>" + format(valeur, 0) + "ppm</dd>";
            }
            str += "</dl>";
        }
        str += "</p>";


        str += "<div>";
        if (Cm !== "X") {
            str += "Cm : " + format(Cm, 2);
        }
        str += "</div>";
        if (Cmk !== "X") {
            str += "Cmk : " + format(Cmk, 2);
        }
    } else {
        str += "<dl>";
        str += "Impossible de calculer les indicateurs car les données ne suivent pas une loi normal";
        str += "</dl>";
    }
    str += "</h4>";

    div.innerHTML = str;
    
}
//Premiere methode
function erf(x) {
    var sign, t, y,
    // constants
        a1 =  0.254829592,
        a2 = -0.284496736,
        a3 =  1.421413741,
        a4 = -1.453152027,
        a5 =  1.061405429,
        p  =  0.3275911;

    // save the sign of x
    sign = (x >= 0) ? 1 : -1;
    x = Math.abs(x);


    // A&S formula 7.1.26   Handbook of Mathemathical Functions
    t = 1.0 / (1.0 + p * x);
    y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y; // erf(-x) = -erf(x);
}
function cdf(x, mean, sigma) {
    return 0.5 * (1 + erf((x - mean) / (Math.sqrt(2 * sigma * sigma))));
}
function std_n_cdf(x) {
    return cdf(x, 0, 1);
}
//Deuxieme Methode ad.Normality.test.js
function calcul() {

    var t, nmes,
        lss, lsi,
        decimal = 3, i,
        normalDist,
        cdfLSI, cdfLSS, Cp, Cpk1, Cpk, moyenne, ecarttype,
        edit, chklss, chklsi;
    
    // Met le tableau en mode non editable, cela met à jour les valeurs.
    edit = document.getElementById("input_editable1");
    if (edit.value !== "Modifier les mesures") {
        /*global celluleEditable*/
        celluleEditable(1);
    }


    chklss = document.forms.frmLS.chkLSS.checked;
    chklsi = document.forms.frmLS.chkLSI.checked;
    
    
    nmes = Number(document.getElementById("selectMesure").innerHTML);

    lss = Number(document.forms.frmLS.txtLSS.value);
    lsi = Number(document.forms.frmLS.txtLSI.value);
    /*global recupMesureTableau*/
    t = recupMesureTableau(nmes, 1); // t[mes]
    
    /*global adNormalityTest*/
    normalDist = adNormalityTest.check(t);
    ecarttype = normalDist.stdS;
    moyenne = normalDist.mean;

    if (chklss) {
        cdfLSS = cdf(lss, moyenne, ecarttype);
        Cpk1 = (lss - moyenne) / (3 * ecarttype);
    } else {
        cdfLSS = "X";
        Cpk1 = "X";
    }
    if (chklsi) {
        cdfLSI = cdf(lsi, moyenne, ecarttype);
        Cpk = (moyenne - lsi) / (3 * ecarttype);
    } else {
        cdfLSI = "X";
        Cpk = Cpk1;
    }

    if (chklss && chklsi) {
        Cp = (lss - lsi) / (6 * ecarttype);
        if (Cpk1 < Cpk) {
            Cpk = Cpk1;
        }
    } else {
        Cp = "X";
    }
    
    
    
//    if (t.length) {
//        moyenne = 0;
//        for (i = 0; i < t.length; i = i + 1) {
//            moyenne += t[i];
//        }
//        moyenne = moyenne / t.length;
//        ecarttype = 0;
//        for (i = 0; i < t.length; i = i + 1) {
//            ecarttype += Math.pow(t[i] - moyenne, 2);
//        }
//        ecarttype = Math.sqrt(ecarttype / (t.length - 1));
//    }

    resultatCapaMachine(moyenne, ecarttype, normalDist.pValue, normalDist.normal, cdfLSS, cdfLSI, Cp, Cpk);
    /*global grapheCapaMachine*/
    grapheCapaMachine(t, moyenne, ecarttype);

    
    varIntervalsetDisplay = setInterval(function () {
        intervalsetDisplay();
    }, 1000);

}
function calculSg() {

    var t, tnormal, nmes, nInd, nSg,
        moyenne,//
        ecarttype, //
        lss, lsi,
        decimal = 3, i,
        normalDist,
        cdfLSI, cdfLSS, Pp, Ppk1, Ppk, Cp, Cpk1, Cpk,
        d2 = [], R, j, Rmax, Rmin, SigmaIntra,
        edit, chklss, chklsi;
    
    // Met le tableau en mode non editable, cela met à jour les valeurs.
    edit = document.getElementById("input_editable2");
    if (edit.value !== "Modifier les mesures") {
        /*global celluleEditable*/
        celluleEditable(2);
    }

    
    
    nInd = Number(document.getElementById("selectIndividuSg").innerHTML);
    nSg = Number(document.getElementById("selectSg").innerHTML);
    nmes = nInd * nSg;
    
    chklss = document.forms.frmLS.chkLSS.checked;
    chklsi = document.forms.frmLS.chkLSI.checked;

    lss = Number(document.forms.frmLS.txtLSS.value);
    lsi = Number(document.forms.frmLS.txtLSI.value);
    t = recupMesureTableau(nmes, 2); // t[mes]
    R = 0;
    for (i = 0; i < nSg; i = i + 1) {
        Rmax = t[i * nInd];
        Rmin = t[i * nInd];
        for (j = 0; j < nInd; j = j + 1) {
            if (Rmax < t[i * nInd + j]) {
                Rmax = t[i * nInd + j];
            }
            if (Rmin > t[i * nInd + j]) {
                Rmin = t[i * nInd + j];
            }
        }
        R += Rmax - Rmin;
    }
    R = R / nSg;
    
    d2 = [1.128, 1.693, 2.059, 2.326, 2.534, 2.704, 2.847, 2.970, 3.078, 3.173, 3.258, 3.336, 3.407, 3.472, 3.532, 3.588, 3.640, 3.689, 3.735, 3.778, 3.819, 3.858, 3.895, 3.931];
    
    SigmaIntra = R / d2[nInd - 2];
    
//    if (t.length) {
//        moyenne = 0;
//        for (i = 0; i < t.length; i = i + 1) {
//            moyenne += t[i];
//        }
//        moyenne = moyenne / t.length;
//        ecarttype = 0;
//        for (i = 0; i < t.length; i = i + 1) {
//            ecarttype += Math.pow(t[i] - moyenne, 2);
//        }
//        ecarttype = Math.sqrt(ecarttype / t.length);
//    }

    /*global adNormalityTest*/
    
    tnormal = t.slice(0);
    normalDist = adNormalityTest.check(tnormal);
    ecarttype = normalDist.stdS;
    moyenne = normalDist.mean;
    
    
    if (chklss) {
        cdfLSS = cdf(lss, moyenne, ecarttype);
        Cpk1 = (lss - moyenne) / (3 * SigmaIntra);
        Ppk1 = (lss - moyenne) / (3 * ecarttype);
    } else {
        cdfLSS = "X";
        Cpk1 = "X";
        Ppk1 = "X";
    }
    if (chklsi) {
        cdfLSI = cdf(lsi, moyenne, ecarttype);
        Cpk = (moyenne - lsi) / (3 * SigmaIntra);
        Ppk = (moyenne - lsi) / (3 * ecarttype);
    } else {
        cdfLSI = "X";
        Cpk = Cpk1;
        Ppk = Ppk1;
    }

    if (chklss && chklsi) {
        Pp = (lss - lsi) / (6 * ecarttype);
        Cp = (lss - lsi) / (6 * SigmaIntra);
        if (Cpk1 < Cpk) {
            Cpk = Cpk1;
        }
        if (Ppk1 < Ppk) {
            Ppk = Ppk1;
        }
    } else {
        Cp = "X";
        Pp = "X";
    }
    
    resultatCapaSg(moyenne, ecarttype, normalDist.pValue, normalDist.normal, cdfLSS, cdfLSI, Pp, Ppk, Cp, Cpk, SigmaIntra);
    /*global grapheCapaSg*/
    grapheCapaSg(t, moyenne, ecarttype, SigmaIntra);
    
    varIntervalsetDisplay = setInterval(function () {
        intervalsetDisplay();
    }, 1000);

    
}