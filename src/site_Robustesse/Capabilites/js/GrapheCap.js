"use strict";
//DessinCanevas.js
/*global dessineTitre*/
/*global dessineCommentaire*/
/*global dessineLegende*/
/*global ligne*/
/*global trace_gaussienneOl*/
/*global rect*/
//MainGen.js
/*global format*/
function graphCapa(ctx, cadre, Numetape, titre, commentaire, t, moyennegeneral, et, sigmaIntra) {
    //trace les mesures et LSI, LSS
    var x1, y1, x2, y2, lineWidth,
        i, maxi, mini,
        margeGraphX, margeGraphY, hauteurTitre, hauteurCommentaire, MargeAxeX,
        valeur, valeurlsi, valeurlss, a, b,
        LSI, LSS, lineWidthLS,
        centreGaussienne, largeurGaussienne,
        hauteurBarre, decalageGaucheText, decalageHautText, decalageAxeXEtape5,
        styleZoneEtape, styleZoneGraph, styleAxe, styleMoyenne, styleHisto, styleLS, styleSigmaIntra, style6sigma, styleSigmaTotal,
        nbLigne,
        k, largeurClassReel, largeurClassArrondi, fin = false, rapport,
        val, classMini, classEnCours, tElement = [], tTri, xClass, yClass, largeurClass, HauteurClass,
        miniPixel, maxiPixel, ay, by,
        nbLegende, somme,
        chklss, chklsi;

    styleZoneEtape = "white";
    styleZoneGraph = "white";
    styleAxe = "gray";
    styleMoyenne = "#6868e3";
    styleHisto = "rgb(35, 18, 239)";
    styleLS = "#e62d2d";
    styleSigmaIntra = "#6c00ff";
    styleSigmaTotal = "black";
    style6sigma = "#25a725";


    hauteurTitre = 20;
    margeGraphX = 20;
    margeGraphY = 10;
    hauteurCommentaire = 200;
    lineWidth = 1;
    lineWidthLS = 4;
    MargeAxeX = 20;
    decalageGaucheText = 10;
    decalageHautText = 15;
    decalageAxeXEtape5 = 0;


    //    var gradien=context.createLinearGradient(0,0,200,0); // dégradé linéaire
    //    gradien.addColorStop(0,"red");
    //    gradien.addColorStop(1,"orange");
    //    context.fillStyle=gradien;


    chklss = document.forms.frmLS.chkLSS.checked;
    chklsi = document.forms.frmLS.chkLSI.checked;


    LSS = Number(document.forms.frmLS.txtLSS.value);
    LSI = Number(document.forms.frmLS.txtLSI.value);

    
    //axe

    // vérifie que le cadre est logique
    if (cadre.x1 > cadre.x2) {
        x1 = cadre.x2;
        x2 = cadre.x1;
    } else {
        x1 = cadre.x1;
        x2 = cadre.x2;
    }
    if (cadre.y1 > cadre.y2) {
        y1 = cadre.y2;
        y2 = cadre.y1;
    } else {
        y1 = cadre.y1;
        y2 = cadre.y2;
    }

    // on trace la zone de l'étape
    ctx.fillStyle = styleZoneEtape;
    ctx.fillRect(x1, y1, x2 - x1, y2 - y1);

    /*global dessineTitre*/
    dessineTitre(ctx, (x2 - x1) / 2 - titre.length * 6.5, y1, titre);

    // on trace la zone du Graphe
    x1 = x1 + margeGraphX;
    x2 = x2 - margeGraphX;
    y1 = y1 + margeGraphY + hauteurTitre;
    y2 = y2 - margeGraphY - hauteurCommentaire;
    ctx.fillStyle = styleZoneGraph;
    ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
    /*global dessineCommentaire*/
    nbLigne = dessineCommentaire(ctx, x1 + 20, y2 + 20, commentaire);

    nbLegende = 0;
    /*global dessineLegende*/
    nbLegende = nbLegende + 1;
    dessineLegende(ctx, styleHisto, x1 + 20, y2 + 20 * nbLegende + (nbLigne + 1) * 20, "Histogramme");
    nbLegende = nbLegende + 1;
    dessineLegende(ctx, styleLS, x1 + 20, y2 + 20 * nbLegende + (nbLigne + 1) * 20, "Spécifications");
    nbLegende = nbLegende + 1;
    dessineLegende(ctx, styleMoyenne, x1 + 20, y2 + 20 * nbLegende + (nbLigne + 1) * 20, "Moyenne générale");
    nbLegende = nbLegende + 1;
    dessineLegende(ctx, styleSigmaTotal, x1 + 20, y2 + 20 * nbLegende + (nbLigne + 1) * 20, "Sigma intra");
    nbLegende = nbLegende + 1;
    dessineLegende(ctx, style6sigma, x1 + 20, y2 + 20 * nbLegende + (nbLigne + 1) * 20, "Sigma total");

    hauteurBarre = (y2 - y1) / 5;

    // axe des X
    /*global ligne*/
    ligne(ctx, x1, y2 - MargeAxeX, x2, y2 - MargeAxeX, styleAxe, lineWidth);
    //mesure
    //Recherche du min et du max
    tTri = t.sort(function (a, b) { return a - b; });
    maxi = tTri[tTri.length - 1];
    mini = tTri[0];
    
    
    
    //On détermine le nombre d'intervale de l'histogramme
    k = Math.floor(1 + 3.332 * Math.log(t.length) / Math.log(10)); // Math.log10 plante sous IE11
    if (k !== 0) {
        largeurClassReel = (maxi - mini) / (k);
    } else {
        largeurClassReel = 0;
    }
    rapport = 1;
    
    if (largeurClassReel !== 0) {
        if (largeurClassReel > 1) {
            val = Math.floor(largeurClassReel);
        } else {
            while (!fin) {
                val = Math.floor(largeurClassReel * rapport);
                if (val > 1) {
                    fin = true;
                } else {
                    rapport = rapport * 10;
                }
            }
    //        if (val >= 5) {
    //            if (val - 2.5 <= 5) {
    //                val = 5;
    //            } else {
    //                val = 10;
    //            }
    //        } else {
    //            if (val - 2.5 >= 2.5) {
    //                val = 5;
    //            } else {
    //                val = 10;
    //                rapport = rapport * 10;
    //            }
    //        }
            val = val / rapport;
        }
        largeurClassArrondi = val;
    }

    //Recherche de la premier classe
    val  = Math.floor(mini / largeurClassArrondi);
    classMini = val * largeurClassArrondi;

    // Calcul du nombre d'élément pour chaque classe

    classEnCours = classMini + largeurClassArrondi;
    val = 0;
    for (i = 0; i < tTri.length; i = i + 1) {
        if (tTri[i] >= classEnCours) {
            tElement.push(val);
            val = 1;
            classEnCours += largeurClassArrondi;
            while (tTri[i] >= classEnCours) {
                tElement.push(0);
                classEnCours += largeurClassArrondi;
            }
        } else {
            val += 1;
        }
    }
    tElement.push(val);
    if (chklsi) {
        if (LSI < mini) {
            mini = LSI;
        }
    }
    if (chklss) {
        if (LSS > maxi) {
            maxi = LSS;
        }
    }
    if (moyennegeneral - 3 * et < mini) {
        mini = moyennegeneral - 3 * et;
    }
    if (moyennegeneral + 3 * et > maxi) {
        maxi = moyennegeneral + 3 * et;
    }

    
    mini = Math.floor(mini);
//    if (maxi === Math.floor(maxi)) {
//        maxi = Math.floor(maxi);
//    } else {
//        maxi = Math.floor(maxi) + 1;
//    }
    maxi = Math.floor(maxi) + 1;
    
    
    a = (x2 - x1) / (maxi - mini);
    b = (x1) - (x2 - x1) / (maxi - mini) * mini;

    if (chklsi) {
        valeurlsi = a * LSI + b;
        ligne(ctx, valeurlsi, y2 - MargeAxeX, valeurlsi, y2 - MargeAxeX - hauteurBarre * 4, styleLS, lineWidthLS);
    }
    if (chklss) {
        valeurlss = a * LSS + b;
        ligne(ctx, valeurlss, y2 - MargeAxeX, valeurlss, y2 - MargeAxeX - hauteurBarre * 4, styleLS, lineWidthLS);
    }
    

//                    valeur = a * t[i][j][k] + b;
//                    ligne(ctx, valeur, y2 - MargeAxeX, valeur, y2 - MargeAxeX - hauteurBarre, styleValeur, lineWidth);
                    //ctx.strokeText(i, valeur, y2 + 10);

    ctx.fillStyle = styleLS;
    ctx.font = "bold 8px verdana, sans-serif";
    if (chklsi) {
        ctx.fillText("LSI", valeurlsi - decalageGaucheText, y1 +             decalageHautText);
    }
    if (chklss) {
        ctx.fillText("LSS", valeurlss - decalageGaucheText, y1 + decalageHautText);
    }

    // on affiche la valeur mini et la valeur maxi
    ctx.fillStyle = "black";
    /*global format*/
    valeur = a * mini + b;
    ctx.fillText(format(mini, 3), valeur - decalageGaucheText, y2 - MargeAxeX + decalageHautText + 10);
    valeur = a * maxi + b;
    ctx.fillText(format(maxi, 3), valeur - decalageGaucheText, y2 - MargeAxeX + decalageHautText + 10);
    valeur = a * moyennegeneral + b;
    ligne(ctx, valeur, y2 - MargeAxeX, valeur, y2 - MargeAxeX - hauteurBarre * 3, styleMoyenne, lineWidthLS);
    ctx.font = "bold 14px verdana, sans-serif";
    ctx.fillStyle = styleMoyenne;
    ctx.fillText("µ", valeur - decalageGaucheText, y2 - MargeAxeX - hauteurBarre * 3 - decalageHautText);

    centreGaussienne = a * moyennegeneral + b;
    largeurGaussienne = a * (6 * et); //3sigma;
    /*global trace_gaussienneOl*/
    maxiPixel = trace_gaussienneOl(ctx, centreGaussienne, largeurGaussienne, y2 - MargeAxeX, styleSigmaTotal, 1);

    valeur = a * (moyennegeneral + 3 * et) + b;
    ligne(ctx, valeur, y2 - MargeAxeX, valeur, y2 - MargeAxeX - hauteurBarre * 4, style6sigma, lineWidthLS);
    ctx.font = "bold 8px verdana, sans-serif";
    ctx.fillStyle = style6sigma;
    ctx.fillText(format(moyennegeneral + 3 * et, 1), valeur, y2 - MargeAxeX + decalageHautText);
    valeur = a * (moyennegeneral - 3 * et) + b;
    ligne(ctx, valeur, y2 - MargeAxeX, valeur, y2 - MargeAxeX - hauteurBarre * 4, style6sigma, lineWidthLS);
    ctx.fillText(format(moyennegeneral - 3 * et, 1), valeur, y2 - MargeAxeX + decalageHautText);

    
    if (sigmaIntra !== undefined) {
        centreGaussienne = a * moyennegeneral + b;
        largeurGaussienne = a * (6 * sigmaIntra); //3sigma;
        /*global trace_gaussienneOl*/
        trace_gaussienneOl(ctx, centreGaussienne, largeurGaussienne, y2 - MargeAxeX, styleSigmaIntra, 1);

        valeur = a * (moyennegeneral + 3 * sigmaIntra) + b;
        ligne(ctx, valeur, y2 - MargeAxeX, valeur, y2 - MargeAxeX - hauteurBarre * 4, styleSigmaIntra, lineWidthLS);
        ctx.font = "bold 8px verdana, sans-serif";
        ctx.fillStyle = styleSigmaIntra;
        ctx.fillText(format(moyennegeneral + 3 * sigmaIntra, 1), valeur, y2 - MargeAxeX + decalageHautText + 10);
        valeur = a * (moyennegeneral - 3 * sigmaIntra) + b;
        ligne(ctx, valeur, y2 - MargeAxeX, valeur, y2 - MargeAxeX - hauteurBarre * 4, styleSigmaIntra, lineWidthLS);
        ctx.fillText(format(moyennegeneral - 3 * sigmaIntra, 1), valeur, y2 - MargeAxeX + decalageHautText + 10);

    
    
    
    }
    
    //histogramme
    
    miniPixel = y2 - MargeAxeX;
    maxi  = tElement[0];
    for (i = 0; i < tElement.length; i = i + 1) {
        if (maxi < tElement[i]) {
            maxi = tElement[i];
        }
    }

    ay = Math.abs((maxiPixel - miniPixel) / maxi);
    by = miniPixel;
    
    
    ctx.fillStyle = styleHisto;
    for (i = 0; i < tElement.length; i = i + 1) {
        xClass = a * (classMini + i * largeurClassArrondi) + b;
        //HauteurClass = ay * tElement[i] + by;
        HauteurClass = ay * tElement[i];
        largeurClass = a * largeurClassArrondi;
        yClass = by - HauteurClass;
        /*global rect*/
        rect(ctx, xClass, yClass, largeurClass, HauteurClass, styleHisto);
        ctx.fillText((classMini * rapport + i * largeurClassArrondi * rapport) / rapport, xClass - decalageGaucheText, y2 - MargeAxeX + decalageHautText);
    }
    xClass = a * (classMini + tElement.length * largeurClassArrondi) + b;
    ctx.fillText(classMini + tElement.length * largeurClassArrondi, xClass - decalageGaucheText, y2 - MargeAxeX + decalageHautText);

}
function grapheCapaMachine(t, moyenne, ecarttype) {
    
    var canvas, ctx, cadreEtape,
        margeEtape = 10,
        hauteurEtape = 500,
        titre, commentaire,
        i, nbetape = 1;

    titre = "Capa";
    commentaire = "Commentaire Capa";

    canvas = document.getElementById("canvasCapaMachine");
    canvas.width = 600;
    canvas.height = hauteurEtape * nbetape;
    canvas.style.width = '600px';
    canvas.style.height = Number(hauteurEtape * nbetape) + 'px';
    ctx = canvas.getContext("2d");

    cadreEtape = {
        x1: margeEtape,
        y1: margeEtape,
        x2: canvas.width - margeEtape,
        y2: hauteurEtape - margeEtape
    };

    ctx.translate(0, 0);
    //    titre(ctx, cadre, "titre");
    ctx.translate(0, 20);

    commentaire = " On observe la dispersion des mesures par rapport aux limites de spécification.";
    
    graphCapa(ctx, cadreEtape, 1, titre, commentaire, t, moyenne, ecarttype);
    
}
function grapheCapaSg(t, moyenne, ecarttype, sigmaIntra) {
    
    var canvas, ctx, cadreEtape,
        margeEtape = 10,
        hauteurEtape = 500,
        titre, commentaire,
        i, nbetape = 1;

    titre = "Capa";
    commentaire = "Commentaire Capa";

    canvas = document.getElementById("canvasCapaSg");
    canvas.width = 600;
    canvas.height = hauteurEtape * nbetape;
    canvas.style.width = '600px';
    canvas.style.height = Number(hauteurEtape * nbetape) + 'px';
    ctx = canvas.getContext("2d");

    cadreEtape = {
        x1: margeEtape,
        y1: margeEtape,
        x2: canvas.width - margeEtape,
        y2: hauteurEtape - margeEtape
    };

    ctx.translate(0, 0);
    //    titre(ctx, cadre, "titre");
    ctx.translate(0, 20);

    commentaire = " On observe la dispersion des mesures par rapport aux limites de spécification.";
    
    graphCapa(ctx, cadreEtape, 1, titre, commentaire, t, moyenne, ecarttype, sigmaIntra);
    
}

