"use strict";
function recupTableauRetR(nope, npie, nrep) {

    var arrayLignes, arrayCells, longueur, boucle,
        tableauValeur,
        t, ope, pie, rep,
        i, j, k,
        div_inputNom, label;


    t = [nope];
    for (i = 0; i < nope; i = i + 1) {
        t[i] = [npie];
        for (j = 0; j < npie; j = j + 1) {
            t[i][j] = [nrep];
            for (k = 0; k < nrep; k = k + 1) {
                t[i][j][k] = [2];
            }
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
            if (arrayCells[5] !== undefined) {
                t[ope][pie][rep][0] = parseFloat(arrayCells[4].innerHTML); //mesure
                t[ope][pie][rep][1] = parseFloat(arrayCells[5].innerHTML); //reference
            }
        }
    }

    return t; // t[ope][pie][rep][MesouRef]
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
function majResultatRetR1(t, nope, npie, nrep, tabNom) {
    /*global format*/
    
    var tableau, table, tablehead, row, cell, texte, tablebody, caption,
        i, j, k,
        numTableau;

    numTableau = 1;
    
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
    row = ajoutCellule(row, 2, 1, "N°Pièce");
    for (i = 0; i < nope; i += 1) {
        row = ajoutCellule(row, 1, nrep, "Opérateur " + tabNom[i]);
    }
    row = ajoutCellule(row, 2, 1, "Référence");
    tablehead.appendChild(row);
    //NumPièces  
    row = document.createElement("tr");

    for (i = 0; i < nope; i += 1) {
        for (j = 0; j < nrep; j = j + 1) {
            row = ajoutCellule(row, 1, 1, "Essai" + Number(j + 1));
        }
    }
    tablehead.appendChild(row);
    table.appendChild(tablehead);

    tablebody = document.createElement("tbody");
    for (k = 0; k < npie; k = k + 1) { //piece
        // t[ope][pie][rep][MesouRef]
        row = document.createElement("tr");
        row = ajoutCellule(row, 1, 1, Number(k + 1));
        for (i = 0; i < nope; i = i + 1) { //operateur
            for (j = 0; j < nrep; j = j + 1) { //essai
                row = ajoutCellule(row, 1, 1, t[i][k][j][0]);
            }
        }
        row = ajoutCellule(row, 1, 1, t[i - 1][k][j - 1][1]);
        tablebody.appendChild(row);
    }
    table.appendChild(tablebody);
    tableau.appendChild(table);

}
function majResultatRetR2(NbObs, NbPre, tabNom) {
    
    var tableau, table, tablehead, row, cell, texte, tablebody, caption,
        i, numTableau;

    
    numTableau = 2;
    
    document.getElementById('div_tableau_RetR' + numTableau).innerHTML = ""; // on efface le tableau
    tableau = document.getElementById('div_tableau_RetR' + numTableau);

    
    for (i = 0;  i < NbObs[0].length; i = i + 1) {
        table = document.createElement("table");
        table.id = "monTableau_RetR" + numTableau;
        table.className = "clsTableauRetR";
        caption = document.createElement("caption");
        caption.innerHTML = "Tableau Croisé " + tabNom[i][0] + "*" + tabNom[i][1];
        table.appendChild(caption);

        tablehead = document.createElement("thead");
        tablehead.className = "clsTableauRetR_Head";
        //Opérateurs,Esssais,Pièces,Moyenne    
        row = document.createElement("tr");
        row = ajoutCellule(row, 2, 2, "");
        row = ajoutCellule(row, 1, 2, "Op " + tabNom[i][1]);
        row = ajoutCellule(row, 2, 1, "Total");
        tablehead.appendChild(row);
        //NumPièces  
        row = document.createElement("tr");

        row = ajoutCellule(row, 1, 1, "Nb 0");
        row = ajoutCellule(row, 1, 1, "Nb 1");

        tablehead.appendChild(row);
        table.appendChild(tablehead);

        tablebody = document.createElement("tbody");

        row = document.createElement("tr");
        row = ajoutCellule(row, 4, 1, "Op " + tabNom[i][0], "clsTableauRetR_Taille1");
        row = ajoutCellule(row, 1, 1, "Nb 0 Obs", "clsTableauRetR_Taille1");
        row = ajoutCellule(row, 1, 1, NbObs[0][i]);
        row = ajoutCellule(row, 1, 1, NbObs[1][i]);
        row = ajoutCellule(row, 1, 1, NbObs[0][i] + NbObs[1][i]);
        tablebody.appendChild(row);

        row = document.createElement("tr");
        row = ajoutCellule(row, 1, 1, "Nb 0 Pré", "clsTableauRetR_Taille1");
        row = ajoutCellule(row, 1, 1, format(NbPre[0][i], 2));
        row = ajoutCellule(row, 1, 1, format(NbPre[1][i], 2));
        row = ajoutCellule(row, 1, 1, NbPre[0][i] + NbPre[1][i]);
        tablebody.appendChild(row);

        row = document.createElement("tr");
        row = ajoutCellule(row, 1, 1, "Nb 1 Obs", "clsTableauRetR_Taille1");
        row = ajoutCellule(row, 1, 1, NbObs[2][i]);
        row = ajoutCellule(row, 1, 1, NbObs[3][i]);
        row = ajoutCellule(row, 1, 1, NbObs[2][i] + NbObs[3][i]);
        tablebody.appendChild(row);

        row = document.createElement("tr");
        row = ajoutCellule(row, 1, 1, "Nb 1 Pré", "clsTableauRetR_Taille1");
        row = ajoutCellule(row, 1, 1, format(NbPre[2][i], 2));
        row = ajoutCellule(row, 1, 1, format(NbPre[3][i], 2));
        row = ajoutCellule(row, 1, 1, NbPre[2][i] + NbPre[3][i]);
        tablebody.appendChild(row);

        row = document.createElement("tr");
        row = ajoutCellule(row, 1, 2, "Total", "clsTableauRetR_Taille1");
        row = ajoutCellule(row, 1, 1, NbObs[0][i] + NbObs[2][i]);
        row = ajoutCellule(row, 1, 1, NbObs[1][i] + NbObs[3][i]);
        row = ajoutCellule(row, 1, 1, NbObs[0][i] + NbObs[1][i] + NbObs[2][i] + NbObs[3][i]);
        tablebody.appendChild(row);

        table.appendChild(tablebody);
        tableau.appendChild(table);
    }
    
    
}
function majResultatRetR3(NbObs, NbPre, tabNom) {
    var tableau, table, tablehead, row, cell, texte, tablebody, caption,
        i, numTableau;

    
    numTableau = 3;
    
    document.getElementById('div_tableau_RetR' + numTableau).innerHTML = ""; // on efface le tableau
    tableau = document.getElementById('div_tableau_RetR' + numTableau);

    for (i = 0;  i < tabNom.length; i = i + 1) {
        table = document.createElement("table");
        table.id = "monTableau_RetR" + numTableau;
        table.className = "clsTableauRetR";
        caption = document.createElement("caption");
        caption.innerHTML = "Tableau Croisé " + tabNom[i] + "*Ref";
        table.appendChild(caption);

        tablehead = document.createElement("thead");
        tablehead.className = "clsTableauRetR_Head";
        //Opérateurs,Esssais,Pièces,Moyenne    
        row = document.createElement("tr");
        row = ajoutCellule(row, 2, 2, "");
        row = ajoutCellule(row, 1, 2, "Ref ");
        row = ajoutCellule(row, 2, 1, "Total");
        tablehead.appendChild(row);
        //NumPièces  
        row = document.createElement("tr");

        row = ajoutCellule(row, 1, 1, "Nb 0");
        row = ajoutCellule(row, 1, 1, "Nb 1");

        tablehead.appendChild(row);
        table.appendChild(tablehead);

        tablebody = document.createElement("tbody");

        row = document.createElement("tr");
        row = ajoutCellule(row, 4, 1, "Op " + tabNom[i], "clsTableauRetR_Taille1");
        row = ajoutCellule(row, 1, 1, "Nb 0 Obs", "clsTableauRetR_Taille1");
        row = ajoutCellule(row, 1, 1, NbObs[0][i]);
        row = ajoutCellule(row, 1, 1, NbObs[1][i]);
        row = ajoutCellule(row, 1, 1, NbObs[0][i] + NbObs[1][i]);
        tablebody.appendChild(row);

        row = document.createElement("tr");
        row = ajoutCellule(row, 1, 1, "Nb 0 Pré", "clsTableauRetR_Taille1");
        row = ajoutCellule(row, 1, 1, format(NbPre[0][i], 2));
        row = ajoutCellule(row, 1, 1, format(NbPre[1][i], 2));
        row = ajoutCellule(row, 1, 1, NbPre[0][i] + NbPre[1][i]);
        tablebody.appendChild(row);

        row = document.createElement("tr");
        row = ajoutCellule(row, 1, 1, "Nb 1 Obs", "clsTableauRetR_Taille1");
        row = ajoutCellule(row, 1, 1, NbObs[2][i]);
        row = ajoutCellule(row, 1, 1, NbObs[3][i]);
        row = ajoutCellule(row, 1, 1, NbObs[2][i] + NbObs[3][i]);
        tablebody.appendChild(row);

        row = document.createElement("tr");
        row = ajoutCellule(row, 1, 1, "Nb 1 Pré", "clsTableauRetR_Taille1");
        row = ajoutCellule(row, 1, 1, format(NbPre[2][i], 2));
        row = ajoutCellule(row, 1, 1, format(NbPre[3][i], 2));
        row = ajoutCellule(row, 1, 1, NbPre[2][i] + NbPre[3][i]);
        tablebody.appendChild(row);

        row = document.createElement("tr");
        row = ajoutCellule(row, 1, 2, "Total", "clsTableauRetR_Taille1");
        row = ajoutCellule(row, 1, 1, NbObs[0][i] + NbObs[2][i]);
        row = ajoutCellule(row, 1, 1, NbObs[1][i] + NbObs[3][i]);
        row = ajoutCellule(row, 1, 1, NbObs[0][i] + NbObs[1][i] + NbObs[2][i] + NbObs[3][i]);
        tablebody.appendChild(row);

        table.appendChild(tablebody);
        tableau.appendChild(table);
    }
        
}
function majResultatRetR4(Kappa, tabNom) {
    var tableau, table, tablehead, row, cell, texte, tablebody, caption,
        i, numTableau, j;

    
    numTableau = 4;
    
    document.getElementById('div_tableau_RetR' + numTableau).innerHTML = ""; // on efface le tableau
    tableau = document.getElementById('div_tableau_RetR' + numTableau);
    
    table = document.createElement("table");
    table.id = "monTableau_RetR" + numTableau;
    table.className = "clsTableauRetR";
    caption = document.createElement("caption");
    caption.innerHTML = "Kappa opérateurs";
    table.appendChild(caption);

    tablehead = document.createElement("thead");
    tablehead.className = "clsTableauRetR_Head";
    //Opérateurs,Esssais,Pièces,Moyenne    
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Kappa");
    for (i = 0; i < tabNom.length; i = i + 1) {
        row = ajoutCellule(row, 1, 1, tabNom[i]);
    }
    tablehead.appendChild(row);
    table.appendChild(tablehead);

    tablebody = document.createElement("tbody");

    for (i = 0; i < tabNom.length; i = i + 1) {
        row = document.createElement("tr");
        row = ajoutCellule(row, 1, 1, tabNom[i]);
        for (j = 0; j < tabNom.length; j = j + 1) {
            row = ajoutCellule(row, 1, 1, Kappa[i][j]);
        }
        tablebody.appendChild(row);
    }

    table.appendChild(tablebody);
    tableau.appendChild(table);
        
}
function majResultatRetR5(Kappa, tabNom) {
    var tableau, table, tablehead, row, cell, texte, tablebody, caption,
        i, numTableau, j;

    //Kapparef
    
    numTableau = 5;
    
    document.getElementById('div_tableau_RetR' + numTableau).innerHTML = ""; // on efface le tableau
    tableau = document.getElementById('div_tableau_RetR' + numTableau);
    
    table = document.createElement("table");
    table.id = "monTableau_RetR" + numTableau;
    table.className = "clsTableauRetR";
    caption = document.createElement("caption");
    caption.innerHTML = "Kappa Ref";
    table.appendChild(caption);

    tablehead = document.createElement("thead");
    tablehead.className = "clsTableauRetR_Head";
    //Opérateurs,Esssais,Pièces,Moyenne    
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Kappa");
    for (i = 0; i < tabNom.length; i = i + 1) {
        row = ajoutCellule(row, 1, 1, tabNom[i]);
    }
    tablehead.appendChild(row);
    table.appendChild(tablehead);

    tablebody = document.createElement("tbody");

    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Ref");
    for (i = 0; i < tabNom.length; i = i + 1) {
        row = ajoutCellule(row, 1, 1, Kappa[i]);
    }
    tablebody.appendChild(row);

    table.appendChild(tablebody);
    tableau.appendChild(table);
        
}
function majResultatRetR6(nPie, nCorrect, tabNom, totalTousOpe, totalTousRef, UCI95, LCI95) {
    var tableau, table, tablehead, row, cell, texte, tablebody, caption,
        i, numTableau, j;

    
    numTableau = 6;
    
    document.getElementById('div_tableau_RetR' + numTableau).innerHTML = ""; // on efface le tableau
    tableau = document.getElementById('div_tableau_RetR' + numTableau);
    
    table = document.createElement("table");
    table.id = "monTableau_RetR" + numTableau;
    table.className = "clsTableauRetR";
    caption = document.createElement("caption");
    caption.innerHTML = "%";
    table.appendChild(caption);

    tablehead = document.createElement("thead");
    tablehead.className = "clsTableauRetR_Head";
    //Opérateurs,Esssais,Pièces,Moyenne    
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "");
    row = ajoutCellule(row, 1, tabNom.length, "% Opérateur");
    row = ajoutCellule(row, 1, tabNom.length, "% Score vs Attribute");
    tablehead.appendChild(row);
    
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "");
    for (i = 0; i < tabNom.length; i = i + 1) {
        row = ajoutCellule(row, 1, 1, tabNom[i]);
    }
    for (i = 0; i < tabNom.length; i = i + 1) {
        row = ajoutCellule(row, 1, 1, tabNom[i]);
    }
    tablehead.appendChild(row);
    table.appendChild(tablehead);

    tablebody = document.createElement("tbody");

    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Total Analysé");
    for (i = 0; i < tabNom.length * 2; i = i + 1) {
        row = ajoutCellule(row, 1, 1, nPie);
    }
    tablebody.appendChild(row);
    
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Correct");
    for (i = 0; i < tabNom.length; i = i + 1) {
        row = ajoutCellule(row, 1, 1, nCorrect[i]);
    }
    
    for (i = 0; i < tabNom.length; i = i + 1) {
        row = ajoutCellule(row, 1, 1, nCorrect[i + tabNom.length]);
    }
    tablebody.appendChild(row);

    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Mixed");
    for (i = 0; i < tabNom.length; i = i + 1) {
        row = ajoutCellule(row, 1, 1, "");
    }
    for (i = 0; i < tabNom.length; i = i + 1) {
        row = ajoutCellule(row, 1, 1, nPie - nCorrect[i + tabNom.length]);
    }
    tablebody.appendChild(row);

    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "95% UCI");
    for (i = 0; i < tabNom.length * 2; i = i + 1) {
        row = ajoutCellule(row, 1, 1, format(UCI95[i] * 100, 0) + "%");
    }
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Calculated score");
    for (i = 0; i < tabNom.length * 2; i = i + 1) {
        row = ajoutCellule(row, 1, 1, nCorrect[i] / nPie * 100 + "%");
    }
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "95% LCI");
    for (i = 0; i < tabNom.length * 2; i = i + 1) {
        row = ajoutCellule(row, 1, 1, format(LCI95[i] * 100, 0) + "%");
    }
    tablebody.appendChild(row);

    
    table.appendChild(tablebody);
    tableau.appendChild(table);
 
    
    // deuxième tableau
    
    
    table = document.createElement("table");
    table.id = "monTableau_RetR" + numTableau;
    table.className = "clsTableauRetR";
    caption = document.createElement("caption");
    caption.innerHTML = "%";
    table.appendChild(caption);

    tablehead = document.createElement("thead");
    tablehead.className = "clsTableauRetR_Head";
    //Opérateurs,Esssais,Pièces,Moyenne    
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "");
    row = ajoutCellule(row, 1, 1, "% System % effective score");
    row = ajoutCellule(row, 1, 1, "% System % effective score vs référence");
    tablehead.appendChild(row);
    table.appendChild(tablehead);

    tablebody = document.createElement("tbody");

    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Total Analysé");
    row = ajoutCellule(row, 1, 1, nPie);
    row = ajoutCellule(row, 1, 1, nPie);
    tablebody.appendChild(row);
    
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Total en accord");
    row = ajoutCellule(row, 1, 1, totalTousOpe);
    row = ajoutCellule(row, 1, 1, totalTousRef);
    tablebody.appendChild(row);

    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "95% UCI");
    row = ajoutCellule(row, 1, 1, format(UCI95[tabNom.length * 2] * 100, 0) + "%");
    row = ajoutCellule(row, 1, 1, format(UCI95[tabNom.length * 2 + 1] * 100, 0) + "%");
    tablebody.appendChild(row);

    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Calculated score");
    row = ajoutCellule(row, 1, 1, totalTousOpe / nPie * 100 + "%");
    row = ajoutCellule(row, 1, 1, totalTousRef / nPie * 100 + "%");
    tablebody.appendChild(row);

    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "95% LCI");
    row = ajoutCellule(row, 1, 1, format(LCI95[tabNom.length * 2] * 100, 0) + "%");
    row = ajoutCellule(row, 1, 1, format(LCI95[tabNom.length * 2 + 1] * 100, 0) + "%");
    tablebody.appendChild(row);

    
    table.appendChild(tablebody);
    tableau.appendChild(table);
    
    
}
function majResultatRetR7() {
    var tableau, table, tablehead, row, cell, texte, tablebody, caption,
        i, numTableau, j;

    //Kapparef
    
    numTableau = 7;
    
    document.getElementById('div_tableau_RetR' + numTableau).innerHTML = ""; // on efface le tableau
    tableau = document.getElementById('div_tableau_RetR' + numTableau);
    
    table = document.createElement("table");
    table.id = "monTableau_RetR" + numTableau;
    table.className = "clsTableauRetR";
    caption = document.createElement("caption");
    table.appendChild(caption);

    tablehead = document.createElement("thead");
    tablehead.className = "clsTableauRetR_Head";
    //Opérateurs,Esssais,Pièces,Moyenne    
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 2, "Tableau d'acceptation");
    tablehead.appendChild(row);
    table.appendChild(tablehead);

    tablebody = document.createElement("tbody");

    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Capabilité excellente");
    row = ajoutCellule(row, 1, 1, "Score = 100%");
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Capabilité bonne");
    row = ajoutCellule(row, 1, 1, "Score > 90%");
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Capabilité acceptable (à améliorer)");
    row = ajoutCellule(row, 1, 1, "Score > 80%");
    tablebody.appendChild(row);
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, "Capabilité inacceptable");
    row = ajoutCellule(row, 1, 1, "Score < 80%");
    tablebody.appendChild(row);

    table.appendChild(tablebody);
    tableau.appendChild(table);
        
}
function lgamma(n) {
    var g = 1, i;
    for (i = n  - 1; i > 0; i = i - 1) {
        g = g * i;
    }
    
    return Math.log(g);
    
}
//IncompleteBetaFunction
function incbeta(a, b, x) {
    var STOP = 1.0e-8, TINY = 1.0e-30,
        lbeta_ab, front,
        f = 1.0, c = 1.0, d = 0.0,
        i, m,
        numerator,
        cd;

    if (x < 0.0 || x > 1.0) {
        return null;
    }

    /*The continued fraction converges nicely for x < (a+1)/(a+b+2)*/
    if (x > (a + 1.0) / (a + b + 2.0)) {
        return (1.0 - incbeta(b, a, 1.0 - x)); /*Use the fact that beta is symmetrical.*/
    }
    
    /*Find the first part before the continued fraction.*/
    lbeta_ab = lgamma(a) + lgamma(b) - lgamma(a + b);
    front = Math.exp(Math.log(x) * a + Math.log(1.0 - x) * b - lbeta_ab) / a;

    /*Use Lentz's algorithm to evaluate the continued fraction.*/

    for (i = 0; i <= 200; i = i + 1) {
        m = i / 2;

        if (i === 0) {
            numerator = 1.0; /*First numerator is 1.0.*/
        } else if (i % 2 === 0) {
            numerator = (m * (b - m) * x) / ((a + 2.0 * m - 1.0) * (a + 2.0 * m)); /*Even term.*/
        } else {
            numerator = -((a + m) * (a + b + m) * x) / ((a + 2.0 * m) * (a + 2.0 * m + 1)); /*Odd term.*/
        }

        /*Do an iteration of Lentz's algorithm.*/
        d = 1.0 + numerator * d;
        if (Math.abs(d) < TINY) {
            d = TINY;
        }
        d = 1.0 / d;

        c = 1.0 + numerator / c;
        if (Math.abs(c) < TINY) {
            c = TINY;
        }

        cd = c * d;
        f = f * cd;

        /*Check for stop.*/
        if (Math.abs(1.0 - cd) < STOP) {
            return front * (f - 1.0);
        }
    }

    return null; /*Needed more loops, did not converge.*/
}
function inverseBeta(p, alpha, beta, A, B) {

    var x = 0, a = 0, b = 1, precision = Math.pow(10, -6); // converge until there is 6 decimal places precision
    
    while ((b - a) > precision) {
        x = (a + b) / 2;
        if (incbeta(alpha, beta, x) > p) {
            b = x;
        } else {
            a = x;
        }
    }

    if ((B > 0) && (A > 0)) {
        x = x * (B - A) + A;
    }
    return x;
}
function calcul() {
    var t, nope, npie, nrep,
        i, label, div_inputNom, tabNom = [], totalMax,
        nbObs = [4], nbPre = [4],
        j, k, l, nbrTableau = 0, numope1, numope2, num = 0,
        tabNomCroise,
        kappaOpe, tabkappaOpe, kappaRef,
        A, ligne, colonne,
        tabOk, totalTousOpe = 0, tousOpe, tabOkRef, totalTousRef = 0, tousRef,
        nCorrect,
        UCI95, LCI95, p, alpha, beta;

    
    nope = Number(document.getElementById("selectOperateur").value);
    npie = Number(document.getElementById("selectPiece").innerHTML);
    nrep = Number(document.getElementById("selectRepetition").value);
    
    div_inputNom = document.getElementById("div_inputNom");
    label = div_inputNom.getElementsByTagName("label");
    for (i = 0; i < label.length; i = i + 1) {
        tabNom.push(label[i].innerHTML);
    }

    for (i = 1; i < nope; i = i + 1) {
        nbrTableau = nbrTableau  + i;
    }
    for (i = 0; i < 4; i = i + 1) {
        nbObs[i] = [nbrTableau];
        nbPre[i] = [nbrTableau];
        tabNomCroise = [nbrTableau];
    }
    for (i = 0; i < nbrTableau; i = i + 1) {
        tabNomCroise[i] = [2];
    }
    for (i = 0; i < 4; i = i + 1) {
        for (j = 0; j < nbrTableau; j = j + 1) {
            nbObs[i][j] = 0;
        }
    }

    
    
    
    t = recupTableauRetR(nope, npie, nrep, tabNom); // t[ope][pie][rep][MesouRef]
    
    // tableau autre format
    majResultatRetR1(t, nope, npie, nrep, tabNom);
    
    for (k = 0; k < nope; k = k + 1) {
        for (l =  k + 1; l < nope; l = l + 1) {
        
            numope1 = k;
            numope2 = l;
            tabNomCroise[num][0] = tabNom[k];
            tabNomCroise[num][1] = tabNom[l];
            for (i = 0; i < npie; i = i + 1) {
                for (j = 0; j < nrep; j = j + 1) {
                    if (t[numope1][i][j][0] === 0) {
                        if (t[numope2][i][j][0] === 0) {
                            nbObs[0][num] += 1;
                        } else {
                            nbObs[1][num] += 1;
                        }
                    } else {
                        if (t[numope2][i][j][0] === 0) {
                            nbObs[2][num] += 1;
                        } else {
                            nbObs[3][num] += 1;
                        }
                    }
                }
            }
            totalMax = (nbObs[0][num] + nbObs[1][num] + nbObs[2][num] + nbObs[3][num]);
            nbPre[0][num] = (nbObs[0][num] + nbObs[1][num]) * (nbObs[0][num] + nbObs[2][num]) / totalMax;
            nbPre[1][num] = (nbObs[0][num] + nbObs[1][num]) * (nbObs[1][num] + nbObs[3][num]) / totalMax;
            nbPre[2][num] = (nbObs[2][num] + nbObs[3][num]) * (nbObs[0][num] + nbObs[2][num]) / totalMax;
            nbPre[3][num] = (nbObs[2][num] + nbObs[3][num]) * (nbObs[1][num] + nbObs[3][num]) / totalMax;
            
            num = num + 1;
            
        }
    }
    //tableaux croisés Opérateurs
    majResultatRetR2(nbObs, nbPre, tabNomCroise);

    kappaOpe = [nbrTableau];

    for (j = 0; j < nbrTableau; j = j + 1) {
        A = (nbObs[0][j] + nbObs[1][j]) * (nbObs[0][j] + nbObs[2][j]) + (nbObs[1][j] + nbObs[3][j]) * (nbObs[2][j] + nbObs[3][j]);
        kappaOpe[j] = ((1 / totalMax) * (nbObs[0][j] + nbObs[3][j]) - (1 / (totalMax * totalMax)) * A) / (1 - (1 / (totalMax * totalMax)) * A);
    }

    tabkappaOpe = [tabNom.length];
    for (i = 0; i < tabNom.length; i = i + 1) {
        tabkappaOpe[i] = [tabNom.length];
    }
    for (i = 0; i < tabNom.length; i = i + 1) { // ligne
        if (i === 0) {
            num = i;
        } else {
            num = i - 1;
        }
        for (j = 0; j < tabNom.length; j = j + 1) { // colonne
            if (i === j) {
                tabkappaOpe[i][j] = 'X';
                if (i > 0) {
                    num = i + 1;
                }
            } else {
                tabkappaOpe[i][j] = format(kappaOpe[num], 2);
                num = num + 1;
            }
        }
    }
    
    num = 0;
    for (i = 0; i < 4; i = i + 1) {
        for (j = 0; j < tabNom.length; j = j + 1) {
            nbObs[i][j] = 0;
        }
    }
    for (k = 0; k < nope; k = k + 1) {
        
        numope1 = k;
        for (i = 0; i < npie; i = i + 1) {
            for (j = 0; j < nrep; j = j + 1) {
                if (t[numope1][i][j][0] === 0) {
                    if (t[numope1][i][j][1] === 0) {
                        nbObs[0][num] += 1;
                    } else {
                        nbObs[1][num] += 1;
                    }
                } else {
                    if (t[numope1][i][j][1] === 0) {
                        nbObs[2][num] += 1;
                    } else {
                        nbObs[3][num] += 1;
                    }
                }
            }
        }
        totalMax = (nbObs[0][num] + nbObs[1][num] + nbObs[2][num] + nbObs[3][num]);
        nbPre[0][num] = (nbObs[0][num] + nbObs[1][num]) * (nbObs[0][num] + nbObs[2][num]) / totalMax;
        nbPre[1][num] = (nbObs[0][num] + nbObs[1][num]) * (nbObs[1][num] + nbObs[3][num]) / totalMax;
        nbPre[2][num] = (nbObs[2][num] + nbObs[3][num]) * (nbObs[0][num] + nbObs[2][num]) / totalMax;
        nbPre[3][num] = (nbObs[2][num] + nbObs[3][num]) * (nbObs[1][num] + nbObs[3][num]) / totalMax;

        num = num + 1;
            
    }
    //tableaux croisés Ref
    majResultatRetR3(nbObs, nbPre, tabNom);
    //Kappa Opérateurs
    majResultatRetR4(tabkappaOpe, tabNom);
    //Kappa Ref
    kappaRef = [tabNom.length];
    for (j = 0; j < tabNom.length; j = j + 1) {
        A = (nbObs[0][j] + nbObs[1][j]) * (nbObs[0][j] + nbObs[2][j]) + (nbObs[1][j] + nbObs[3][j]) * (nbObs[2][j] + nbObs[3][j]);
        kappaRef[j] = ((1 / totalMax) * (nbObs[0][j] + nbObs[3][j]) - (1 / (totalMax * totalMax)) * A) / (1 - (1 / (totalMax * totalMax)) * A);
        kappaRef[j] = format(kappaRef[j], 2);
    }
    majResultatRetR5(kappaRef, tabNom);

    //%
    
    tabOk = [tabNom.length];
    tabOkRef = [tabNom.length];
    for (i = 0; i < nope; i = i + 1) {
        tabOk[i] = [npie];
        tabOkRef[i] = [npie];
    }
    
    for (i = 0; i < nope; i = i + 1) {
        for (j = 0; j < npie; j = j + 1) {
            tabOk[i][j] = 1;
            tabOkRef[i][j] = 1;
            for (k = 1; k < nrep; k = k + 1) {
                if (t[i][j][k - 1][0] !== t[i][j][k][0]) {
                    tabOk[i][j] = 0;
                    tabOkRef[i][j] = 0;
                    k = nrep;
                }
                if (k === nrep - 1) {
                    if (t[i][j][k][0] !== t[i][j][k][1]) {
                        tabOkRef[i][j] = 0;
                    }
                }
            }
        }
    }
    
    for (j = 0; j < npie; j = j + 1) {
        tousOpe = 1;
        tousRef = 1;
        for (i = 1; i < nope; i = i + 1) {
            if (tabOk[i - 1][j] !== tabOk[i][j]) {
                tousOpe = 0;
            }
            if (tabOkRef[i - 1][j] !== tabOkRef[i][j]) {
                tousRef = 0;
            }
        }
        if (tabOk[nope - 1][j] !== 1) {
            tousOpe = 0;
        }
        if (tabOkRef[nope - 1][j] !== 1) {
            tousRef = 0;
        }
        totalTousOpe += tousOpe;
        totalTousRef += tousRef;
    }
    
//    console.log(tabOk)
    
    nCorrect = [nope * 2];
    for (i = 0; i < nope * 2; i = i + 1) {
        nCorrect[i] = 0;
    }
    for (i = 0; i < nope; i = i + 1) {
        for (j = 0; j < npie; j = j + 1) {
            nCorrect[i] += tabOk[i][j];
            nCorrect[i + nope] += tabOkRef[i][j];
        }
    }

    UCI95 = [nope * 2 + 2];
    LCI95 = [nope * 2 + 2];
    
    p = (1 + 0.95) / 2;
    for (i = 0; i < nope * 2; i = i + 1) {
        alpha = npie - (npie - nCorrect[i]) + 1;
        beta = npie - nCorrect[i];
        UCI95[i] = inverseBeta(p, alpha, beta, 0, 1);
        alpha = (npie - nCorrect[i]) + 1;
        beta = npie - (npie - nCorrect[i]);
        LCI95[i] = 1 - inverseBeta(p, alpha, beta, 0, 1);
    }
    alpha = npie - (npie - totalTousOpe) + 1;
    beta = npie - totalTousOpe;
    UCI95[i] = inverseBeta(p, alpha, beta, 0, 1);
    alpha = npie - (npie - totalTousRef) + 1;
    beta = npie - totalTousRef;
    UCI95[i + 1] = inverseBeta(p, alpha, beta, 0, 1);
    alpha = (npie - totalTousOpe) + 1;
    beta = npie - (npie - totalTousOpe);
    LCI95[i] = 1 - inverseBeta(p, alpha, beta, 0, 1);
    alpha = (npie - totalTousRef) + 1;
    beta = npie - (npie - totalTousRef);
    LCI95[i + 1] = 1 - inverseBeta(p, alpha, beta, 0, 1);
    
    majResultatRetR6(npie, nCorrect, tabNom, totalTousOpe, totalTousRef, UCI95, LCI95);

    majResultatRetR7();

}