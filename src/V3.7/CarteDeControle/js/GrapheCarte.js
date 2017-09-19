"use strict";
//MainGen.js
/*global format*/
//Chart.bundle.js
/*global Chart*/
function createChart2(idDiv, idchart, lsc, lic, Valeur, Moyenne, titre, NomValeur) {

    var color, lineChart,
        t, i,
        ctx, denominateur,
        div, can,
        data, options, labels, tlic, tlsc, tMoyenne;


    
    labels = [Valeur.length];
    data = [Valeur.length];
    tlic = [Valeur.length];
    tlsc = [Valeur.length ];
    tMoyenne = [Valeur.length];

    for (i = 0; i < Valeur.length; i = i + 1) {
        labels[i] = i + 1;
        data[i] = format(Valeur[i], 3);
        tlic[i] = format(lic, 3);
        tlsc[i] = format(lsc, 3);
        tMoyenne[i] = format(Moyenne, 3);
    }



    document.getElementById(idDiv).innerHTML = ""; // on efface le tableau
    div = document.getElementById(idDiv);
    can = document.createElement("canvas");
    can.id = idchart;
    can.className = idchart;
    div.appendChild(can);


    data = {
        labels: labels,
        datasets: [
            {
                label: NomValeur,
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                pointHitRadius: 10,
                data: data,
                spanGaps: false
            },
            {
                label: "LSC",
                pointRadius: 0,
                borderColor: "rgb(232, 22, 62)",
                data: tlsc
            },
            {
                label: "LIC",
                pointRadius: 0,
                borderColor: "rgb(232, 22, 62)",
                data: tlic
            },
            {
                label: "moyenne",
                pointRadius: 0,
                borderColor: "rgb(22, 232, 87)",
                data: tMoyenne
            }
        ]
    };


    options = {
        responsive: true,
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: titre
        },
        scales: {
            xAxes: [{
                //                type: 'linear',
                position: 'bottom'
            }]
        }
    };


    ctx = document.getElementById(idchart).getContext("2d");
    //    lineChart = new Chart(ctx, {
    //        type: 'line',
    //        data: data,
    //        options: options
    //    });

    lineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });


}
function chartsIEM(lscx, licx, valeurX, moyenneX, lscr, licr, valeurR, moyenneR) {
    
    createChart2("div_canvasIEM_X", "chartIEMX", lscx, licx, valeurX, moyenneX, 'Carte Individuelle', "Valeur de l'individu");
    createChart2("div_canvasIEM_R", "chartIEMR", lscr, licr, valeurR, moyenneR, 'Carte Etendues Mobiles', "R");

}
function chartsXbarre(lscx, licx, valeurX, moyenneX, lscr, licr, valeurR, moyenneR) {
    
    createChart2("div_canvasXbarre_X", "chartXbarreX", lscx, licx, valeurX, moyenneX, 'Carte X barre', "Moyenne de l'individu");
    createChart2("div_canvasXbarre_R", "charXbarretR", lscr, licr, valeurR, moyenneR, 'Carte R', "Etendue du sous groupe");
    
}

