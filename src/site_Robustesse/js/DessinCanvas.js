"use strict";
function norm(xA, yA, xB, yB) {
    return Math.sqrt(Math.pow(xB - xA, 2) + Math.pow(yB - yA, 2));
}
function vecteur(ctx, strokeStyle, xA, yA, xB, yB, ArrowLength, ArrowWidth) {
    var AB, xC, yC, xD, yD, xE, yE;

    ctx.strokeStyle = strokeStyle;
    if (ArrowLength === undefined) {
        ArrowLength = 10;
    }
    if (ArrowWidth === undefined) {
        ArrowWidth = 8;
    }
    ctx.lineCap = "round";
    // Calculs des coordonnées des points C, D et E
    AB = norm(xA, yA, xB, yB);
    xC = xB + ArrowLength * (xA - xB) / AB;
    yC = yB + ArrowLength * (yA - yB) / AB;
    xD = xC + ArrowWidth * (-(yB - yA)) / AB;
    yD = yC + ArrowWidth * ((xB - xA)) / AB;
    xE = xC - ArrowWidth * (-(yB - yA)) / AB;
    yE = yC - ArrowWidth * ((xB - xA)) / AB;
    // et on trace le segment [AB], et sa flèche:
    ctx.beginPath();
    ctx.moveTo(xA, yA);
    ctx.lineTo(xB, yB);
    ctx.moveTo(xD, yD);
    ctx.lineTo(xB, yB);
    ctx.lineTo(xE, yE);
    ctx.stroke();
}
function segment(ctx, strokeStyle, xA, yA, xB, yB, ArrowLength, ArrowWidth) {
    var AB, xC, yC, xD, yD, xE, yE;

    ctx.strokeStyle = strokeStyle;
    if (ArrowLength === undefined) {
        ArrowLength = 10;
    }
    if (ArrowWidth === undefined) {
        ArrowWidth = 8;
    }
    ctx.lineCap = "round";
    // Calculs des coordonnées des points C, D et E
    AB = norm(xA, yA, xB, yB);
    xC = xB + ArrowLength * (xA - xB) / AB;
    yC = yB + ArrowLength * (yA - yB) / AB;
    xD = xC + ArrowWidth * (-(yB - yA)) / AB;
    yD = yC + ArrowWidth * ((xB - xA)) / AB;
    xE = xC - ArrowWidth * (-(yB - yA)) / AB;
    yE = yC - ArrowWidth * ((xB - xA)) / AB;
    // et on trace le segment [AB], et sa flèche:
    ctx.beginPath();
    ctx.moveTo(xA, yA);
    ctx.lineTo(xB, yB);
    ctx.moveTo(xD, yD);
    ctx.lineTo(xB, yB);
    ctx.lineTo(xE, yE);

    xC = xA + ArrowLength * (xB - xA) / AB;
    yC = yA + ArrowLength * (yB - yA) / AB;
    xD = xC + ArrowWidth * (-(yA - yB)) / AB;
    yD = yC + ArrowWidth * ((xA - xB)) / AB;
    xE = xC - ArrowWidth * (-(yA - yB)) / AB;
    yE = yC - ArrowWidth * ((xA - xB)) / AB;

    ctx.moveTo(xD, yD);
    ctx.lineTo(xA, yA);
    ctx.lineTo(xE, yE);




    ctx.stroke();
}
function ligne(ctx, x1, y1, x2, y2, strokeStyle, lineWidth) {
    ctx.save();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}
function pdfOl(val, moy, et) {
    var numerateur, denominateur;

    denominateur = et * Math.sqrt(2 * Math.PI);
    
    numerateur = Math.exp(-0.5 * (val - moy) * (val - moy) / (et * et));

    return (numerateur / denominateur);
}
function trace_gaussienneOl(contextCanvas, centre, largeur, hauteur, strokeStyle, et) {
    var i, ordonnee, abscisse,
        nb_sigma_largeur = 6,
        Depart, maxiOrdonnee, tab = [];


    //contextCanvas.fillStyle = "rgb(255,255,200)"; // couleur de remplissage rgb 0-255 
    //contextCanvas.fillRect(0, 0, largeur, hauteur);
    contextCanvas.strokeStyle = strokeStyle;
    contextCanvas.beginPath();
    //contextCanvas.moveTo(centre + 1, ordonnee = hauteur);//-canvas.height*pdf(3*(1-    canvas.width/2)/(canvas.width/2),0,1));
    
    abscisse = centre - largeur / 2;
    ordonnee = hauteur - hauteur * pdfOl(nb_sigma_largeur * (largeur / 2) / (largeur), 0, et);
    
    contextCanvas.moveTo(abscisse, ordonnee, 0, et);

    maxiOrdonnee = ordonnee;
    tab.push(ordonnee);
    for (i = 1; i < largeur; i = i + 1) {
        abscisse = centre - largeur / 2 + i;
        ordonnee = hauteur - hauteur * pdfOl(nb_sigma_largeur * (i - largeur / 2) / (largeur), 0, et);
        contextCanvas.lineTo(abscisse, ordonnee);
        if (ordonnee < maxiOrdonnee) {
            maxiOrdonnee = ordonnee;
        }
        tab.push(ordonnee);
    }
    //contextCanvas.closePath(); // reinitialise trace - sinon toutes les actions de dessins sont reex
    
//    console.log(tab);
    
    contextCanvas.stroke();
    return maxiOrdonnee;
}
function dessineTitre(ctx, x, y, msg) {
    ctx.font = "bold 24px verdana, sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText(msg, x, y);

}
function dessineCommentaire(ctx, x, y, msg) {
    var nbLigne, nbcaractmax, i, split,
        nbcaract, ligne;

    nbcaractmax = 60;
    ctx.font = "bold 14px verdana, sans-serif";
    ctx.fillStyle = "blue";

    split = msg.split(' ');
    nbcaract = 0;
    ligne = "";
    nbLigne = 0;
    for (i = 0; i < split.length; i = i + 1) {
        if (nbcaract + split[i].length > nbcaractmax) {
            ctx.fillText(ligne, x, y + nbLigne * 20);
            nbcaract = split[i].length;
            ligne = split[i];
            nbLigne = nbLigne + 1;

        } else {
            nbcaract = nbcaract + split[i].length + 1;
            ligne = ligne + " " + split[i];
        }
    }
    ctx.fillText(ligne, x, y + nbLigne * 20);

    return nbLigne;
}
function dessineLegende(ctx, couleur, x, y, msg) {

    ctx.font = "bold 14px verdana, sans-serif";
    ctx.fillStyle = couleur;
    ctx.fillText("---", x, y);

    ctx.font = "bold 14px verdana, sans-serif";
    ctx.fillStyle = "blue";
    ctx.fillText(msg, x + 50, y);
}
function ligneBezier(ctx) {
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(5, 100);
    ctx.lineTo(550, 100);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}
function ligneQuadratique(ctx) {
    ctx.save();
    ctx.strokeStyle = "green";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(5, 5);
    ctx.lineTo(590, 50);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}
function rectPlein(ctx, x, y, Largeur, Hauteur, fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, Largeur, Hauteur);

}
function rect(ctx, x, y, Largeur, Hauteur, fillStyle) {
    ctx.strokeStyle = fillStyle;
    ctx.strokeRect(x, y, Largeur, Hauteur);

}
function point(ctx) {
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(-2, -2, 4, 4);
    ctx.restore();
}
function dessineNoeudPap(ctx, fillStyle) {

    ctx.fillStyle = "rgba(200,200,200,0.3)";
    ctx.fillRect(-30, -30, 60, 60);

    ctx.fillStyle = fillStyle;
    ctx.globalAlpha = 1.0;
    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(-25, -25);
    ctx.lineTo(25, -25);
    ctx.lineTo(-25, 25);
    ctx.closePath();
    ctx.fill();
}