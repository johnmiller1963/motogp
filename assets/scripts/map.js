/*
Who: John Miller
What: Javascript file with a simple implementation of Google maps, uses markers or differing colours and custom tooltips
Where: If any of this code can help you, feel free to copy and try it for your own solutions
When: 21 June 2020
*/


//Create a map in the div and assign pointers
function initMap() {
var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: {lat: 32, lng: 0}
    });

    setMarkers(map);

};


//Use different pin colour (green) for most recent racing year
function setPinImage(myLastYear) {
let pinColor = 0;

    if (myLastYear>=2019) {
        pinColor="04bf4c";
        var pinImage = new google.maps.MarkerImage("https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    } else {
        pinColor="f73625";
        var pinImage = new google.maps.MarkerImage("https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    };

    return pinImage;
};


//Adds track markers to the map
function setMarkers(map) {
let tracks = getTracks();
let i = 0;

    for (i = 0; i < tracks.length; i++) {
        let track = tracks[i];
        let marker = new google.maps.Marker({
            position: {lat: track[1], lng: track[2]},
            map: map,
            icon: setPinImage(track[3].slice(-4)),
            shadow: setPinShadow(), //Not sure if this is working?
            title: `${track[0]}\nUsage: ${track[3]}`,  //Will appear as a tooltip across 2 lines
        });
    }
}


function setPinShadow() {
let pinShadow = new google.maps.MarkerImage("https://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));

    return pinShadow;
};


//Static data used for tracks rather than Google GeoLocation service being called lots of times for each map render
function getTracks() {
let tracks = [
["Autódromo do Estoril",38.7505686,-9.3941956,"2000–2012"],
["Autodromo Enzo e Dino Ferrari",44.3443574,11.719392,"1969, 1972, 1974–1975, 1977, 1979, 1981, 1983, 1988, 1996-1999"],
["Autódromo Internacional Ayrton Senna",-16.7191219,-49.1920544,"1987–1989"],
["Autódromo Internacional Nelson Piquet",-15.7728818,-47.899067,"1995–1997, 1999–2004"],
["Autódromo José Carlos Pace",-23.701185,-46.6979544,"1992"],
["Autódromo Juan y Oscar Gálvez",-34.6934345,-58.45909119999999,"1961–1963, 1981–1982, 1987, 1994–1995, 1998–1999"],
["Autodromo Nazionale di Monza",45.621799,9.284799999999999,"1949–1968, 1970–1971, 1973, 1981, 1983, 1986–1987"],
["Autódromo Termas de Río Hondo",-27.5124043,-64.91774719999999,"2014–2019"],
["Automotodrom Grobnik",45.3832207,14.5103431,"1978–1990"],
["Buriram International Circuit",14.9579714,103.0849254,"2018–2019"],
["Bugatti Circuit",47.9560052,0.2078705,"1969–1970, 1976, 1979, 1983, 1985, 1987, 1989–1991, 1994–1995, 2000–2019"],
["Circuit automobile d Albi (Les Planques)",48.8634654,2.3688944,"1951"],
["Circuit Bremgarten",46.9649884,7.3900248,"1949, 1951–1954"],
["Circuit de Catalunya",41.5682267,2.2571491,"1992–2019"],
["Circuit de Charade",45.7422569,3.0324098,"1959–1964, 1966–1967, 1972, 1974"],
["Circuit de Nevers Magny-Cours",46.8615409,3.163392,"1992"],
["Circuit de Spa-Francorchamps",50.4369118,5.972049999999999,"1949–1979, 1981–1990"],
["Circuit des Nations",45.39500899999999,-71.907658,"1950"],
["Circuit of the Americas",30.1345808,-97.6358511,"2013–2019"],
["Circuit Paul Armagnac",43.7660938,-0.0381237,"1978, 1982"],
["Circuit Paul Ricard",43.2517169,5.792731499999999,"1973, 1975, 1977, 1980–1981, 1984, 1986, 1988, 1991, 1996–1999"],
["Circuit Ricardo Tormo",39.4877192,-0.6289116,"1999–2019"],
["Circuit Zolder",50.9904979,5.257984,"1980"],
["Circuito de Jerez",36.7092986,-6.0338783,"1987, 1989–2019"],
["Circuito del Jarama",40.616892,-3.585286,"1969, 1971, 1973, 1975, 1977–1988, 1991, 1993, 1998"],
["Ciudad del Motor de Aragón",41.0782998,-0.2045345,"2010–2019"],
["Clady Circuit",54.79315,-7.541220000000001,"1949–1952"],
["Daytona International Speedway",29.185169,-81.070528,"1964–1965"],
["Donington Park",52.8305468,-1.3788403,"1987–2009"],
["Dundrod Circuit",54.5809438,-6.0838906,"1953–1971"],
["Eastern Creek Raceway",-33.80631710000001,150.8707252,"1991–1996"],
["Fuji Speedway",35.368274,138.9382515,"1966–1967"],
["Hedemora Circuit",60.29854099999999,16.0165001,"1958"],
["Hockenheimring",49.3298956,8.5709249,"1957, 1959, 1961, 1963, 1966–1967, 1969, 1971, 1973, 1975, 1977, 1979, 1981–1983, 1985-1987, 1989, 1991–1994"],
["Hungaroring",47.5817111,19.2506106,"1990, 1992"],
["Imatra Circuit",61.1695977,28.7645463,"1964–1982"],
["Indianapolis Motor Speedway",39.7953542,-86.2353006,"2008–2015"],
["Istanbul Park",40.6678582,-73.9805549,"2005–2007"],
["Johor Circuit",1.4805879,103.9077126,"1998"],
["Karlskoga Motorstadion",59.3837561,14.5078347,"1978–1979"],
["Kristianstad Circuit",56.0646171,14.2289291,"1959, 1961"],
["Kyalami Racing Circuit",-25.997321,28.0759741,"1983–1985, 1992"],
["Losail International Circuit",25.4862831,51.4528912,"2004–2020"],
["Masaryk Circuit",49.2038889,16.4455557,"1965–1982, 1987–1991, 1993-2019"],
["Mazda Raceway Laguna Seca",36.5842902,-121.7534634,"1988–1991, 1993–1994, 2005–2013"],
["Misano World Circuit Marco Simoncelli",43.961376,12.6859581,"1980, 1982, 1984-1987, 1989–1991, 1993, 2007-2019"],
["Montjuïc circuit",41.3641101,2.1582911,"1950–1955, 1961–1968, 1970, 1972, 1974, 1976"],
["Mosport International Raceway",44.0552611,-78.67613799999999,"1967"],
["Motegi",36.531954,140.2253966,"1999, 2000–2019"],
["Mugello Circuit",43.9965935,11.3713239,"1976, 1978, 1982, 1984-1985, 1991-1993, 1994–2019"],
["Nürburgring",50.3340981,6.9426625,"1955, 1958, 1965, 1968, 1970, 1972, 1974, 1976, 1978, 1980, 1984, 1986, 1988, 1990, 1995–1997"],
["Opatija Circuit",45.353672,14.3323946,"1970, 1972–1977"],
["Phakisa Freeway",-27.9045918,26.7112522,"1999–2004"],
["Phillip Island Grand Prix Circuit",-38.4969348,145.2316062,"1989–1990, 1997–2019"],
["Red Bull Ring",47.2196334,14.7655261,"1996–1997, 2016–2019"],
["Reims-Gueux",49.2541454,3.9312486,"1954–1955"],
["Rouen-Les-Essarts",49.3336877,1.0107009,"1953, 1965"],
["Sachsenring",50.7907617,12.6874043,"1961–1972, 1998–2019"],
["Salzburgring",47.8239967,13.1736378,"1971–1979, 1981–1991, 1993–1994"],
["San Carlos Circuit",9.6648288,-68.55477329999999,"1977–1979"],
["Scandinavian Raceway",57.2615102,13.6013041,"1971–1977, 1981–1990"],
["Schottenring",48.2156752,16.3662457,"1953"],
["Sentul International Circuit",-6.536448399999999,106.8572706,"1996–1997"],
["Sepang International Circuit",2.7594144,101.7317775,"1999–2019"],
["Shah Alam Circuit",3.0813602,101.5422563,"1991–1997"],
["Shanghai International Circuit",31.3296915,121.2259152,"2005–2008"],
["Silverstone Circuit",52.0733006,-1.0146634,"1977–1986, 2010–2017, 2019"],
["Snaefell Mountain Course",54.1934522,-4.590588299999999,"1949–1976"],
["Solitudering",48.7675304,9.041149599999999,"1952, 1954, 1956, 1960, 1962, 1964"],
["Suzuka International Racing Course",34.8455935,136.5389522,"1963–1965, 1987–1998, 2000–2003"],
["Tampere Circuit",61.4977524,23.7609535,"1962–1963"],
["TT Circuit Assen",52.9583015,6.522342,"1949–2019"]
];
    return tracks;
};

