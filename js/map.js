// used in multiple functions throughout map.
var access_token = 'pk.eyJ1IjoiYWxhbmJhcmsiLCJhIjoiY2tmbmtwamM3MDNqbzJ4cXRmZ2R4aGVxOSJ9.J_cyZxD5QAw8wyOQq-ompA';

// globals for map storage data that wouldn't make sense to be localstorage
var transactionList = {};
var colorStorage = {};

// average of transaction list
var averageTransactions;

// state machine stuff
var priceState = 0;
var monthOffset = 1;
var monthAverage = null;

// constant definitions ------------------------------------------------------
// rough coordinates of QLD bounding box.
var QLD_BBOX =  [137.95, -29.19, 154.44, -9.11];

var MIN_ZOOM = 4.3;
var START_ZOOM = 10;


// find average of month data, I'm aware count should always be 12.
function findMonthAverage() {
    var data = JSON.parse(localStorage.getItem("monthData"))[0];
    var total = 0, count = 0;
    data['result']['records'].forEach(function (month) {
        total += month['Transactions'];
        count++;
    });
    monthAverage = Math.round(total / count);
}

// update the month offset.
function updateMonthOffset(selectedMonth) {
    if (monthAverage == null) {
        findMonthAverage();
    }
    var monthlyTransactions = JSON.parse(localStorage.getItem("monthData"))[0]
        ['result']['records'][selectedMonth]['Transactions'];
    monthOffset = (monthlyTransactions / monthAverage).toFixed(2); 
}

// creates map and sets up all related event handlers
// should only be called after localstorage contains api and raw geojson data
function createMap (map) {
    mapboxgl.accessToken = access_token;
    var bounds = [[135.352347, -30.024385], [156.871487, -8.619919]];
    map = new mapboxgl.Map({
        container: 'map',
         // stylesheet url
        style: 'mapbox://styles/alanbark/ckfqbb24y0rj519ryeuf99z91',
        center: [153.015757, -27.497811],
        zoom: 10,
        minZoom: 4.6,
        maxBounds: bounds
    });

    map.on('load', function() {
        map.addSource('raw-data', {
            'type' : 'geojson',
            'promoteId' : 'qld_loca_2',
            data: JSON.parse(localStorage.getItem("rawData"))[0]
        });
        var data = JSON.parse(localStorage.getItem("suburbData")); 

        
        // iterate over each suburb, set transaction to color, match with suburb
        // name. add to transactions/suburb object, 
        // calculate average transactions.
        var count = 0;
        var total = 0;
        data[0]['result']['records'].forEach(function (suburb) {
            // Convert the range of data values to a suitable color
            // These functions will never produce values > 255
            var x = suburb['Transactions'];
            var red = Math.floor(((1.3)**((-0.03)*(x-680))*-1)+255);
            var green = Math.floor(((1.3)**((0.03)*(x+200))*-1)+40);
            if (green < 0) {
                green = 0;
            }
            var blue = Math.floor((((1.3)**((-0.03)*(x-680))))/2);
            var color = { red: red, green: green, blue: blue };
            
            // store parsed data in globals
            // store transaction number in feature state of layer
            colorStorage[suburb['Suburb']] = color;
            transactionList[suburb['Suburb']] = x;
            map.setFeatureState(
                { source: 'raw-data', id: suburb['Suburb'] },
                { transactions: x }
            );
            total += x;
            count++;
        });
        averageTransactions = Math.round(total/count);
        updateMonthOffset(2);
        // add layer with expressions
        // opacity is full if layer is selected or hovered,
        map.addLayer(
            {
                'id': 'filtered-data',
                'type': 'fill' ,
                'source': 'raw-data',
                'paint': {
                    'fill-color': 
                    // Expressions for retrieving rgb data from js object.
                    ["rgb",
                        ["get", "red", ["get", ["get", "qld_loca_2"], 
                            ["literal", colorStorage]]],
                        ["get", "green", ["get", ["get", "qld_loca_2"], 
                            ["literal", colorStorage]]],
                        ["get", "blue", ["get", ["get", "qld_loca_2"], 
                            ["literal", colorStorage]]],
                    ],
                    'fill-opacity': ['case', 
                    // If hover: opacity 1, If selected: opacity 1.
                    ['boolean', ['feature-state', 'hover'], false], 1, 
                    ['boolean', ['feature-state', 'selected'], false], 1, 
                    0.6]
                }
            }
        );

        // only show data where transactions are above 0. (ignore no data)
        map.setFilter("filtered-data", [">", 
        ["/" ,
            ["number", ["get", ["get", "qld_loca_2"], ["literal", transactionList]]], 
            averageTransactions],
        0]);
    });
    
    // ID's of currently selected and currently hovered suburbs
    var hoveredSuburbID = null;
    var selectedSuburbID = null;

    // on hover, set feature state on layer filtered-data "hover" to true.
    map.on('mousemove', 'filtered-data', function (e) {
        map.getCanvas().style.cursor = 'pointer';
        if (e.features.length > 0) {
            if (hoveredSuburbID) {
                map.setFeatureState(
                    { source: 'raw-data', id: hoveredSuburbID },
                    { hover: false }
                );
            }
            hoveredSuburbID = e.features[0].id;
            map.setFeatureState(
                { source: 'raw-data', id: hoveredSuburbID },
                { hover: true }
            );
        }
    });

    // When the mouse leaves the state-fill layer, update the feature state 
    // of the previously hovered feature.
    map.on('mouseleave', 'filtered-data', function () {
        map.getCanvas().style.cursor = '';
        if (hoveredSuburbID) {
            map.setFeatureState(
                { source: 'raw-data', id: hoveredSuburbID },
                { hover: false }
            );
        }
        hoveredSuburbID = null;
    });

    // popup prototype
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    })

    // handle user clicks on features
    map.on('click', 'filtered-data', function(e) {
        // Set appropriate selected feature state
        if (selectedSuburbID) {
            map.setFeatureState(
                { source: 'raw-data', id: selectedSuburbID },
                { selected: false}
            );
        }
        selectedSuburbID = e.features[0].id;
        map.setFeatureState(
            { source: 'raw-data', id: selectedSuburbID },
            { selected: true}
        );
        // camera controls
        map.flyTo({
            center: e.lngLat,
            zoom: 10,
            speed: 0.8
        });
        
        var description = selectedSuburbID;
        var transactions = map.getFeatureState(
            {source: 'raw-data', id: selectedSuburbID}).transactions;
        if (transactions == undefined) {
            document.getElementById('place-info').innerHTML = 
                "Location: "+description;
            document.getElementById('transactions-info').innerHTML = 
                "Average Weddings: Not enough data available";
            document.getElementById('popularity-index').innerHTML = 
                "Popularity Index: Not enough data available";
            document.getElementById('price-show').innerHTML = 
                "Price Estimate: Not enough data available";
        } else {
            // find how much higher or lower transactions are compared to average.
            var popularityIndex = (
                (transactions/averageTransactions) * monthOffset).toFixed(2);
            if (popularityIndex < 0.3) {
                document.getElementById('price-show').innerHTML = 
                    "Price Estimate: $6 000 - $12 000";
            } else if (popularityIndex < 0.8) {
                document.getElementById('price-show').innerHTML = 
                    "Price Estimate: $12 000 - $18 000";
            } else if (popularityIndex < 2) {
                document.getElementById('price-show').innerHTML = 
                    "Price Estimate: $18 000 - $24 000";
            } else if (popularityIndex < 3) {
                document.getElementById('price-show').innerHTML = 
                    "Price Estimate: $24 000 - $30 000";
            } else if (popularityIndex < 5) {
                document.getElementById('price-show').innerHTML = 
                    "Price Estimate: $30 000 - $36 000";
            } else {
                document.getElementById('price-show').innerHTML = 
                    "Price Estimate: $36 000+";
            }
            document.getElementById('place-info').innerHTML = 
                "Location: "+description;
            document.getElementById('transactions-info').innerHTML = 
                "Average Weddings: "+ transactions + " per year";
            document.getElementById('popularity-index').innerHTML = 
                "Popularity Index: "+popularityIndex;
        }
        // show popup at click lngLat
        popup.setLngLat(e.lngLat).setHTML(description).addTo(map);
    });

    // search bar for map.
    // Adapted from https://docs.mapbox.com/mapbox-gl-js
    // /example/mapbox-gl-geocoder-limit-region/
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            // limit results to Australia
            countries: 'au',
            // further limit results to the geographic bounds representing the region of
            // Queensland
            bbox: QLD_BBOX,
            placeholder: 'Search QLD suburbs',
            // apply a client side filter to further limit results to those strictly within
            // the Queensland region
            filter: function (item) {
                // returns true if item contains Queensland region
                return item.context
                    .map(function (i) {
                    return (
                        i.id.split('.').shift() === 'region' &&
                        i.text === 'Queensland'
                    );
                    })
                .reduce(function (acc, cur) {
                    return acc || cur;
                });
            },
            mapboxgl: mapboxgl
        })
    );

    // geo location for map
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    );

    // month selectors event listeners
    var monthButtons = document.getElementsByClassName('month-btn');
    for (var i = 0; i < monthButtons.length; i++) {
        
        monthButtons[i].addEventListener("click", function(e) {
            for (var j = 0; j < monthButtons.length; j++) {
                monthButtons[j].classList.remove("selected");
            }
            this.classList.toggle("selected");
            updateMonthOffset(e.target.id);

            // deep copy to keep below code from modifying colorStorage.
            var colorStorageCpy = JSON.parse(JSON.stringify(colorStorage));
            Object.keys(colorStorage).forEach(function (suburb) {
                var newRed = Math.round(colorStorage[suburb].red*monthOffset);
                if (newRed > 255) {
                    newRed = 255;
                }
                colorStorageCpy[suburb].red = newRed;
            });

            // updates paint property with newer color data. 
            map.setPaintProperty("filtered-data", "fill-color",
            ["rgb",
                ["get", "red", ["get", ["get", "qld_loca_2"], 
                    ["literal", colorStorageCpy]]],
                ["get", "green", ["get", ["get", "qld_loca_2"], 
                    ["literal", colorStorageCpy]]],
                ["get", "blue", ["get", ["get", "qld_loca_2"], 
                    ["literal", colorStorageCpy]]],
            ]);
        });
    }

    // price selection event listeners
    var priceButtons = document.getElementsByClassName("price-selector");
    var i;
    for (i = 0; i < priceButtons.length; i++) {
        priceButtons[i].addEventListener("click", function(e) {
            var value = parseInt(e.target.id);
            // deselecting current option
            if (this.classList.contains("active")) {
                this.classList.toggle("active");
                // remove any extra filters
                map.setFilter("filtered-data", [">", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"], 
                                    ["literal", transactionList]]], 
                                averageTransactions],
                            0]);
            } else {
                switch (value) {
                    case 1:
                        map.setFilter("filtered-data", ["<=", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"], 
                                    ["literal", transactionList]]], 
                                averageTransactions],
                            0.3]);
                        break;
                    case 2:
                        map.setFilter("filtered-data", 
                        ["all", 
                            [">", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"], 
                                    ["literal", transactionList]]],
                                            averageTransactions], 
                                0.3],
                            ["<=", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"], 
                                    ["literal", transactionList]]], 
                                        averageTransactions], 
                                0.8]]);
                        break;
                    case 3:
                        map.setFilter("filtered-data", 
                        ["all", 
                            [">", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"], 
                                    ["literal", transactionList]]],
                                        averageTransactions], 
                                0.8],
                            ["<=", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"], 
                                    ["literal", transactionList]]], 
                                        averageTransactions], 
                                2]]);
                        break;
                    case 4:
                        map.setFilter("filtered-data", 
                        ["all", 
                            [">", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"],
                                    ["literal", transactionList]]],
                                        averageTransactions], 
                                2],
                            ["<=", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"],
                                    ["literal", transactionList]]], 
                                        averageTransactions], 
                                4]]);
                        break;
                    case 5:
                        map.setFilter("filtered-data", [">", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"],
                                    ["literal", transactionList]]], 
                                    averageTransactions],
                                4]);
                        break;
                    default:
                        map.setFilter("filtered-data", [">", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"], 
                                    ["literal", transactionList]]], 
                                averageTransactions],
                            0]);
                }
                // remove all actives except current.
                var j;
                for (j = 0; j < priceButtons.length; j++) {
                    priceButtons[j].classList.remove("active");
                }
                this.classList.toggle("active");
            }
        });
    }
}

// requests raw geojson file from server
function getRawDataAjax() {
    return $.ajax({
        type: 'POST', 
        url: './includes/map-init.php', 
        dataType: 'json',
        encode: true
    });
}

// requests suburb data from api.
function getSuburbDataAjax() {
    var data = {resource_id: "b85ecabf-7849-422d-b44d-49c54a3a7c8e", limit: 1000}
    return $.ajax({
        url: "https://data.qld.gov.au/api/3/action/datastore_search",
        data: data,
        dataType: "jsonp",
        cache: true
    });
}

// requests month data from api.
function getMonthDataAjax() {
    var data = {resource_id: "4618c255-5f2c-4f10-9653-161505f447ce"}
    return $.ajax({
        url: "https://data.qld.gov.au/api/3/action/datastore_search",
        data: data,
        dataType: "jsonp",
        cache: true
    });
}

// checks if requested data exists already in local storage
function dataExists() {
    if (localStorage.getItem("rawData") === null 
            || localStorage.getItem("suburbData") === null 
            || localStorage.getItem("monthData") === null) {
        return false;
    } else {
        return true;
    }
}

// starts creating map and all related functions.
function startMap() {
    $(document).ready(function() {
        $("#loading").removeClass("hidden");
        if (dataExists()) {
            createMap();
        } else { 
            // start all ajax functions, continue when finished.
            $.when(getRawDataAjax(), getSuburbDataAjax(), 
                    getMonthDataAjax()).done(function(raw, suburb, month){
                localStorage.setItem("rawData", JSON.stringify(raw));
                localStorage.setItem("suburbData", JSON.stringify(suburb));
                localStorage.setItem("monthData", JSON.stringify(month));
                if (dataExists()) {
                    createMap();
                } else {
                    console.error("Something went wrong");
                }
            });
        }
        // start fade out after 0.5s, fade out takes 1s, after 1.5s hide loading
        setTimeout(function() {
            $("#loading").addClass("hidden");
            var acc = document.getElementsByClassName("map-accordion");
            var i;
            for (i = 0; i < acc.length; i++) {
                var panel = acc[i].nextElementSibling;
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }, 500)
        setTimeout(function() {
            $("#loading").css("visibility", "hidden");
        }, 1500)
    });
}