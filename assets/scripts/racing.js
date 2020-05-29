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
    height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    layout:"fitColumns", //fit columns to width of table (optional)
    columns:[ //Define Table Columns
        {title:"Name", field:"name", width:150},
        {title:"Age", field:"age", align:"left", formatter:"progress"},
        {title:"Favourite Color", field:"col"},
        {title:"Date Of Birth", field:"dob", sorter:"date", align:"center"},
    ],
    rowClick:function(e, row){ //trigger an alert message when the row is clicked
        alert("Row " + row.getData().id + " Clicked!!!!");
    },
});

var tabledata = [
    {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
    {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
    {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
    {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
    {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
];

//load sample data into the table
$("#resultsTable").tabulator("setData", tabledata);
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

/* Charts */
Chart.defaults.global.defaultFontColor = 'white';