/*
Who: John Miller
What: Javascript file with functionality to implement different types of statistical charts, based on a local JSON data file with charts build using chartjs
Where: If any of this code can help you, feel free to copy and try it for your own solutions
When: 21 June 2020
*/

var gblData;
var myChartWins;
var myChartMakes;
var myChartKaizen;

Chart.defaults.global.defaultFontColor = 'rgb(255,255,255)';
Chart.defaults.global.responsiveAnimationDuration=900;

//This function is called at document load to populate all charts on load
function loadJsonFile() {
    readJsonFile("assets/data/jsondata.json", function(text){
        gblData = JSON.parse(text);
        getChampionshipWins("Nation",10);
        getChampionshipMakes("MotoGP");
        getKaizenWins("");
    });
};

//Calls a local JSON file but would be easy to modify if external data became available
function readJsonFile(myFile,callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", myFile, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
};

//Load and organise data and populate chart for Nations, Riders and Makes
function getChampionshipWins(optType = "Nation", optQty = 10) {
let obj = gblData;
let tableRows = [];
        obj.forEach(function(item) { //Loop 71 years
            let dataLabels = [];
            Object.keys(item).forEach(function(key) { //Loop columns & read data from JSON
                if (key.search(optType) >= 0) {
                    if (item[key] !=="") {
                        let dataLabels = item[key];
                        tableRows.push(dataLabels);
                    };
                };
            });
        });
    
    let counts = {}; //Count occuarnces by Type
    tableRows.forEach(el => counts[el] = 1  + (counts[el] || 0));
   
    let labels=Object.keys(counts);
    let data=Object.values(counts);

    let list = [];
    for (let j = 0; j < labels.length; j++) 
        list.push({'name': labels[j], 'wins': data[j]});

    list.sort(function(a, b) {
        return ((b.wins < a.wins) ? -1 : ((a.wins == b.wins) ? 0 : 1));
    });

    for (let k = 0; k < list.length; k++) {
        labels[k] = list[k].name;
        data[k] = list[k].wins;
    };

    if (optQty>=1) {
        labelsSliced = labels.slice(0,optQty);
        dataSliced = data.slice(0,optQty);
    } else { //User removed default qty?
        labelsSliced = labels.slice(0,9);
        dataSliced = data.slice(0,9);       
    };

    let chartData = [labelsSliced,dataSliced];
    let chartColours=shuffle(colours75());

    let winners = labels.length;
    if (winners >7) {
        var fntSize = 10;
    } else {
        var fntSize = 12;
    };

    //chartjs options
    var options = {
        responsive: true,
        title: {
            display: true,
            position: 'top',
            text: 'Championship wins',
        },
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    min: 0,
                }
            }]
        },
        layout: {    
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            }
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: fntSize,
            }
        },
    };

    //Build chart and place in div
    let ctx = document.getElementById('nationsChart').getContext("2d");

    myChartWins = new Chart(ctx, {
        type: "bar",
        data: {
            labels: chartData[0],
            datasets: [{
                label: "",
                data: chartData[1],
                backgroundColor: chartColours,
            }]
        },
        options: options
    });
};


//Load and organise data and populate chart for racing classes and manufacturers (expired classes are excluded)
function getChampionshipMakes(myClass) {
let obj = gblData;
let tableRows = [];
    obj.forEach(function(item) { //Loop 71 years
        let dataLabels = [];
        Object.keys(item).forEach(function(key) {
            if (key.search(myClass + " Make") >= 0) {
                if (item[key] !=="") {
                    let dataLabels = item[key];
                    tableRows.push(dataLabels);
                };
            };
        });
    });
    
    //Counts by class generated to populate the chart
    let counts = [];
    tableRows.forEach(el => counts[el] = 1  + (counts[el] || 0));
   
    let labels=Object.keys(counts);
    let data=Object.values(counts);

    let list = [];
    for (let j = 0; j < labels.length; j++) 
        list.push({'name': labels[j], 'wins': data[j]});

    list.sort(function(a, b) {
        return ((b.wins < a.wins) ? -1 : ((a.wins == b.wins) ? 0 : 1));
    });

    for (let k = 0; k < list.length; k++) {
        labels[k] = list[k].name;
        data[k] = list[k].wins;
    };

    let chartData = [labels,data];
    let chartColours=shuffle(colours75());

    let makes = labels.length;
    if (makes >10) {
        fntSize = 10;
    } else {
        fntSize = 12;
    };
    
    //chartjs options
    let options = {
        responsive: true,
        title: {
            display: true,
            position: 'top',
            text: 'Wins by manufacturer',
        },
        legend: {
            position: 'right',
          labels: {
              boxWidth: 0,
              fontSize: fntSize,
            }
        },
    };

    //Generate chart and apply to div
    let ctx = document.getElementById('manufacturersChart').getContext("2d");

    myChartMakes = new Chart(ctx, {
        type: "pie",
        data: {
            labels: chartData[0],
            datasets: [{
                label: "Manufacturer wins",
                data: chartData[1],
                backgroundColor: chartColours,
            }]
        },
        options: options
    });
};


//Stacked bar chart (grouped by decade) to demonstrate the effect of the Japanese manufacturers
function getKaizenWins(optMake = "") {
const japaneseMakes="honda kawasaki suzuki yamaha";
const dataLabels = ["1949-59","1960-69","1970-79","1980-89","1990-99","2000-09","2010-19"];
let obj = gblData;
let japaneseTotalWins= new Array(dataLabels.length).fill(0);
let selectedTotalWins=new Array(dataLabels.length).fill(0);
let rowTotalWins=new Array(dataLabels.length).fill(0);

    obj.forEach(function(item) { //For each Year, set counters to be zero
        let currentYear;
        let japaneseWins=0;
        let selectedWins=0;
        let restOfWorldWins=0;

        Object.keys(item).forEach(function(key) { //For each column in this year
            if (key == "Year") {
                currentYear = item[key]
            }; 

            if (key.search("Make") >= 0) { //Got a makes column, itemise the makes
                switch (true) {
                    case (japaneseMakes.search(item[key].toLowerCase()) >= 0 && item[key].length > 0):
                        ++japaneseWins;
                    break;
                    case (optMake.toLowerCase().search(item[key].toLowerCase()) >= 0 && item[key].length > 0):
                        ++selectedWins;
                    break;
                    case (item[key].length > 0):
                        ++restOfWorldWins
                };
            };
        });

        //For each year add the count of wins to the decade counter by category
        let x = 0
        for (x = 0; x < 7; x++) {
            if (currentYear > 1948 + (x * 10) && currentYear <= 1960 + (x * 10)) {
                japaneseTotalWins[x]=japaneseTotalWins[x] + japaneseWins;
                selectedTotalWins[x]=selectedTotalWins[x] + selectedWins;
                rowTotalWins[x]=rowTotalWins[x] + restOfWorldWins;
            };
        };
    });

    //chartjs options
    let options = {
        responsive: true,
        title: {
            display: true,
            position: 'top',
            text: 'Zaizen wins',
        },
        scales: {
            yAxes: [{
                display: true,
                stacked: true,
                ticks: {
                    beginAtZero: true,
                    min: 0,
                }
            }]
        },
        layout: {    
            padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }
            },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        legend: {
            labels: {
              fontSize: fntSize,
            }
        },
    };

    //All 3 data series required for a stacked line chart
    let data=[japaneseTotalWins,selectedTotalWins,rowTotalWins];

    if (optMake.length>0) {
        optLabel = "Wins for " + optMake.charAt(0).toUpperCase() + optMake.slice(1);
        data;
    } else {
        optLabel = "None Specified"
    };
    
    //Contruct chart and assign to div, fixed colours for each series
    let ctx = document.getElementById("kaizenChart").getContext("2d");

    myChartZaizen = new Chart(ctx, {
    type: 'line',
		data: {
			labels: dataLabels,
            datasets: [
                {
                    label: 'Japanese wins',
                    borderColor: "rgba(150,0,0,0.8)",
                    backgroundColor: "rgba(150,0,0,0.8)",
                    data: data[0]
                },
                {
                    label: optLabel,
                    borderColor: "rgba(255,255,255,0.8)",
                    backgroundColor: "rgba(255,255,255,0.8)",
                    data: data[1]
                },
                {
                    label: 'Other make wins',
                    borderColor: "rgba(0,0,150,0.8)",
                    backgroundColor: "rgba(0,0,150,0.8)",
                    data: data[2]
                }, 
            ], 
        },
        options: options
    });
};


//Buttons called to update chart display options
function btnWins(clicked) {
let qty = $("#txtWins").val();
let type = clicked.slice(3, clicked.length);

    //Need to detroy the last chart or chartjs gets in a mess with the inbuilt hover
    try {
        myChartWins.destroy();
    } catch {
        /* do nothing */
    };

    switch(clicked) {
        case "btnNation":
            getChampionshipWins(type,qty);
        break;
        case "btnRider":
            getChampionshipWins(type,qty);
        break;
        case "btnMake":
            getChampionshipWins(type,qty);
        break;
        case "txtWins":
            if ($("#optNation").is(":checked")) {
                getChampionshipWins("Nation",qty);
            } else if ($("#optRider").is(":checked")) {
                getChampionshipWins("Rider",qty);
            } else {
                getChampionshipWins("Make",qty);
            };
        break;
    default:
        getChampionshipWins("Nation",10);
    };
};


function btnMakes(clicked) {
let classes = clicked.slice(3, clicked.length);

    //Need to detroy the last chart or chartjs gets in a mess with the inbuilt hover
    try {
        myChartMakes.destroy();
    } catch {
        /* do nothing */
    };

    switch(clicked) {
        case "btnMotoGP":
            getChampionshipMakes(classes);
        break;
        case "btnMoto2":
            getChampionshipMakes(classes);
        break;
        case "btnMoto3":
            getChampionshipMakes(classes);
        break;
        case "btnMotoE":
            getChampionshipMakes(classes);
        break;
    default:
        getChampionshipMakes("MotoGP");
    };
};


function btnKaizen(clicked) {
    
    //Need to detroy the last chart or chartjs gets in a mess with the inbuilt hover
    try {
        myChartZaizen.destroy();
    } catch {
        /* do nothing */
    };

    getKaizenWins(clicked);
};


//Detect click of dropdown at Kaizen chart
$(function () {
let myMake;
    $("#dropdownMakes li").click(function () {
        $("#btnSelectMake .selection").text($(this).text());
        myMake = $(this).text().toLowerCase();
        
        //Button display is updated now call chart
        btnKaizen(myMake);
    });
});


//Array of colours used to add colour to charts
function colours75() {
    let colours = [
    'rgba(0,250,97,0.9)',
    'rgba(246,76,253,0.9)',
    'rgba(1,220,68,0.9)',
    'rgba(175,92,255,0.9)',
    'rgba(170,204,0,0.9)',
    'rgba(134,97,255,0.9)',
    'rgba(0,167,23,0.9)',
    'rgba(135,0,172,0.9)',
    'rgba(236,212,0,0.9)',
    'rgba(106,0,140,0.9)',
    'rgba(118,255,156,0.9)',
    'rgba(255,97,243,0.9)',
    'rgba(70,157,0,0.9)',
    'rgba(164,123,255,0.9)',
    'rgba(255,217,84,0.9)',
    'rgba(1,225,158,0.9)',
    'rgba(192,0,143,0.9)',
    'rgba(1,148,69,0.9)',
    'rgba(223,0,131,0.9)',
    'rgba(0,178,129,0.9)',
    'rgba(234,0,78,0.9)',
    'rgba(2,233,231,0.9)',
    'rgba(209,0,12,0.9)',
    'rgba(139,255,253,0.9)',
    'rgba(180,3,0,0.9)',
    'rgba(0,92,210,0.9)',
    'rgba(255,143,25,0.9)',
    'rgba(0,121,220,0.9)',
    'rgba(255,184,59,0.9)',
    'rgba(0,152,237,0.9)',
    'rgba(219,78,0,0.9)',
    'rgba(0,159,215,0.9)',
    'rgba(255,90,61,0.9)',
    'rgba(1,187,216,0.9)',
    'rgba(189,0,86,0.9)',
    'rgba(174,255,192,0.9)',
    'rgba(143,0,92,0.9)',
    'rgba(233,255,173,0.9)',
    'rgba(255,249,162,0.9)',
    'rgba(205,159,0,0.9)',
    'rgba(210,156,255,0.9)',
    'rgba(100,133,0,0.9)',
    'rgba(255,115,211,0.9)',
    'rgba(0,95,13,0.9)',
    'rgba(235,179,255,0.9)',
    'rgba(0,58,0,0.9)',
    'rgba(255,125,173,0.9)',
    'rgba(1,127,97,0.9)',
    'rgba(148,0,58,0.9)',
    'rgba(193,255,213,0.9)',
    'rgba(94,0,59,0.9)',
    'rgba(243,255,201,0.9)',
    'rgba(202,244,255,0.9)',
    'rgba(135,0,24,0.9)',
    'rgba(109,191,255,0.9)',
    'rgba(139,138,0,0.9)',
    'rgba(0,61,119,0.9)',
    'rgba(255,135,99,0.9)',
    'rgba(0,94,148,0.9)',
    'rgba(156,105,0,0.9)',
    'rgba(191,193,255,0.9)',
    'rgba(127,51,0,0.9)',
    'rgba(1,155,152,0.9)',
    'rgba(108,25,0,0.9)',
    'rgba(0,130,161,0.9)',
    'rgba(88,90,0,0.9)',
    'rgba(255,152,196,0.9)',
    'rgba(255,205,236,0.9)',
    'rgba(189,0,86,0.9)',
    'rgba(174,255,192,0.9)',
    'rgba(143,0,92,0.9)',
    'rgba(233,255,173,0.9)',
    'rgba(255,249,162,0.9)',
    'rgba(205,159,0,0.9)',
    'rgba(210,156,255,0.9)',
    'rgba(100,133,0,0.9)',
    'rgba(255,115,211,0.9)',
    'rgba(0,95,13,0.9)',
    'rgba(235,179,255,0.9)',
    'rgba(0,58,0,0.9)',
    'rgba(255,125,173,0.9)',
    'rgba(1,127,97,0.9)',
    'rgba(148,0,58,0.9)',
    'rgba(193,255,213,0.9)',
    'rgba(94,0,59,0.9)',
    'rgba(243,255,201,0.9)',
    'rgba(202,244,255,0.9)',
    'rgba(135,0,24,0.9)',
    'rgba(109,191,255,0.9)',
    'rgba(139,138,0,0.9)',
    'rgba(0,61,119,0.9)',
    'rgba(255,135,99,0.9)',
    'rgba(0,94,148,0.9)',
    'rgba(156,105,0,0.9)',
    'rgba(191,193,255,0.9)',
    'rgba(127,51,0,0.9)',
    'rgba(1,155,152,0.9)',
    'rgba(108,25,0,0.9)',
    'rgba(0,130,161,0.9)',
    'rgba(88,90,0,0.9)'
]
    return colours
};