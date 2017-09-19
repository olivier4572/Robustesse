"use strict";
function drawOutput(lines) {
    var i, j, row,
        table, firstNameCell;
    //Clear previous data
    document.getElementById("output").innerHTML = "";
    table = document.createElement("table");
    for (i = 0; i < lines.length; i = i + 1) {
        row = table.insertRow(-1);
        for (j = 0; j < lines[i].length; j = j + 1) {
            firstNameCell = row.insertCell(-1);
            firstNameCell.appendChild(document.createTextNode(lines[i][j]));
        }
    }
    document.getElementById("output").appendChild(table);
}
function errorHandler(evt) {
    if (evt.target.error.name === "NotReadableError") {
        /*global alert*/
        alert("Canno't read file !");
    }
}
function processDataRetRAttributs(csv) {
    var allTextLines, lines = [],
        i, data, tarr = [],
        j,
        tRan = [],
        tOpe = [],
        tPie = [],
        tRep = [],
        tMes = [],
        tRef = [],
        t = [tRan, tOpe, tPie, tRep, tMes, tRef],
        nbope, nbpie, nbrep;


    allTextLines = csv.split(/\r\n|\n/);
    /*
    while (allTextLines.length) {
        lines.push(allTextLines.shift().split(','));
    }*/
    for (i = 0; i < allTextLines.length; i = i + 1) {
        data = allTextLines[i].split(';');
        tarr = [];
        for (j = 0; j < data.length; j = j + 1) {
            tarr.push(data[j]);
        }
        lines.push(tarr);
    }
    /*global console*/
    /*console.log(lines);*/
    //drawOutput(lines);

    for (i = 0; i < allTextLines.length; i = i + 1) {
        data = allTextLines[i].split(';');
        if (data.length > 1) {
            switch (data[0]) {
            case "Nb Operateur":
                nbope = Number(data[1]);
                break;
            case "Nb Piece":
                nbpie = Number(data[1]);
                break;
            case "Nb Repetition":
                nbrep = Number(data[1]);
                break;
            default:
            }

            if (data.length > 5) {
                if (i > 4) {
                    if (data[0] !== "") {
                        tRan.push(Number(data[0]));
                        tOpe.push(data[1]);
                        tPie.push(Number(data[2]));
                        tRep.push(Number(data[3]));
                        tMes.push(parseFloat(data[4].replace(",", ".")));
                        tRef.push(parseFloat(data[5].replace(",", ".")));
                    }
                }
            }
        }
    }
    document.getElementById("selectOperateur").value = nbope;
    document.getElementById("selectPiece").innerHTML = nbpie;
    document.getElementById("selectRepetition").value = nbrep;

    /*global majTableau*/
    majTableau("csv", t);
}
function processDataRetRMesures(csv) {
    var allTextLines, lines = [],
        i, data, tarr = [],
        j,
        tRan = [],
        tOpe = [],
        tPie = [],
        tRep = [],
        tMes = [],
        t = [tRan, tOpe, tPie, tRep, tMes],
        nbope, nbpie, nbrep, aleatoire, selectaleatoire;


    allTextLines = csv.split(/\r\n|\n/);
    /*
    while (allTextLines.length) {
        lines.push(allTextLines.shift().split(','));
    }*/
    for (i = 0; i < allTextLines.length; i = i + 1) {
        data = allTextLines[i].split(';');
        tarr = [];
        for (j = 0; j < data.length; j = j + 1) {
            tarr.push(data[j]);
        }
        lines.push(tarr);
    }
    /*global console*/
    /*console.log(lines);*/
    //drawOutput(lines);

    for (i = 0; i < allTextLines.length; i = i + 1) {
        data = allTextLines[i].split(';');
        if (data.length > 1) {
            switch (data[0]) {
            case "Nb Operateur":
                nbope = Number(data[1]);
                break;
            case "Nb Piece":
                nbpie = Number(data[1]);
                break;
            case "Nb Repetition":
                nbrep = Number(data[1]);
                break;
            case "Fixe":
                //Fixe ou aleatoire
                if (data[0] === "Fixe") {
                    aleatoire = 2;
                } else {
                    aleatoire = 1;
                    selectaleatoire = data[1];
                }
                break;
            default:
            }

            if (data.length > 4) {
                if (i > 5) {
                    if (data[0] !== "") {
                        tRan.push(Number(data[0]));
                        tOpe.push(data[1]);
                        tPie.push(Number(data[2]));
                        tRep.push(Number(data[3]));
                        tMes.push(parseFloat(data[4].replace(",", ".")));
                    }
                }
            }
        }
    }
    document.getElementById("selectOperateur").value = nbope;
    document.getElementById("selectPiece").value = nbpie;
    document.getElementById("selectRepetition").value = nbrep;

    /*global majTableau*/
    majTableau("csv", t);
}
function processDataCapaCarte(csv) {
    var allTextLines, lines = [],
        i, data, tarr = [],
        j,
        tRan = [],
        tMes = [],
        t = [tRan, tMes],
        nbmes;


    
    
    
    allTextLines = csv.split(/\r\n|\n/);
    /*
    while (allTextLines.length) {
        lines.push(allTextLines.shift().split(','));
    }*/
    for (i = 0; i < allTextLines.length; i = i + 1) {
        data = allTextLines[i].split(';');
        tarr = [];
        for (j = 0; j < data.length; j = j + 1) {
            tarr.push(data[j]);
        }
        lines.push(tarr);
    }
    /*global console*/
    /*console.log(lines);*/
    //drawOutput(lines);

    for (i = 0; i < allTextLines.length; i = i + 1) {
        data = allTextLines[i].split(';');
        if (data.length > 1) {
            switch (data[0]) {
            case "Nb Mesure":
                nbmes = Number(data[1]);
                break;
            case "n":
                break;
            default:
                if (data[0] !== "") {
                    tRan.push(Number(data[0]));
                    tMes.push(parseFloat(data[1].replace(",", ".")));
                }
            }
        }
    }
    document.getElementById("selectMesure").innerHTML = nbmes;

    /*global majTableau*/
    majTableau("csv", t);
}
function processDataCapaCarteSg(csv) {
    var allTextLines, lines = [],
        i, data, tarr = [],
        j,
        tRan = [],
        tSg = [],
        tMes = [],
        t = [tRan, tSg, tMes],
        nbSg, nbInd;

    allTextLines = csv.split(/\r\n|\n/);
    /*
    while (allTextLines.length) {
        lines.push(allTextLines.shift().split(','));
    }*/
    for (i = 0; i < allTextLines.length; i = i + 1) {
        data = allTextLines[i].split(';');
        tarr = [];
        for (j = 0; j < data.length; j = j + 1) {
            tarr.push(data[j]);
        }
        lines.push(tarr);
    }
    /*global console*/
    /*console.log(lines);*/
    //drawOutput(lines);
    for (i = 0; i < allTextLines.length; i = i + 1) {
        data = allTextLines[i].split(';');
        if (data.length > 1) {
            switch (data[0]) {
            case "Nb Sous-groupes":
                nbSg = Number(data[1]);
                break;
            case "Nb Individus":
                nbInd = Number(data[1]);
                break;
            case "n":
                break;
            default:
                if (data[0] !== "") {
                    tRan.push(Number(data[0]));
                    tSg.push(Number(data[1]));
                    tMes.push(parseFloat(data[2].replace(",", ".")));
                }
            }
        }
    }
    
    document.getElementById("selectSg").innerHTML = nbSg;
    document.getElementById("selectIndividuSg").innerHTML = nbInd;

    /*global majTableauSg*/
    majTableauSg("csv", t);
}
function loadHandlerRetRAttributs(event) {
    var csv = event.target.result;
    processDataRetRAttributs(csv);
}
function loadHandlerRetRMesures(event) {
    var csv = event.target.result;
    processDataRetRMesures(csv);
}
function loadHandlerCapaCarte(event) {
    var csv = event.target.result;
    processDataCapaCarte(csv);
}
function loadHandlerCapaCarteSg(event) {
    var csv = event.target.result;
    processDataCapaCarteSg(csv);
}
function getAsText(fileToRead, num) {
    /*global FileReader*/
    var reader = new FileReader();
    // Handle errors load
    if (num === undefined) {
        reader.onload = loadHandlerRetRMesures;
    }
    if (num === 1) {
        reader.onload = loadHandlerCapaCarte;
    }
    if (num === 2) {
        reader.onload = loadHandlerCapaCarteSg;
    }
    if (num === 3) {
        reader.onload = loadHandlerRetRAttributs;
    }
    reader.onerror = errorHandler;
    // Read file into memory as UTF-8      
    reader.readAsText(fileToRead);
}
function resetFiles(num) {
    if (num === undefined) {
        document.forms.formfichier.fichier.value = "";
    } else {
        if (num === 3) {
            document.forms.formfichier.fichier.value = "";
        } else {
            if (num === 1) {
                document.forms.formfichier1.fichier1.value = "";
            } else {
                document.forms.formfichier2.fichier2.value = "";
            }
        }
    }
}
function handleFiles(files, num) {
    var btnOuvrir, temp;
    // Check for the various File API support.
    
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // FileReader are supported.
        if (files[0] !== undefined) {
            getAsText(files[0], num);
            if (num === undefined) {
                btnOuvrir = document.getElementById("labelOuvrir");
            } else {
                if (num === 3) {
                    btnOuvrir = document.getElementById("labelOuvrir");
                } else {
                    btnOuvrir = document.getElementById("labelOuvrir" + num);
                }
            }
            btnOuvrir.classList.add('copied');
            temp = setInterval(function () {
                btnOuvrir.classList.remove('copied');
                clearInterval(temp);
            }, 600);
        }
    } else {
        alert('FileReader are not supported in this browser.');
    }
}