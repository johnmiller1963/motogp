$(document).ready( function () {
    nationsChart();
    buildDataVariables();
    yearsSince1949();
    startCarousel();
});

/* Used to calulate the time in years since the championships started */
function yearsSince1949() {
    var dt2=new Date();
    var dt1=new Date(1949,1,1);
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    document.getElementById("yearsSince1949").innerHTML = Math.abs(Math.round(diff/365.25));
 };

/* Will be used to search the page eg riders, makes etc */
$( "#navSearch" ).keypress(function(e) {
    if (e.key == 'Enter') {
        var str = $("#navSearch").val();
        alert("Now searching the page for '" + str + "'!");
    };
});

/* 
This didn't work, but might be useful later?
$(document).keyup(function(event) {
    if ((event.key == 'Enter') && $("#navSearch").is(":focus")) {
        var str = $("#navSearch").val();
        alert("Now searching the page for '" + str + "'!");
    };
}); 
*/

/* Used to feed following images into the slider/carousel */
function startCarousel() {
    'use strict';
	$('.carousel .carousel-item[data-src]').each(function() {
		var $this = $(this);
		$this.prepend([
			'<div style="background-image: url(', $this.attr('data-src'), ')"></div>'
		].join(''));
	});
};

/* Will be used to get latest 'Article' from Wikipedia api 
Not working yet */
function doWiki() {
        var URL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=';

        URL += "&titles=" + "motoGP";
        URL += "&rvprop=content";
        URL += "&callback=?";
        alert(URL);
        /* $.getJSON */
        $.getJSON(URL, function (data) {
            var obj = data.query.pages;
            var ob = Object.keys(obj)[0];
            console.log(obj[ob]["extract"]);
            try{
                document.getElementById("results").textContent = obj[ob]["extract"];
            }
            catch (err) {
                document.getElementById("results").textContent = err.message;
            }

        });
    } ;

/* Show and hide the results grid */
 function toggleResults() {
    var tableVisibility = document.getElementById("dataTable");
        if (tableVisibility.style.display === "block") {
            tableVisibility.style.display = "none";
            document.getElementById("btnDisplayResults").innerText="View Race Results";
        } else {
            tableVisibility.style.display = "block";
            document.getElementById("btnDisplayResults").innerText="Hide Race Results";
        }
 };

 /* Update drop-down menu following user selection 
 Not working correctly */
$(".dropdown-menu").click(function(){
    $(this).parents(".input-group-btn").find('.btn').text($(this).text());
});

 /* $(".dropdown-menu").click(function(){
    
  var selText = $(this).text();
  $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
}); */

/* Charts */
Chart.defaults.global.defaultFontColor = 'white';

function nationsChart() {
var ctx = document.getElementById('nationsChart').getContext('2d');
var chartHeader = buildDataVariables();

var nationsChart = new Chart(ctx, {
    type: 'bar',
    data: {
        /* labels: buildDataVariables[0], */
        labels: ['Spain', 'Italy', 'Australia', 'USA', 'UK', 'France','Germany'],
        datasets: [{
            label: 'All Championship Classes',
            data: [52, 79, 11, 18, 45, 8, 18],
            /* data: buildDataVariables[0], */
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'grey'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'grey'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: { 
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
};

function buildDataVariables() {
var header = Array();
var data = Array();
var myData = Array();    

$("table tr th").each(function(i, v){
    {header[i] = $(this).text()
    };  
})
               
/* alert(header); */
    
$("table tr").each(function(i, v){
    data[i] = Array();
    $(this).children('td').each(function(ii, vv){
        data[i][ii] = $(this).text();
    }); 
})

/* alert(data); */

myData=[header,data];
return(myData);
};

/* build array of wins per nation */
function nationsData() {
var header = Array();
var data = Array();
var myData = Array();    

$("table tr th").each(function(i, v){
    {header[i] = $(this).text()
    };  
})
               
/* alert(header); */
    
$("table tr").each(function(i, v){
    data[i] = Array();
    $(this).children('td').each(function(ii, vv){
        data[i][ii] = $(this).text();
    }); 
})

/* alert(data); */

myData=[header,data];
return(myData);
}; 
