"use strict";
function etape(ctx, cadre, Numetape, titre, commentaire, moy, et, et2) {
    //trace les mesures et LSI, LSS
    var t, nope, npie, nrep, ntotal,
        x1, y1, x2, y2, lineWidth,
        i, j, k, maxi, mini,
        margeGraphX, margeGraphY, hauteurTitre, hauteurCommentaire, MargeAxeX,
        valeur, valeurlsi, valeurlss, a, b,
        LSI, LSS, lineWidthLS,
        centreGaussienne, largeurGaussienne, moyennegeneral,
        hauteurBarre, decalageGaucheText, decalageHautText, decalageAxeXEtape5,
        styleZoneEtape, styleZoneGraph, styleAxe, styleMoyenne, styleValeur, styleLS, styleVraiIT, styleSigmaRetR, styleSigmaToutes,
        nbLigne, nbLegende;

    styleZoneEtape = "white";
    styleZoneGraph = "white";
    styleAxe = "gray";
    styleMoyenne = "#6868e3";
    styleValeur = "black";
    styleLS = "#e62d2d";
    styleVraiIT = "#25a725";
    styleSigmaRetR = "#1c8328";
    styleSigmaToutes = "#be3650";

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



    nope = document.getElementById("selectOperateur").value;
    npie = document.getElementById("selectPiece").value;
    nrep = document.getElementById("selectRepetition").value;

    LSS = Number(document.forms.frmLS.txtLSS.value);
    LSI = Number(document.forms.frmLS.txtLSI.value);


    /*global recupTableauRetR*/
    t = recupTableauRetR(nope, npie, nrep);
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

    //    ctx.fillText(msg, (cadre.x2 - cadre.x1) / 2 - 25, cadre.y1);
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
    if (Numetape === 1) {
        /*global dessineLegende*/
        nbLegende = nbLegende + 1;
        dessineLegende(ctx, styleValeur, x1 + 20, y2 + 20 * nbLegende + (nbLigne + 1) * 20, "Valeurs individuelles");
    }

    nbLegende = nbLegende + 1;
    dessineLegende(ctx, styleLS, x1 + 20, y2 + 20 * nbLegende + (nbLigne + 1) * 20, "Spécifications");

    if (Numetape === 2 || Numetape === 3) {
        nbLegende = nbLegende + 1;
        dessineLegende(ctx, styleVraiIT, x1 + 20, y2 + 20 * nbLegende + (nbLigne + 1) * 20, "Vrai IT");
        if (Numetape === 2) {
            nbLegende = nbLegende + 1;
            dessineLegende(ctx, styleMoyenne, x1 + 20, y2 + 20 * nbLegende + (nbLigne + 1) * 20, "Moyenne pièces");
        } else {
            nbLegende = nbLegende + 1;
            dessineLegende(ctx, styleMoyenne, x1 + 20, y2 + 20 * nbLegende + (nbLigne + 1) * 20, "Moyenne opérateurs");
        }
        nbLegende = nbLegende + 1;
        dessineLegende(ctx, styleSigmaRetR, x1 + 20, y2 + 20 * nbLegende + (nbLigne + 1) * 20, "Sigma R&R");
    }

    if (Numetape === 4) {
        nbLegende = nbLegende + 1;
        dessineLegende(ctx, styleSigmaToutes, x1 + 20, y2 + 20 * nbLegende + (nbLigne + 1) * 20, "Sigma total");
        nbLegende = nbLegende + 1;
        dessineLegende(ctx, styleSigmaRetR, x1 + 20, y2 + 20 * nbLegende + (nbLigne + 1) * 20, "Sigma pièces");
    }
    if (Numetape === 5) {
        nbLegende = nbLegende + 1;
        dessineLegende(ctx, styleSigmaToutes, x1 + 20, y2 + 20 * nbLegende + (nbLigne + 1) * 20, "Sigma total");
        nbLegende = nbLegende + 1;
        dessineLegende(ctx, styleSigmaRetR, x1 + 20, y2 + 20 * nbLegende + (nbLigne + 1) * 20, "Sigma R&R");
        decalageAxeXEtape5 = (y2 - y1) / 3;
        y2 = y2 - decalageAxeXEtape5;
    }

    hauteurBarre = (y2 - y1) / 5;

    // axe des X
    /*global ligne*/
    ligne(ctx, x1, y2 - MargeAxeX, x2, y2 - MargeAxeX, styleAxe, lineWidth);
    //mesure
    //Recherche du min et du max
    ntotal = nope * npie * nrep;
    if (Numetape < 5) {
        maxi = t[0][0][0];
        mini = t[0][0][0];
        moyennegeneral = 0;
        for (i = 0; i < nope; i = i + 1) {
            for (j = 0; j < npie; j = j + 1) {
                for (k = 0; k < nrep; k = k + 1) {
                    if (t[i][j][k] > maxi) {
                        maxi = t[i][j][k];
                    }
                    if (t[i][j][k] < mini) {
                        mini = t[i][j][k];
                    }
                    moyennegeneral = moyennegeneral + t[i][j][k];
                }
            }
        }
        moyennegeneral = moyennegeneral / ntotal;
        if (Numetape < 4) {
            if (LSI - 3 * et < mini) {
                mini = LSI - 3 * et;
            }
            if (LSS + 3 * et > maxi) {
                maxi = LSS + 3 * et;
            }
        } else {
            if (moyennegeneral - 3 * et < mini) {
                mini = moyennegeneral - 3 * et;
            }
            if (moyennegeneral + 3 * et > maxi) {
                maxi = moyennegeneral + 3 * et;
            }
        }
    } else {
        //maxi = (LSS + LSI) / 2 + Math.abs(LSS - LSI);
        //mini = (LSS + LSI) / 2 - Math.abs(LSS - LSI);
        maxi = (LSS + LSI) / 2 + 3 * et;
        mini = (LSS + LSI) / 2 - 3 * et;
        if (LSI < mini) {
            mini = LSI;
        }
        if (LSS > maxi) {
            maxi = LSS;
        }
    }
    mini = Math.floor(mini);
    if (maxi === Math.floor(maxi)) {
        maxi = Math.floor(maxi);
    } else {
        maxi = Math.floor(maxi) + 1;
    }
    
    a = (x2 - x1) / (maxi - mini);
    b = (x1) - (x2 - x1) / (maxi - mini) * mini;
    valeurlsi = a * LSI + b;
    ligne(ctx, valeurlsi, y2 - MargeAxeX, valeurlsi, y2 - MargeAxeX - hauteurBarre * 4, styleLS, lineWidthLS);
    valeurlss = a * LSS + b;
    ligne(ctx, valeurlss, y2 - MargeAxeX, valeurlss, y2 - MargeAxeX - hauteurBarre * 4, styleLS, lineWidthLS);

    if (Numetape < 5) {
        if (Numetape === 1) {
            for (i = 0; i < nope; i = i + 1) {
                for (j = 0; j < npie; j = j + 1) {
                    for (k = 0; k < nrep; k = k + 1) {
                        valeur = a * t[i][j][k] + b;
                        ligne(ctx, valeur, y2 - MargeAxeX, valeur, y2 - MargeAxeX - hauteurBarre, styleValeur, lineWidth);
                    }
                }
            }

            ctx.fillStyle = styleLS;
            ctx.fillText("LSI", valeurlsi - decalageGaucheText, y1 + decalageHautText);
            ctx.fillText("LSS", valeurlss - decalageGaucheText, y1 + decalageHautText);
        }

        if (Numetape === 1 || Numetape === 2 || Numetape === 3 || Numetape === 4) {
            // on affiche la valeur mini et la valeur maxi
            ctx.font = "bold 8px verdana, sans-serif";
            ctx.fillStyle = styleValeur;
            /*global format*/
            valeur = a * mini + b;
            ctx.fillText(format(mini, 3), valeur - decalageGaucheText, y1 + decalageHautText);
            valeur = a * maxi + b;
            ctx.fillText(format(maxi, 3), valeur - decalageGaucheText, y1 + decalageHautText);
        }
        if (Numetape === 2 || Numetape === 3 || Numetape === 4) {
            valeur = a * moyennegeneral + b;
            ligne(ctx, valeur, y2 - MargeAxeX, valeur, y2 - MargeAxeX - hauteurBarre * 3, styleMoyenne, lineWidthLS);
            ctx.font = "bold 8px verdana, sans-serif";
            ctx.fillStyle = styleMoyenne;
            ctx.fillText("µ", valeur - decalageGaucheText, y2 - MargeAxeX - hauteurBarre * 3 - decalageHautText);
        }

        if (Numetape === 2 || Numetape === 3) {
            centreGaussienne = a * LSI + b;
            largeurGaussienne = a * 6 * et; //6sigma;
            /*global trace_gaussienneOl*/
            trace_gaussienneOl(ctx, centreGaussienne, largeurGaussienne, y2 - MargeAxeX, styleSigmaRetR, 1);
            valeur = a * (LSI + 3 * et) + b;
            ligne(ctx, valeur, y2 - MargeAxeX, valeur, y2 - MargeAxeX - hauteurBarre * 4, styleVraiIT, lineWidthLS);
            valeur = a * (LSS - 3 * et) + b;
            ligne(ctx, valeur, y2 - MargeAxeX, valeur, y2 - MargeAxeX - hauteurBarre * 4, styleVraiIT, lineWidthLS);
            centreGaussienne = a * LSS + b;
            trace_gaussienneOl(ctx, centreGaussienne, largeurGaussienne, y2 - MargeAxeX, styleSigmaRetR, 1);

            for (i = 0; i < moy.length; i = i + 1) {
                valeur = a * moy[i] + b;
                ligne(ctx, valeur, y2 - MargeAxeX, valeur, y2 - MargeAxeX - hauteurBarre * 2, styleMoyenne, lineWidthLS / 2);
                ctx.fillstyle = styleMoyenne;
                if (Numetape === 2) {
                    ctx.fillText("P" + Number(i + 1), valeur - decalageGaucheText, y2 - MargeAxeX + decalageHautText);
                }
                if (Numetape === 3) {
                    ctx.fillText("O" + Number(i + 1), valeur - decalageGaucheText, y2 - MargeAxeX + decalageHautText);
                }
            }
        }

        if (Numetape === 4) {
            centreGaussienne = a * moyennegeneral + b;
            largeurGaussienne = a * 6 * et; //6sigma; etToutes
            trace_gaussienneOl(ctx, centreGaussienne, largeurGaussienne, y2 - MargeAxeX, styleSigmaToutes, 1);

            largeurGaussienne = a * 6 * et2; //6sigma; etPieces
            trace_gaussienneOl(ctx, centreGaussienne, largeurGaussienne, y2 - MargeAxeX, styleSigmaRetR, et2 / et);
        }
    }
    if (Numetape === 5) {

        centreGaussienne = a * ((LSS + LSI) / 2) + b;

        /*global segment*/
        segment(ctx, styleLS, a * LSI + b, y2 - MargeAxeX + decalageHautText, a * LSS + b, y2 - MargeAxeX + decalageHautText, 5, 5);
        ctx.fillStyle = styleLS;
        titre  = "IT";
        ctx.fillText(titre, centreGaussienne - titre.length * 6.5, y2 - MargeAxeX + 2 * decalageHautText);

        largeurGaussienne = a * 6 * et; //6sigma; etToutes
        trace_gaussienneOl(ctx, centreGaussienne, largeurGaussienne, y2 - MargeAxeX, styleSigmaToutes, 1);
        segment(ctx, styleSigmaToutes, centreGaussienne - largeurGaussienne / 2, y2 - MargeAxeX + 3 * decalageHautText, centreGaussienne + largeurGaussienne / 2, y2 - MargeAxeX + 3 * decalageHautText, 5, 5);
        ctx.fillStyle = styleSigmaToutes;
        titre  = "Variation totale";
        ctx.fillText(titre, centreGaussienne - titre.length * 4, y2 - MargeAxeX + 4 * decalageHautText);
        //trace_gaussienneOl(ctx, centreGaussienne, largeurGaussienne, y1, strokeStyle, et);

        largeurGaussienne = a * 6 * et2; //6sigma; etToutes
        trace_gaussienneOl(ctx, centreGaussienne, largeurGaussienne, y2 - MargeAxeX, styleSigmaRetR, 1);
        segment(ctx, styleSigmaRetR, centreGaussienne - largeurGaussienne / 2, y2 - MargeAxeX + 5 * decalageHautText, centreGaussienne + largeurGaussienne / 2, y2 - MargeAxeX + 5 * decalageHautText, 5, 5);
        ctx.fillStyle = styleSigmaRetR;
        titre  = "GRR";
        ctx.fillText(titre, centreGaussienne - titre.length * 6.5, y2 - MargeAxeX + 6 * decalageHautText);

        /*global format*/
        ctx.fillStyle = "black";
        ctx.fillText("GRR/IT = " + format(6 * et2 / (LSS - LSI) * 100, 2) + " %", x1 + 10, y2 - MargeAxeX - 3 * hauteurBarre);
        /*global format*/
        ctx.fillText("GRR/Variation totale = " + format(et2 / et * 100, 2) + " %", x1 + (x2 - x1) / 2 + 10, y2 - MargeAxeX - 3 * hauteurBarre);
    }
}
function test1(ctx) {
    /*global rect*/
    rect(ctx, 10, 10, 55, 50, "rgb(200,0,0)");
    rect(ctx, 30, 30, 55, 50, "rgba(0, 0, 200, 0.5)");

}
function test2(ctx) {
    // notez que toutes les autres translations sont relatives à
    // celle-ci

    ctx.translate(45, 45);

    ctx.save();
    //ctx.translate(0, 0); // non nécessaire
    /*global dessineNoeudPap*/
    dessineNoeudPap(ctx, "red");
    /*global point*/
    point(ctx);
    ctx.restore();

    ctx.save();
    ctx.translate(85, 0);
    ctx.rotate(45 * Math.PI / 180);
    dessineNoeudPap(ctx, "green");
    point(ctx);
    ctx.restore();

    ctx.save();
    ctx.translate(0, 85);
    ctx.rotate(135 * Math.PI / 180);
    dessineNoeudPap(ctx, "blue");
    point(ctx);
    ctx.restore();

    ctx.save();
    ctx.translate(85, 85);
    ctx.rotate(90 * Math.PI / 180);
    dessineNoeudPap(ctx, "yellow");
    point(ctx);
    ctx.restore();
}
function test3(ctx) {
    var x1, y1, x2, y2, strokeStyle, lineWidth;

    x1 = 50;
    y1 = 100;
    x2 = 550;
    y2 = 100;
    strokeStyle = "black";
    lineWidth = 1;

    ligne(ctx, x1, y1, x2, y2, strokeStyle, lineWidth);
}
function zoom(evt) {
    var canvas, ctx;
    //0:gauche; 1:centre; 2:droite
    canvas = document.getElementById("canvasEtape");
    if (evt.button === 0) {
        canvas.width = canvas.width * 2;
        canvas.height = canvas.height * 2;
    }
    if (evt.button === 1) {
        canvas.width = canvas.width * 2;
        canvas.height = canvas.height * 2;
    }
    if (evt.button === 2) {
        canvas.width = canvas.width / 2;
        canvas.height = canvas.height / 2;
    }
    ctx = canvas.getContext("2d");
    test3(ctx);
}
function dessineEtape(moyope, moypie, etRetR, etToutes, etPieces) {
    var canvas, ctx, cadreEtape,
        margeEtape = 10,
        hauteurEtape = 500,
        titre, commentaire,
        i, nbetape = 6;

    titre = ["Valeurs individuelles & Tolérances", "Moyennes des pièces & Tolérances", "Moyenne des opérateurs & Tolérances", "Variation totale & Variation pièce-à-pièce", "R&R vs IT et Variation totale"];
    commentaire = ["Commentaire1", "Commentaire2", "Commentaire3", "Commentaire4", "Commentaire5"];

    canvas = document.getElementById("canvasEtape");
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

    commentaire[0] = " On observe la dispersion des mesures par rapport aux limites de spécification.";
    etape(ctx, cadreEtape, 1, titre[0], commentaire[0], 0, etRetR, 0);

    ctx.translate(0, hauteurEtape + 20);

    commentaire[1] = " On observe la moyenne pour chaque pièce, la moyenne générale, le 6 sigma R&R autour de l'IT, et le vrai IT.";
    etape(ctx, cadreEtape, 2, titre[1], commentaire[1], moypie, etRetR, 0);

    ctx.translate(0, hauteurEtape + 20);

    commentaire[2] = " On observe la moyenne pour chaque opérateur, la moyenne générale, le 6 sigma R&R autour de l'IT, et le vrai IT.";
    etape(ctx, cadreEtape, 3, titre[2], commentaire[2], moyope, etRetR, 0);

    ctx.translate(0, hauteurEtape + 20);

    commentaire[3] = " On observe le sigma totale et le sigma pièces.";
    etape(ctx, cadreEtape, 4, titre[3], commentaire[3], 0, etToutes, etPieces);

    ctx.translate(0, hauteurEtape + 20);
    cadreEtape.y2 = cadreEtape.y2 + hauteurEtape / 3;

    commentaire[4] = " On compare l'étendue de la R&R par rapport à l'IT ou à la variation totale de l'étude.";
    etape(ctx, cadreEtape, 5, titre[4], commentaire[4], 0, etToutes, etRetR);

    //document.getElementById("canvasEtape").addEventListener("click", zoom, false);

}
