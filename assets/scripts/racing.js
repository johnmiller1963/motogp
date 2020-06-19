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


//Used to feed following images into the slider/carousel
function startCarousel() {
    'use strict';
	$('.carousel .carousel-item[data-src]').each(function() {
		let $this = $(this);
		$this.prepend([
			'<div style="background-image: url(', $this.attr('data-src'), ')"></div>'
		].join(''));
	});
};


//Functiona related to the 4 articles at top of the page
//Click on article, set opacity and display article text
$(".article").click(function(){
let selection = this.id;
let em = document.getElementById(this.id);
let opac = window.getComputedStyle(em).getPropertyValue("opacity");
let myElement = document.querySelector('#article-text-below');

    if (opac>0.5 && myElement.innerText.length>0) {
        restoreArticles();
        myElement.innerText="";
        return;
    };

    fadeArticles();
    $(this).fadeTo(10,1);

    //Display article and ensure it is visible to the user (scroll if required)
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