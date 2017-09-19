"use strict";
var temp, varSetCopie;

function setversion() {
    document.getElementById("version").innerHTML = "Version 3.7 11/09/2017";
 /*
3.7 11/09/2017
3 - suppreession des footer 
3.6 04/09/2017
1 - Gestion de versions
2 - affichage de la scrollbar des tableaux sous firefox.
*/
}

function loadPageHelp(url) {
    // charge  l'aide dans un iframe
    document.getElementById('div_doc').innerHTML = '<iframe src="' + url + '"></iframe>';
}

function majLocalStorage(Prefixe, num) {

    // met à jour les valeurs des tableaux qui doivent être stockées en local. le prefixe permet de différencié les différents tableaux

    var arrayLignes, arrayCells, longueur, boucle,
        tableauValeur, valeur, i;


    // Création du tableau avec valeur
    if (num !== undefined) {
        if (num === 3) { //RRA
            tableauValeur = document.getElementById('div_tableau');
        } else {
            tableauValeur = document.getElementById('div_tableau' + num);
        }
    } else {
        tableauValeur = document.getElementById('div_tableau');
    }
    arrayLignes = tableauValeur.getElementsByTagName('Table')[0].rows;
    longueur = arrayLignes.length - 1;
    //localStorage.clear();
    for (boucle = 1; boucle <= longueur; boucle = boucle + 1) {
        arrayCells = arrayLignes[boucle].cells;
        valeur = arrayCells[0].innerHTML;
        for (i = 1; i < arrayCells.length; i = i + 1) {
            valeur = valeur + ";" + arrayCells[i].innerHTML;
        }
        localStorage.setItem(Prefixe + "Ligne" + boucle, valeur);
    }

}

function importeMesuresDepuisPressePapier(num, textareaclipboard) {
    // importe les mesures qui sont copié dans la zone collerclipboard. Cette zone est affiché avec le bouton "affiche la zone pour copier le presse papier" (afficheclipboard ci dessous)

    var textarea, i, j,
        ligne = [],
        cellule = [],
        mes = [],
        btnrecup,
        tableau, arrayLignes, arrayCells, longueur,
        valeur;



    if (textareaclipboard === undefined) {
        textareaclipboard = 'collerclipboard';
    }
    if (num === undefined) {
        textarea = document.getElementById(textareaclipboard);
        tableau = document.getElementById('div_tableau');

    } else {
        textarea = document.getElementById(textareaclipboard + num);
        tableau = document.getElementById('div_tableau' + num);
    }

    //    textarea.value = "";
    //    textarea.select();
    //    if (document.execCommand('Paste')) {

    ligne = textarea.value.split("\n");
    if (ligne.length > 1) {
        for (i = 0; i < ligne.length; i = i + 1) {
            cellule = ligne[i].split("\t");
            if (cellule.length >= 1) {
                valeur = parseFloat(cellule[0].replace(',', '.'));
                if (isNaN(valeur) === false) {
                    mes.push(valeur);
                }
            } else {
                i = ligne.length;
            }
        }

        arrayLignes = tableau.getElementsByTagName('Table')[0].rows; //l'array est stocké dans une variable
        longueur = arrayLignes.length - 1; //on peut donc appliquer la propriété length
        if (longueur > mes.length) {
            longueur = mes.length;
        }
        i = 0;
        while (i < longueur) {
            arrayCells = arrayLignes[i + 1].cells;
            arrayCells[arrayCells.length - 1].innerHTML = mes[i];
            i = i + 1;
        }
        /*global majCalcul*/
        /*global majCalculSg*/


        if (num === undefined || num === "" || isNaN(num)) {
            majCalcul();
            btnrecup = document.getElementById("boutonImporterMesuresDepuisPressePapier");
        }
        if (num === 1) {
            majCalcul();
            btnrecup = document.getElementById("boutonImporterMesuresDepuisPressePapier1");
        }
        if (num === 2) {
            majCalculSg();
            btnrecup = document.getElementById("boutonImporterMesuresDepuisPressePapier2");
        }

        btnrecup.classList.add('copied');
        temp = setInterval(function () {
            btnrecup.classList.remove('copied');
            clearInterval(temp);
        }, 600);
    }
    /*
            alert("Coller");
        } else {
            alert("Pas Coller");
        }
    */
}

function intervalsetCopieMesure(num) {
    var textArea = 'clipboard',
        btnCopy;

    clearInterval(varSetCopie);
    if (num === undefined) {
        btnCopy = document.getElementById("boutonCopieMesuresVersPressePapier");
    } else {
        btnCopy = document.getElementById("boutonCopieMesuresVersPressePapier" + num);
    }

    // execute la commande copie dans le pressePapier
    //    if (document.execCommand('Copy')) {
    btnCopy.classList.add('copied');
    temp = setInterval(function () {
        btnCopy.classList.remove('copied');
        clearInterval(temp);
    }, 600);
    //    }

}

function copieMesuresVersPressePapier(num) {
    // copier les mesures dans le clipboard
    var edit,
        textarea,
        tableau,
        arrayLignes,
        longueur,
        i = 1,
        Commentaire,
        arrayCells,
        btnCopy,
        temp,
        numCelluleMesure;

    if (num === undefined) {
        textarea = document.getElementById('clipboard');
        edit = document.getElementById('input_editable');
        tableau = document.getElementById('div_tableau');
        btnCopy = document.getElementById("boutonCopieMesuresVersPressePapier");
    } else {
        textarea = document.getElementById('clipboard' + num);
        edit = document.getElementById('input_editable' + num);
        tableau = document.getElementById('div_tableau' + num);
        btnCopy = document.getElementById("boutonCopieMesuresVersPressePapier" + num);
    }



    if (edit.value !== "Modifier les mesures") {
        /*global celluleEditable*/
        celluleEditable(num);
    }

    arrayLignes = tableau.getElementsByTagName('Table')[0].rows; //l'array est stocké dans une variable
    longueur = arrayLignes.length; //on peut donc appliquer la propriété length

    //met à jour le textarea que l'on voudra mettre dans le pressePapier
    textarea.value = "";

    while (i < longueur) {
        arrayCells = arrayLignes[i].cells;
        numCelluleMesure = arrayCells.length - 1;
        textarea.value += arrayCells[numCelluleMesure].innerHTML;
        i = i + 1;
        if (i !== longueur) {
            textarea.value += "\n";
        }
    }

    // Copie dans le presse papier le contenu du textarea
    textarea.select();
    document.execCommand('Copy');
    varSetCopie = setInterval(function () {
        intervalsetCopieMesure(num);
    }, 500);
}

function exportToCsv(filename, entete, rows) {

    //enregistre le fichier csv avec entete et ligne du tableau

    var processRow, csvFile,
        i,
        blob, link, url, f,
        mimetype = 'text/csv;charset=utf-8;';

    processRow = function (row) {
        var finalVal,
            j,
            innerValue,
            result;

        finalVal = '';
        for (j = 0; j < row.length; j = j + 1) {
            innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString(); // convertit la date en string
            }
            result = innerValue.replace(/"/g, '""'); // remplace tous les " par ""
            if (result.search(/("|,|\n)/g) >= 0) {
                result = '"' + result + '"';
            }
            if (j > 0) {
                finalVal += ';';
            }
            finalVal += result;
        }
        return finalVal + '\n';
    };

    csvFile = entete;

    for (i = 0; i < rows.length; i = i + 1) {
        csvFile += processRow(rows[i]);
    }
    /*global Blob*/
    blob = new Blob([csvFile], {
        type: mimetype
    });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            /*global URL*/
            //url = URL.createObjectURL(blob);
            //link.setAttribute("href", url);
            link.href = 'data:' + mimetype + ',' + encodeURIComponent(csvFile);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else { //do iframe dataURL download (old ch+FF):
            f = document.createElement('iframe');
            document.body.appendChild(f);
            f.src = 'data:' + mimetype + ',' + encodeURIComponent(csvFile);
            setTimeout(function () {
                document.body.removeChild(f);
            }, 333);
        }
    }
}

function enregistrerCsv(num, filename) {
    var btnSave, temp,
        // exportToCsv('export.csv', [['name', 'description'], ['david', '123'], ['jona', '""'], ['a', 'b']]);
        rang, mesure, sg,
        boucle, longueur,
        tableau, arrayLignes, arrayCells,
        ligne,
        data = [[]],
        entete;

    tableau = document.getElementById('div_tableau' + num);
    if (tableau.getElementsByTagName('Table').length > 0) {
        arrayLignes = tableau.getElementsByTagName('Table')[0].rows; //l'array est stocké dans une variable
        longueur = arrayLignes.length; //on peut donc appliquer la propriété length
        for (boucle = 0; boucle < longueur; boucle = boucle + 1) {
            arrayCells = arrayLignes[boucle].cells;
            rang = arrayCells[0].innerHTML;
            if (arrayCells[1].innerHTML !== undefined) {
                mesure = arrayCells[num].innerHTML;
            } else {
                mesure = 0;
            }
            if (num === 2) { // Capa sg
                sg = arrayCells[1].innerHTML;
                ligne = [rang, sg, mesure];
            } else {
                ligne = [rang, mesure];
            }

            data.push(ligne);
        }
    }
    //    if (num === 1) {
    //        filename = 'exportCapaMachine.csv';
    //    } else {
    //        filename = 'exportCapaSg.csv';
    //    }
    /*global prompt*/
    filename = prompt("Nom du fichier de sauvegarde", filename);
    if (filename !== null) {
        entete = '';
        if (num === 1) { //CapaMachine
            entete += "Nb Mesure;" + document.getElementById("selectMesure").innerHTML + '\n';
        } else {
            entete += "Nb Sous-groupes;" + document.getElementById("selectSg").innerHTML + '\n';
            entete += "Nb Individus;" + document.getElementById("selectIndividuSg").innerHTML + '\n';
        }
        /*global exportToCsv*/
        exportToCsv(filename, entete, data);

        btnSave = document.getElementById("boutonEnregistrerCsv" + num);
        btnSave.classList.add('copied');
        temp = setInterval(function () {
            btnSave.classList.remove('copied');
            clearInterval(temp);
        }, 600);
    }
}

function afficheClipboard(num) {
    // Permet d'afficher la zone de copie du clipboard lorsque l'on veut insérer des mesures ou le tableau(RetR) se trouvant dans le presse papier

    var collerclipboard;
    if (num === undefined) {
        collerclipboard = document.getElementById("collerclipboard");
    } else {
        collerclipboard = document.getElementById("collerclipboard" + num);
    }
    if (collerclipboard.style.display === "block") {
        collerclipboard.style.display = "none";
    } else {
        collerclipboard.style.display = "block";
    }
}

function format(valeur, decimal) {
    // formate un chiffre avec 'decimal' chiffres après la virgule et un separateur
    var deci, val_format;

    deci = Math.round(Math.pow(10, decimal) * valeur);
    val_format = deci / Math.pow(10, decimal);
    return val_format;
}

function recupMesureTableau(nmes, numTableau) {
    // Recupere les mesures des tableaux pour la capabilités et les cartes de controles. le tableau 1 pour des valeurs individuelles (2 colonnes) et le tableau 2 avec des sous-groupes (3 colonnes).
    var arrayLignes, arrayCells, longueur, boucle,
        tableauValeur,
        t,
        i, j,
        div_inputNom, label;

    t = [nmes];

    // Création du tableau avec valeur
    tableauValeur = document.getElementById('div_tableau' + numTableau);
    arrayLignes = tableauValeur.getElementsByTagName('Table')[0].rows;
    longueur = arrayLignes.length - 1;
    for (boucle = 1; boucle <= longueur; boucle = boucle + 1) {
        arrayCells = arrayLignes[boucle].cells;
        t[boucle - 1] = parseFloat(arrayCells[numTableau].innerHTML);
    }
    return t;
}

function ancrerSliderDroite() {
    var slidedroite, num;
    slidedroite = document.getElementById('slidedroite');
    num = slidedroite.className.indexOf('pasancrer');
    if (num > -1) {
        slidedroite.className = slidedroite.className.replace('pasancrer', '');
        document.getElementById("imageAncrer").src = "../Image/punaiseON.png";
        document.getElementById("imageAncrer2").src = "../Image/punaiseON.png";
    } else {
        slidedroite.className += ' pasancrer';
        document.getElementById("imageAncrer").src = "../Image/punaiseOFF.png";
        document.getElementById("imageAncrer2").src = "../Image/punaiseOFF.png";
    }
}

function testLimite() {
    var valueSup, valueInf;
    valueSup = 9999;
    if (document.forms.frmLS.txtLSS !== undefined) {
        if (document.forms.frmLS.txtLSS.value !== "") {
            valueSup = parseFloat(document.forms.frmLS.txtLSS.value);
        }
    }
    valueInf = -9999;
    if (document.forms.frmLS.txtLSS !== undefined) {
        if (document.forms.frmLS.txtLSS.value !== "") {
            valueInf = parseFloat(document.forms.frmLS.txtLSI.value);
        }
    }
    if (valueSup < valueInf) {
        /*global alert*/
        //alert("la limite supérieure doit être plus grande que la limite inferieure");
        document.getElementById("divLSS").style.backgroundColor = "red";
        document.getElementById("divLSI").style.backgroundColor = "red";
    } else {
        document.getElementById("divLSS").style.backgroundColor = "white";
        document.getElementById("divLSI").style.backgroundColor = "white";
    }
}

function gestionCelluleEditable(Cellules, edit) {
    var divSaisie, div, contenu;


    if (Cellules.innerHTML === "") {
        Cellules.innerHTML = 0;
    }

    if (edit.value === "Modifier les mesures") {
        divSaisie = document.createElement("input");
        //divSaisie = document.createElement("div");
        divSaisie.setAttribute("contentEditable", true); //rend la saisie active dans la div
        divSaisie.value = Cellules.innerHTML;
        divSaisie.className = "classdivsaisieMesure";
        //divSaisie.addEventListener("click", clickValiderNom);
        /*global applyKeyMesure*/
        //            divSaisie.addEventListener("keydown", applyKeyMesure(event));
        divSaisie.onkeydown = applyKeyMesure;

        Cellules.innerHTML = ""; //vide la cellule
        Cellules.appendChild(divSaisie); //divSaisie remplace le contenu de la cellule 
    } else {
        if (Cellules.getElementsByTagName("input").length > 0) {
            div = Cellules.getElementsByTagName("input")[0]; //recherche la div contenue par la cellule - retourne le premier child de type "div"
            contenu = div.value; //réccupère le contenu de la div
            Cellules.removeChild(div); //supprime la div, donc vide la cellule de tout contenu
            contenu = parseFloat(contenu.replace(',', '.'));
            if (isNaN(contenu) === false) {
                Cellules.innerHTML = contenu; //actualise le contenu de la cellule avec celui de la div précédemment supprimée
            } else {
                Cellules.innerHTML = 0;
            }
        }
    }
}
