/* Used to calulate the time in years since the championships started */
function diff_years() {
    var dt2=new Date();
    var dt1=new Date(1949,1,1);
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    document.getElementById("yearsSince1949").innerHTML = Math.abs(Math.round(diff/365.25));
 };

 /* Streams the carousel images side by side */
$(function() {
  'use strict';
	$('.carousel .carousel-item[data-src]').each(function() {
		var $this = $(this);

		$this.prepend([
			'<div style="background-image: url(', $this.attr('data-src'), ')"></div>'
		].join(''));
	});
});

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

 /* Update drop-down menu following user selection */

$(".dropdown-menu").click(function(){
    $(this).parents(".input-group-btn").find('.btn').text($(this).text());
});

 /* $(".dropdown-menu").click(function(){
    
  var selText = $(this).text();
  $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
}); */

