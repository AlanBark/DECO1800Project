// used in multiple functions throughout map.
var access_token = 'pk.eyJ1IjoiYWxhbmJhcmsiLCJhIjoiY2tmbmtwamM3MDNqbzJ4cXRmZ2R4aGVxOSJ9.J_cyZxD5QAw8wyOQq-ompA';
// rough coordinates of QLD bounding box.
var QLDbbox =  [137.95, -29.19, 154.44, -9.11];

var transactionList = {};
var averageTransactions;
var priceState = 0;
var monthOffset = 0;
var monthAverage = null;

// find average, I'm aware count should always be 12.
function findMonthAverage() {
    var data = JSON.parse(localStorage.getItem("monthData"))[0];
    var total = 0, count = 0;
    data['result']['records'].forEach(function (month) {
        total += month['Transactions'];
        count++;
    });
    monthAverage = Math.round(total / count);
}

function updateMonthOffset(selectedMonth) {
    if (monthAverage == null) {
        findMonthAverage();
    }
    var monthlyTransactions = JSON.parse(localStorage.getItem("monthData"))[0]['result']['records'][selectedMonth]['Transactions'];
    var monthOffset = (monthlyTransactions / monthAverage).toFixed(2);
    console.log(monthOffset); 
}

function addMonthButtons() {
    var buttons = document.getElementsByClassName('month-btn');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function(e) {
            // disable if clicked twice
            if (this.classList.contains("selected")) {
                this.classList.toggle("selected");
            } else {
                // disable all buttons
                for (var j = 0; j < buttons.length; j++) {
                    buttons[j].classList.remove("selected");
                }
                // enable current button
                this.classList.toggle("selected");
            }
            updateMonthOffset(e.target.id);
        });
    }
}

// should only be called after localstorage contains api and raw geojson data
function createMap (map) {
    mapboxgl.accessToken = access_token;
    var bounds = [[135.352347, -30.024385], [156.871487, -8.619919]];
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/alanbark/ckfqbb24y0rj519ryeuf99z91', // stylesheet location
        center: [153.015757, -27.497811],
        zoom: 10, // starting zoom
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
        var colorStorage = {};
        
        // iterate over each suburb, set transaction to color, match with suburb name
        // add to transactions/suburb object, calculate average transactions.
        var count = 0;
        var total = 0;
        data[0]['result']['records'].forEach(function (suburb) {
            // Convert the range of data values to a suitable color
            var x = suburb['Transactions'];
            var red = Math.floor(((1.3)**((-0.03)*(x-680))*-1)+255);
            var green = Math.floor(((1.3)**((0.03)*(x+200))*-1)+40);
            if (green < 0) {
                green = 0;
            }
            var blue = Math.floor((((1.3)**((-0.03)*(x-680))))/2);
            //var color = 'rgb('+ red + ','+ green +','+ blue +')';
            var color = { red: red, green: green, blue: blue };
            
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

        // add layer with expressions
        // opacity is full if layer is selected or hovered,
        map.addLayer(
            {
                'id': 'filtered-data',
                'type': 'fill' ,
                'source': 'raw-data',
                'paint': {
                    'fill-color': 
                    ["rgb",
                        ["get", "red", ["get", ["get", "qld_loca_2"], ["literal", colorStorage]]],
                        ["get", "green", ["get", ["get", "qld_loca_2"], ["literal", colorStorage]]],
                        ["get", "blue", ["get", ["get", "qld_loca_2"], ["literal", colorStorage]]],
                    ],
                    'fill-opacity': ['case', 
                    ['boolean', ['feature-state', 'hover'], false], 1, 
                    ['boolean', ['feature-state', 'selected'], false], 1, 
                    0.6]
                }
            }
        );

        map.setFilter("filtered-data", [">", 
        ["/" ,
            ["number", ["get", ["get", "qld_loca_2"], ["literal", transactionList]]], 
            averageTransactions],
        0]);
    });
    
    // ID's of currently selected and currently hovered suburbs
    var hoveredSuburbID = null;
    var selectedSuburbID = null;

    // on hover, set feature state "hover" to true.
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

    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
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

    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    })

    // handle user clicks on features
    map.on('click', 'filtered-data', function(e) {
        // if there's already another suburb selected, deselect it
        
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
        map.flyTo({
            center: e.lngLat,
            zoom: 10,
            speed: 0.8
        });
        
        var description = selectedSuburbID;
        var transactions = map.getFeatureState({source: 'raw-data', id: selectedSuburbID}).transactions;
        // lol this is disgusting
        if (transactions == undefined) {
            document.getElementById('place-info').innerHTML = "Location: "+description;
            document.getElementById('transactions-info').innerHTML = "Average Weddings: Not enough data available";
            document.getElementById('popularity-index').innerHTML = "Popularity Index: Not enough data available";
            document.getElementById('price-show').innerHTML = "Price Estimate: Not enough data available";
        } else {
            // find how much higher or lower transactions are compared to average.
            var popularityIndex = ((transactions/averageTransactions)).toFixed(2);
            if (popularityIndex < 0.3) {
                document.getElementById('price-show').innerHTML = "Price Estimate: $6 000 - $12 000";
            } else if (popularityIndex < 0.8) {
                document.getElementById('price-show').innerHTML = "Price Estimate: $12 000 - $18 000";
            } else if (popularityIndex < 2) {
                document.getElementById('price-show').innerHTML = "Price Estimate: $18 000 - $24 000";
            } else if (popularityIndex < 3) {
                document.getElementById('price-show').innerHTML = "Price Estimate: $24 000 - $30 000";
            } else if (popularityIndex < 5) {
                document.getElementById('price-show').innerHTML = "Price Estimate: $30 000 - $36 000";
            } else {
                document.getElementById('price-show').innerHTML = "Price Estimate: $36 000+";
            }
            document.getElementById('place-info').innerHTML = "Location: "+description;
            document.getElementById('transactions-info').innerHTML = "Average Weddings: "+ transactions + " per year";
            document.getElementById('popularity-index').innerHTML = "Popularity Index: "+popularityIndex;
        }
        // show popup at click lngLat
        popup.setLngLat(e.lngLat).setHTML(description).addTo(map);
    });

    // Adapted from https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder-limit-region/
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            
            // limit results to Australia
            countries: 'au',
            
            // further limit results to the geographic bounds representing the region of
            // Queensland
            bbox: [137.95, -29.19, 154.44, -9.11],

            placeholder: 'Search QLD suburbs',
            
            // apply a client side filter to further limit results to those strictly within
            // the Queensland region
            filter: function (item) {
                // returns true if item contains Queensland region
                return item.context
                    .map(function (i) {
                        // id is in the form {index}.{id} per https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
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

    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    );

    var buttons = document.getElementsByClassName("price-selector");
    var i;
    for (i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function(e) {
            var value = parseInt(e.target.id);
            // deselecting current option
            if (this.classList.contains("active")) {
                this.classList.toggle("active");
                // remove filter
                map.setFilter("filtered-data", [">", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"], ["literal", transactionList]]], 
                                averageTransactions],
                            0]);
            } else {
                // this could be cleaner, not sure how functions would behave with mapbox expressions though. 
                switch (value) {
                    case 1:
                        map.setFilter("filtered-data", ["<=", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"], ["literal", transactionList]]], 
                                averageTransactions],
                            0.3]);
                        break;
                    case 2:
                        map.setFilter("filtered-data", 
                        ["all", 
                            [">", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"], ["literal", transactionList]]], averageTransactions], 0.3],
                            ["<=", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"], ["literal", transactionList]]], averageTransactions], 0.8]]);
                        break;
                    case 3:
                        map.setFilter("filtered-data", 
                        ["all", 
                            [">", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"], ["literal", transactionList]]], averageTransactions], 0.8],
                            ["<=", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"], ["literal", transactionList]]], averageTransactions], 2]]);
                        break;
                    case 4:
                        map.setFilter("filtered-data", 
                        ["all", 
                            [">", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"], ["literal", transactionList]]], averageTransactions], 2],
                            ["<=", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"], ["literal", transactionList]]], averageTransactions], 4]]);
                        break;
                    case 5:
                        map.setFilter("filtered-data", [">", 
                            ["/" ,
                                ["number", ["get", ["get", "qld_loca_2"], ["literal", transactionList]]], 
                                averageTransactions],
                            4]);
                        break;
                    default:
                        map.setFilter("filtered-data", null);
                }
                var j;
                for (j = 0; j < buttons.length; j++) {
                    buttons[j].classList.remove("active");
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

function dataExists() {
    if (localStorage.getItem("rawData") === null || localStorage.getItem("suburbData") === null || localStorage.getItem("monthData") === null) {
        return false;
    } else {
        return true;
    }
}

function startMap() {
    $(document).ready(function() {
        $("#loading").removeClass("hidden");
        if (dataExists()) {
            createMap();
        } else { 
            // call both ajax, run function when finished.
            $.when(getRawDataAjax(), getSuburbDataAjax(), getMonthDataAjax()).done(function(raw, suburb, month){
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
        // start fade out after 0.5s, fade out takes 1s, after 1.5s hide loading fully
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