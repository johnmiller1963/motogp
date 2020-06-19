/*
Who: John Miller
What: Javascript file with the creation of a dynamic HTML table from a local JSON data file, table includes filters and caret sorting of each column
Where: If any of this code can help you, feel free to copy and try it for your own solutions
When: 21 June 2020
*/


/* Build html table from Tabulator */
function buildHTMLTable() {
$("#resultsTable").tabulator({
    index:"Year",
    height:265, 
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
});


//load JSON data into the table
$("#resultsTable").tabulator("setData", "assets/data/jsondata.json");
};
