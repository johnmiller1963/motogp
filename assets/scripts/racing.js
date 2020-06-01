$(document).ready( function () {
    yearsSince1949();
    startCarousel();
    buildHTMLTable();
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

function displayMe(){
    document.getElementById("card2").style.display = "none"; 
    document.getElementById("card3").style.display = "none"; 
}

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
    };

/* Build html table from Tabulator */
function buildHTMLTable() {
$("#resultsTable").tabulator({
    index:"Year",
    height:265, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    /* layout:"fitColumns", //fit columns to width of table (optional) */
     columns:[
        {title:"Year", field:"Year", width:70, sorter:"number", frozen:true},
            {title:"MotoGP 500cc",
                columns:[
                    {title:"Nation", field:"500cc MotoGP Nation", align:"left", width:100, headerFilter:true, cellClick:function(e, cell){alert("cell clicked - " + cell.getValue())}},
                    {title:"Rider", field:"500cc MotoGP Rider", align:"left", width:100, headerFilter:true},
                    {title:"Make", field:"500cc MotoGP Make", align:"left", width:100, headerFilter:true},
                ],
            },
             {title:"350cc GP",
                columns:[
                    {title:"Nation", field:"350cc Nation", align:"left", width:100, headerFilter:true},
                    {title:"Rider", field:"350cc Rider", align:"left", width:100, headerFilter:true},
                    {title:"Make", field:"350cc Make", align:"left", width:100, headerFilter:true},
                ],
            },
            {title:"Moto2 250cccc",
                columns:[
                    {title:"Nation", field:"250cc Moto2 Nation", align:"left", width:100, headerFilter:true},
                    {title:"Rider", field:"250cc Moto2 Rider", align:"left", width:100, headerFilter:true},
                    {title:"Make", field:"250cc Moto2 Make", align:"left", width:100, headerFilter:true},
                ],
            },
            {title:"Moto3 125cc",
                columns:[
                    {title:"Nation", field:"125cc Moto3 Nation", align:"left", width:100, headerFilter:true},
                    {title:"Rider", field:"125cc Moto3 Rider", align:"left", width:100, headerFilter:true},
                    {title:"Make", field:"125cc Moto3 Make", align:"left", width:100, headerFilter:true},
                ],
            },
            {title:"50cc 80cc",
                columns:[
                    {title:"Nation", field:"50cc 80cc Nation", align:"left", width:100, headerFilter:true},
                    {title:"Rider", field:"50cc 80cc Rider", align:"left", width:100, headerFilter:true},
                    {title:"Make", field:"50cc 80cc Make", align:"left", width:100, headerFilter:true},
                ],
            },
            {title:"750cc",
                columns:[
                    {title:"Nation", field:"750cc Nation", align:"left", width:100, headerFilter:true},
                    {title:"Rider", field:"750cc Rider", align:"left", width:100, headerFilter:true},
                    {title:"Make", field:"750cc Make", align:"left", width:100, headerFilter:true},
                ],
            },
            {title:"MotoE (Electric)",
                columns:[
                    {title:"Nation", field:"MotoE Nation", align:"left", width:100, headerFilter:true},
                    {title:"Rider", field:"MotoE Rider", align:"left", width:100, headerFilter:true},
                    {title:"Make", field:"MotoE Make", align:"left", width:100, headerFilter:true},
                ],
            },
    ],
    /* rowClick:function(e, row){
        alert("Row " + row.getIndex() + " Clicked!!!!")
    },
    rowContext:function(e, row){
        alert("Row " + row.getIndex() + " Context Clicked!!!!")
    }, */
});


/* alert("load json data to array"); */


//load JSON data into the table
$("#resultsTable").tabulator("setData", "assets/data/jsondata.json");
};

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

/* Charts 
Chart.defaults.global.defaultFontColor = 'white'; */