"use strict";
function majCookie() {
    var valeurCookie, select;
    select = document.getElementById("selectPiece");
    if (select !== null) {
        valeurCookie = select.innerHTML;
        /*global setCookie*/
        setCookie("selectPieceRRA", valeurCookie, 365);
    }
    select = document.getElementById("selectOperateur");
    if (select !== null) {
        valeurCookie = select.value;
        /*global setCookie*/
        setCookie("selectOperateurRRA", valeurCookie, 365);
    }
    select = document.getElementById("selectEssai");
    if (select !== null) {
        valeurCookie = select.value;
        /*global setCookie*/
        setCookie("selectEssaiRRA", valeurCookie, 365);
    }
    valeurCookie = document.forms.frmTitre.txtTitre.value;
    /*global setCookie*/
    setCookie("selectTitreRRA", valeurCookie, 365);
}
function majCalcul() {
    
    //document.getElementById("selectMesure").innerHTML = longueur;
    /*global calcul*/
    calcul();
    /*global majLocalStorage*/
    majCookie();
    majLocalStorage("RRA", 3); // prefixe et numero du tableau

}
function celluleEditable() {

    var edit,
        tableau,
        arrayLignes,
        longueur,
        i = 1,
        j,
        arrayCells,
        numCelluleMesure = 4;

    edit = document.getElementById("input_editable");
    tableau = document.getElementById("div_tableau");
    arrayLignes = tableau.getElementsByTagName("Table")[0].rows; //l'array est stocké dans une variable
    longueur = arrayLignes.length; //on peut donc appliquer la propriété length


    while (i < longueur) {
        arrayCells = arrayLignes[i].cells;
        for (j = 0; j < 2; j = j + 1) {
            /*global gestionCelluleEditable*/
            gestionCelluleEditable(arrayCells[numCelluleMesure + j], edit);
        }
        i = i + 1;
    }
    if (edit.value === "Modifier les mesures") {
        edit.value = "Valider les modifications";
    } else {
        edit.value = "Modifier les mesures";
        majCalcul();
    }
    //formatTableau();

}
function clickValiderNom() {
    var tableau, arrayLignes, longueur, i, j, arrayCells,
        div_inputNom, input, label,
        tabNom = [],
        tabNomNew = [];

    div_inputNom = document.getElementById("div_inputNom");
    input = div_inputNom.getElementsByTagName("input");
    label = div_inputNom.getElementsByTagName("label");


    for (i = 0; i < input.length; i = i + 1) {
        tabNom.push(label[i].innerHTML);
        tabNomNew.push(input[i].value);
    }

    tableau = document.getElementById('div_tableau');
    if (tableau.getElementsByTagName('Table').length > 0) {
        arrayLignes = tableau.getElementsByTagName('Table')[0].rows; //l'array est stocké dans une variable
        longueur = arrayLignes.length - 1; //on supprime le titre pour obtenir seulement les lignes avec valeurs
        // on commence à la deuxieme ligne ( la première étant le titre)
    } else {
        longueur = 0;
    }


    for (i = 1; i <= longueur; i = i + 1) {
        for (j = 0; j < tabNom.length; j = j + 1) {
            arrayCells = arrayLignes[i].cells;
            if (arrayCells[1].innerHTML === tabNom[j]) {
                arrayCells[1].innerHTML = tabNomNew[j];
                j = tabNom.length;
            }
        }
    }

    //Met à jour les noms dans le label
    for (i = 0; i < input.length; i = i + 1) {
        label[i].innerHTML = tabNomNew[i];
    }

    
    majCalcul();
}
function creationNom(tabOperateur) {
    var div, nomAnc, inputNomNew, div_inputNom, select,
        i,
        tabNom = [],
        btn;

    tabNom.push(tabOperateur[0]);
    for (i = 1; i < tabOperateur.length - 1; i = i + 1) {
        if (tabOperateur[i] !== tabOperateur[i - 1]) {
            tabNom.push(tabOperateur[i]);
        }
    }
    select = document.getElementById("selectOperateur");
    select.value = tabNom.length;
    div_inputNom = document.getElementById("div_inputNom");
    div_inputNom.innerHTML = "";

    //select = document.getElementById("selectOperateur");
    for (i = 0; i < tabNom.length; i = i + 1) {
        nomAnc = document.createElement("label");
        nomAnc.innerHTML = tabNom[i];
        inputNomNew = document.createElement("input");
        inputNomNew.value = tabNom[i];
        inputNomNew.type = "text";
        div_inputNom.appendChild(nomAnc);
        div_inputNom.appendChild(inputNomNew);
    }
    btn = document.createElement("button");
    btn.id = "btnValiderNom";
    btn.innerHTML = "Valider";
    btn.type = "button";
    btn.addEventListener("click", clickValiderNom);
    div_inputNom.appendChild(btn);
}
function resetMesure() {
    var tableau, arrayLignes, arrayCells, longueur, boucle,
        edit;
    
    // Met le tableau en mode non editable, cela met à jour les valeurs.
    edit = document.getElementById("input_editable");
    if (edit.value !== "Modifier les mesures") {
        celluleEditable();
    }
    
    tableau = document.getElementById('div_tableau');
    if (tableau.getElementsByTagName('Table').length > 0) {
        arrayLignes = tableau.getElementsByTagName('Table')[0].rows; //l'array est stocké dans une variable
        longueur = arrayLignes.length - 1; //on supprime le titre pour obtenir seulement les lignes avec valeurs
        //Met à jour le tableau de sauvegarde des mesures
        // on commence à la deuxieme ligne ( la première étant le titre)
        for (boucle = 1; boucle <= longueur; boucle = boucle + 1) {
            arrayCells = arrayLignes[boucle].cells;
            arrayCells[4].innerHTML = 0;
            arrayCells[5].innerHTML = 0;
        }
    }

    majCalcul();
    
}
function majTableau(Appelant, tab) {
    //tab [tabRang ,tabOpe,tabPie,tabRep,tabMes)
    var edit, cell, texte, tableau,
        table, tablehead, row, tablebody,
        boucle, nbLigne, tabNom = [];

    tabNom = tab[1].slice();
    //creationNom(tabNom.sort(sortTab1));
    creationNom(tabNom.sort());

    nbLigne = tab[0].length;
    if (nbLigne !== 0) {
        document.getElementById('div_tableau').innerHTML = ""; // on efface le tableau
        // Création des titres        
        tableau = document.getElementById('div_tableau');
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
        texte = document.createTextNode("Operateur");
        cell.appendChild(texte);
        row.appendChild(cell);
        cell = document.createElement("td");
        texte = document.createTextNode("Piece");
        cell.appendChild(texte);
        row.appendChild(cell);
        cell = document.createElement("td");
        texte = document.createTextNode("Repetition");
        cell.appendChild(texte);
        row.appendChild(cell);
        cell = document.createElement("td");
        texte = document.createTextNode("Mesure");
        cell.appendChild(texte);
        row.appendChild(cell);
        cell = document.createElement("td");
        texte = document.createTextNode("Reference");
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
            //Operateur
            cell = document.createElement("td");
            texte = document.createTextNode(tab[1][boucle]);
            cell.appendChild(texte);
            row.appendChild(cell);
            //Piece
            cell = document.createElement("td");
            texte = document.createTextNode(tab[2][boucle]);
            cell.appendChild(texte);
            row.appendChild(cell);
            //Repetition
            cell = document.createElement("td");
            texte = document.createTextNode(tab[3][boucle]);
            cell.appendChild(texte);
            row.appendChild(cell);
            //mesure
            cell = document.createElement("td");
            texte = document.createTextNode(tab[4][boucle]);
            cell.appendChild(texte);
            row.appendChild(cell);
            //référence
            cell = document.createElement("td");
            texte = document.createTextNode(tab[5][boucle]);
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
function creationTableau(Appelant) {

    var edit, cell, texte, tableau,
        table, tablehead, row, tablebody, select,
        nbOperateur = 0,
        nbPiece = 0,
        nbRepetition = 0,
        nbLigne = 0,
        boucleOpe, boucleRep, bouclePie, boucle, indice,
        numColonne,
        tRefSave = [],
        tMesSave = [],
        numRep,
        longueur,
        arrayLignes,
        arrayCells,
        varCookie,
        numCelluleMesure = 4,
        retour,
        tRan = [],
        tOpe = [],
        tPie = [],
        tRep = [],
        tMes = [],
        tRef = [],
        t = [tRan, tOpe, tPie, tRep, tMes, tRef];

    // Met le tableau en mode non editable, cela met à jour les valeurs.
    edit = document.getElementById("input_editable");
    if (edit.value !== "Modifier les mesures") {
        celluleEditable();
    }
    //test que les select soit tous renseigné, à la création ils sont null
    select = document.getElementById("selectOperateur");
    if (select !== null) {
        nbOperateur = select.value;
        select = document.getElementById("selectPiece");
        if (select !== null) {
            nbPiece = select.innerHTML;
            select = document.getElementById("selectRepetition");
            if (select !== null) {
                nbRepetition = select.value;
            }
        }
    }
    nbLigne = nbOperateur * nbPiece * nbRepetition; // nombre de ligne du tableau que l'on va créer
    // si l'un des select est null on ne fait rien

    if (nbLigne !== 0) {

        //On récupére les anciennes valeurs de mesure pour les reinjecter dans le tableau
        tableau = document.getElementById('div_tableau');
        if (tableau.getElementsByTagName('Table').length > 0) {
            arrayLignes = tableau.getElementsByTagName('Table')[0].rows; //l'array est stocké dans une variable
            longueur = arrayLignes.length - 1; //on supprime le titre pour obtenir seulement les lignes avec valeurs
            //Met à jour le tableau de sauvegarde des mesures
            // on commence à la deuxieme ligne ( la première étant le titre)
            for (boucle = 1; boucle <= longueur; boucle = boucle + 1) {
                arrayCells = arrayLignes[boucle].cells;
                tMesSave.push(arrayCells[numCelluleMesure].innerHTML);
                tRefSave.push(arrayCells[numCelluleMesure + 1].innerHTML);
            }
//            newtabMesureRangSave.sort(sortTab2Col2); // tri le tableau sur le rang 
        } else {
            longueur = 0;
        }

        // creation du tableau Array
        for (boucleOpe = 0; boucleOpe < nbOperateur; boucleOpe = boucleOpe + 1) {
            for (boucleRep = 0; boucleRep < nbRepetition; boucleRep = boucleRep + 1) {
                for (bouclePie = 0; bouclePie < nbPiece; bouclePie = bouclePie + 1) {
                    tOpe.push(boucleOpe + 1);
                    tRep.push(boucleRep + 1);
                    tPie.push(bouclePie + 1);
                }
            }
        }

        //si la longeur des anciennes valeurs est supérieur au nouveau tableau alors on tronque la récupération
        if (longueur > nbLigne) {
            longueur = nbLigne;
        }

        for (boucle = 0; boucle < nbLigne; boucle = boucle + 1) {
            //n
            tRan.push(boucle + 1);
            //mesure
            if (boucle < longueur) {
                tMes.push(tMesSave[boucle]);
                tRef.push(tRefSave[boucle]);
            } else {
                tMes.push(0);
                tRef.push(0);
            }
        }


        majTableau(Appelant, t);
        //formatTableau();
    }

}
function changeSelectPiece() {
    var select;
    /*global prompt*/
    select = document.getElementById("selectPiece").innerHTML;
    select = prompt("Entrer le nombre de pièce", select);
    if (select !== null) {
        select = Number(select);
        if (select > 0) {
            document.getElementById("selectPiece").innerHTML = select;
            creationTableau("select");
        }
    }
}
function changeSelect() {
    creationTableau("select");
}
function copieTableauVersPressePapier() {
    // copier les mesures dans le clipboard
    var edit,
        textarea,
        tableau,
        arrayLignes,
        longueur,
        i,
        j,
        Commentaire,
        arrayCells,
        btnCopy,
        temp,
        numCelluleMesure = 4;
    edit = document.getElementById('input_editable');
    textarea = document.getElementById('clipboard');

    if (edit.value !== "Modifier les mesures") {
        celluleEditable();
    }

    tableau = document.getElementById('div_tableau');
    arrayLignes = tableau.getElementsByTagName('Table')[0].rows; //l'array est stocké dans une variable
    longueur = arrayLignes.length; //on peut donc appliquer la propriété length

    //i = 1; // sans titre
    i = 0; //avec titre
    textarea.value = "";
    while (i < longueur) {
        arrayCells = arrayLignes[i].cells;
        //        textarea.value += "Mesure" + i + "\t" + arrayCells[numCelluleMesure].innerHTML;
        for (j = 0; j < arrayCells.length; j = j + 1) {
            textarea.value += arrayCells[j].innerHTML + "\t";
        }
        i = i + 1;
        if (i !== longueur) {
            textarea.value += "\n";
        }
    }

    // Copie dans le presse papier le contenu du textarea
    textarea.select();
    btnCopy = document.getElementById("boutonCopieTableauVersPressePapier");
    // execute la commande copie dans le pressePapier
    if (document.execCommand('copy')) {
        btnCopy.classList.add('copied');
        temp = setInterval(function () {
            btnCopy.classList.remove('copied');
            clearInterval(temp);
        }, 600);

    }
}
function copieTableauDepuisPressePapier(textareaclipboard) {
    //
    var textarea, i, j,
        ligne = [],
        cellule = [],
        ran = [],
        ope = [],
        pie = [],
        rep = [],
        mes = [],
        ref = [],
        tab = [ran, ope, pie, rep, mes, ref],
        aleatoire, maxope = 0,
        maxpie = 0,
        maxrep = 0,
        btnrecup, temp, Erreur = 0;
    
    if (textareaclipboard === undefined) {
        textareaclipboard = 'collerclipboard';
    }

    
    textarea = document.getElementById(textareaclipboard);
    ligne = textarea.value.split("\n");
    if (ligne.length > 1) {
        for (i = 1; i < ligne.length; i = i + 1) {
            cellule = ligne[i].split("\t");
            if (cellule.length >= 5) {
                ran.push(parseInt(cellule[0], 10));
                ope.push(cellule[1]);
                pie.push(parseInt(cellule[2], 10));
                rep.push(parseInt(cellule[3], 10));
                mes.push(parseInt(cellule[4], 10));
                ref.push(parseInt(cellule[5], 10));
                /*
                                if (maxope < ope[i - 1]) {maxope = ope[i - 1]; }
                                if (maxpie < pie[i - 1]) {maxpie = pie[i - 1]; }
                                if (maxrep < rep[i - 1]) {maxrep = rep[i - 1]; }
                */
            } else {
                i = ligne.length;
                //Erreur = 1;
            }
        }
        if (Erreur === 0) {
            /*
                        document.getElementById("selectOperateur").value = maxope;
                        document.getElementById("selectPiece").value = maxpie;
                        document.getElementById("selectRepetition").value = maxrep;
            */

            majTableau("copieTableauDepuisPressePapier", tab);
            btnrecup = document.getElementById("boutonCopieTableauDepuisPressePapier");
            btnrecup.classList.add('copied');
            temp = setInterval(function () {
                btnrecup.classList.remove('copied');
                clearInterval(temp);
            }, 600);
        }

    }
}
function enregistrerCsvRRA() {
    var btnSave, temp,
        // exportToCsv('export.csv', [['name', 'description'], ['david', '123'], ['jona', '""'], ['a', 'b']]);
        rang, operateur, piece, repetition, mesure, reference,
        boucle, longueur,
        tableau, arrayLignes, arrayCells,
        ligne,
        data = [[]],
        filename, entete;

    tableau = document.getElementById('div_tableau');
    if (tableau.getElementsByTagName('Table').length > 0) {
        arrayLignes = tableau.getElementsByTagName('Table')[0].rows; //l'array est stocké dans une variable
        longueur = arrayLignes.length; //on peut donc appliquer la propriété length
        for (boucle = 0; boucle < longueur; boucle = boucle + 1) {
            arrayCells = arrayLignes[boucle].cells;
            rang = arrayCells[0].innerHTML;
            operateur = arrayCells[1].innerHTML;
            piece = arrayCells[2].innerHTML;
            repetition = arrayCells[3].innerHTML;
            if (arrayCells[4].innerHTML !== undefined) {
                mesure = arrayCells[4].innerHTML;
            } else {
                mesure = 0;
            }
            if (arrayCells[5].innerHTML !== undefined) {
                reference = arrayCells[5].innerHTML;
            } else {
                reference = 0;
            }
            ligne = [rang, operateur, piece, repetition, mesure, reference];
            data.push(ligne);
        }
    }
    //filename = 'export.csv';
    filename = document.forms.frmTitre.txtTitre.value + ".csv";
    /*global prompt*/
    filename = prompt("Nom du fichier de sauvegarde", filename);
    if (filename !== null) {
        entete = '';
        entete += "Nb Operateur;" + document.getElementById("selectOperateur").value + '\n';
        entete += "Nb Piece;" + document.getElementById("selectPiece").innerHTML + '\n';
        entete += "Nb Repetition;" + document.getElementById("selectRepetition").value + '\n';
        /*global exportToCsv*/
        exportToCsv(filename, entete, data);

        btnSave = document.getElementById("boutonEnregistrerCsv");
        btnSave.classList.add('copied');
        temp = setInterval(function () {
            btnSave.classList.remove('copied');
            clearInterval(temp);
        }, 600);
    }
}
function majTitre() {
    var date, jour, mois;
    
    date = new Date();
    
    mois = date.getMonth() + 1;
    if (mois < 10) {
        mois = "0" + mois;
    }
    jour = date.getDate();
    if (jour < 10) {
        jour = "0" + jour;
    }
    document.forms.frmTitre.txtTitre.value = date.getFullYear() + mois + jour;

    majCookie();
}
function recupCookie() {
    var valeurCookie;
    /*global getCookie*/
    valeurCookie = getCookie("selectOperateurRRA");
    if (valeurCookie === "") {
        valeurCookie = 3;
    }
    document.getElementById("selectOperateur").value = valeurCookie;
    valeurCookie = getCookie("selectPieceRRA");
    if (valeurCookie === "") {
        valeurCookie = 10;
    }
    document.getElementById("selectPiece").innerHTML = valeurCookie;
    valeurCookie = getCookie("selectRepetitionRRA");
    if (valeurCookie === "") {
        valeurCookie = 3;
    }
    document.getElementById("selectRepetition").value = valeurCookie;
    valeurCookie = getCookie("TitreRRA");
    if (valeurCookie === "") {
        majTitre();
    } else {
        document.forms.frmTitre.txtTitre.value = valeurCookie;
    }
}
function recupLocalStorageRRA() {
    var Appelant, nbOperateur, nbPiece, nbRepetition, nbLigne,
        tabRang = [],
        tabOpe = [],
        tabPie = [],
        tabRep = [],
        tabMes = [],
        tabRef = [],
        tab = [tabRang, tabOpe, tabPie, tabRep, tabMes, tabRef],
        boucle = 0,
        select, valeur, valeurSplit,
        erreur;

    nbOperateur = 0;
    nbPiece = 0;
    nbRepetition = 0;

    select = document.getElementById("selectOperateur");
    if (select !== null) {
        nbOperateur = select.value;
        select = document.getElementById("selectPiece");
        if (select !== null) {
            nbPiece = select.innerHTML;
            select = document.getElementById("selectRepetition");
            if (select !== null) {
                nbRepetition = select.value;
            }
        }
    }
    nbLigne = nbOperateur * nbPiece * nbRepetition;

    for (boucle = 1; boucle <= nbLigne; boucle = boucle + 1) {
        valeur = localStorage.getItem("RRALigne" + boucle);
        if (valeur !== null) {
            erreur = 0;
            valeurSplit = valeur.split(";");
            tabRang.push(valeurSplit[0]);
            tabOpe.push(valeurSplit[1]);
            tabPie.push(valeurSplit[2]);
            tabRep.push(valeurSplit[3]);
            tabMes.push(valeurSplit[4]);
            tabRef.push(valeurSplit[5]);
        } else {
            erreur = 1;
            boucle = nbLigne;
        }
    }
    if (erreur === 0) {
        Appelant = "recupLocalStorage";
        majTableau(Appelant, tab);
    }
}
function start() {
    recupCookie();
    creationTableau("start");
    recupLocalStorageRRA();
    /*global start_onglet*/
    start_onglet();
    /*global clipboard */
    clipboard();
}
function clickNom() {
    var div, input, div_inputNom, select,
        i, taille;
    div =  document.getElementById("div_contenu_Saisie_1").getElementsByClassName("div_select");
    div_inputNom = document.getElementById("div_inputNom");
    select = document.getElementById("selectOperateur");
    if (div[0].style.height !== div[2].style.height) {
        div[0].style.height = div[2].style.height;
        //div_inputNom.style.opacity = 0;
    } else {
        taille = 20 * (Number(select.value) + 1) + 2 * 4 + 2 * 2 + 10;
        div[0].style.height = taille + "px"; //operateur
//        div_inputNom.style.opacity = 1;
    }
}