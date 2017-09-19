"use strict";

var varIntervalsetDisplay;
function recupTableauRetR(nope, npie, nrep) {

    var arrayLignes, arrayCells, longueur, boucle,
        tableauValeur,
        t, ope, pie, rep,
        i, j,
        div_inputNom, label;

    t = [nope];

    for (i = 0; i < nope; i = i + 1) {
        t[i] = [npie];
        for (j = 0; j < npie; j = j + 1) {
            t[i][j] = [nrep];
        }
    }
    div_inputNom = document.getElementById("div_inputNom");
    label = div_inputNom.getElementsByTagName("label");



    // Création du tableau avec valeur
    tableauValeur = document.getElementById('div_tableau');
    arrayLignes = tableauValeur.getElementsByTagName('Table')[0].rows;
    longueur = arrayLignes.length - 1;
    for (boucle = 1; boucle <= longueur; boucle = boucle + 1) {
        arrayCells = arrayLignes[boucle].cells;

        for (i = 0; i < label.length; i = i + 1) {
            if (arrayCells[1].innerHTML === label[i].innerHTML) {
                ope = i;
                i = label.length;
            }
        }
        pie = arrayCells[2].innerHTML - 1;
        rep = arrayCells[3].innerHTML - 1;
        if (arrayCells[4] !== undefined) {
            t[ope][pie][rep] = parseFloat(arrayCells[4].innerHTML);
        }
    }
    return t;
}
function ajoutCellule(row, rowspan, colspan, texte, classname) {
    var cell;
    cell = document.createElement("td");
    cell.rowSpan = rowspan;
    cell.colSpan = colspan;
    if (classname !== "") {
        cell.className = classname;
    }
    texte = document.createTextNode(texte);
    cell.appendChild(texte);
    row.appendChild(cell);

    return row;
}
function majResultatRetR1(t, nope, npie, nrep, moyenneP_O, etendueP_O, moyenneP, moyenneR_O, moyenneO, moyenneEtendueO, moyenneMoyenneP, etendueMoyenneP, moyennemoyenneEtendueO, etenduemoyenneO, UCL) {

    /*global format*/
    
    var tableau, table, tablehead, row, cell, texte, tablebody, caption,
        i, j, k, l, MoyenneH, MoyenneV, EtendueMax, EtendueMin,
        tabNom = [],
        label, div_inputNom, numTableau;

    numTableau = 1;
    
    div_inputNom = document.getElementById("div_inputNom");
    label = div_inputNom.getElementsByTagName("label");
    for (i = 0; i < label.length; i = i + 1) {
        tabNom.push(label[i].innerHTML);
    }
    document.getElementById('div_tableau_RetR' + numTableau).innerHTML = ""; // on efface le tableau
    tableau = document.getElementById('div_tableau_RetR' + numTableau);
    // création des éléments <table> et <tbody>
    table = document.createElement("table");
    table.id = "monTableau_RetR" + numTableau;
    table.className = "clsTableauRetR";
    caption = document.createElement("caption");
    //caption.innerHTML = "Tableau RetR" + numTableau;
    table.appendChild(caption);

    tablehead = document.createElement("thead");
    tablehead.className = "clsTableauRetR_Head";
    //Opérateurs,Esssais,Pièces,Moyenne    
    row = document.createElement("tr");
    row = ajoutCellule(row, 2, 1, "opé");
    row = ajoutCellule(row, 2, 1, "Essais");
    row = ajoutCellule(row, 1, npie, "Pièces");
    row = ajoutCellule(row, 2, 1, "Moy.");
    tablehead.appendChild(row);
    //NumPièces  
    row = document.createElement("tr");

    for (i = 1; i <= npie; i = i + 1) {
        row = ajoutCellule(row, 1, 1, i);
    }
    tablehead.appendChild(row);
    table.appendChild(tablehead);

    tablebody = document.createElement("tbody");
    for (k = 0; k < nope; k = k + 1) {
        //Par opérateurs 
        row = document.createElement("tr");

        row = ajoutCellule(row, Number(nrep) + 2, 1, tabNom[k], "clsTableauRetR_Operateur");


        for (j = 0; j < nrep + 2; j = j + 1) {
            if (j > 0) {
                row = document.createElement("tr");
            }
            switch (j) {
            case Number(nrep):
                texte = "Moyenne";
                break;
            case Number(nrep) + 1:
                texte = "Etendue";
                break;
            default:
                texte = j + 1;
                break;
            }
            row = ajoutCellule(row, 1, 1, texte);

            for (i = 0; i < npie; i = i + 1) {
                cell = document.createElement("td");
                switch (j) {
                case nrep:
                    texte = format(moyenneP_O[i][k], 3); // Essai1
                    break;
                case nrep + 1:
                    texte = format(etendueP_O[i][k], 3); // Essai1
                    break;
                default:
                    texte = format(t[k][i][j], 3); // Mesure Essai1 Op1
                    break;
                }
                row = ajoutCellule(row, 1, 1, texte);
            }
            cell = document.createElement("td");
            switch (j) {
            case nrep:
                texte = format(moyenneO[k], 3); // Essai1
                break;
            case nrep + 1:
                texte = format(moyenneEtendueO[k], 3); // Essai1
                break;
            default:
                texte = format(moyenneR_O[j][k], 3); // Mesure Essai1 Op1
                break;
            }
            row = ajoutCellule(row, 1, 1, texte);
            tablebody.appendChild(row);
        }
    }
    row = document.createElement("tr");

//    row = ajoutCellule(row, 2, 1, "");
//    row = ajoutCellule(row, 2, 1, "Moyenne des pièces");
//
//    for (i = 0; i < npie; i = i + 1) {
//        row = ajoutCellule(row, 2, 1, format(moyenneP[i], 3));
//    }
//    row = ajoutCellule(row, 1, 1, format(moyenneMoyenneP, 3));
//    tablebody.appendChild(row);
//
//    row = document.createElement("tr");
//    row = ajoutCellule(row, 1, 1, format(etendueMoyenneP, 3));
//    tablebody.appendChild(row);

    row = ajoutCellule(row, 1, 2, "Moyenne des pièces");
    for (i = 0; i < npie; i = i + 1) {
        row = ajoutCellule(row, 1, 1, format(moyenneP[i], 3));
    }
    row = ajoutCellule(row, 1, 1, format(moyenneMoyenneP, 3));
    tablebody.appendChild(row);

    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 2 + npie, "Etendue des moyennes des pièces");
    row = ajoutCellule(row, 1, 1, format(etendueMoyenneP, 3));
    tablebody.appendChild(row);

    
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, npie + 2, "Moy des Moy des étendues");
    row = ajoutCellule(row, 1, 1, format(moyennemoyenneEtendueO, 3));
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, npie + 2, "Etendue des moy opérateurs");
    row = ajoutCellule(row, 1, 1, format(etenduemoyenneO, 3));
    tablebody.appendChild(row);

    row = document.createElement("tr");
    row = ajoutCellule(row, 1, npie + 2, "LSCR (UCLR)");
    row = ajoutCellule(row, 1, 1, format(UCL, 3));
    tablebody.appendChild(row);


    table.appendChild(tablebody);
    tableau.appendChild(table);

}
function formatDate() {
    var date, jour, mois, dateRetour;
    
    date = new Date();
    
    mois = date.getMonth() + 1;
    if (mois < 10) {
        mois = "0" + mois;
    }
    jour = date.getDate();
    if (jour < 10) {
        jour = "0" + jour;
    }
    dateRetour = jour + "/" + mois + "/" + date.getFullYear();

    return dateRetour;
}
function classCouleur(Colonne, value) {
    var classe;
    
    switch (Colonne) {
    case "Variation":
        if (value <= 10) {
            classe = "clsTableauRetR_Vert";
        } else if (value <= 20) {
            classe = "clsTableauRetR_Jaune";
        } else if (value <= 30) {
            classe = "clsTableauRetR_Orange";
        } else {
            classe = "clsTableauRetR_Rouge";
        }
        break;
    case "Tolerance":
        if (value <= 10) {
            classe = "clsTableauRetR_Vert";
        } else if (value <= 20) {
            classe = "clsTableauRetR_Jaune";
        } else if (value <= 30) {
            classe = "clsTableauRetR_Orange";
        } else {
            classe = "clsTableauRetR_Rouge";
        }
        break;
    case "Contribution":
        if (value <= 1) {
            classe = "clsTableauRetR_Vert";
        } else if (value <= 4) {
            classe = "clsTableauRetR_Jaune";
        } else if (value < 10) {
            classe = "clsTableauRetR_Orange";
        } else {
            classe = "clsTableauRetR_Rouge";
        }
        break;
    case "NdC":
        if (value < 5) {
            classe = "clsTableauRetR_Rouge";
        } else if (value <= 10) {
            classe = "clsTableauRetR_Jaune";
        } else {
            classe = "clsTableauRetR_Vert";
        }
        break;
    case "Interaction":
        if (value === "Non") {
            classe = "clsTableauRetR_Vert";
        } else {
            classe = "clsTableauRetR_Rouge";
        }
        break;
    default:
        classe = "";
        break;
    }
    return classe;
    
}
function majResultatRetR2(etendueMoyenneP, moyennemoyenneEtendueO, etenduemoyenneO, ev, av, grr, pv, tv, ndc) {
    //Rapport R et R
    var tableau, table, tablehead, row, cell, texte, tablebody, caption, numTableau,
        value;

    numTableau = 2;

    document.getElementById('div_tableau_RetR' + numTableau).innerHTML = ""; // on efface le tableau
    tableau = document.getElementById('div_tableau_RetR' + numTableau);
    // création des éléments <table> et <tbody>
    table = document.createElement("table");
    table.id = "monTableau_RetR" + numTableau;
    table.className = "clsTableauRetR";
    caption = document.createElement("caption");
    //caption.innerHTML = "Tableau RetR" + numTableau;
    table.appendChild(caption);

    tablehead = document.createElement("thead");
    tablehead.className = "clsTableauRetR2_Head";
    //Opérateurs,Esssais,Pièces,Moyenne    
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 5, document.forms.frmTitre.txtTitre.value);
    tablehead.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 5, "Date : " + formatDate());
    tablehead.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Composants de la variation");
    row = ajoutCellule(row, 1, 1, "Sigma estimé");
    row = ajoutCellule(row, 1, 1, "6 Sigma");
    row = ajoutCellule(row, 1, 1, "% Total Variation");
    row = ajoutCellule(row, 1, 1, "% Contribution");
    tablehead.appendChild(row);
    table.appendChild(tablehead);

    tablebody = document.createElement("tbody");
    //Par opérateurs 
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Répétabilité - Variation de l'équipement (EV)");
    /*global format*/
    row = ajoutCellule(row, 1, 1, format(ev, 2));
    row = ajoutCellule(row, 1, 1, format(6 * ev, 2));
    value = ev / tv * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
    value = ev * ev / (tv * tv) * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Reproductibilité - Variation de l'opérateur (AV)");
    row = ajoutCellule(row, 1, 1, format(av, 2));
    row = ajoutCellule(row, 1, 1, format(6 * av, 2));
    value = av / tv * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
    value = av * av / (tv * tv) * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Répétabilité et Reproductibilité (GRR)");
    row = ajoutCellule(row, 1, 1, format(grr, 2));
    row = ajoutCellule(row, 1, 1, format(6 * grr, 2));
    value = grr / tv * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("Variation", value));
    value = grr * grr / (tv * tv) * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("Contribution", value));
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Part variation (PV)");
    row = ajoutCellule(row, 1, 1, format(pv, 2));
    row = ajoutCellule(row, 1, 1, format(6 * pv, 2));
    value = pv / tv * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
    value = pv * pv / (tv * tv) * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Total Variation (TV)");
    row = ajoutCellule(row, 1, 1, format(tv, 2));
    row = ajoutCellule(row, 1, 1, format(6 * tv, 2));
    row = ajoutCellule(row, 1, 1, format(tv / tv * 100, 2) + "%");
    row = ajoutCellule(row, 1, 1, format(tv * tv / (tv * tv) * 100, 2) + "%");
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Nombre de catégories distinctes (Ndc)");
    row = ajoutCellule(row, 1, 1, format(ndc, 2), classCouleur("NdC", ndc));
    //row = ajoutCellule(row, 1, 1, format(Math.floor(ndc), 2));
    tablebody.appendChild(row);


    table.appendChild(tablebody);
    tableau.appendChild(table);

}
function majResultatRetR3(scOpe, scPie, scInt, scIns, scTot,
    dlOpe, dlPie, dlInt, dlIns, dlTot,
    mcOpe, mcPie, mcInt, mcIns,
    tfOpe, tfPie, tfInt, pOpe, pPie, pInt) {
    //table anova
    var tableau, table, tablehead, row, cell, texte, tablebody, caption, numTableau, pCouleur = ["", "", ""], pValue = ["", "", ""];

    pValue[0] = format(pOpe, 4);
    if (pOpe < 0.05) {
        pCouleur[0] = "clsTableauRetRpValue_Rouge";
        if (pOpe < 0.001) {
            pValue[0] = "<0.001";
        }
    }
    pValue[1] = format(pPie, 4);
    if (pPie < 0.05) {
        pCouleur[1] = "clsTableauRetRpValue_Rouge";
        if (pPie < 0.001) {
            pValue[1] = "<0.001";
        }
    }
    pValue[2] = format(pInt, 4);
    if (pInt < 0.05) {
        pCouleur[2] = "clsTableauRetRpValue_Rouge";
        if (pInt < 0.001) {
            pValue[2] = "<0.001";
        }
    }
    
    numTableau = 3;

    document.getElementById('div_tableau_RetR' + numTableau).innerHTML = ""; // on efface le tableau
    tableau = document.getElementById('div_tableau_RetR' + numTableau);
    // création des éléments <table> et <tbody>
    table = document.createElement("table");
    table.id = "monTableau_RetR" + numTableau;
    table.className = "clsTableauRetR";
    caption = document.createElement("caption");
    //caption.innerHTML = "Tableau RetR" + numTableau;
    table.appendChild(caption);

    tablehead = document.createElement("thead");
    tablehead.className = "clsTableauRetR2_Head";
    //Opérateurs,Esssais,Pièces,Moyenne    
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 6, "Table ANOVA");
    tablehead.appendChild(row);

    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Composants de la variation");
    row = ajoutCellule(row, 1, 1, "SC");
    row = ajoutCellule(row, 1, 1, "Deg Liberté");
    row = ajoutCellule(row, 1, 1, "Moy Carrés");
    row = ajoutCellule(row, 1, 1, "F de Fisher");
    row = ajoutCellule(row, 1, 1, "p.value");
    tablehead.appendChild(row);
    table.appendChild(tablehead);

    tablebody = document.createElement("tbody");
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Opérateurs");
    row = ajoutCellule(row, 1, 1, format(scOpe, 4));
    row = ajoutCellule(row, 1, 1, dlOpe);
    row = ajoutCellule(row, 1, 1, format(mcOpe, 4));
    row = ajoutCellule(row, 1, 1, format(tfOpe, 4));
    row = ajoutCellule(row, 1, 1, pValue[0],  pCouleur[0]);
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Pièces");
    row = ajoutCellule(row, 1, 1, format(scPie, 4));
    row = ajoutCellule(row, 1, 1, dlPie);
    row = ajoutCellule(row, 1, 1, format(mcPie, 4));
    row = ajoutCellule(row, 1, 1, format(tfPie, 4));
    row = ajoutCellule(row, 1, 1, pValue[1],  pCouleur[1]);
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Intéractions (Opérateurs, pièces)");
    if (pInt < 0.05) {
        row = ajoutCellule(row, 1, 1, format(scInt, 4));
        row = ajoutCellule(row, 1, 1, dlInt);
        row = ajoutCellule(row, 1, 1, format(mcInt, 4));
        row = ajoutCellule(row, 1, 1, format(tfInt, 4));
        row = ajoutCellule(row, 1, 1, pValue[2], pCouleur[2]);
    } else { //pas d'interaction
        row = ajoutCellule(row, 1, 5, "Non significatif, donc pas pris en compte dans le calcul");
    }
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Instrument (erreur)");
    row = ajoutCellule(row, 1, 1, format(scIns, 4));
    row = ajoutCellule(row, 1, 1, dlIns);
    row = ajoutCellule(row, 1, 1, format(mcIns, 4));
    row = ajoutCellule(row, 1, 1, "");
    row = ajoutCellule(row, 1, 1, "");
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Total");
    row = ajoutCellule(row, 1, 1, format(scTot, 4));
    row = ajoutCellule(row, 1, 1, dlTot);
    row = ajoutCellule(row, 1, 1, "");
    row = ajoutCellule(row, 1, 1, "");
    row = ajoutCellule(row, 1, 1, "");
    tablebody.appendChild(row);


    table.appendChild(tablebody);
    tableau.appendChild(table);

}
function majResultatRetR4(aVev, aVav, aVint, aVgrr, aVpv, aVtv, andc, lss, lsi, pInt) { //Raport Anova

    //table anova
    var tableau, table, tablehead, row, cell, texte, tablebody, caption, numTableau,
        value;

    numTableau = 4;

    document.getElementById('div_tableau_RetR' + numTableau).innerHTML = ""; // on efface le tableau
    tableau = document.getElementById('div_tableau_RetR' + numTableau);
    if (pInt < 0.05) {
        //avec interaction
        tableau.innerHTML = "Résultat R&amp;R méthode de l'ANOVA à effets aléatoires";
    } else {
        tableau.innerHTML = "Résultat R&amp;R méthode de l'ANOVA à effets fixes";
    }
    // création des éléments <table> et <tbody>
    table = document.createElement("table");
    table.id = "monTableau_RetR" + numTableau;
    table.className = "clsTableauRetR";
    //caption = document.createElement("caption");
    //caption.innerHTML = "Tableau RetR" + numTableau;
    //table.appendChild(caption);

    tablehead = document.createElement("thead");
    tablehead.className = "clsTableauRetR2_Head";
    //Opérateurs,Esssais,Pièces,Moyenne    
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 7, document.forms.frmTitre.txtTitre.value);
    tablehead.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 7, "Date : " + formatDate());
    tablehead.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Composants de la variation");
    row = ajoutCellule(row, 1, 1, "Variance");
    row = ajoutCellule(row, 1, 1, "Ecart-Type");
    row = ajoutCellule(row, 1, 1, "6sigma");
    row = ajoutCellule(row, 1, 1, "% Contribution");
    row = ajoutCellule(row, 1, 1, "% Total Variation");
    row = ajoutCellule(row, 1, 1, "% Tolérance");
    tablehead.appendChild(row);
    table.appendChild(tablehead);

    tablebody = document.createElement("tbody");
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Répétabilité - Variation de l'équipement (EV)");
    row = ajoutCellule(row, 1, 1, format(aVev, 4));
    row = ajoutCellule(row, 1, 1, format(Math.sqrt(aVev), 4));
    row = ajoutCellule(row, 1, 1, format(Math.sqrt(aVev) * 6, 6));
    value = aVev / aVtv * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
    value = Math.sqrt(aVev) / Math.sqrt(aVtv) * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
    value = 6 * Math.sqrt(aVev) / (lss - lsi) * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));

    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Reproductibilité - Variation de l'opérateur (AV)");
    row = ajoutCellule(row, 1, 1, format(aVav, 4));
    row = ajoutCellule(row, 1, 1, format(Math.sqrt(aVav), 4));
    row = ajoutCellule(row, 1, 1, format(Math.sqrt(aVav) * 6, 6));
    value = aVav / aVtv * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
    value = Math.sqrt(aVav) / Math.sqrt(aVtv) * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
    value = 6 * Math.sqrt(aVav) / (lss - lsi) * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));

    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Interaction (Opérateur x Pièce)");
    if (pInt < 0.05) {
        row = ajoutCellule(row, 1, 1, format(aVint, 4));
        row = ajoutCellule(row, 1, 1, format(Math.sqrt(aVint), 4));
        row = ajoutCellule(row, 1, 1, format(Math.sqrt(aVint) * 6, 6));
        value = aVint / aVtv * 100;
        row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
        value = Math.sqrt(aVint) / Math.sqrt(aVtv) * 100;
        row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
        value = 6 * Math.sqrt(aVint) / (lss - lsi) * 100;
        row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
    } else {
        row = ajoutCellule(row, 1, 6, "Non significatif, donc pas pris en compte dans le calcul");
    }
        
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Répétabilité et Reproductibilité (GRR)");
    row = ajoutCellule(row, 1, 1, format(aVgrr, 2));
    row = ajoutCellule(row, 1, 1, format(Math.sqrt(aVgrr), 2));
    row = ajoutCellule(row, 1, 1, format(Math.sqrt(aVgrr) * 6, 6));
    value = aVgrr / aVtv * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("Contribution", value));
    value = Math.sqrt(aVgrr) / Math.sqrt(aVtv) * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("Variation", value));
    value = 6 * Math.sqrt(aVgrr) / (lss - lsi) * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("Tolerance", value));
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Part variation (PV)");
    row = ajoutCellule(row, 1, 1, format(aVpv, 2));
    row = ajoutCellule(row, 1, 1, format(Math.sqrt(aVpv), 2));
    row = ajoutCellule(row, 1, 1, format(Math.sqrt(aVpv) * 6, 6));
    value = aVpv / aVtv * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
    value = Math.sqrt(aVpv) / Math.sqrt(aVtv) * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
    value = 6 * Math.sqrt(aVpv) / (lss - lsi) * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Total Variation (TV)");
    row = ajoutCellule(row, 1, 1, format(aVtv, 2));
    row = ajoutCellule(row, 1, 1, format(Math.sqrt(aVtv), 2));
    row = ajoutCellule(row, 1, 1, format(Math.sqrt(aVtv) * 6, 6));
    row = ajoutCellule(row, 1, 1, format(aVtv / aVtv * 100, 2) + "%");
    row = ajoutCellule(row, 1, 1, format(Math.sqrt(aVtv) / Math.sqrt(aVtv) * 100, 2) + "%");
    value = 6 * Math.sqrt(aVtv) / (lss - lsi) * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Nombre de catégories distinctes (Ndc)");
    row = ajoutCellule(row, 1, 1, format(andc, 2), classCouleur("NdC", andc));
//    row = ajoutCellule(row, 1, 1, format(Math.floor(andc), 2));
    tablebody.appendChild(row);
    table.appendChild(tablebody);
    tableau.appendChild(table);

}
function majResultatRetR5(aVev, aVav, aVint, aVgrr, andc, lss, lsi, pInt) { //Raport Anova

    //table anova
    var tableau, table, tablehead, row, cell, texte, tablebody, caption, numTableau,
        value;

    numTableau = 5;

    document.getElementById('div_tableau_RetR' + numTableau).innerHTML = ""; // on efface le tableau
    tableau = document.getElementById('div_tableau_RetR' + numTableau);
    // création des éléments <table> et <tbody>
    table = document.createElement("table");
    table.id = "monTableau_RetR" + numTableau;
    table.className = "clsTableauRetR";
    //caption = document.createElement("caption");
    //caption.innerHTML = "Tableau RetR" + numTableau;
    //table.appendChild(caption);

    tablehead = document.createElement("thead");
    tablehead.className = "clsTableauRetR2_Head";
    //Opérateurs,Esssais,Pièces,Moyenne    
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 7, document.forms.frmTitre.txtTitre.value);
    tablehead.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 7, "Date : " + formatDate());
    tablehead.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Source");
    row = ajoutCellule(row, 1, 1, "Ecart-Type");
    row = ajoutCellule(row, 1, 1, "Proportion");
    row = ajoutCellule(row, 1, 3, "          ", "clsTableauRetR_Gris");
    tablehead.appendChild(row);
    table.appendChild(tablehead);

    tablebody = document.createElement("tbody");
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Répétabilité - Variation de l'équipement (EV)");
    row = ajoutCellule(row, 1, 1, format(Math.sqrt(aVev), 4));
    value = aVev / (aVev + aVav + aVint) * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%");
    row = ajoutCellule(row, 1, 1, "          ", "clsTableauRetR_Gris");
    row = ajoutCellule(row, 1, 1, "NdC");
    row = ajoutCellule(row, 1, 1, andc, classCouleur("NdC", andc));

    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Reproductibilité - Variation de l'opérateur (AV)");
    row = ajoutCellule(row, 1, 1, format(Math.sqrt(aVav), 4));
    value = aVav / (aVev + aVav + aVint) * 100;
//    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%");
    row = ajoutCellule(row, 1, 1, "          ", "clsTableauRetR_Gris");
    row = ajoutCellule(row, 1, 1, "GRR%");
    value = 6 * Math.sqrt(aVgrr) / (lss - lsi) * 100;
    row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("Tolerance", value));

    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Interaction (Opérateur x Pièce)");
    if (pInt < 0.05) {
        row = ajoutCellule(row, 1, 1, format(Math.sqrt(aVint), 4));
        value = aVint / (aVev + aVav + aVint) * 100;
        row = ajoutCellule(row, 1, 1, format(value, 2) + "%", classCouleur("", value));
        row = ajoutCellule(row, 1, 1, "          ", "clsTableauRetR_Gris");
        row = ajoutCellule(row, 1, 1, "Interaction");
        row = ajoutCellule(row, 1, 1, "Oui", classCouleur("Interaction", "Oui"));
    } else {
        row = ajoutCellule(row, 1, 1, "");
        row = ajoutCellule(row, 1, 1, "");
        row = ajoutCellule(row, 1, 1, "          ", "clsTableauRetR_Gris");
        row = ajoutCellule(row, 1, 1, "Interaction");
        row = ajoutCellule(row, 1, 1, "Non", classCouleur("Interaction", "Non"));
    }
        
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Répétabilité et Reproductibilité (GRR)");
    row = ajoutCellule(row, 1, 1, format(Math.sqrt(aVgrr), 2));
    row = ajoutCellule(row, 1, 1, "100%");
    row = ajoutCellule(row, 1, 1, "          ", "clsTableauRetR_Gris");
    row = ajoutCellule(row, 1, 1, "Conclusion");
    value = 6 * Math.sqrt(aVgrr) / (lss - lsi) * 100;
    if (value < 30) {
        row = ajoutCellule(row, 1, 1, "Capable", classCouleur("Tolerance", value));
    } else {
        row = ajoutCellule(row, 1, 1, "Non capable", classCouleur("Tolerance", value));
    }
    tablebody.appendChild(row);

    table.appendChild(tablebody);
    tableau.appendChild(table);





}
function intervalsetDisplay() {
    clearInterval(varIntervalsetDisplay);
    /*global setDisplay*/
    setDisplay();
}
function logGamma(Z) {
    var S, LG;
    S = 1 + 76.18009173 / Z - 86.50532033 / (Z + 1) + 24.01409822 / (Z + 2) - 1.231739516 / (Z + 3) + 0.00120858003 / (Z + 4) - 0.00000536382 / (Z + 5);
    LG = (Z - 0.5) * Math.log(Z + 4.5) - (Z + 4.5) + Math.log(S * 2.50662827465);
	return LG;
}
function betinc(X, A, B) {
    var A0 = 0, B0 = 1, A1 = 1, B1 = 1, M9 = 0, A2 = 0, C9;
	while (Math.abs((A1 - A2) / A1) > 0.00001) {
		A2 = A1;
		C9 = -(A + M9) * (A + B + M9) * X / (A + 2 * M9) / (A + 2 * M9 + 1);
		A0 = A1 + C9 * A0;
		B0 = B1 + C9 * B0;
		M9 = M9 + 1;
		C9 = M9 * (B - M9) * X / (A + 2 * M9 - 1) / (A + 2 * M9);
		A1 = A0 + C9 * A1;
		B1 = B0 + C9 * B1;
		A0 = A0 / B1;
		B0 = B0 / B1;
		A1 = A1 / B1;
		B1 = 1;
	}
	return A1 / A;
}
function betacdf(Z, A, B) {
    var S, BT, Bcdf;
    S = A + B;
    BT = Math.exp(logGamma(S) - logGamma(B) - logGamma(A) + A * Math.log(Z) + B * Math.log(1 - Z));
    if (Z < (A + 1) / (S + 2)) {
        Bcdf = BT * betinc(Z, A, B);
    } else {
        Bcdf = 1 - BT * betinc(1 - Z, B, A);
    }
	return Bcdf;
}
function testF(dl1, dl2, x) {
    var Z, Fcdf;
    if (dl1 <= 0) {
        /*global console*/
		//alert("Numerator degrees of freedom must be positive");
        console.log("Numerator degrees of freedom must be positive");
	} else if (dl2 <= 0) {
		//alert("Denominator degrees of freedom must be positive");
        console.log("Denominator degrees of freedom must be positive");
	} else if (x <= 0) {
		Fcdf = 0;
	} else {
		Z = x / (x + dl2 / dl1);
		Fcdf = betacdf(Z, dl1 / 2, dl2 / 2);
	}
	Fcdf = Math.round(Fcdf * 100000) / 100000;
    return Fcdf;
}
function calcul() {

    var t, nope, npie, nrep,
        moyenneP_O, //
        etendueP_O, //
        moyenneP, //
        moyenneR_O, //
        moyenneO, //                  moyenne des moyenneP_O et à la moyenne des moyennesR_O
        moyenneEtendueO, //           moyenne des etendueP_O
        moyenneMoyenneP, //           moyenne des moyenneP
        etendueMoyenneP, //           étendue des moyenneP
        moyennemoyenneEtendueO, //    moyenne des moyenneEtendueO
        etenduemoyenneO, //           étendue des moyenneO
        lss, lsi, lscr, licr, lscx, licx, D4 = [],
        D3 = [],
        A2 = [],
        d2_K1 = [],
        d2_K2_K3 = [],
        i, j, k, eMin, eMax,
        ev, av, grr, pv, tv, ndc,
        C_Ope, C_Pie, C_Int, C_Ins, C_Tot,
        SSB, SSA, SSAB, Stotal,
        scOpe, scPie, scInt, scIns, scTot,
        dlOpe, dlPie, dlInt, dlIns, dlTot,
        mcOpe, mcPie, mcInt, mcIns,
        tfOpe, tfPie, tfInt,
        pOpe, pPie, pInt,
        aVev, aVav, aVint, aVgrr, aVpv, aVtv, andc,
        label, tabNom = [],
        div_inputNom,
        edit;


    // Met le tableau en mode non editable, cela met à jour les valeurs.
    edit = document.getElementById("input_editable");
    if (edit.value !== "Modifier les mesures") {
        /*global celluleEditable*/
        celluleEditable();
    }

    
    

    nope = Number(document.getElementById("selectOperateur").value);
    npie = Number(document.getElementById("selectPiece").value);
    nrep = Number(document.getElementById("selectRepetition").value);

    lss = parseFloat(document.forms.frmLS.txtLSS.value);
    lsi = parseFloat(document.forms.frmLS.txtLSI.value);

    t = recupTableauRetR(nope, npie, nrep); // t[ope][pie][rep]

    D4 = [3.267, 2.574, 2.282, 2.114, 2.004, 1.924, 1.864, 1.816, 1.777, 1.744, 1.717, 1.693, 1.672, 1.653, 1.585];
    D3 = [0, 0, 0, 0, 0, 0.076, 0.136, 0.184, 0.223, 0.256, 0.283, 0.307, 0.328, 0.347, 0.415];
    A2 = [1.880, 1.023, 0.729, 0.577, 0.483, 0.419, 0.373, 0.337, 0.308, 0.285, 0.266, 0.249, 0.235, 0.223, 0.180];
    
    //K1 = [0.8862, 0.5908]; // on prend pour un produit piece, opérateur >20 et le nombre d'essai est la position 
    d2_K1 = [1.12838, 1.69257, 2.05875, 2.32593, 2.53441, 2.70436, 2.8472, 2.97003, 3.07751]; // K1 = 1/D2
    d2_K2_K3 = [1.41421, 1.91155, 2.23887, 2.48124, 2.67253, 2.82981, 2.96288, 3.07794, 3.17905, 3.26909, 3.35016, 3.42378, 3.49116, 3.55333]; // nombre d'opérateur est la position sur la premiere ligne //[0.7071, 0.5231];
    //K3 = [0.7071, 0.5231, 0.4467, 0.4030, 0.3742, 0.3534, 0.3375, 0.3249, 0.3146];
    // nombre de piece est la position sur la premiere ligne
    
    // dimensionnement des tableaux
    moyenneP_O = [npie];
    etendueP_O = [npie];

    for (i = 0; i < npie; i = i + 1) {
        moyenneP_O[i] = [nope];
        etendueP_O[i] = [nope];
    }
    moyenneP = [npie];
    moyenneR_O = [nrep];
    for (i = 0; i < nrep; i = i + 1) {
        moyenneR_O[i] = [nope];
    }
    moyenneO = [nope];
    moyenneEtendueO = [nope];

    //calcul
    for (i = 0; i < nope; i = i + 1) {
        moyenneO[i] = 0;
        moyenneEtendueO[i] = 0;
        for (j = 0; j < npie; j = j + 1) {
            moyenneP_O[j][i] = 0;
            eMin = t[i][j][0];
            eMax = t[i][j][0];
            for (k = 0; k < nrep; k = k + 1) {
                moyenneP_O[j][i] = moyenneP_O[j][i] + t[i][j][k]; //t[ope][pie][rep]
                if (eMin > t[i][j][k]) {
                    eMin = t[i][j][k];
                }
                if (eMax < t[i][j][k]) {
                    eMax = t[i][j][k];
                }
            }
            moyenneP_O[j][i] = moyenneP_O[j][i] / nrep;
            etendueP_O[j][i] = eMax - eMin;

            moyenneO[i] = moyenneO[i] + moyenneP_O[j][i];
            moyenneEtendueO[i] = moyenneEtendueO[i] + etendueP_O[j][i];
        }
        moyenneO[i] = moyenneO[i] / npie;
        moyenneEtendueO[i] = moyenneEtendueO[i] / npie;
    }

    moyenneMoyenneP = 0;
    for (j = 0; j < npie; j = j + 1) {
        moyenneP[j] = 0;
        for (i = 0; i < nope; i = i + 1) {
            moyenneP[j] = moyenneP[j] + moyenneP_O[j][i];
        }
        moyenneP[j] = moyenneP[j] / nope;
        moyenneMoyenneP = moyenneMoyenneP + moyenneP[j];
    }
    moyenneMoyenneP = moyenneMoyenneP / npie;

    eMin = moyenneP[0];
    eMax = moyenneP[0];
    for (j = 0; j < npie; j = j + 1) {
        if (eMin > moyenneP[j]) {
            eMin = moyenneP[j];
        }
        if (eMax < moyenneP[j]) {
            eMax = moyenneP[j];
        }
    }
    etendueMoyenneP = eMax - eMin;

    for (i = 0; i < nope; i = i + 1) {
        for (j = 0; j < nrep; j = j + 1) {
            moyenneR_O[j][i] = 0;
            for (k = 0; k < npie; k = k + 1) {
                moyenneR_O[j][i] = moyenneR_O[j][i] + t[i][k][j]; //t[ope][pie][rep]
            }
            moyenneR_O[j][i] = moyenneR_O[j][i] / npie;
        }
    }
    moyennemoyenneEtendueO = 0;
    eMax = moyenneO[0];
    eMin = moyenneO[0];
    for (i = 0; i < nope; i = i + 1) {
        moyennemoyenneEtendueO = moyennemoyenneEtendueO + moyenneEtendueO[i];
        if (eMin > moyenneO[i]) {
            eMin = moyenneO[i];
        }
        if (eMax < moyenneO[i]) {
            eMax = moyenneO[i];
        }
    }
    moyennemoyenneEtendueO = moyennemoyenneEtendueO / nope;
    etenduemoyenneO = eMax - eMin;
    
    
    lscr = moyennemoyenneEtendueO * D4[nrep - 2];
    licr = moyennemoyenneEtendueO * D3[nrep - 2];
    lscx = moyenneMoyenneP + A2[nrep - 2] * moyennemoyenneEtendueO;
    licx = moyenneMoyenneP - A2[nrep - 2] * moyennemoyenneEtendueO;

    majResultatRetR1(t, nope, npie, nrep, moyenneP_O, etendueP_O, moyenneP, moyenneR_O, moyenneO, moyenneEtendueO, moyenneMoyenneP, etendueMoyenneP, moyennemoyenneEtendueO, etenduemoyenneO, lscr);

//    if (nrep > 1 && nrep < 4 && nope > 1 && nope < 4 && npie > 1 && npie < 11) {
    if (nrep > 1 && nrep <= 10 && nope > 1 && nope <= 10 && npie > 1 && npie <= 15) {
        ev = moyennemoyenneEtendueO / d2_K1[nrep - 2];
        av = Math.pow(etenduemoyenneO / d2_K2_K3[nope - 2], 2) - (Math.pow(ev, 2) / (npie * nrep));
        if (av < 0) {
            av = 0;
        } else {
            av = Math.sqrt(av);
        }
        grr = Math.sqrt(Math.pow(ev, 2) + Math.pow(av, 2));
        pv = etendueMoyenneP / d2_K2_K3[npie - 2];
        tv = Math.sqrt(Math.pow(grr, 2) + Math.pow(pv, 2));
        ndc = Math.floor(1.414 * (pv / grr));
    } else {
        ev = 0;
        av = 0;
        grr = 0;
        pv = 0;
        tv = 0;
        ndc = 0;
        /*global alert*/
        alert("Le tableau étude de Répétabilité et de reproductibilité ne peux pas s'afficher (essai < 4, opérateur < 4, pièce < 11 ");

    }
    // envoie des variances
    majResultatRetR2(etendueMoyenneP, moyennemoyenneEtendueO, etenduemoyenneO, ev, av, grr, pv, tv, ndc); // Rapport

    //majResultatRetR3(etendueMoyenneP, moyennemoyenneEtendueO, etenduemoyenneO, ev, av, grr, pv, tv, Math.abs(lss - lsi)); // 
    

    // table anova
    SSB = [nope + 1]; //t[ope][pie][rep]
    SSB[nope] = 0;
    for (i = 0; i < nope; i = i + 1) {
        SSB[i] = 0;
        for (j = 0; j < npie; j = j + 1) {
            for (k = 0; k < nrep; k = k + 1) {
                SSB[i] = SSB[i] + t[i][j][k];
            }
        }
        SSB[nope] = SSB[nope] + SSB[i];
    }

    SSA = [npie + 1]; //t[ope][pie][rep]
    SSA[npie] = 0;
    for (j = 0; j < npie; j = j + 1) {
        SSA[j] = 0;
        for (i = 0; i < nope; i = i + 1) {
            for (k = 0; k < nrep; k = k + 1) {
                SSA[j] = SSA[j] + t[i][j][k];
            }
        }
        SSA[j] = Math.pow(SSA[j], 2) / (nope * nrep);
        SSA[npie] = SSA[npie] + SSA[j];
    }

    SSAB = [nope];
    for (i = 0; i < nope; i = i + 1) {
        SSAB[i] = [npie];
    }
    Stotal = 0;
    for (i = 0; i < nope; i = i + 1) {
        for (j = 0; j < npie; j = j + 1) {
            SSAB[i][j] = 0;
            for (k = 0; k < nrep; k = k + 1) {
                SSAB[i][j] = SSAB[i][j] + t[i][j][k];
            }
            SSAB[i][j] = Math.pow(SSAB[i][j], 2) / nrep;
            Stotal = Stotal + SSAB[i][j];
        }
    }
    scOpe = 0;
    for (i = 0; i < nope; i = i + 1) {
        scOpe = scOpe + Math.pow(SSB[i], 2) / (nrep * npie);
    }
    scOpe = scOpe - Math.pow(SSB[nope], 2) / (nrep * npie * nope);
    scPie = SSA[npie] - Math.pow(SSB[nope], 2) / (nrep * npie * nope);
    scInt = Stotal - Math.pow(SSB[nope], 2) / (nrep * npie * nope) - scOpe - scPie;

    scTot = 0;
    for (i = 0; i < nope; i = i + 1) {
        for (j = 0; j < npie; j = j + 1) {
            for (k = 0; k < nrep; k = k + 1) {
                scTot = scTot + Math.pow(t[i][j][k], 2); //t[ope][pie][rep]
            }
        }
    }
    scTot = scTot - Math.pow(SSB[nope], 2) / (nrep * npie * nope);
    scIns = scTot - scOpe - scPie - scInt;
    dlOpe = nope - 1;
    dlPie = npie - 1;
    dlInt = dlOpe * dlPie;
    dlIns = npie * nope * (nrep - 1);
    dlTot = (nrep * npie * nope) - 1;
    mcOpe = scOpe / dlOpe;
    mcPie = scPie / dlPie;
    mcInt = scInt / dlInt;
    mcIns = scIns / dlIns;
    tfOpe = mcOpe / mcInt;
    tfPie = mcPie / mcInt;
    tfInt = mcInt / mcIns;

    
    //testF(dl1,dl2,x);
    pOpe = 1 - testF(dlOpe, dlIns, tfOpe);
    pPie =  1 - testF(dlPie, dlIns, tfPie);
    pInt = 1 - testF(dlInt, dlIns, tfInt);

    if (pInt >= 0.05) {
        // on refait le calcul car pas d'interaction
        scIns = scTot - scOpe - scPie;
        dlIns = dlInt + npie * nope * (nrep - 1);
        mcInt = 0;
        mcIns = scIns / dlIns;
        tfOpe = mcOpe / mcIns;
        tfPie = mcPie / mcIns;
        tfInt = 0;
        pOpe = 1 - testF(dlOpe, dlIns, tfOpe);
        pPie =  1 - testF(dlPie, dlIns, tfPie);
    }
    
    
    majResultatRetR3(scOpe, scPie, scInt, scIns, scTot,
        dlOpe, dlPie, dlInt, dlIns, dlTot,
        mcOpe, mcPie, mcInt, mcIns,
        tfOpe, tfPie, tfInt, pOpe, pPie, pInt); // table anova

    //Rapport Anova
//
    
    aVev = (scIns) / (dlIns);
    if (aVev < 0) {
        aVev = 0;
    }
    
    if (pInt < 0.05) {
        aVav = (mcOpe - mcInt) / (nrep * npie);
        if (aVav < 0) {
            aVav = 0;
        }
        aVint = (mcInt - mcIns) / nrep;
        if (aVint < 0) {
            aVint = 0;
        }
        aVgrr = aVev + aVint + aVav;
        aVpv = (mcPie - mcInt) / (nrep * nope);
        if (aVpv < 0) {
            aVpv = 0;
        }
        aVtv = aVgrr + aVpv;
    } else {
        aVav = (mcOpe - mcIns) / (nrep * npie);
        if (aVav < 0) {
            aVav = 0;
        }
        aVint = 0;
        aVgrr = aVev + aVav;
        aVpv = (mcPie - mcIns) / (nrep * nope);
        if (aVpv < 0) {
            aVpv = 0;
        }
        aVtv = aVgrr + aVpv;
    }
    andc = Math.floor(1.414 * (Math.sqrt(aVpv) / Math.sqrt(aVgrr)));
    if (andc < 1) {
        andc = 1;
    }

    majResultatRetR4(aVev, aVav, aVint, aVgrr, aVpv, aVtv, andc, lss, lsi, pInt); // Rapport anova
    majResultatRetR5(aVev, aVav, aVint, aVgrr, andc, lss, lsi, pInt); // Synthese
    /*global dessineEtape*/
    dessineEtape(moyenneO, moyenneP, Math.sqrt(aVgrr), Math.sqrt(aVtv), Math.sqrt(aVpv));

    /*global charts*/
    /*global setDisplayBlock*/
    //setDisplayBlock();
    div_inputNom = document.getElementById("div_inputNom");
    label = div_inputNom.getElementsByTagName("label");
    for (i = 0; i < label.length; i = i + 1) {
        tabNom.push(label[i].innerHTML);
    }


    charts(ev, av, grr, pv, tv, aVev, aVav, aVgrr, aVpv, aVtv, lss, lsi, lscx, licx, lscr, licr, moyenneP_O, etendueP_O, moyenneMoyenneP, moyennemoyenneEtendueO, moyenneP, moyenneO, tabNom, t, pInt);

    varIntervalsetDisplay = setInterval(function () {
        intervalsetDisplay();
    }, 1000);
    /*global setDisplay*/
    //setDisplay();

}