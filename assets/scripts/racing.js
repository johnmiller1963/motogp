var gblData;
var myChartWins;
var myChartMakes;
var myChartKaizen;
var map;
var infoWindow;


$(document).ready( function () {
    //yearsSince1949();
    startCarousel();
    buildHTMLTable();
    smoothScroll();
    loadJsonFile();
    getCoOrds();
});


/* Used to calulate the time in years since the championships started */
function yearsSince1949() {
    var dt2=new Date();
    var dt1=new Date(1949,1,1);
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff/365.25));
};



$("#navSearch").keypress(function(e) {if (e.key == 'Enter') {
var myElements=["p","h2","label"];
var pattern = $(this).val().toLowerCase();
 
    for (var x = 0; x < myElements.length; x++) {
        var searchItems = document.getElementsByTagName(myElements[x]);
            for (var i = 0; i < searchItems.length; i++) {
            var index = searchItems[i].innerText.toLowerCase().indexOf(pattern);
                event.preventDefault();   
                    if (index != -1) {
                        //console.log(`Found ${pattern} in 'h2' with text '${searchItems[i].innerText.toLowerCase()}' ordinal ${i} of the array`)
                        var element = document.getElementsByTagName(myElements[x])[i];
                        element.scrollIntoView({behavior: 'smooth', block: 'center'});
                        break;
                    };
            };
        };
    };
});


function topFunction() {
//var target=document.getElementById("motoGpCarousel");
var target=document.getElementById("headeraddress");

target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
    });
};


function smoothScroll() {
let anchorlinks = document.querySelectorAll('a[href^="#"]')
 
for (let item of anchorlinks) { // relitere 
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


$('#contact-form').on('submit', function(event) {
    event.preventDefault(); // prevent reload

    const e1 = this.form_email.value;
    const e2 = this.form_email_confirm.value;
    const isMatch = e1 === e2;

    if ( !isMatch ){
        event.preventDefault();
        alert("Those emails don't match, please check and re-send!");
        return;
    };

    var formData = new FormData(this);

    formData.append('service_id', 'ionos');
    formData.append('template_id', 'website_enquiry');
    formData.append('user_id', 'user_8X3EQg7gIqpcEa9pn8u3o');
 
    $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
        type: 'POST',
        data: formData,
        contentType: false, // auto-detection
        processData: false // no need to parse formData to string
    }).done(function() {
        alert('Thank you for your email, we will be in touch soon!');
    }).fail(function(error) {
        alert('Oops... ' + JSON.stringify(error));
    });

    document.getElementById('contact-form').reset();
});

/* emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', '#myForm')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
}); */


$(".article").click(function(){
var selection = this.id;
var em = document.getElementById(this.id);
var opac = window.getComputedStyle(em).getPropertyValue("opacity");
var myElement = document.querySelector('#article-text-below');

    if (opac>0.5 && myElement.innerText.length>0) {
        restoreArticles();
        myElement.innerText="";
        return;
    };

    fadeArticles();
    $(this).fadeTo(10,1);

    switch(selection) {
        case "card1":
            $("#article-text-below").html(`Grand Prix motorcycle racing is the premier class of motorcycle road racing events held on road circuits sanctioned by the <a href="https://en.wikipedia.org/wiki/F%C3%A9d%C3%A9ration_Internationale_de_Motocyclisme" target="_blank">Fédération Internationale de Motocyclisme (FIM)</a>.<br><br>It is the oldest established motorsport world championship.<br>Independent motorcycle racing events have been held since the start of the twentieth century and large national events were often given the title Grand Prix.<br> The foundation of the Fédération Internationale de Motocyclisme as the international governing body for motorcycle sport in 1949 provided the opportunity to coordinate rules and regulations in order that selected events could count towards official World Championships.<br><br> The current top division is known as <a href="https://www.motogp.com/" target="_blank">MotoGP</a> since 2002 when the four-stroke era began. Prior to that, the largest class was 500cc, both of which form a historical continuum as the official World Championship, although all classes have official status. <br><br> Grand Prix motorcycles are purpose-built racing machines that are generally unavailable for purchase by the general public or able to be ridden legally on public roads. This contrasts with the various production-based categories of racing, such as the <a href="https://www.worldsbk.com/" target="_blank">Superbike World Championship</a> and the <a href="https://www.iomtt.com/" target="_blank">Isle of Man TT Races</a> that feature modified versions of road-going motorcycles available to the public.<br><br> The championship is currently divided into four classes: Moto Grand Prix, Moto2, Moto3 and MotoE. The first three classes use four-stroke engines, while the MotoE class (new in 2019) uses electric motors, much like the four-wheeler, single-seater all-electric racing series Formula E. The 2019 MotoGP season comprises 19 Grands Prix, with 12 held in Europe, three in Asia, two in the Americas, and one each in Australia and the Middle East."`);
            scrollToArticle();
        break;
        case "card2":
            $("#article-text-below").html(`Scroll down the page to see some statistics concerning the full race results across all ` + yearsSince1949() + ` years of Grand Prix motorcycle racing.<br><br> The most successful rider in Grand Prix history is <a href="https://en.wikipedia.org/wiki/Giacomo_Agostini" target="_blank">Giacomo Agostini</a> with 15 titles and 122 race wins.<br> In the top-flight series, Agostini holds the title record with eight, followed by active riders <a href="https://en.wikipedia.org/wiki/Valentino_Rossi" target="_blank">Valentino Rossi</a> with seven and <a href="https://en.wikipedia.org/wiki/Marc_Márquez" target="_blank">Marc Márquez</a> with six. As of 2019, Rossi holds the record for most top-flight race wins with 89.<br><br> Without exception every single racer mentioned on this website is (or was) a dedicated and focused sports person. The majority started riding motorcycles at a very young age, fear is not a word in any racers vocabulary, despite the risks clearly involved.`);
            scrollToArticle();
            break;
        case "card3":
            $("#article-text-below").html(`(Credits to <a href="https://www.edutopia.org/motorcycle-physics" target="_blank">Owen Edwards : Edutopia</a>)<br>
                            A grand prix racing motorcycle is many things: most impressively, a marvel of engineering that costs hundreds of thousands of dollars to develop and build, and one of the fastest machines on wheels, capable of speeds in excess of 210 miles per hour and able to retain a grip on the road at lean angles of 60 degrees or more.  
                            But looked at scientifically, a racing bike is nothing less than a kinetic demonstration of the laws of physics. <a href="https://en.wikipedia.org/wiki/Freddie_Spencer" target="_blank">Freddie Spencer</a>, a legendary grand prix champion of the eighties and now "dean" of Freddie Spencer's High Performance Riding School in Las Vegas, puts it this way: <br>"Motorcycle racing is a real-world physics lab where the penalty for wrong answers is a lot more dramatic than a bad grade."<br>
                            1. Gravity:<br>
                            The rider shifts weight into the turn to help the motorcycle change direction and lower its center of gravity.<br><br>
                            2. Kinetic Energy:<br>
                            At speed on a straightaway, a motorcycle’s energy is directed forward.<br><br>
                            <b>3. First Law of Motion:</b><br>
                            Newton stated that a body in motion persists in a straight line unless compelled to change.<br><br>
                            <b>4. Thermodynamics:</b><br>
                            Slowing the motorcycle from high speed for tight turns causes heat buildup in its brakes and can diminish effectiveness.<br><br>
                            <b>5. Centrifugal Force:</b><br>
                            In fast turns, lean angle and forward motion counteract the powerful pull toward the outer edge of the track.<br><br>
                            <b>6. Friction:</b><br>
                            A special compound in these rounded tires allows traction on asphalt even at lean angles of 60 degrees and more.
                            Credit: Fiat Yamaha Team.<br><br>
                            According to Charles Falco, the University of Arizona's chair of condensed-matter physics and co-curator of the Guggenheim Museum's The Art of the Motorcycle exhibition, the initial physics lesson to be learned watching a racing bike hurtle into a tight turn is Newton's first law of motion: "Every object persists in its state of rest or uniform motion in a straight line unless it is compelled to change that state by forces impressed on it," explains Falco.<br> To a rider, this means that the faster a motorcycle is going, the less it wants to turn. Converting a bike's kinetic energy from straight ahead to turning requires a negotiation with physics in a couple of ways. First, a rider pushes the handlebars slightly away from the direction of the turn. Because the wheels act as gyroscopes, this countersteering leans the bike in the opposite direction (into the turn), which puts the tires at an angle, narrowing what engineers call the contact patch and making the bike easier to turn. At the same time, the rider moves off the bike in the direction of the turn.<br> The lean angle of the motorcycle shifts the center of gravity to the side, causing the bike to turn, while the weight redistribution lets the machine stay slightly more upright. At the point of maximum lean required to get through a turn at the highest possible speed, centrifugal force wants to pull the bike machine off the track, and the rider uses traction, gravity, and momentum to stay in the game.<br><br> To explain why the machine moves at all, Falco invokes Newton's second law of motion: A force applied to an object will cause it to accelerate. "This will happen until the rider runs out of track, or other forces become nonnegligible, such as wind resistance," says Falco.<br> On some tracks, grand prix motorcycles approaching tight turns must slow from more than 200 mph to around 40 mph. Friction on the brakes (primarily the front brakes) makes this possible. "All that excess energy has to be dissipated by the brakes in the form of heat," Falco says, thus bringing up the law of conservation of matter and energy. Some of this heat is transferred to the hydraulic-brake fluid, which can cause brakes to lose stopping power, with potentially disastrous consequences. Engineers use space age ceramic materials to avoid this problem, and riders become skilled at getting on and off the brakes quickly.<br><br>
                            Successful race riding is a lot like paying taxes: You want to push the rules as far as you can without breaking them. There is a very fine line between optimum cornering and crashing, where outward, downward, and forward forces balance precisely. But rules are rules. "Speaking on behalf of physicists everywhere," Falco declares, "nothing that ever happens on a motorcycle breaks the laws of physics. In fact, motorcycles are excellent examples of just how well physics works."</p>`);
            scrollToArticle();
        break;
        case "card4":
            $("#article-text-below").html(`Copyright <a href="https://www.boxrepsol.com/en/motogp-en/motogp-2-0-future-technologies-applied-to-motogp" target="_blank">BoxRepsol</a> The competition has become a laboratory for innovation and the development of cutting-edge technologies. Every year, we are witness to how new technologies that are applied at the MotoGP end up in the market. But what does the future hold in store for us? What new technologies might we see in use at the MotoGP in a few years' time?
                <br>MotoGP 2.0: Future technologies applied to MotoGP<br><br>
                
                Printed spare parts<br>
                3D printing technologies are advancing so rapidly that teams will soon inevitably have such printers in place of a warehouse full of spare pieces. The greatest setback presented by these systems today is the time it takes to produce printed pieces, but it is hoped this will improve as the technology is developed. The possibility of designing and manufacturing just about any motorcycle component at the track also opens up a wide range of options in terms of tailor-made solutions. The technology's adaptability will eventually demand that the technical team rely on an engineer, tasked with creating these pieces.<br><br>
                
                Communications<br>
                Augmented reality helmets are already being used by mechanics and Box personnel at MotoGP. It is reasonable to assume that such tools will eventually reach the riders, who will use these technologies in order to be less reliant on other support elements, such as the electronic notices board. At the moment, all messages between the rider and the Box are regulated and controlled by a single central unit, but this needn't be the case forever, and we may soon witness a fully open means of communication. When this becomes a reality, all of the information about the motorcycle's status will be projected inside the helmet instead of on the screen on the control panel.<br><br>

                <img class="inline-content" src="https://s3-eu-west-1.amazonaws.com/boxrepsol-site/uploads/116747_Honda_Riding_Assist_e1.jpg" alt="Cuadro de mandos del prototipo Honda Riding Assist-e" itemprop="image" src="https://s3-eu-west-1.amazonaws.com/boxrepsol-site/uploads/116747_Honda_Riding_Assist_e1-900x603.jpg"/><br><br>

                Retransmission<br>
                If open communication with the rider is established, why not take advantage of this to improve retransmission? A helmet camera can be used to have a first-person view of the situation that the public can access to through virtual reality devices. Can you imagine anything more thrilling than experiencing a race from the point of view of the riders themselves?<br><br?
                Circuit drones<br>
                Though we do not expect motorcycles operated by human beings to disappear from the competition, a category of remote-controlled vehicles may one day be incorporated into the races. Drones are having a growing impact on the development of vehicles, transportation, and logistics, and being able to place a riderless device on the track has a clear advantage: safety considerations can be put aside to focus on a more efficient performance. Ultimately, if a riderless motorcycle crashes, all parts are replaceable, so why shouldn't we push it to the limit? This opens up new possibilities, such as more extravagant tracks with loops and leaps.<br><br>

                <img class="inline-content" src="https://s3-eu-west-1.amazonaws.com/boxrepsol-site/uploads/116745_Honda_Riding_Assist_e1.jpg" alt="La moto prototipo Honda Riding Assist-e" src="https://s3-eu-west-1.amazonaws.com/boxrepsol-site/uploads/116745_Honda_Riding_Assist_e1-1280x858.jpg 1280w, https://s3-eu-west-1.amazonaws.com/boxrepsol-site/uploads/116745_Honda_Riding_Assist_e1-900x603.jpg" /><br><br>
            
                Autonomous vehicles<br>
                We can envision a future where motorcycles are controlled remotely, but it is more difficult to imagine one where motorcycles drive themselves. However, it is only a matter of time before a computer is able to autonomously replicate a human being's performance. Autonomous vehicles are already a reality, even though they haven't become popular yet. We have already been witness to several prototypes that are operating among us, including competition prototypes. When the time comes, will we see these intelligent machines compete next to current riders?<br>`);
            scrollToArticle()
        break;
    default:
        $("#article-text-below").html("");
    };
});


function scrollToArticle() {
    var element = document.getElementById("article-detail");
    element.scrollIntoView({behavior: "smooth", block: "start"});
};
    
        

    /* var element = document.getElementById('article-detail');
    var headerOffset = 15;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    }); */


function fadeArticles() {
    $(".article").fadeTo(10,0.25);
};


function restoreArticles() {
    $(".article").fadeTo(100,1);
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
        };
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
$(".dropdown-menu li a").click(function(){
  $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
  $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
});


/* $(".dropdown-menu").click(function(){
    
  var selText = $(this).text();
  $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
}); */


/* Charts Data */
function loadJsonFile() {
    readJsonFile("assets/data/jsondata.json", function(text){
    gblData = JSON.parse(text);
    getChampionshipWins("Nation",10);
    getChampionshipMakes("MotoGP");
    getKaizenWins("");
    //alert(gblData);
    //callback(JSON.parse(text));
    //console.log(`Should be 71 years: ${data.length}`);
    //console.log(`Should be 1950 for second year: ${data[1].Year}`);
    //console.log(`Should be array 0 - 70: ${getTableHeaders(data)}`);
    //console.log(`Should be array of Col Titles: ${getTableHeaders(data[0])}`);
    //console.log(`Should be the full row data array: ${getAllData(data)}`);
    //return data;
    });
};


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


Chart.defaults.global.defaultFontColor = 'rgb(255,255,255)';
Chart.defaults.global.responsiveAnimationDuration=900;


function getTableHeaders(obj) {
    var tableHeaders = [];
    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(key);
    });
    return tableHeaders;
};


function getAllData(obj) {
    var tableRows = [];
        
        obj.forEach(function(item) {
            var dataCol = [];

            Object.keys(item).forEach(function(key) {
                var dataCol = item[key].toString();
                tableRows.push(dataCol);
            });
        });
    
    var arr = tableRows
    let counts = {};
    arr.forEach(el => counts[el] = 1  + (counts[el] || 0))
    /* console.log(counts); */

    return tableRows;
};


function getChampionshipWins(optType = "Nation", optQty = 10) {
let obj = gblData;
let tableRows = [];
        //alert(gblData.length);
        obj.forEach(function(item) { 
            let dataLabels = [];

            Object.keys(item).forEach(function(key) {
               
                // console.log(`Keys used to read the data in: ${key}`);
                if (key.search(optType) >= 0) {
                    if (item[key] !=="") {
                        let dataLabels = item[key];
                        tableRows.push(dataLabels);
                    };
                };
            });
        });
    
    let counts = {};
    tableRows.forEach(el => counts[el] = 1  + (counts[el] || 0));
   
    
    let labels=Object.keys(counts);
    let data=Object.values(counts);

    var list = [];
    for (var j = 0; j < labels.length; j++) 
        list.push({'name': labels[j], 'wins': data[j]});

    list.sort(function(a, b) {
        return ((b.wins < a.wins) ? -1 : ((a.wins == b.wins) ? 0 : 1));
    });

    for (var k = 0; k < list.length; k++) {
        labels[k] = list[k].name;
        data[k] = list[k].wins;
    };

    if (optQty>=1) {
    labelsSliced = labels.slice(0,optQty);
    dataSliced = data.slice(0,optQty);
    } else {
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



    //function buildNationsChart(obj) {
    var ctx = document.getElementById('nationsChart').getContext("2d");

    myChartWins = new Chart(ctx, {
    // The type of chart we want to create
        type: "bar",
        // The data for our dataset
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


function getChampionshipMakes(myClass) {
let obj = gblData;
let tableRows = [];
        //alert(gblData.length);
        //alert(myClass + " Make")
        obj.forEach(function(item) { 
            let dataLabels = [];

            Object.keys(item).forEach(function(key) {
               
                // console.log(`Keys used to read the data in: ${key}`);
                if (key.search(myClass + " Make") >= 0) {
                    if (item[key] !=="") {
                        let dataLabels = item[key];
                        tableRows.push(dataLabels);
                    };
                };
            });
        });
    
    let counts = [];
    tableRows.forEach(el => counts[el] = 1  + (counts[el] || 0));
   
    let labels=Object.keys(counts);
    let data=Object.values(counts);

    var list = [];
    for (var j = 0; j < labels.length; j++) 
        list.push({'name': labels[j], 'wins': data[j]});

    list.sort(function(a, b) {
        return ((b.wins < a.wins) ? -1 : ((a.wins == b.wins) ? 0 : 1));
    });


    for (var k = 0; k < list.length; k++) {
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
    

    var options = {
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

    //function buildNationsChart(obj) {
    var ctx = document.getElementById('manufacturersChart').getContext("2d");

    myChartMakes = new Chart(ctx, {
    // The type of chart we want to create
        type: "pie",
        // The data for our dataset
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


function getKaizenWins(optMake = "") {
const japaneseMakes="honda kawasaki suzuki yamaha";
const dataLabels = ["1949-59","1960-69","1970-79","1980-89","1990-99","2000-09","2010-19"];
let obj = gblData;
let japaneseTotalWins= new Array(dataLabels.length).fill(0);
let selectedTotalWins=new Array(dataLabels.length).fill(0);
let rowTotalWins=new Array(dataLabels.length).fill(0);

//console.log(selectedTotalWins[1]);

    //alert(gblData.length);
    obj.forEach(function(item) { //For each Year
        //console.log(item);

        let currentYear;
        let japaneseWins=0;
        let selectedWins=0;
        let restOfWorldWins=0;

        Object.keys(item).forEach(function(key) { //For each column in this year
            if (key == "Year") {
                currentYear = item[key]
                //console.log(`Looking in Year ${currentYear}`)
            }; 

            if (key.search("Make") >= 0) {
    
                switch (true) {
                    case (japaneseMakes.search(item[key].toLowerCase()) >= 0 && item[key].length > 0):
                        //console.log(`Found Japanses bike: ${item[key]}`)
                        ++japaneseWins;
                    break;
                    case (optMake.toLowerCase().search(item[key].toLowerCase()) >= 0 && item[key].length > 0):
                        //console.log(`Found Selected bike: ${item[key]}`)
                        ++selectedWins;
                    break;
                    case (item[key].length > 0):
                        //console.log(`Found RoW bike: ${item[key]}`)
                        ++restOfWorldWins
                    };
                };
            });

            //console.log(`Year is ${currentYear} - JapaneseWins ${japaneseWins} SelectedMake ${selectedWins} RoWWins ${restOfWorldWins}`);
            let x = 0

            switch (true) {
                case (currentYear < 1960):
                    japaneseTotalWins[0]=japaneseTotalWins[0] + japaneseWins;
                    selectedTotalWins[0]=selectedTotalWins[0] + selectedWins;
                    rowTotalWins[0]=rowTotalWins[0] + restOfWorldWins;            
                break;
                case (currentYear < 1970):
                    japaneseTotalWins[1]=japaneseTotalWins[1] + japaneseWins;
                    selectedTotalWins[1]=selectedTotalWins[1] + selectedWins;
                    rowTotalWins[1]=rowTotalWins[1] + restOfWorldWins;    
                    break;
                case (currentYear < 1980):
                    japaneseTotalWins[2]=japaneseTotalWins[2] + japaneseWins;
                    selectedTotalWins[2]=selectedTotalWins[2] + selectedWins;
                    rowTotalWins[2]=rowTotalWins[2] + restOfWorldWins;                     
                break;
                case (currentYear < 1990):
                    japaneseTotalWins[3]=japaneseTotalWins[3] + japaneseWins;
                    selectedTotalWins[3]=selectedTotalWins[3] + selectedWins;
                    rowTotalWins[3]=rowTotalWins[3] + restOfWorldWins;       
                break;
                case (currentYear < 2000):
                    japaneseTotalWins[4]=japaneseTotalWins[4] + japaneseWins;
                    selectedTotalWins[4]=selectedTotalWins[4] + selectedWins;
                    rowTotalWins[4]=rowTotalWins[4] + restOfWorldWins;                
                break;
                case (currentYear < 2010):
                    japaneseTotalWins[5]=japaneseTotalWins[5] + japaneseWins;
                    selectedTotalWins[5]=selectedTotalWins[5] + selectedWins;
                    rowTotalWins[5]=rowTotalWins[5] + restOfWorldWins;                     
                break;
                case (currentYear < 2020):
                    japaneseTotalWins[6]=japaneseTotalWins[6] + japaneseWins;
                    selectedTotalWins[6]=selectedTotalWins[6] + selectedWins;
                    rowTotalWins[6]=rowTotalWins[6] + restOfWorldWins;                    
                break;
            };
    });

    /* console.log(`1950s decade Japanese wins: ${japaneseTotalWins[0]} Selected Wins ${selectedTotalWins[0]} and RoW Wins ${rowTotalWins[0]}`);
    console.log(`1960s decade Japanese wins: ${japaneseTotalWins[1]} Selected Wins ${selectedTotalWins[1]} and RoW Wins ${rowTotalWins[1]}`);
    console.log(`1970s decade Japanese wins: ${japaneseTotalWins[2]} Selected Wins ${selectedTotalWins[2]} and RoW Wins ${rowTotalWins[2]}`);
    console.log(`1980s decade Japanese wins: ${japaneseTotalWins[3]} Selected Wins ${selectedTotalWins[3]} and RoW Wins ${rowTotalWins[3]}`);
    console.log(`1990s decade Japanese wins: ${japaneseTotalWins[4]} Selected Wins ${selectedTotalWins[4]} and RoW Wins ${rowTotalWins[4]}`);
    console.log(`2000s decade Japanese wins: ${japaneseTotalWins[5]} Selected Wins ${selectedTotalWins[5]} and RoW Wins ${rowTotalWins[5]}`);
    console.log(`2010s decade Japanese wins: ${japaneseTotalWins[6]} Selected Wins ${selectedTotalWins[6]} and RoW Wins ${rowTotalWins[6]}`);
    */
   

    var options = {
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

    let data=[japaneseTotalWins,selectedTotalWins,rowTotalWins];

    /* console.log(data[0]);
    console.log(data[1]);
    console.log(data[2]);
    */

    if (optMake.length>0) {
        optLabel = "Wins for " + optMake.charAt(0).toUpperCase() + optMake.slice(1);
        data;
    } else {
        optLabel = "None Specified"
    };
    
    var ctx = document.getElementById('kaizenChart').getContext("2d");

    myChartZaizen = new Chart(ctx, {
    // The type of chart we want to create
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


function btnWins(clicked) {
let qty = $("#txtWins").val();
let type = clicked.slice(3, clicked.length);

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
let make = $("#txtMake").val();
console.log(make);
//let type = clicked.slice(3, clicked.length);

    try {
        myChartZaizen.destroy();
    } catch {
        /* do nothing */
    };

    getKaizenWins(make);

};


/* function zoomTo(level) {
    google.maps.event.addListener(map, 'zoom_changed', function () {
        zoomChangeBoundsListener = google.maps.event.addListener(map, 'bounds_changed', function (event) {
            if (this.getZoom() > level && this.initialZoom == true) {
                this.setZoom(level);
                this.initialZoom = false;
            }
            google.maps.event.removeListener(zoomChangeBoundsListener);
        });
    });
};
*/


/* var infoWindow;
center: { lat: 32, lng: 0 },
zoom: 2,
gestureHandling: 'auto' */


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: -33.9, lng: 151.2}
  });

  //setMarkers(map);

  var markerCluster = new MarkerClusterer(map, setMarkers(map),
    {imagePath: 'assets/images'});
}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var tracks = [
  ['Bondi Beach', -33.890542, 151.274856, '1976 - 1998 2002 2004 2006 - 2009'],
  ['Coogee Beach', -33.923036, 151.259052, 5],
  ['Cronulla Beach', -34.028249, 151.157507, 3],
  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  ['Maroubra Beach', -33.950198, 151.259302, 1]
];

function setMarkers(map) {
  // Adds markers to the map.

  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.

  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  //var image = {
    //url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',


    // This marker is 20 pixels wide by 32 pixels high.
    //size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    //origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    //anchor: new google.maps.Point(0, 32)
  //};
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  //var shape = {
  //  coords: [1, 1, 1, 20, 18, 20, 18, 1],
  //  type: 'poly'
  //};
  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    var marker = new google.maps.Marker({
      position: {lat: track[1], lng: track[2]},
      map: map,
      //icon: image,
      //shape: shape,
      //var myTitle = `${track[0]}<br>Usage: ${track[3]}`,
      title: `${track[0]}\nUsage: ${track[3]}`,
      //zIndex: beach[3]
    });
  }
}


function getCoOrds() {
//{lat: -31.563910, lng: 147.154312},
var tracks = [
["Autódromo do Estoril",38.7505686,-9.3941956,"2000–2012"],
["Autodromo Enzo e Dino Ferrari",44.3443574,11.719392,"1969, 1972, 1974–1975, 1977, 1979, 1981, 1983, 1988, 1996-1999"],
["Autódromo Internacional Ayrton Senna",-16.7191219,-49.1920544,"1987–1989"],
["Autódromo Internacional Nelson Piquet",-15.7728818,-47.899067,"1995–1997, 1999–2004"],
["Autódromo José Carlos Pace",-23.701185,-46.6979544,"1992"],
["Autódromo Juan y Oscar Gálvez",-34.6934345,-58.45909119999999,"1961–1963, 1981–1982, 1987, 1994–1995, 1998–1999"],
["Autodromo Nazionale di Monza",45.621799,9.284799999999999,"1949–1968, 1970–1971, 1973, 1981, 1983, 1986–1987"],
["Autódromo Termas de Río Hondo",-27.5124043,-64.91774719999999,"2014–2019"],
];
/*
Automotodrom Grobnik,45.3832207,14.5103431,1978–1990
Buriram International Circuit,14.9579714,103.0849254,2018–2019
Bugatti Circuit,47.9560052,0.2078705,"1969–1970, 1976, 1979, 1983, 1985, 1987, 1989–1991, 1994–1995, 2000–2019"
Circuit automobile d Albi (Les Planques),48.8634654,2.3688944,1951
Circuit Bremgarten,46.9649884,7.3900248,"1949, 1951–1954"
Circuit de Catalunya,41.5682267,2.2571491,1992–2019
Circuit de Charade,45.7422569,3.0324098,"1959–1964, 1966–1967, 1972, 1974"
Circuit de Nevers Magny-Cours,46.8615409,3.163392,1992
Circuit de Spa-Francorchamps,50.4369118,5.972049999999999,"1949–1979, 1981–1990"
Circuit des Nations,45.39500899999999,-71.907658,1950
Circuit of the Americas,30.1345808,-97.6358511,2013–2019
Circuit Paul Armagnac,43.7660938,-0.0381237,"1978, 1982"
Circuit Paul Ricard,43.2517169,5.792731499999999,"1973, 1975, 1977, 1980–1981, 1984, 1986, 1988, 1991, 1996–1999"
Circuit Ricardo Tormo,39.4877192,-0.6289116,1999–2019
Circuit Zolder,50.9904979,5.257984,1980
Circuito de Jerez,36.7092986,-6.0338783,"1987, 1989–2019"
Circuito del Jarama,40.616892,-3.585286,"1969, 1971, 1973, 1975, 1977–1988, 1991, 1993, 1998"
Ciudad del Motor de Aragón,41.0782998,-0.2045345,2010–2019
Clady Circuit,54.79315,-7.541220000000001,1949–1952
Daytona International Speedway,29.185169,-81.070528,1964–1965
Donington Park,52.8305468,-1.3788403,1987–2009
Dundrod Circuit,54.5809438,-6.0838906,1953–1971
Eastern Creek Raceway,-33.80631710000001,150.8707252,1991–1996
Fuji Speedway,35.368274,138.9382515,1966–1967
Hedemora Circuit,60.29854099999999,16.0165001,1958
Hockenheimring,49.3298956,8.5709249,"1957, 1959, 1961, 1963, 1966–1967, 1969, 1971, 1973, 1975, 1977, 1979, 1981–1983, 1985-1987, 1989, 1991–1994"
Hungaroring,47.5817111,19.2506106,"1990, 1992"
Imatra Circuit,61.1695977,28.7645463,1964–1982
Indianapolis Motor Speedway,39.7953542,-86.2353006,2008–2015
Istanbul Park,40.6678582,-73.9805549,2005–2007
Johor Circuit,1.4805879,103.9077126,1998
Karlskoga Motorstadion,59.3837561,14.5078347,1978–1979
Kristianstad Circuit,56.0646171,14.2289291,"1959, 1961"
Kyalami Racing Circuit,-25.997321,28.0759741,"1983–1985, 1992"
Losail International Circuit,25.4862831,51.4528912,2004–2020
Masaryk Circuit,49.2038889,16.4455557,"1965–1982, 1987–1991, 1993-2019"
Mazda Raceway Laguna Seca,36.5842902,-121.7534634,"1988–1991, 1993–1994, 2005–2013"
Misano World Circuit Marco Simoncelli,43.961376,12.6859581,"1980, 1982, 1984-1987, 1989–1991, 1993, 2007-2019"
Montjuïc circuit,41.3641101,2.1582911,"1950–1955, 1961–1968, 1970, 1972, 1974, 1976"
Mosport International Raceway,44.0552611,-78.67613799999999,1967
Motegi,36.531954,140.2253966,"1999, 2000–2019"
Mugello Circuit,43.9965935,11.3713239,"1976, 1978, 1982, 1984-1985, 1991-1993, 1994–2019"
Nürburgring,50.3340981,6.9426625,"1955, 1958, 1965, 1968, 1970, 1972, 1974, 1976, 1978, 1980, 1984, 1986, 1988, 1990, 1995–1997"
Opatija Circuit,45.353672,14.3323946,"1970, 1972–1977"
Phakisa Freeway,-27.9045918,26.7112522,1999–2004
Phillip Island Grand Prix Circuit,-38.4969348,145.2316062,"1989–1990, 1997–2019"
Red Bull Ring,47.2196334,14.7655261,"1996–1997, 2016–2019"
Reims-Gueux,49.2541454,3.9312486,1954–1955
Rouen-Les-Essarts,49.3336877,1.0107009,"1953, 1965"
Sachsenring,50.7907617,12.6874043,"1961–1972, 1998–2019"
Salzburgring,47.8239967,13.1736378,"1971–1979, 1981–1991, 1993–1994"
San Carlos Circuit,9.6648288,-68.55477329999999,1977–1979
Scandinavian Raceway,57.2615102,13.6013041,"1971–1977, 1981–1990"
Schottenring,48.2156752,16.3662457,1953
Sentul International Circuit,-6.536448399999999,106.8572706,1996–1997
Sepang International Circuit,2.7594144,101.7317775,1999–2019
Shah Alam Circuit,3.0813602,101.5422563,1991–1997
Shanghai International Circuit,31.3296915,121.2259152,2005–2008
Silverstone Circuit,52.0733006,-1.0146634,"1977–1986, 2010–2017, 2019"
Snaefell Mountain Course,54.1934522,-4.590588299999999,1949–1976
Solitudering,48.7675304,9.041149599999999,"1952, 1954, 1956, 1960, 1962, 1964"
Suzuka International Racing Course,34.8455935,136.5389522,"1963–1965, 1987–1998, 2000–2003"
Tampere Circuit,61.4977524,23.7609535,1962–1963
TT Circuit Assen,52.9583015,6.522342,1949–2019
];
*/

    for (var x = 0; x < tracks.length; x++) {
        console.log(tracks[x][1]);


    };
};




/* function initMap() {
  // The location of Uluru
var paris = {
    lat: -25.344, lng: 131.036
};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {
        center: { lat: 32, lng: 0 },
        zoom: 2,
        
    });
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: paris, map: map});


// Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      }
      
      var locations = [
        {lat: -31.563910, lng: 147.154312},
        {lat: -33.718234, lng: 150.363181},
        {lat: -33.727111, lng: 150.371124},
        {lat: -33.848588, lng: 151.209834},
        {lat: -33.851702, lng: 151.216968},
        {lat: -34.671264, lng: 150.863657},
        {lat: -35.304724, lng: 148.662905},
        {lat: -36.817685, lng: 175.699196},
        {lat: -36.828611, lng: 175.790222},
        {lat: -37.750000, lng: 145.116667},
        {lat: -37.759859, lng: 145.128708},
        {lat: -37.765015, lng: 145.133858},
        {lat: -37.770104, lng: 145.143299},
        {lat: -37.773700, lng: 145.145187},
        {lat: -37.774785, lng: 145.137978},
        {lat: -37.819616, lng: 144.968119},
        {lat: -38.330766, lng: 144.695692},
        {lat: -39.927193, lng: 175.053218},
        {lat: -41.330162, lng: 174.865694},
        {lat: -42.734358, lng: 147.439506},
        {lat: -42.734358, lng: 147.501315},
        {lat: -42.735258, lng: 147.438000},
        {lat: -43.999792, lng: 170.463352}
      ]

*/


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

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