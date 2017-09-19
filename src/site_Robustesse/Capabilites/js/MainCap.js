"use strict";
//cookie.js
/*global setCookie*/
/*global getCookie*/
//ResultatCap.js
/*global calcul*/
/*global calculSg*/
//mainGen.js
/*global majLocalStorage*/
/*global testLimite*/
//keyboard.js
/*global applyKeyMesure*/
//Onglet.js
/*global start_onglet*/

/*global prompt*/
//clipboard.js
/*global clipboard*/
function majCookie() {
    var valeurCookie, select;
    select = document.getElementById("selectMesure");
    if (select !== null) {
        valeurCookie = select.innerHTML;
        /*global setCookie*/
        setCookie("selectMesureCapa", valeurCookie, 365);
    }
    select = document.getElementById("selectSg");
    if (select !== null) {
        valeurCookie = select.innerHTML;
        /*global setCookie*/
        setCookie("selectSgCapa", valeurCookie, 365);
    }
    select = document.getElementById("selectIndividuSg");
    if (select !== null) {
        valeurCookie = select.innerHTML;
        /*global setCookie*/
        setCookie("selectIndividuSgCapa", valeurCookie, 365);
    }
    
    if (document.forms.frmLS.txtLSS !== undefined) {
        if (document.forms.frmLS.txtLSS.value !== "") {
            setCookie("LSSCapa", document.forms.frmLS.txtLSS.value, 365);
        }
    }
    if (document.forms.frmLS.txtLSI !== undefined) {
        if (document.forms.frmLS.txtLSI.value !== "") {
            setCookie("LSICapa", document.forms.frmLS.txtLSI.value, 365);
        }
    }
    if (document.forms.frmLS.txtUnite !== undefined) {
        if (document.forms.frmLS.txtUnite.value !== "") {
            setCookie("UniteCapa", document.forms.frmLS.txtUnite.value, 365);
        }
    }
    
    if (document.forms.frmLS.chkLSS.checked) {
        setCookie("chkLSSCapa", "1", 365);
    } else {
        setCookie("chkLSSCapa", "0", 365);
    }
    if (document.forms.frmLS.chkLSI.checked) {
        setCookie("chkLSICapa", "1", 365);
    } else {
        setCookie("chkLSICapa", "0", 365);
    }

    
}
function recupCookie() {
    var valeurCookie;

    /*global getCookie*/
    
    valeurCookie = getCookie("selectMesureCapa");
    if (valeurCookie === "") {
        valeurCookie = 1;
    }
    document.getElementById("selectMesure").innerHTML = valeurCookie;
    valeurCookie = getCookie("selectSgCapa");
    if (valeurCookie === "") {
        valeurCookie = 1;
    }
    document.getElementById("selectSg").innerHTML = valeurCookie;
    valeurCookie = getCookie("selectIndividuSgCapa");
    if (valeurCookie === "") {
        valeurCookie = 1;
    }
    document.getElementById("selectIndividuSg").innerHTML = valeurCookie;
    valeurCookie = getCookie("LSSCapa");
    if (valeurCookie === "") {
        valeurCookie = 0;
    }
    document.forms.frmLS.txtLSS.value = valeurCookie;
    valeurCookie = getCookie("LSICapa");
    if (valeurCookie === "") {
        valeurCookie = 0;
    }
    document.forms.frmLS.txtLSI.value = valeurCookie;
    valeurCookie = getCookie("UniteCapa");
    if (valeurCookie === "") {
        valeurCookie = "cm";
    }
    document.forms.frmLS.txtUnite.value = valeurCookie;
    valeurCookie = getCookie("chkLSSCapa");
    if (valeurCookie === "") {
        valeurCookie = "1";
    }
    if (valeurCookie === "1") {
        document.forms.frmLS.chkLSS.checked = true;
    }
    valeurCookie = getCookie("chkLSICapa");
    if (valeurCookie === "") {
        valeurCookie = "1";
    }
    if (valeurCookie === "1") {
        document.forms.frmLS.chkLSI.checked = true;
    }

    
    
}
function majCalcul() {
    
    //document.getElementById("selectMesure").innerHTML = longueur;
    /*global calcul*/
    calcul();
    /*global majLocalStorage*/
    majCookie();
    majLocalStorage("Cap", 1); // prefixe et numero du tableau

}
function majCalculSg() {
    
    //document.getElementById("selectMesure").innerHTML = longueur;
    /*global calculSg*/
    calculSg();
    /*global majLocalStorage*/
    majCookie();
    majLocalStorage("CapSg", 2);

}
function celluleEditable(num) {

    var edit,
        tableau,
        arrayLignes,
        longueur,
        i = 1,
        arrayCells,
        numCelluleMesure;
    
    numCelluleMesure = num;
    
    edit = document.getElementById("input_editable" + num);
    tableau = document.getElementById("div_tableau" + num);
    arrayLignes = tableau.getElementsByTagName("Table")[0].rows; //l'array est stocké dans une variable
    longueur = arrayLignes.length; //on peut donc appliquer la propriété length


    while (i < longueur) {
        arrayCells = arrayLignes[i].cells;
        /*global gestionCelluleEditable*/
        gestionCelluleEditable(arrayCells[numCelluleMesure], edit);

        i = i + 1;
    }
    if (edit.value === "Modifier les mesures") {
        edit.value = "Valider les modifications";
    } else {
        edit.value = "Modifier les mesures";
        if (num === 1) {
            majCalcul();
        } else {
            majCalculSg();
        }
    }
    //formatTableau();

}
function majTableau(Appelant, tab) {
    //tab [tabRang ,tabOpe,tabPie,tabRep,tabMes)
    var edit, cell, texte, tableau,
        table, tablehead, row, tablebody,
        boucle, nbLigne, tabNom = [];

    nbLigne = tab[0].length;

    if (nbLigne !== 0) {
        document.getElementById('div_tableau1').innerHTML = ""; // on efface le tableau
        // Création des titres        
        tableau = document.getElementById('div_tableau1');
        // création des éléments <table> et <tbody>
        table = document.createElement("table");
        table.id = "monTableau";
        table.className = "clsTableau";
        tablehead = document.createElement("thead");
        row = document.createElement("tr");
        cell = document.createElement("td");
        texte = document.createTextNode("n");
        cell.appendChild(texte);
        row.appendChild(cell);
        cell = document.createElement("td");
        texte = document.createTextNode("Mesure");
        cell.appendChild(texte);
        row.appendChild(cell);
        tablehead.appendChild(row);
        table.appendChild(tablehead);
        tablebody = document.createElement("tbody");

        for (boucle = 0; boucle < nbLigne; boucle = boucle + 1) {
            row = document.createElement("tr");
            //n
            cell = document.createElement("td");
            texte = document.createTextNode(tab[0][boucle]);
            cell.appendChild(texte);
            row.appendChild(cell);
            //mesure
            cell = document.createElement("td");
            texte = document.createTextNode(tab[1][boucle]);
            cell.appendChild(texte);
            row.appendChild(cell);
            tablebody.appendChild(row);
        }

        table.appendChild(tablebody);
        tableau.appendChild(table);

        // met à jour les cookies
        //majCookie();
        if (Appelant !== "start") {
            majCalcul();
        }

    }
}
function majTableauSg(Appelant, tab) {
    //tab [tabRang ,tabOpe,tabPie,tabRep,tabMes)
    var edit, cell, texte, tableau,
        table, tablehead, row, tablebody,
        boucle, nbLigne, tabNom = [];

    nbLigne = tab[0].length;

    if (nbLigne !== 0) {
        document.getElementById('div_tableau2').innerHTML = ""; // on efface le tableau
        // Création des titres        
        tableau = document.getElementById('div_tableau2');
        // création des éléments <table> et <tbody>
        table = document.createElement("table");
        table.id = "monTableau";
        table.className = "clsTableau";
        tablehead = document.createElement("thead");
        row = document.createElement("tr");
        cell = document.createElement("td");
        texte = document.createTextNode("n");
        cell.appendChild(texte);
        row.appendChild(cell);
        cell = document.createElement("td");
        texte = document.createTextNode("Sous groupes");
        cell.appendChild(texte);
        row.appendChild(cell);
        cell = document.createElement("td");
        texte = document.createTextNode("Mesure");
        cell.appendChild(texte);
        row.appendChild(cell);
        tablehead.appendChild(row);
        table.appendChild(tablehead);
        tablebody = document.createElement("tbody");

        for (boucle = 0; boucle < nbLigne; boucle = boucle + 1) {
            row = document.createElement("tr");
            //n
            cell = document.createElement("td");
            texte = document.createTextNode(tab[0][boucle]);
            cell.appendChild(texte);
            row.appendChild(cell);
            //sg
            cell = document.createElement("td");
            texte = document.createTextNode(tab[1][boucle]);
            cell.appendChild(texte);
            row.appendChild(cell);
            tablebody.appendChild(row);
            //mesure
            cell = document.createElement("td");
            texte = document.createTextNode(tab[2][boucle]);
            cell.appendChild(texte);
            row.appendChild(cell);
            tablebody.appendChild(row);
        }

        table.appendChild(tablebody);
        tableau.appendChild(table);

        // met à jour les cookies
        //majCookie();
        if (Appelant !== "start") {
            majCalculSg();
        }

    }
}
function creationTableau(Appelant) {

    var edit, cell, texte, tableau,
        table, tablehead, row, tablebody, select,
        nbLigne = 0,
        boucle, indice,
        numColonne,
        tabRang = [],
        tabMes = [],
        longueur,
        arrayLignes,
        arrayCells,
        varCookie,
        retour,
//        tabRangSave = [],
        tabMesSave = [],
//        tabMesureRangSave = [tabMesSave, tabRangSave],
        tRan = [],
        tMes = [],
        t = [tRan, tMes];

    // Met le tableau en mode non editable, cela met à jour les valeurs.
    edit = document.getElementById("input_editable1");
    if (edit.value !== "Modifier les mesures") {
        celluleEditable();
    }
    //test que les select soit tous renseigné, à la création ils sont null
    select = document.getElementById("selectMesure");
    if (select !== null) {
        nbLigne = select.innerHTML;
    }
    // ligne du tableau que l'on va créer
    // si l'un des select est null on ne fait rien

    if (nbLigne !== 0) {
        

        //On récupére les anciennes valeurs de mesure pour les reinjecter dans le tableau
        tableau = document.getElementById('div_tableau1');
        if (tableau.getElementsByTagName('Table').length > 0) {
            arrayLignes = tableau.getElementsByTagName('Table')[0].rows; //l'array est stocké dans une variable
            longueur = arrayLignes.length - 1; //on supprime le titre pour obtenir seulement les lignes avec valeurs
            //Met à jour le tableau de sauvegarde des mesures
            // on commence à la deuxieme ligne ( la première étant le titre)
            for (boucle = 1; boucle <= longueur; boucle = boucle + 1) {
                arrayCells = arrayLignes[boucle].cells;
                tabMesSave.push(arrayCells[1].innerHTML);
//                tabRangSave.push(arrayCells[0].innerHTML);
            }
        } else {
            longueur = 0;
        }

        //si la longueur des anciennes valeurs est supérieur au nouveau tableau alors on tronque la récupération
        if (longueur > nbLigne) {
            longueur = nbLigne;
        }

        // creation du tableau random et tri

        for (boucle = 0; boucle < longueur; boucle = boucle + 1) {
//            tabRang.push(tabMesSave[boucle]);
            tabMes.push(tabMesSave[boucle]);
        }
        for (boucle = longueur; boucle < nbLigne; boucle = boucle + 1) {
            tabMes.push(0);
        }

        for (boucle = 0; boucle < nbLigne; boucle = boucle + 1) {
            //n
            tRan.push(boucle + 1);
            //mesure
            if (boucle < longueur) {
                if (tabMes[boucle] !== undefined) {
                    tMes.push(tabMes[boucle]);
                } else {
                    tMes.push(0);
                }
            } else {
                tMes.push(0);
            }
        }
        majTableau(Appelant, t);
        //formatTableau();
    }

}
function creationTableauSg(Appelant) {

    var edit, cell, texte, tableau,
        table, tablehead, row, tablebody, select,
        nSg, nInd, nbLigne = 0,
        boucle, boucleind, bouclesg, indice,
        numColonne,
        tabRang = [],
        tabSG = [],
        tabMes = [],
        longueur,
        arrayLignes,
        arrayCells,
        varCookie,
        retour,
//        tabRangSave = [],
        tabMesSave = [],
//        tabMesureRangSave = [tabMesSave, tabRangSave],
        tRan = [],
        tSg = [],
        tMes = [],
        t = [tRan, tSg, tMes];

    // Met le tableau en mode non editable, cela met à jour les valeurs.
    edit = document.getElementById("input_editable1");
    if (edit.value !== "Modifier les mesures") {
        celluleEditable();
    }
    //test que les select soit tous renseigné, à la création ils sont null
    select = document.getElementById("selectSg");
    nSg = 0;
    if (select !== null) {
        nSg = select.innerHTML;
    }
    select = document.getElementById("selectIndividuSg");
    if (select !== null) {
        nInd = select.innerHTML;
    }
    nbLigne = nSg * nInd;

    // ligne du tableau que l'on va créer
    // si l'un des select est null on ne fait rien

    if (nbLigne !== 0) {
        //On récupére les anciennes valeurs de mesure pour les reinjecter dans le tableau
        tableau = document.getElementById('div_tableau2');
        if (tableau.getElementsByTagName('Table').length > 0) {
            arrayLignes = tableau.getElementsByTagName('Table')[0].rows; //l'array est stocké dans une variable
            longueur = arrayLignes.length - 1; //on supprime le titre pour obtenir seulement les lignes avec valeurs
            //Met à jour le tableau de sauvegarde des mesures
            // on commence à la deuxieme ligne ( la première étant le titre)
            for (boucle = 1; boucle <= longueur; boucle = boucle + 1) {
                arrayCells = arrayLignes[boucle].cells;
                tabMesSave.push(arrayCells[2].innerHTML);
//                tabRangSave.push(arrayCells[0].innerHTML);
            }
        } else {
            longueur = 0;
        }

        //si la longueur des anciennes valeurs est supérieur au nouveau tableau alors on tronque la récupération
        if (longueur > nbLigne) {
            longueur = nbLigne;
        }

        // creation du tableau random et tri

        for (boucle = 0; boucle < longueur; boucle = boucle + 1) {
//            tabRang.push(tabMesSave[boucle]);
            tabMes.push(tabMesSave[boucle]);
        }
        for (boucle = longueur; boucle < nbLigne; boucle = boucle + 1) {
            tabMes.push(0);
        }

        for (bouclesg = 0; bouclesg < nSg; bouclesg = bouclesg + 1) {
            for (boucleind = 0; boucleind < nInd; boucleind = boucleind + 1) {
                //n
                tRan.push(bouclesg * nInd + boucleind + 1);
                tSg.push(bouclesg + 1);
                //mesure
                if (boucle < longueur) {
                    if (tabMes[boucle] !== undefined) {
                        tMes.push(tabMes[boucle]);
                    } else {
                        tMes.push(0);
                    }
                } else {
                    tMes.push(0);
                }
            }
        }
        majTableauSg(Appelant, t);
        //formatTableau();
    }

}
function recupLocalStorage() {
    var Appelant, nbSg, nbIndividu, nbLigne = 0,
        tabRang = [],
        tabMes = [],
        tabRang2 = [],
        tabMes2 = [],
        tabSg = [],
        tab = [tabRang, tabMes],
        tab2 = [tabRang2, tabSg, tabMes2],
        boucle = 0,
        select, valeur, valeurSplit,
        erreur, erreursg;

    select = document.getElementById("selectMesure");
    if (select !== null) {
        nbLigne = select.innerHTML;
    }

    for (boucle = 1; boucle <= nbLigne; boucle = boucle + 1) {
        valeur = localStorage.getItem("CapLigne" + boucle);
        if (valeur !== null) {
            erreur = 0;
            valeurSplit = valeur.split(";");
            tabRang.push(valeurSplit[0]);
            tabMes.push(valeurSplit[1]);
        } else {
            erreur = 1;
            boucle = nbLigne;
        }
    }
    
    select = document.getElementById("selectSg");
    nbSg = 0;
    if (select !== null) {
        nbSg = select.innerHTML;
    }
    select = document.getElementById("selectIndividuSg");
    nbIndividu = 0;
    if (select !== null) {
        nbIndividu = select.innerHTML;
    }

    nbLigne = nbSg * nbIndividu;
    
    
    for (boucle = 1; boucle <= nbLigne; boucle = boucle + 1) {
        valeur = localStorage.getItem("CapSgLigne" + boucle);
        if (valeur !== null) {
            erreursg = 0;
            valeurSplit = valeur.split(";");
            tabRang2.push(valeurSplit[0]);
            tabSg.push(valeurSplit[1]);
            tabMes2.push(valeurSplit[2]);
        } else {
            erreursg = 1;
            boucle = nbLigne;
        }
    }

    if (erreur === 0) {
        Appelant = "recupLocalStorage";
        majTableau(Appelant, tab);
    }

    if (erreursg === 0) {
        Appelant = "recupLocalStorage";
        majTableauSg(Appelant, tab2);
    }
    
    
}
function start() {

    
    recupCookie();
    creationTableau("start");
    creationTableauSg("start");
    recupLocalStorage();
    /*global start_onglet*/
    start_onglet();
    //    /*global translationTab*/
    //    translationTab();
    /*global clipboard*/
    clipboard();
    /*global testLimite*/
    testLimite();
}
function changeSelectMesure() {
    var select;
    /*global prompt*/
    select = document.getElementById("selectMesure").innerHTML;
    select = prompt("Entrer le nombre de mesures", select);
    if (select !== null) {
        select = Number(select);
        if (select > 0) {
            document.getElementById("selectMesure").innerHTML = select;
            creationTableau("select");
        }
    }
}
function changeSelectSg() {
    var select;
    /*global prompt*/
    select = document.getElementById("selectSg").innerHTML;
    select = prompt("Entrer le nombre de sous groupe", select);
    if (select !== null) {
        select = Number(select);
        if (select > 0) {
            document.getElementById("selectSg").innerHTML = select;
            creationTableauSg("select");
        }
    }
}
function changeSelectIndividuSg() {
    var select;
    /*global prompt*/
    select = document.getElementById("selectIndividuSg").innerHTML;
    select = prompt("Entrer le nombre d'individu par sous groupe", select);
    if (select !== null) {
        select = Number(select);
        if (select > 0) {
            document.getElementById("selectIndividuSg").innerHTML = select;
            creationTableauSg("select");
        }
    }
}
function resetMesure() {
    var tableau, arrayLignes, arrayCells, longueur, boucle,
        edit;
    
    // Met le tableau en mode non editable, cela met à jour les valeurs.
    edit = document.getElementById("input_editable1");
    if (edit.value !== "Modifier les mesures") {
        celluleEditable(1);
    }
    
    tableau = document.getElementById('div_tableau1');
    if (tableau.getElementsByTagName('Table').length > 0) {
        arrayLignes = tableau.getElementsByTagName('Table')[0].rows; //l'array est stocké dans une variable
        longueur = arrayLignes.length - 1; //on supprime le titre pour obtenir seulement les lignes avec valeurs
        //Met à jour le tableau de sauvegarde des mesures
        // on commence à la deuxieme ligne ( la première étant le titre)
        for (boucle = 1; boucle <= longueur; boucle = boucle + 1) {
            arrayCells = arrayLignes[boucle].cells;
            arrayCells[1].innerHTML = 0;
        }
    }

    majCalcul();
    
}
function resetMesureSg() {
    var tableau, arrayLignes, arrayCells, longueur, boucle,
        edit;
    
    // Met le tableau en mode non editable, cela met à jour les valeurs.
    edit = document.getElementById("input_editable2");
    if (edit.value !== "Modifier les mesures") {
        celluleEditable(2);
    }
    
    tableau = document.getElementById('div_tableau2');
    if (tableau.getElementsByTagName('Table').length > 0) {
        arrayLignes = tableau.getElementsByTagName('Table')[0].rows; //l'array est stocké dans une variable
        longueur = arrayLignes.length - 1; //on supprime le titre pour obtenir seulement les lignes avec valeurs
        //Met à jour le tableau de sauvegarde des mesures
        // on commence à la deuxieme ligne ( la première étant le titre)
        for (boucle = 1; boucle <= longueur; boucle = boucle + 1) {
            arrayCells = arrayLignes[boucle].cells;
            arrayCells[2].innerHTML = 0;
        }
    }

    majCalculSg();
    
}