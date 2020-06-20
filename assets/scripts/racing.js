/*
Who: John Miller
What: Javascript file with unique functionality for MotoGP
Where: If any of this code can help you, feel free to copy and try it for your own solutions
When: 21 June 2020
*/


//Initial load functions
$(document).ready( function () {
    startCarousel();
    buildHTMLTable();
    smoothScroll();
    loadJsonFile(); //Causes all charts to load with default options
});


//Used to calulate the time in years since the championships started
function yearsSince1949() {
    let dt2=new Date();
    let dt1=new Date(1949,1,1);
    let diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);

    return Math.abs(Math.round(diff/365.25));
};


//Collapse Navbar if extended vertically
$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});


//Search implementation from the Navbar
$("#navSearch").keypress(function(e) {if (e.key == 'Enter') {
let myElements=["p","h2","label"];
let pattern = $(this).val().toLowerCase();
let x = 0;
let i = 0;
 
    //Loop through element types and move to first found occurance
    for (x = 0; x < myElements.length; x++) {
        let searchItems = document.getElementsByTagName(myElements[x]);
            
            for (i = 0; i < searchItems.length; i++) {
            let index = searchItems[i].innerText.toLowerCase().indexOf(pattern);
                event.preventDefault();   
                if (index != -1) {
                    //Found a match, scroll to item
                    let element = document.getElementsByTagName(myElements[x])[i];
                    element.scrollIntoView({behavior: 'smooth', block: 'center'});
                    break;
                };
            };
        };
    };
});


//Capture all anchor elements 'click' events, smooth scroll to target
function smoothScroll() {
let anchorlinks = document.querySelectorAll('a[href^="#"]')
 
    for (let item of anchorlinks) { 
        item.addEventListener('click', (e)=> {
            let hashval = item.getAttribute('href')
            let target = document.querySelector(hashval)
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            history.pushState(null, null, hashval)
            e.preventDefault()
        });
    };
};


//Carousel random feed for first image and control image flow
function startCarousel() {
let $item = $('.carousel-item');
let $numberofSlides = $('.carousel-item').length;
let $currentSlide = Math.floor((Math.random() * $numberofSlides));

    $('.carousel-indicators li').each(function(){
    var $slideValue = $(this).attr('data-slide-to');

        if($currentSlide == $slideValue) {
            $(this).addClass('active');
            $item.eq($slideValue).addClass('active');
        } else {
            $(this).removeClass('active');
            $item.eq($slideValue).removeClass('active');
        }
    });

    'use strict';
	$('.carousel .carousel-item[data-src]').each(function() {
		let $this = $(this);
		$this.prepend([
			'<div style="background-image: url(', $this.attr('data-src'), ')"></div>'
		].join(''));
	});
};


//Functions related to the 4 articles at top of the page
//Click on article, set opacity and display article text
$(".article").click(function(){
let selection = this.id;
let em = document.getElementById(this.id);
let opac = window.getComputedStyle(em).getPropertyValue("opacity");
let myElement = document.querySelector(`#article${this.id.slice(-1)}-text-below`);

    if (opac>0.5 && $(myElement).is(':visible')) {
        restoreArticles();
        hideArticleText();
        return;
    };

    fadeArticles();
    hideArticleText();
    $(this).fadeTo(10,1);

    //Display (slow) article text and ensure it is visible to the user (scroll if required)
    switch(selection) {
        case "card1":
            $("#article1-text-below").show("slow");
            scrollToArticle();
        break;
        case "card2":
           $("#article2-text-below").show("slow");
            scrollToArticle();
            break;
        case "card3":
            $("#article3-text-below").show("slow");
            scrollToArticle();
        break;
        case "card4":
            $("#article4-text-below").show("slow");
            scrollToArticle()
        break;
    default:
        hideArticleText(); 
    };
});


function scrollToArticle() {
    var element = document.getElementById("article-detail");
    element.scrollIntoView({behavior: "smooth", block: "start"});
};
    

function hideArticleText() {
let x = 1;
    for (x = 1;x < 5; x++ ) {
        let myElement = document.querySelector(`#article${x}-text-below`);
        $(myElement).addClass("article-display-hide").hide("slow");
    };
}
        

function fadeArticles() {
    $(".article").fadeTo(10,0.25);  
};


function restoreArticles() {
    $(".article").fadeTo(100,1);
};


//Generic array shuffle function, used to select chart colours
function shuffle(array) {
let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};