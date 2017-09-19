"use strict";
var gev, gav, ggrr, gpv, gtv, gls;
//ejschart
// ,e fonctionne pas
//function createChart(idchart) {
//    /*global EJSC*/
//    var chart, myChartSeries;
//
//    chart = new EJSC.Chart(idchart, {
//        show_legend: false,
//        title: "My First Custom Chart"
//    });
//    
//    myChartSeries =  new EJSC.BarSeries(
//        new EJSC.ArrayDataHandler(
//            [
//                ["Month 1", 1],
//                ["Month 2", 2],
//                ["Month 3", 3],
//                ["Month 4", 4],
//                ["Month 5", 5]
//            ]
//        )
//    );
//    myChartSeries.color = 'rgb(50,210,50)';
//    myChartSeries.lineWidth = 5;
// 
//    chart.addSeries(myChartSeries);
//    
//    
//}
function createChart1(idDiv, idchart, aEv, aAv, aGrr, aPv, aTv, ls) {

    var color, barChartData,
        t, i, j,
        ctx, denominateur,
        div, can;

    document.getElementById(idDiv).innerHTML = ""; // on efface le tableau
    div = document.getElementById(idDiv);
    can = document.createElement("canvas");
    can.id = idchart;
    can.className = idchart;
    div.appendChild(can);



    t = [3];
    for (i = 0; i < 3; i = i + 1) {
        t[i] = [4];
    }
    for (i = 0; i < 3; i = i + 1) {
        switch (i) {
        case 0:
            //%contribution  variation du procédé? 
            denominateur = aTv;
            /*global format*/
            t[i][0] = format(aGrr / denominateur * 100, 2); //RetR
            t[i][1] = format(aEv / denominateur * 100, 2); //Repeter
            t[i][2] = format(aAv / denominateur * 100, 2); //Reprod.
            t[i][3] = format(aPv / denominateur * 100, 2); //De pièce à pièce
            break;
        case 1:
            //%var etude  variation total de l'étude tv  
            denominateur = Math.sqrt(aTv);
            t[i][0] = format(Math.sqrt(aGrr) / denominateur * 100, 2); //RetR
            t[i][1] = format(Math.sqrt(aEv) / denominateur * 100, 2); //Repeter
            t[i][2] = format(Math.sqrt(aAv) / denominateur * 100, 2); //Reprod.
            t[i][3] = format(Math.sqrt(aPv) / denominateur * 100, 2); //De pièce à pièce
            break;
        case 2:
            //%tolerance  tolérance de procédé, limite de spec  LS ? 
            denominateur = ls;
            t[i][0] = format(6 * Math.sqrt(aGrr) / denominateur * 100, 2); //RetR
            t[i][1] = format(6 * Math.sqrt(aEv) / denominateur * 100, 2); //Repeter
            t[i][2] = format(6 * Math.sqrt(aAv) / denominateur * 100, 2); //Reprod.
            t[i][3] = format(6 * Math.sqrt(aPv) / denominateur * 100, 2); //De pièce à pièce
            break;
        default:
            denominateur = 1;
            t[i][0] = 1;
            t[i][1] = 1;
            t[i][2] = 1;
            t[i][3] = 1;
            break;
        }
    }
    /*global Chart*/
    color = Chart.helpers.color;
    barChartData = {
        labels: ["R&R de l'instrumentation", "Répétabilité", "Reproductibilité", "De pièce à pièce"],

        datasets: [{
            label: '% Contribution',
            backgroundColor: color(window.chartColors.blue).alpha(1).rgbString(),
            borderColor: window.chartColors.blue,
            borderWidth: 1,
            data: t[0]
        }, {
            label: '% Total Variation',
            backgroundColor: color(window.chartColors.red).alpha(1).rgbString(),
            borderColor: window.chartColors.red,
            borderWidth: 1,
            data: t[1]
        }, {
            label: '% Tolérance',
            backgroundColor: color(window.chartColors.green).alpha(1).rgbString(),
            borderColor: window.chartColors.green,
            borderWidth: 1,
            data: t[2]
        }]

    };

    ctx = document.getElementById(idchart).getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Composantes de la variation'
            }
        }
    });

}
function createChart2(idDiv, idchart, lsc, lic, MoyenneP_O, Moyenne, tabNom) {

    var color, lineChart,
        t, i, j,
        ctx, denominateur,
        div, can,
        data, options, labels, tlic, tlsc, tMoyenne, num;


    num = MoyenneP_O.length;
    
    labels = [MoyenneP_O.length * MoyenneP_O[0]];
    data = [MoyenneP_O.length * MoyenneP_O[0]];
    tlic = [MoyenneP_O.length * MoyenneP_O[0]];
    tlsc = [MoyenneP_O.length * MoyenneP_O[0]];
    tMoyenne = [MoyenneP_O.length * MoyenneP_O[0]];

    for (i = 0; i < MoyenneP_O[0].length; i = i + 1) {
        for (j = 0; j < MoyenneP_O.length; j = j + 1) {
//            labels[j + i * num] = j + 1;
            if (j === 0) {
                labels[j + i * num] = tabNom[i];
            } else {
                labels[j + i * num] = "";
            }
            data[j + i * num] = format(MoyenneP_O[j][i], 3);
            tlic[j + i * num] = format(lic, 3);
            tlsc[j + i * num] = format(lsc, 3);
            tMoyenne[j + i * num] = format(Moyenne, 3);
        }
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
                label: "Moyenne de l'échantillon",
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
            text: 'Carte X barre en fonction de Opérateur'
        },
        scales: {
            xAxes: [{
                //                type: 'linear',
                position: 'bottom'
            }]
        }
    };


    ctx = document.getElementById(idchart).getContext("2d");
    lineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });


}
function createChart3(idDiv, idchart, lsc, lic, EtendueP_O, Moyenne, tabNom) {

    var color, lineChart,
        t, i, j,
        ctx, denominateur,
        div, can,
        data, options, labels, tlsc, tlic, tMoyenne;


    labels = [EtendueP_O.length * EtendueP_O[0]];
    data = [EtendueP_O.length * EtendueP_O[0]];
    tlsc = [EtendueP_O.length * EtendueP_O[0]];
    tlic = [EtendueP_O.length * EtendueP_O[0]];
    tMoyenne = [EtendueP_O.length * EtendueP_O[0]];

    for (i = 0; i < EtendueP_O[0].length; i = i + 1) {
        for (j = 0; j < EtendueP_O.length; j = j + 1) {
            //labels[j + i * 10] = j + 1;
            if (j === 0) {
                labels[j + i * EtendueP_O.length] = tabNom[i];
            } else {
                labels[j + i * EtendueP_O.length] = "";
            }
            data[j + i * EtendueP_O.length] = format(EtendueP_O[j][i], 3);
            tlic[j + i * EtendueP_O.length] = format(lic, 3);
            tlsc[j + i * EtendueP_O.length] = format(lsc, 3);
            tMoyenne[j + i * EtendueP_O.length] = format(Moyenne, 3);
        }
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
                label: "Moyenne de l'échantillon",
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
            text: 'Carte R en fonction de Opérateur'
        },
        scales: {
            xAxes: [{
                //                type: 'linear',
                position: 'bottom'
            }]
        }
    };



    ctx = document.getElementById(idchart).getContext("2d");
    lineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });


}
function createChart4(idDiv, idchart, moyenneP, Valeur) {
    //Valeur : t[ope][pie][rep]

    var color, lineChart,
        t, i, j, k,
        ctx, denominateur,
        div, can,
        data, options, labels,
        datasets, tcolor, label;

    labels = [moyenneP.length]; // 
    data = [Valeur.length * Valeur[0][0].length + 1];
    label = [Valeur.length * Valeur[0][0].length + 1];
    for (i = 0; i < Valeur.length * Valeur[0][0].length + 1; i = i + 1) {
        data[i] = [moyenneP.length];
    }

    for (i = 0; i < moyenneP.length; i = i + 1) {
        labels[i] = i + 1;
        data[0][i] = format(moyenneP[i], 3);
    }

    for (i = 0; i < moyenneP.length; i = i + 1) {
        for (j = 0; j < Valeur.length; j = j + 1) {
            for (k = 0; k < Valeur[0][0].length; k = k + 1) {
                data[j * Valeur[0][0].length + k + 1][i] = format(Valeur[j][i][k], 3);
            }
        }
    }

    document.getElementById(idDiv).innerHTML = ""; // on efface le tableau
    div = document.getElementById(idDiv);
    can = document.createElement("canvas");
    can.id = idchart;
    can.className = idchart;
    div.appendChild(can);


    for (j = 0; j < Valeur.length; j = j + 1) {
        for (k = 0; k < Valeur[0][0].length; k = k + 1) {
            label[j * Valeur[0][0].length + k + 1] = "ope:" + Number(j + 1) + " ; rep:" + Number(k + 1); //[ope][pie][rep]
        }
    }

    label[0] = "Moyenne de l'échantillon";

    datasets = [data.length];
    datasets[0] = {
        label: label[0],
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
        data: data[0],
        spanGaps: false
    };

    tcolor = [data.length];
    color = Chart.helpers.color;
    for (i = 0; i < data.length; i = i + 1) {
        tcolor[i] = color(window.chartColors.grey).alpha(1).rgbString();
    }

    for (i = 1; i < data.length; i = i + 1) {
        datasets[i] = {
            label: label[i],
            pointRadius: 2,
            pointBorderColor: "gray",
            pointBackgroundColor: "gray",
            data: data[i],
            showLine: false
        };
    }

    data = {
        labels: labels,
        datasets: datasets
    };

    options = {
        responsive: true,
        color : "red",
        legend: {
            display: false,
            position: 'top'
        },
        title: {
            display: true,
            text: 'Réponse en fonction de Pièce'
        },
        scales: {
            xAxes: [{
                //                type: 'linear',
                position: 'bottom'
            }]
        }
    };

    ctx = document.getElementById(idchart).getContext("2d");

    lineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}
function createChart5(idDiv, idchart, moyenneO, Valeur, tabNom) {
    //Valeur : t[ope][pie][rep]

    var color, lineChart,
        t, i, j, k,
        ctx, denominateur,
        div, can,
        data, options, labels,
        datasets, tcolor, label;
    labels = [moyenneO.length]; // 
    data = [Valeur.length[0] * Valeur[0][0].length + 1];
    label = [Valeur.length[0] * Valeur[0][0].length + 1];
    for (i = 0; i < Valeur[0].length * Valeur[0][0].length + 1; i = i + 1) {
        data[i] = [moyenneO.length];
    }

    for (i = 0; i < moyenneO.length; i = i + 1) {
        labels[i] = tabNom[i];
        data[0][i] = format(moyenneO[i], 3);
    }


    for (i = 0; i < moyenneO.length; i = i + 1) { //ope
        for (j = 0; j < Valeur[0].length; j = j + 1) { //pie
            for (k = 0; k < Valeur[0][0].length; k = k + 1) { //rep
                data[j * Valeur[0][0].length + k + 1][i] = format(Valeur[i][j][k], 3);
            }
        }
    }

    document.getElementById(idDiv).innerHTML = ""; // on efface le tableau
    div = document.getElementById(idDiv);
    can = document.createElement("canvas");
    can.id = idchart;
    can.className = idchart;
    div.appendChild(can);


    for (j = 0; j < Valeur[0].length; j = j + 1) {
        for (k = 0; k < Valeur[0][0].length; k = k + 1) {
            label[j * Valeur[0][0].length + k + 1] = "pie:" + Number(j + 1) + " ; rep:" + Number(k + 1); //[ope][pie][rep]
        }
    }

    label[0] = "Moyenne de l'échantillon";

    datasets = [data.length];
    datasets[0] = {
        label: label[0],
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
        data: data[0],
        spanGaps: false
    };


    tcolor = [data.length];
    color = Chart.helpers.color;
    for (i = 0; i < data.length; i = i + 1) {
        tcolor[i] = color(window.chartColors.grey).alpha(1).rgbString();
    }

    for (i = 1; i < data.length; i = i + 1) {
        datasets[i] = {
            label: label[i],
            pointRadius: 2,
            pointBorderColor: "gray",
            pointBackgroundColor: "gray",
            data: data[i],
            showLine: false
        };
    }

    data = {
        labels: labels,
        datasets: datasets
    };

    options = {
        responsive: true,
        legend: {
            display: false,
            position: 'top'
        },
        title: {
            display: true,
            text: 'Réponse en fonction des opérateurs'
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
function createChart6(idDiv, idchart, moyenneP_O, tabNom, pInt) {
    //Valeur : t[ope][pie][rep]

    var color, lineChart,
        t, i, j, k,
        ctx, denominateur,
        div, can,
        data, options, labels,
        datasets, tcolor, tpointstyle,
        str;

    labels = [moyenneP_O.length];

    data = [moyenneP_O[0].length];
    for (i = 0; i < moyenneP_O[0].length; i = i + 1) {
        data[i] = [moyenneP_O.length];
    }


    for (i = 0; i < moyenneP_O.length; i = i + 1) {
        labels[i] = i + 1;
    }

    for (i = 0; i < moyenneP_O[0].length; i = i + 1) {
        for (j = 0; j < moyenneP_O.length; j = j + 1) {
            data[i][j] = format(moyenneP_O[j][i], 3);
        }
    }

    document.getElementById(idDiv).innerHTML = ""; // on efface le tableau
    div = document.getElementById(idDiv);
    can = document.createElement("canvas");
    can.id = idchart;
    can.className = idchart;
    div.appendChild(can);

    tcolor = ["red", "orange", "green", "blue", "purple", "grey", "yellow"];
    tpointstyle = ['circle', 'triangle', 'rect', 'rectRounded', 'rectRot', 'cross', 'crossRot', 'star', 'line', 'dash'];

    datasets = [data.length];

    for (i = 0; i < data.length; i = i + 1) {
        datasets[i] = {
            label: tabNom[i],
            fill: false,
            lineTension: 0.1,
            backgroundColor: tcolor[i],
            borderColor: tcolor[i],
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: tcolor[i],
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            pointStyle: tpointstyle[i],
            data: data[i],
            spanGaps: false
        };
    }

    data = {
        labels: labels,
        datasets: datasets
    };

    options = {
        responsive: true,
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'Interaction Pièce * opérateur'
        },
        scales: {
            xAxes: [{
                //                type: 'linear',
                position: 'bottom'
            }]
        }
    };

    ctx = document.getElementById(idchart).getContext("2d");

    lineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });


    
    div = document.getElementById("div_OP_PIE");
    /*global format*/
    str = "<h4 class = Resultat>";
    str += "<p>";
    str += "<dl>";
    if (pInt < 0.05) {
        str += "L'interaction Opérateur * Pièce est significative";
    } else {
        str += "L'interaction Opérateur * Pièce n'est pas significative";
    }
    str += "</dl>";
    str += "</p>";
    str += "</h4>";

    div.innerHTML = str;
    
}
function drawChart() {
    var data, options, chart, div,
        t, denominateur, i;

    t = [4];
    for (i = 0; i < 4; i = i + 1) {
        t[i] = [5];
    }

    t[0][0] = 'R&R de linstrumentation';
    t[1][0] = 'Répétabilité';
    t[2][0] = 'Reproductibilité';
    t[3][0] = 'Tolérance';

    for (i = 1; i < 5; i = i + 1) {
        switch (i) {
        case 1:
            //%contribution  variation du procédé   ev ? 
            denominateur = gev;
            break;
        case 2:
            //%var etude  variation total de l'étude tv  
            denominateur = gtv;
            break;
        case 3:
            //%procede 
            denominateur = gpv;
            break;
        case 4:
            //%tolerance  tolérance de procédé, limite de spec  LS ? 
            denominateur = gls;
            break;
        default:
            denominateur = 1;
            break;
        }
        t[0][i] = ggrr / denominateur; //RetR
        t[1][i] = gev / denominateur; //Repeter
        t[2][i] = gav / denominateur; //Reprod.
        t[3][i] = gpv / denominateur; //De pièce à pièce
    }

    /*
            ['R&R de linstrumentation', gev, gav, ggrr, gpv],
            ['Répéter', gev, gav, ggrr, gpv],
            ['Reprod.', gev, gav, ggrr, gpv],
            ['Tolérance', gev, gav, ggrr, gpv]
    */


    /*global google*/
    //plante sous mozilla
    data = google.visualization.arrayToDataTable([
        ['', '% Contribution', '% Total Variation', '% Procédé', '% Tolérance'],
        t[0], t[1], t[2], t[3]
    ]);


    options = {
        chart: {
            title: 'Composantes de la variation',
            subtitle: ''
        },
        bars: 'vertical',
        vAxis: {
            format: 'decimal'
        },
        width: 600,
        height: 400,
        legend: {
            position: 'top',
            maxLines: 3
        },
        colors: ['#1b9e77', '#d95f02', '#7570b3', '#d4d428']
    };

    chart = new google.charts.Bar(document.getElementById('chart1_div'));
    //chart.draw(data, options); // plante sous mozilla (arrayToDataTable)
    chart.draw(data, google.charts.Bar.convertOptions(options));

}
function drawTitleSubtitle() {
    var data, options, material;
    /*global google*/
    data = new google.visualization.DataTable();
    data.addColumn('timeofday', 'Time of Day');
    data.addColumn('number', 'Motivation Level');
    data.addColumn('number', 'Energy Level');

    data.addRows([
        [{
            v: [8, 0, 0],
            f: '8 am'
        }, 1, 0.25],
        [{
            v: [9, 0, 0],
            f: '9 am'
        }, 2, 0.5],
        [{
            v: [10, 0, 0],
            f: '10 am'
        }, 3, 1],
        [{
            v: [11, 0, 0],
            f: '11 am'
        }, 4, 2.25],
        [{
            v: [12, 0, 0],
            f: '12 pm'
        }, 5, 2.25],
        [{
            v: [13, 0, 0],
            f: '1 pm'
        }, 6, 3],
        [{
            v: [14, 0, 0],
            f: '2 pm'
        }, 7, 4],
        [{
            v: [15, 0, 0],
            f: '3 pm'
        }, 8, 5.25],
        [{
            v: [16, 0, 0],
            f: '4 pm'
        }, 9, 7.5],
        [{
            v: [17, 0, 0],
            f: '5 pm'
        }, 10, 10]
    ]);

    options = {
        chart: {
            title: 'Motivation and Energy Level Throughout the Day',
            subtitle: 'Based on a scale of 1 to 10'
        },
        hAxis: {
            title: 'Time of Day',
            format: 'h:mm a',
            viewWindow: {
                min: [7, 30, 0],
                max: [17, 30, 0]
            }
        },
        vAxis: {
            title: 'Rating (scale of 1-10)'
        }
    };

    material = new google.charts.Bar(document.getElementById('chart1_div'));
    material.draw(data, options);
}
function createGChart1(ev, av, grr, pv, tv, ls) {
    var color, barChartData,
        t, i, j,
        ctx, denominateur;

    /*global google*/
    //google.charts.load('current', {packages: ['corechart', 'bar']});
    //google.charts.setOnLoadCallback(drawTitleSubtitle);

    gev = ev;
    gav = av;
    ggrr = grr;
    gpv = pv;
    gtv = tv;
    gls = ls;

    //ne fonctionne pas sous mozilla à cause du arrayToDataTable
    google.charts.load('current', {
        'packages': ['corechart', 'bar']
    });
    google.charts.setOnLoadCallback(drawChart);

}
function charts(ev, av, grr, pv, tv, aVev, aVav, aVgrr, aVpv, aVtv, lss, lsi, lscx, licx, lscr, licr, MoyenneP_O, EtendueP_O, moyenneMoyenneP, moyennemoyenneEtendueO, moyenneP, moyenneO, tabNom, Valeur, pInt) {
    // supprime le canvas car si on le recré sa taille augmente
    createChart1("div_canvas1", "chart1", aVev, aVav, aVgrr, aVpv, aVtv, Math.abs(lss - lsi));
    createChart2("div_canvas2", "chart2", lscx, licx, MoyenneP_O, moyenneMoyenneP, tabNom);
    createChart3("div_canvas3", "chart3", lscr, licr, EtendueP_O, moyennemoyenneEtendueO, tabNom);
    createChart4("div_canvas4", "chart4", moyenneP, Valeur); //Valeur : t[ope][pie][rep]
    createChart5("div_canvas5", "chart5", moyenneO, Valeur, tabNom); //Valeur : t[ope][pie][rep]
    createChart6("div_canvas6", "chart6", MoyenneP_O, tabNom, pInt); //Valeur : t[ope][pie][rep]

    //createGChart1(ev, av, grr, pv, tv, Math.abs(lss - lsi));
}
