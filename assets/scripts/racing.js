var gblData;
var myChartWins;

$(document).ready( function () {
    yearsSince1949();
    startCarousel();
    buildHTMLTable();
    smoothScroll();
    loadJsonFile();
    //alert("hello");
    //getChampionshipWins();
});

/* Used to calulate the time in years since the championships started */
function yearsSince1949() {
    var dt2=new Date();
    var dt1=new Date(1949,1,1);
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff/365.25));
 };

/* Will be used to search the page eg riders, makes etc */
$( "#navSearch" ).keypress(function(e) {
    if (e.key == 'Enter') {
        var str = $("#navSearch").val();
        alert("Now searching the page for '" + str + "'!");
    };
});

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

$(".article").click(function(){
var selection = this.id;
var em = document.getElementById(this.id);
var opac = window.getComputedStyle(em).getPropertyValue("opacity");
var myElement = document.querySelector('#article-text-below');
/* alert(opac);
alert(myElement.innerText.length); */

if (opac>0.5 && myElement.innerText.length>0) {
    restoreArticles();
    myElement.innerText="";
    /* alert("Shouldn't be here!"); */
    end;
};

fadeArticles();
$(this).fadeTo(10,1);

    switch(selection) {
        case "card1":
            /* $("#article-text-below").html(`test html here...`).effect("explode"); */
            $("#article-text-below").html(`Grand Prix motorcycle racing is the premier class of motorcycle road racing events held on road circuits sanctioned by the <a href="https://en.wikipedia.org/wiki/F%C3%A9d%C3%A9ration_Internationale_de_Motocyclisme" target="_blank">Fédération Internationale de Motocyclisme (FIM)</a>.<br><br>It is the oldest established motorsport world championship.<br>Independent motorcycle racing events have been held since the start of the twentieth century and large national events were often given the title Grand Prix.<br> The foundation of the Fédération Internationale de Motocyclisme as the international governing body for motorcycle sport in 1949 provided the opportunity to coordinate rules and regulations in order that selected events could count towards official World Championships.<br><br> The current top division is known as <a href="https://www.motogp.com/" target="_blank">MotoGP</a> since 2002 when the four-stroke era began. Prior to that, the largest class was 500cc, both of which form a historical continuum as the official World Championship, although all classes have official status. <br><br> Grand Prix motorcycles are purpose-built racing machines that are generally unavailable for purchase by the general public or able to be ridden legally on public roads. This contrasts with the various production-based categories of racing, such as the <a href="https://www.worldsbk.com/" target="_blank">Superbike World Championship</a> and the <a href="https://www.iomtt.com/" target="_blank">Isle of Man TT Races</a> that feature modified versions of road-going motorcycles available to the public.<br><br> The championship is currently divided into four classes: Moto Grand Prix, Moto2, Moto3 and MotoE. The first three classes use four-stroke engines, while the MotoE class (new in 2019) uses electric motors, much like the four-wheeler, single-seater all-electric racing series Formula E. The 2019 MotoGP season comprises 19 Grands Prix, with 12 held in Europe, three in Asia, two in the Americas, and one each in Australia and the Middle East."`);
        break;
        case "card2":
            $("#article-text-below").html(`Scroll down the page to see some statistics concerning the full race results across all ` + yearsSince1949() + ` years of Grand Prix motorcycle racing.<br><br> The most successful rider in Grand Prix history is <a href="https://en.wikipedia.org/wiki/Giacomo_Agostini" target="_blank">Giacomo Agostini</a> with 15 titles and 122 race wins.<br> In the top-flight series, Agostini holds the title record with eight, followed by active riders <a href="https://en.wikipedia.org/wiki/Valentino_Rossi" target="_blank">Valentino Rossi</a> with seven and <a href="https://en.wikipedia.org/wiki/Marc_Márquez" target="_blank">Marc Márquez</a> with six. As of 2019, Rossi holds the record for most top-flight race wins with 89.<br><br> Without exception every single racer mentioned on this website is (or was) a dedicated and focused sports person. The majority started riding motorcycles at a very young age, fear is not a word in any racers vocabulary, despite the risks clearly involved.`);
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
        break;
    default:
        $("#article-text-below").html("");
    }
});

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
    //alert(gblData);
    //callback(JSON.parse(text));
    //console.log(`Should be 71 years: ${data.length}`);
    //console.log(`Should be 1950 for second year: ${data[1].Year}`);
    //console.log(`Should be array 0 - 70: ${getTableHeaders(data)}`);
    //console.log(`Should be array of Col Titles: ${getTableHeaders(data[0])}`);
    //console.log(`Should be the full row data array: ${getAllData(data)}`);
    getChampionshipWins("Nation",10);
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
    }
    if (optQty>=1) {
    labelsSliced = labels.slice(0,optQty);
    dataSliced = data.slice(0,optQty);
    } else {
    labelsSliced = labels.slice(0,9);
    dataSliced = data.slice(0,9);       
    };

    let chartData = [labelsSliced,dataSliced];

    //function buildNationsChart(obj) {
    var ctx = document.getElementById('nationsChart').getContext("2d");
    //console.log(obj[1]);

    /* if (typeof(this.myChartWins) != "undefined") {
        console.log("undefined myChartWins");
            this.myChartWins.destroy();
        };

    //console.log(myChartWins);
    if (window.myChartWins) {
        console.log("undefined myChartWins");
        myChartWins.destroy();
      };
    */ 

    myChartWins = new Chart(ctx, {
    // The type of chart we want to create
        type: "bar",
        // The data for our dataset
        data: {
            labels: chartData[0],
            datasets: [{
                label: "Championship wins",
                data: chartData[1],
                backgroundColor: shuffle(colours75()),
                //borderColor: "rgb(255,255,255)",
            }]
        },

        // Configuration options go here
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
    
    if (chartData[0].length>5) {
        Chart.defaults.global.defaultFontSize = 10;
    } else {
        Chart.defaults.global.defaultFontSize = 12;
    };
    //window.location.reload(1);
    //console.log(myChartWins);
};


function btnWins(clicked) {
let qty = $("#txtWins").val();
let type = clicked.slice(3, clicked.length);

myChartWins.destroy();

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



Chart.defaults.global.defaultFontColor = "rgb(255,255,255)";
Chart.defaults.global.responsiveAnimationDuration=50;

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
        'rgba(204,75,253,0.3)',
        'rgba(0,206,82,0.3)',
        'rgba(0,166,249,0.3)',
        'rgba(226,1,89,0.3)',
        'rgba(205,222,62,0.3)',
        'rgba(0,117,198,0.3)',
        'rgba(97,172,0,0.3)',
        'rgba(233,161,255,0.3)',
        'rgba(197,255,138,0.3)',
        'rgba(158,108,211,0.3)',
        'rgba(146,231,66,0.3)',
        'rgba(255,122,185,0.3)',
        'rgba(97,156,78,0.3)',
        'rgba(85,201,191,0.3)',
        'rgba(247,0,40,0.3)',
        'rgba(225,88,70,0.3)',
        'rgba(207,191,63,0.3)',
        'rgba(209,116,148,0.3)',
        'rgba(209,140,49,0.3)',
        'rgba(157,141,211,0.3)',
        'rgba(122,221,158,0.3)',
        'rgba(220,77,194,0.3)',
        'rgba(219,109,112,0.3)',
        'rgba(190,167,99,0.3)',
        'rgba(250,115,0.3)',
        'rgba(204,75,253,0.3)',
        'rgba(0,206,82,0.3)',
        'rgba(0,166,249,0.3)',
        'rgba(226,1,89,0.3)',
        'rgba(205,222,62,0.3)',
        'rgba(0,117,198,0.3)',
        'rgba(97,172,0,0.3)',
        'rgba(233,161,255,0.3)',
        'rgba(197,255,138,0.3)',
        'rgba(158,108,211,0.3)',
        'rgba(146,231,66,0.3)',
        'rgba(255,122,185,0.3)',
        'rgba(97,156,78,0.3)',
        'rgba(85,201,191,0.3)',
        'rgba(247,0,40,0.3)',
        'rgba(225,88,70,0.3)',
        'rgba(207,191,63,0.3)',
        'rgba(209,116,148,0.3)',
        'rgba(209,140,49,0.3)',
        'rgba(157,141,211,0.3)',
        'rgba(122,221,158,0.3)',
        'rgba(220,77,194,0.3)',
        'rgba(219,109,112,0.3)',
        'rgba(190,167,99,0.3)',
        'rgba(250,115,0.3)',
        'rgba(204,75,253,0.3)',
        'rgba(0,206,82,0.3)',
        'rgba(0,166,249,0.3)',
        'rgba(226,1,89,0.3)',
        'rgba(205,222,62,0.3)',
        'rgba(0,117,198,0.3)',
        'rgba(97,172,0,0.3)',
        'rgba(233,161,255,0.3)',
        'rgba(197,255,138,0.3)',
        'rgba(158,108,211,0.3)',
        'rgba(146,231,66,0.3)',
        'rgba(255,122,185,0.3)',
        'rgba(97,156,78,0.3)',
        'rgba(85,201,191,0.3)',
        'rgba(247,0,40,0.3)',
        'rgba(225,88,70,0.3)',
        'rgba(207,191,63,0.3)',
        'rgba(209,116,148,0.3)',
        'rgba(209,140,49,0.3)',
        'rgba(157,141,211,0.3)',
        'rgba(122,221,158,0.3)',
        'rgba(220,77,194,0.3)',
        'rgba(219,109,112,0.3)',
        'rgba(190,167,99,0.3)',
        'rgba(250,115,0.3)',
        'rgba(204,75,253,0.3)',
        'rgba(0,206,82,0.3)',
        'rgba(0,166,249,0.3)',
        'rgba(226,1,89,0.3)',
        'rgba(205,222,62,0.3)',
        'rgba(0,117,198,0.3)',
        'rgba(97,172,0,0.3)',
        'rgba(233,161,255,0.3)',
        'rgba(197,255,138,0.3)',
        'rgba(158,108,211,0.3)',
        'rgba(146,231,66,0.3)',
        'rgba(255,122,185,0.3)',
        'rgba(97,156,78,0.3)',
        'rgba(85,201,191,0.3)',
        'rgba(247,0,40,0.3)',
        'rgba(225,88,70,0.3)',
        'rgba(207,191,63,0.3)',
        'rgba(209,116,148,0.3)',
        'rgba(209,140,49,0.3)',
        'rgba(157,141,211,0.3)',
        'rgba(122,221,158,0.3)',
        'rgba(220,77,194,0.3)',
        'rgba(219,109,112,0.3)',
        'rgba(190,167,99,0.3)'
        ]
    return colours
};