"use strict";
/*jslint plusplus: true */

// variables globales 
var moyenne = 10; //valeur d'initialisation de la moyenne dans l'échelle libre
var ecart_type = 1; //valeur d'initialisation de l'écart-type dans l'échelle libre
var moyenneIC = 10; //valeur d'initialisation de la moyenne dans l'IC
var ecart_typeIC = 1; //valeur d'initialisation de l'écart-type moyenne dans l'IC
var valeur_t; //valeur du t de Student dans le calcul de l'IC
var nbIC = 50; //valeur par défaut du nombre d'individus sur lequel est calculé l'IC
var valueG; //valeur numérique correspondant à ce qui est rentré dans le champ textG    
var valueD; //valeur numérique correspondant à ce qui est rentré dans le champ textD
var nb_sigma_largeur = 9; // nombre d'écarts-type occupés par la largeur de la fenêtre (canvas) d'affichage. Par défaut +/- 4.5
var largeur = 801; //largeur en pixels de la fenêtre d'affichage du canvas 
var hauteur = 500; //hauteur en pixels de la fenêtre d'affichage du canvas
var milieu = (largeur - 1) / 2; // position en pixels de la valeur 0 (centre de la gaussienne)
var valueG_libre; //valeur numérique correspondant à ce qui est rentré dans le champ textG_libre    
var valueD_libre; //valeur numérique correspondant à ce qui est rentré dans le champ textD_libre    
// --------------------------------------------------
//               Création des contrôles sliders
// --------------------------------------------------
function creationSlider() {
    /*global noUiSlider*/
    noUiSlider.create(document.getElementById('dblslider'), { // création du slider dans l'échelle de sigma
        start: [-2, 2], // niveau de départ des curseurs

        connect: true,
        range: {
            'min': -4.5,
            'max': 4.5
        }

    });

    noUiSlider.create(document.getElementById('dblsliderlibre'), { // création du slider dans l'échelle de sigma
        start: [8, 12],

        connect: true,
        range: {
            'min': 5.5,
            'max': 14.5
        }

    });

}
// --------------------------------------------------
//               Fonctions de dessin des gaussiennes et des échelles dans les canvas
// --------------------------------------------------    
function pdf(val, moy, et) { // fonction de densité de probabilité de la loi normale renvoie 1/racine(2*pi) pour moy=0 et ecart-type=1
    var numerateur, denominateur;

    denominateur = et * Math.sqrt(2 * Math.PI);
    numerateur = Math.exp(-0.5 * (val - moy) * (val - moy) / (et * et));

    return (numerateur / denominateur);
}
function trace_gaussienne(cnv) { // on passe un canvas en argument pour dessiner la gaussienne dedans
    var i, ordonnee, contextCanvas;

    if (cnv.getContext) { // la fonction getContext() renvoie True si canvas accessible 
        contextCanvas = cnv.getContext("2d");
        contextCanvas.fillStyle = "rgb(255,255,255)"; // couleur de remplissage rgb 0-255, ici fond blanc 
        contextCanvas.fillRect(0, 0, cnv.width, cnv.height);


        contextCanvas.strokeStyle = "rgb(0,0,0)";
        contextCanvas.beginPath();
        contextCanvas.moveTo(1, ordonnee = cnv.height - 50); // On dessine à partir de la gauche et à 50 pixels au-dessus du bas du canvas

        for (i = 1; i < cnv.width; i++) {
            ordonnee = cnv.height - cnv.height * pdf(nb_sigma_largeur * (i - cnv.width / 2) / (cnv.width), 0, 1) - 50;
            contextCanvas.lineTo(i, ordonnee);


        }
        contextCanvas.closePath(); // reinitialise trace - sinon toutes les actions de dessins sont reex
        contextCanvas.stroke();


    } else {
        /*global alert*/
        alert("pas acces context");
    }


}
function trace_droite(cnv, val, moy, et) { // On passe le canvas dans lequel il faut dessiner les droites à gauche et à droite de l'intervalle délimité par les curseurs

    var ordonnee, contextCanvas;

    if (cnv.getContext) { // la fonction getContext() renvoie True si canvas accessible 

        contextCanvas = cnv.getContext("2d");
        contextCanvas.font = "20px Comic Sans MS";
        contextCanvas.fillStyle = "rgb(0,0,0)";
        contextCanvas.textAlign = "center";
        contextCanvas.strokeStyle = "#000000";
        ordonnee = cnv.height - cnv.height * pdf(val, moy, et) * et; // calcul de l'ordonnée ou il faut arrêter la droite en fonction de la position 


        contextCanvas.beginPath();
        contextCanvas.moveTo(((val - moy) / et + nb_sigma_largeur / 2) * cnv.width / nb_sigma_largeur, cnv.height - 50);
        contextCanvas.lineTo(((val - moy) / et + nb_sigma_largeur / 2) * cnv.width / nb_sigma_largeur, ordonnee - 50);


        contextCanvas.closePath(); // reinitialise trace - sinon toutes les actions de dessins sont reex
        contextCanvas.stroke();
    } else {
        alert("pas acces context");
    }

}
function normalcdf(mean, sigma, to) { // fonction de répartition de la loi normale, exemple : mean=0 et sigma=1 et to=2 renvoie 2.57%
    var z = (to - mean) / Math.sqrt(2 * sigma * sigma),
        t = 1 / (1 + 0.3275911 * Math.abs(z)),
        a1 = 0.254829592,
        a2 = -0.284496736,
        a3 = 1.421413741,
        a4 = -1.453152027,
        a5 = 1.061405429,
        erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z),
        sign = 1;
    if (z < 0) {
        sign = -1;
    }
    return (1 / 2) * (1 + sign * erf);
}
function remplit_aire_entre_G_et_D(cnv, valG, valD, m, e, couleur) {

    var ordonnee, ordg, ordd, // ordonnées en pixels dans le canvas         
        texte, contextCanvas,
        gauche, // position x de gauche en pixels dans le canvas
        droite, // idem à droite
        position_texte_x, position_texte_y, position_val_g_x, position_val_g_y, position_val_d_x, position_val_d_y, // coordonnées pour afficher le texte
        i,
        yg, yd, proportion, textG, textD;


    if (cnv.getContext) { // la fonction getContext() renvoie True si canvas accessible 
        contextCanvas = cnv.getContext("2d");
        contextCanvas.strokeStyle = couleur;
        contextCanvas.font = "20px Comic Sans MS";

        contextCanvas.beginPath();
        gauche = (nb_sigma_largeur / 2 + (valG - m) / e) * cnv.width / nb_sigma_largeur; // mise à l'échelle en pixels à partir du nombre de sigma
        droite = (nb_sigma_largeur / 2 + (valD - m) / e) * cnv.width / nb_sigma_largeur;

        ordg = cnv.height - cnv.height * pdf((gauche - milieu) * nb_sigma_largeur / cnv.width, 0, 1) - 50; // calcul de l'ordonnée du point à gauche sur la gaussienne
        ordd = cnv.height - cnv.height * pdf((droite - milieu) * nb_sigma_largeur / cnv.width, 0, 1) - 50;

        for (i = gauche; i < droite; i++) { // boucle sur les pixels à colorier

            contextCanvas.moveTo(i, cnv.height - 50);
            ordonnee = cnv.height - cnv.height * pdf((i - milieu) * nb_sigma_largeur / cnv.width, 0, 1) - 50;
            contextCanvas.lineTo(i, ordonnee);

        }
        contextCanvas.closePath();
        contextCanvas.stroke();
        contextCanvas.fillStyle = "rgb(0,0,0)";


        yg = normalcdf(m, e, valG);
        yd = normalcdf(m, e, valD);
        proportion = 100 * (yd - yg);

        texte = proportion.toFixed(3) + "%"; // arrondi à 3 décimales
        if (proportion < 0.0001) {
            texte = "<0.0001%";
        }
        if (proportion > 99.999) {
            texte = ">99.999%";
        }

        position_val_g_x = gauche - 30; // calcul de l'abscisse du texte gauche 
        position_val_g_y = cnv.height - cnv.height * pdf((nb_sigma_largeur * (largeur * (gauche - 30) / cnv.width - milieu) / cnv.width), 0, 1) - 110;

        position_val_d_x = droite + 30; // calcul de l'abscisse du texte droit
        position_val_d_y = cnv.height - cnv.height * pdf((nb_sigma_largeur * (largeur * (droite + 30) / cnv.width - milieu) / cnv.width), 0, 1) - 110;

        textG = valG.toFixed(2); // arrondi à 2 décimales des valeurs
        textD = valD.toFixed(2);

        if (position_val_g_x < contextCanvas.measureText(textG).width) { // gère si le texte déborde du canvas à gauche
            position_val_g_x = contextCanvas.measureText(textG).width / 2 + 10;

            if (position_val_d_x - contextCanvas.measureText(textD).width / 2 < position_val_g_x + contextCanvas.measureText(textG).width / 2) { //gère l'overlap du texte droit sur le texte gauche
                position_val_d_x = position_val_g_x + contextCanvas.measureText(textG).width / 2 + contextCanvas.measureText(textD).width / 2 + 10;
            }
        }


        if (position_val_d_x + contextCanvas.measureText(textD).width > cnv.width) { // gère si le texte déborde du canvas à droite
            position_val_d_x = cnv.width - contextCanvas.measureText(textD).width / 2 - 10;

            if (position_val_g_x + contextCanvas.measureText(textG).width / 2 > position_val_d_x - contextCanvas.measureText(textD).width / 2) { //gère l'overlap du texte gauche sur le texte droit
                position_val_g_x = position_val_d_x - contextCanvas.measureText(textG).width / 2 - contextCanvas.measureText(textD).width / 2 - 10;
            }

        }

        contextCanvas.fillText(valG.toFixed(2), position_val_g_x, position_val_g_y); // affiche les 2 valeurs à gauche et à droite
        contextCanvas.fillText(valD.toFixed(2), position_val_d_x, position_val_d_y);

        position_texte_x = (gauche + droite) / 2; // calcul de la position du pourcentage central

        if (position_texte_x < contextCanvas.measureText(texte).width) { // gère s'il y a un débordement à gauche 
            texte = "<-" + texte;
            position_texte_x = contextCanvas.measureText(texte).width / 2 + 10;
        }

        if (position_texte_x + contextCanvas.measureText(texte).width > cnv.width) { // gère s'il y a un débordement à droite 
            texte = texte + "->";
            position_texte_x = cnv.width - contextCanvas.measureText(texte).width / 2 - 10;
        }
        contextCanvas.textAlign = "center";

        contextCanvas.fillText(texte, position_texte_x, cnv.height / (nb_sigma_largeur / 2));
        contextCanvas.fillStyle = couleur;
        contextCanvas.beginPath();
        contextCanvas.moveTo(gauche, ordg);
        contextCanvas.lineTo(position_val_g_x, position_val_g_y + 4);
        contextCanvas.moveTo(droite, ordd);
        contextCanvas.lineTo(position_val_d_x, position_val_d_y + 4);
        contextCanvas.closePath();
        contextCanvas.stroke();

        contextCanvas.strokeStyle = "rgb(0,0,0)";
        contextCanvas.rect(gauche, 130, droite - gauche, 10);

        contextCanvas.fillRect(gauche, 130, (droite - gauche), 10); // affiche la barre de pourcentage
        contextCanvas.stroke();
    } else {
        alert("pas acces context");
    }

}
function trace_echelle_sigma(canvas) { // trace l'échelle en niveaux de sigmas sur l'écran échelle  de sigma

    var x, i, hauteur, contextCanvas;
    if (canvas.getContext) { // la fonction getContext() renvoie True si canvas accessible 
        contextCanvas = canvas.getContext("2d");
        contextCanvas.font = "20px Comic Sans MS";
        contextCanvas.fillStyle = "#505050";

        hauteur = canvas.height;

        for (i = -4; i < 5; i++) {
            x = (i + nb_sigma_largeur / 2) * largeur / nb_sigma_largeur;

            contextCanvas.fillText(i, x, hauteur - 20);
            contextCanvas.fillRect(x - 1, hauteur - 50, 2, 10);

        }

    } else {
        alert("pas acces context");
    }
}
// --------------------------------------------------
//               Fonctions de gestion de l'interface graphique
// --------------------------------------------------    
function desactive_onglets() { // appelé quand on change d'onglet pour désactiver la surbrillance des onglets actifs
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
}
function redessine() { // fonctions appelées pour redessiner les éléments de l'écran échelle de sigma
    var canvas = document.getElementById("CanvasSigma");
    trace_gaussienne(canvas);
    remplit_aire_entre_G_et_D(canvas, valueG, valueD, 0, 1, "rgba(255,0,0,0.5)");
    trace_droite(canvas, valueG, 0, 1);
    trace_droite(canvas, valueD, 0, 1);
    trace_echelle_sigma(canvas);
}
function redessine_libre() { // fonctions appelées pour redessiner les éléments de l'écran échelle libre
    var canvas_libre = document.getElementById("CanvasLibre");
    trace_gaussienne(canvas_libre);
    remplit_aire_entre_G_et_D(canvas_libre, valueG_libre, valueD_libre, moyenne, ecart_type, "rgba(0,255,0,0.25)");
    trace_droite(canvas_libre, valueG_libre, moyenne, ecart_type);
    trace_droite(canvas_libre, valueD_libre, moyenne, ecart_type);
}
function open_echelle_sigma(evt) { // appelé pour l'activation de l'écran échelle de sigma

    desactive_onglets();

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById("zone_echelle_sigma").style.display = "block";
    evt.currentTarget.className += " active";
    redessine();

}
function open_echelle_libre(evt) { // appelé pour l'activation de l'écran échelle libre
    desactive_onglets();

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById("zone_echelle_libre").style.display = "block";
    evt.currentTarget.className += " active";
    redessine_libre();
}
function open_ic(evt) { // appelé pour l'activation de l'écran intervalle de confiance
    desactive_onglets();

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById("zone_ic").style.display = "block";
    evt.currentTarget.className += " active";
}
// --------------------------------------------------
//               Fonctions statistiques de calcul des lois et des distributions
// --------------------------------------------------    
function gammaln(x) { // calcule la fonction log gamma
    var xx, y, tmp, j = 0,
        cof = [76.18009172947146, -86.50532032941677, 24.01409824083091,
				-1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5],
        ser = 1.000000000190015;

    tmp = (y = xx = x) + 5.5;
    tmp -= (xx + 0.5) * Math.log(tmp);
    for (j = 0; j < 6; j++) {
        ser += cof[j] / ++y;
    }
    return Math.log(2.5066282746310005 * ser / xx) - tmp;
}
function betacf(x, a, b) { // calcule la fonction de répartition d'une loi beta
    var m2, aa, c, d, del, h, qab, qam, qap,
        fpmin = 1e-30,
        m = 1;
    // These q's will be used in factors that occur in the coefficients
    qab = a + b;
    qap = a + 1;
    qam = a - 1;
    c = 1;
    d = 1 - qab * x / qap;
    if (Math.abs(d) < fpmin) {
        d = fpmin;
    }
    d = 1 / d;
    h = d;
    for (m = 1; m <= 100; m = m + 1) {
        m2 = 2 * m;
        aa = m * (b - m) * x / ((qam + m2) * (a + m2));
        // One step (the even one) of the recurrence
        d = 1 + aa * d;
        if (Math.abs(d) < fpmin) {
            d = fpmin;
        }
        c = 1 + aa / c;
        if (Math.abs(c) < fpmin) {
            c = fpmin;
        }
        d = 1 / d;
        h *= d * c;
        aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
        // Next step of the recurrence (the odd one)
        d = 1 + aa * d;
        if (Math.abs(d) < fpmin) {
            d = fpmin;
        }
        c = 1 + aa / c;
        if (Math.abs(c) < fpmin) {
            c = fpmin;
        }
        d = 1 / d;
        del = d * c;
        h *= del;
        if (Math.abs(del - 1.0) < 3e-7) {
            break;
        }
    }
    return h;
}
function ibeta(x, a, b) { // calcule la fonction inverse de beta
    // Factors in front of the continued fraction.
    var bt;
    bt = (x === 0 || x === 1) ? 0 : Math.exp(gammaln(a + b) - gammaln(a) -
        gammaln(b) + a * Math.log(x) + b *
        Math.log(1 - x));
    if (x < 0 || x > 1) {
        return false;
    }
    if (x < (a + 1) / (a + b + 2)) {
        // Use continued fraction directly.
        return bt * betacf(x, a, b) / a;
    }
    // else use continued fraction after making the symmetry transformation.
    return 1 - bt * betacf(1 - x, b, a) / b;
}
function ibetainv(p, a, b) { // calcule la fonction beta inverse
    var lna, lnb, pp, t, u, err, x, al, h, w, afac,
        EPS = 1e-8,
        a1 = a - 1,
        b1 = b - 1,
        j = 0;
    if (p <= 0) {
        return 0;
    }
    if (p >= 1) {
        return 1;
    }
    if (a >= 1 && b >= 1) {
        pp = (p < 0.5) ? p : 1 - p;
        t = Math.sqrt(-2 * Math.log(pp));
        x = (2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t;
        if (p < 0.5) {
            x = -x;
        }
        al = (x * x - 3) / 6;
        h = 2 / (1 / (2 * a - 1) + 1 / (2 * b - 1));
        w = (x * Math.sqrt(al + h) / h) - (1 / (2 * b - 1) - 1 / (2 * a - 1)) * (al + 5 / 6 - 2 / (3 * h));
        x = a / (a + b * Math.exp(2 * w));
    } else {
        lna = Math.log(a / (a + b));
        lnb = Math.log(b / (a + b));
        t = Math.exp(a * lna) / a;
        u = Math.exp(b * lnb) / b;
        w = t + u;
        if (p < t / w) {
            x = Math.pow(a * w * p, 1 / a);
        } else {
            x = 1 - Math.pow(b * w * (1 - p), 1 / b);
        }
    }
    afac = -gammaln(a) - gammaln(b) + gammaln(a + b);
    for (j = 0; j < 10; j++) {
        if (x === 0 || x === 1) {
            return x;
        }
        err = ibeta(x, a, b) - p;
        t = Math.exp(a1 * Math.log(x) + b1 * Math.log(1 - x) + afac);
        u = err / t;
        x -= (t = u / (1 - 0.5 * Math.min(1, u * (a1 / x - b1 / (1 - x)))));
        if (x <= 0) {
            x = 0.5 * (x + t);
        }
        if (x >= 1) {
            x = 0.5 * (x + t + 1);
        }
        if (Math.abs(t) < EPS * x && j > 0) {
            break;
        }
    }
    return x;
}
function tinv(p, dof) { // calcule la fonction inverse de la loi de student
    var x = ibetainv(2 * Math.min(p, 1 - p), 0.5 * dof, 0.5);
    x = Math.sqrt(dof * (1 - x) / x);
    return (p > 0) ? x : -x;

}
function calcule_IC(language) {
    var t, vinf, vsup;

    t = tinv(0.025, nbIC - 1);
    vinf = moyenneIC - t * Math.sqrt(ecart_typeIC * ecart_typeIC / nbIC);
    vsup = moyenneIC + t * Math.sqrt(ecart_typeIC * ecart_typeIC / nbIC);
    if (nbIC > 1) {
        return ('[' + vinf.toFixed(3) + ';' + vsup.toFixed(3) + ']');
    }
    if (language === 'en') {
        return ('Not possible ');
    } else {
        return ('Impossible');
    }
}
function gammafn(x) { // calcule la fonction gamma
    var i, z, yi, res, sum, ysq,
        p = [-1.716185138865495, 24.76565080557592, -379.80425647094563,
				629.3311553128184, 866.9662027904133, -31451.272968848367,
				-36144.413418691176, 66456.14382024054
			],
        q = [-30.8402300119739, 315.35062697960416, -1015.1563674902192,
				-3107.771671572311, 22538.118420980151, 4755.8462775278811,
				-134659.9598649693, -115132.2596755535
			],
        fact = false,
        n = 0,
        xden = 0,
        xnum = 0,
        y = x;
    if (y <= 0) {
        res = y % 1 + 3.6e-16;
        if (res) {
            fact = (!(y && 1) ? 1 : -1) * Math.PI / Math.sin(Math.PI * res);
            y = 1 - y;
        } else {
            return Infinity;
        }
    }
    yi = y;
    if (y < 1) {
        y = y + 1;
        z = y;
    } else {
        z = (y -= n = (y || 0) - 1) - 1;
    }
    for (i = 0; i < 8; ++i) {
        xnum = (xnum + p[i]) * z;
        xden = xden * z + q[i];
    }
    res = xnum / xden + 1;
    if (yi < y) {
        res /= yi;
    } else if (yi > y) {
        for (i = 0; i < n; ++i) {
            res *= y;
            y++;
        }
    }
    if (fact) {
        res = fact / res;
    }
    return res;
}
function valide_valeur(val, min, max) {
    if (val < min || val > max) {
        /*global alert*/
        alert("Cette valeur n'est pas autorisée pour ce champ");
        return false;
    }
    return true;
}
// --------------------------------------------------
//               Gestionnaires d'événements
// --------------------------------------------------    
function creationEvent() {
    var Language;
//    Language = recupCookieLangue();
//    langue(Language);
    
    document.getElementById("valeurG").addEventListener('change', function () { // fonction de callback appelée quand on change la valeur de sigma de gauche
        var tmp = valueG;
        if (!valide_valeur(this.value, -1000, 1000)) {
            this.value = valueG;
            return;
        }
        valueG = parseFloat(this.value);
        if (valueG >= valueD) {
            valueG = tmp;
            this.value = tmp;
            return;
        }
        document.getElementById('dblslider').noUiSlider.set([this.value, null]);
        redessine();

    });

    document.getElementById("valeurD").addEventListener('change', function () { // fonction de callback appelée quand on change la valeur de sigma de droite
        var tmp = valueD;

        if (!valide_valeur(this.value, -1000, 1000)) {
            this.value = valueD;
            return;
        }

        valueD = parseFloat(this.value);
        if (valueD <= valueG) {
            valueD = tmp;
            this.value = tmp;
            return;
        }
        document.getElementById('dblslider').noUiSlider.set([null, this.value]);
        redessine();
    });

    document.getElementById("valeurG").addEventListener('blur', function () { // data binding entre le champ de saisie de gauche et valueG. fonction appelée quand le champ perd le focus 

        var tmp = valueG;
        valueG = parseFloat(this.value);
        if (valueG >= valueD) {
            valueG = tmp;
            return;
        }
        document.getElementById('dblslider').noUiSlider.set([this.value, null]);
        redessine();

    });

    document.getElementById("valeurD").addEventListener('blur', function () { // data binding entre le champ de saisie de gauche et valueG. fonction appelée quand le champ perd le focus 

        var tmp = valueD;
        valueD = parseFloat(this.value);
        if (valueD <= valueG) {
            valueD = tmp;
            this.value = tmp;
            return;
        }
        document.getElementById('dblslider').noUiSlider.set([null, this.value]);
        redessine();
    });

    document.getElementById("moyenne").addEventListener('change', function () { // fonction de callback appelée quand on change la valeur de moyenne change dans echelle libre

        var nouvelle_moyenne, nouvelle_limite_G, nouvelle_limite_D;

        if (!valide_valeur(this.value, -100000, 100000)) {
            this.value = moyenne;
            return;
        }

        nouvelle_moyenne = parseFloat(this.value);
        valueG_libre = valueG_libre + nouvelle_moyenne - moyenne;
        valueD_libre = valueD_libre + nouvelle_moyenne - moyenne;

        nouvelle_limite_G = nouvelle_moyenne - ecart_type * nb_sigma_largeur / 2;
        nouvelle_limite_D = nouvelle_moyenne + ecart_type * nb_sigma_largeur / 2;

        document.getElementById('dblsliderlibre').noUiSlider.updateOptions({
            range: {
                'min': nouvelle_limite_G,
                'max': nouvelle_limite_D
            }
        });
        document.getElementById('dblsliderlibre').noUiSlider.set([valueG_libre, valueD_libre]);

        moyenne = nouvelle_moyenne;

        redessine_libre();
    });

    document.getElementById("ecart_type").addEventListener('change', function () { // fonction de callback appelée quand on change la valeur de moyenne change dans echelle libre
        var nouvel_ecart, nouvelle_limite_G, nouvelle_limite_D;

        if (!valide_valeur(this.value, 0, 100000)) {
            this.value = ecart_type;
            return;
        }

        nouvel_ecart = parseFloat(this.value);
        // limiter les valeurs de l'écart-type à 0.01 minimum
        if (nouvel_ecart < 0.01) {
            nouvel_ecart = 0.01;
            this.value = 0.01;
            /*textEcart_type =toString(ecart_type);
            return;*/
        }
        valueG_libre = moyenne + (valueG_libre - moyenne) / ecart_type * nouvel_ecart;
        valueD_libre = moyenne + (valueD_libre - moyenne) / ecart_type * nouvel_ecart;

        nouvelle_limite_G = moyenne - nouvel_ecart * nb_sigma_largeur / 2;
        nouvelle_limite_D = moyenne + nouvel_ecart * nb_sigma_largeur / 2;

        document.getElementById('dblsliderlibre').noUiSlider.updateOptions({
            range: {
                'min': nouvelle_limite_G,
                'max': nouvelle_limite_D
            }
        });
        document.getElementById('dblsliderlibre').noUiSlider.set([valueG_libre, valueD_libre]);
        ecart_type = nouvel_ecart;

        redessine_libre();
    });

    document.getElementById("moyenne_ic").addEventListener('change', function () { // fonction de callback appelée quand la valeur de moyenne change dans IC
        var str;
        if (!valide_valeur(this.value, -100000, 100000)) {
            this.value = moyenneIC;
            return;
        }
        moyenneIC = parseFloat(this.value);
        if (Language === 'en') {
            str = "The confidence interval of the mean at 95% is : " + calcule_IC(Language);
        } else {
            str = "L'intervalle de confiance à 95% de la moyenne est : " + calcule_IC(Language);
        }

        document.getElementById('resultat_ic').innerHTML = str;
    });

    document.getElementById("ecart_type_ic").addEventListener('change', function () { // fonction de callback appelée quand la valeur de l'écart-type change dans echelle libre
        var str;
        if (!valide_valeur(this.value, 0, 100000)) {
            this.value = ecart_typeIC;
            return;
        }
        ecart_typeIC = parseFloat(this.value);
        if (Language === 'en') {
            str = "The confidence interval of the mean at 95% is : " + calcule_IC(Language);
        } else {
            str = "L'intervalle de confiance à 95% de la moyenne est : " + calcule_IC(Language);
        }

        document.getElementById('resultat_ic').innerHTML = str;
    });

    document.getElementById("nb_ic").addEventListener('change', function () { // fonction de callback appelée quand la valeur de nb echantillons change dans IC
        var str;
        if (!valide_valeur(this.value, 2, 100000)) {
            this.value = nbIC;
            return;
        }

        nbIC = parseInt(this.value, 10);
        if (Language === 'en') {
            str = "The confidence interval of the mean at 95% is : " + calcule_IC(Language);
        } else {
            str = "L'intervalle de confiance à 95% de la moyenne est : " + calcule_IC(Language);
        }
        this.value = nbIC; // permet de tronquer si on n'avait pas rentré un nombre entier
        document.getElementById('resultat_ic').innerHTML = str;
    });
}
function creationOnSlider() {
    document.getElementById('dblsliderlibre').noUiSlider.on('slide', function (values, handle) { //fonction appelée quand on relâche le slider de l'échelle libre
        var value = values[handle];

        if (handle) {
            valueD_libre = parseFloat(value);

            redessine_libre();
        } else {
            valueG_libre = parseFloat(value);
            redessine_libre();
        }
    });

    document.getElementById('dblslider').noUiSlider.on('slide', function (values, handle) { //fonction appelée quand on relâche le slider de l'échelle de sigma

        var value = values[handle];


        if (handle) {
            valueD = parseFloat(value);
            document.getElementById("valeurD").value = value; //(value-milieu)*nb_sigma_largeur/milieu+" \u03C3";
            redessine();

        } else {
            valueG = parseFloat(value);
            document.getElementById("valeurG").value = value; //(value-milieu)*nb_sigma_largeur/milieu+" \u03C3";
            document.getElementById("valeurG").setAttribute("left", "300px");


            redessine();
        }

    });
}
//window.onload=function()    // fonction appelée au chargement de la page
function start() {
    var Language;

    document.getElementById("valeurG").value = -2; //initialisation des graphiques et curseurs
    document.getElementById("valeurD").value = 2;

    valueG = -2;
    valueD = 2;
    valueG_libre = 8;
    valueD_libre = 12;

    document.getElementById("moyenne_ic").value = moyenneIC;
    document.getElementById("ecart_type_ic").value = ecart_typeIC;
    document.getElementById("nb_ic").value = nbIC;


    document.getElementById("moyenne").value = moyenne;
    document.getElementById("ecart_type").value = ecart_type;
    document.getElementById("onglet_par_defaut").click();

    /*global recupCookieLangue*/
    Language = recupCookieLangue();
    /*global langue*/
    langue(Language);

    if (Language === 'en') {
        document.getElementById('resultat_ic').innerHTML = "The confidence interval of the mean at 95% is : " + calcule_IC(Language);
    } else {
        document.getElementById('resultat_ic').innerHTML = "L'intervalle de confiance à 95% de la moyenne est : " + calcule_IC(Language);
    }

    redessine(); // update du canvas de l'échelle de sigma
    redessine_libre(); // update du canvas de l'échelle libre
}
//window.onresize=function()  // update du canvas de l'échelle de sigma
function resize() {
    redessine();
    redessine_libre();
}