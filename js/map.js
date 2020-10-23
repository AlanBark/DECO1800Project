// used in multiple functions throughout map.
var access_token = 'pk.eyJ1IjoiYWxhbmJhcmsiLCJhIjoiY2tmbmtwamM3MDNqbzJ4cXRmZ2R4aGVxOSJ9.J_cyZxD5QAw8wyOQq-ompA';
// rough coordinates of QLD bounding box.
var QLDbbox =  [137.95, -29.19, 154.44, -9.11];

// should only be called after localstorage contains api and raw geojson data
function createMap () {
    mapboxgl.accessToken = access_token;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/alanbark/ckfqbb24y0rj519ryeuf99z91', // stylesheet location
        center: [146.5, -23.4], // starting position [lng, lat]
        zoom: 4.6 // starting zoom
    });

    // Doesn't work, dunno why
    /*map.on('dragstart', function() {
        console.log("dragstart");
        map.getCanvas().style.cursor = 'move';
    });

    map.on('dragend', function() {
        console.log("dragend");
        map.getCanvas().style.cursor = 'default';
    });*/

    map.on('load', function() {
        map.addSource('raw-data', {
            'type' : 'geojson',
            'generateId': true,
            data: JSON.parse(localStorage.getItem("rawData"))[0]
        });
        var data = JSON.parse(localStorage.getItem("apiData")); 
        var matchExpression = ['match', ['get', 'qld_loca_2']];
        // iterate over each suburb, set transaction to color, match with 
        data[0]['result']['records'].forEach(function (suburb) {
            // Convert the range of data values to a suitable color
            var x = suburb['Transactions'];
            var red = Math.floor(((1.3)**((-0.03)*(x-680))*-1)+255);
            var green = Math.floor(((1.3)**((0.03)*(x+200))*-1)+40);
            if (green < 0) {
                green = 0;
            }
            var blue = Math.floor((((1.3)**((-0.03)*(x-680))))/2);
            var color = 'rgb('+ red + ','+ green +','+ blue +')';
            
            matchExpression.push(suburb['Suburb'], color);
        });
        // Last value is the default, used where there is no data
        matchExpression.push('rgba(0, 0, 0, 0)');
        map.addLayer(
            {
                'id': 'filtered-data',
                'type': 'fill' ,
                'source': 'raw-data',
                'paint': {
                    'fill-color': matchExpression,
                    'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 
                    ['boolean', ['feature-state', 'selected'], false], 1, 
                    0.6]
                }
            }
        );
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
            zoom: 9,
            speed: 0.8
        })
        // show popup at click lngLat
        var description = e.features[0].properties.qld_loca_2;
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

// requests data from api.
function getApiDataAjax() {
    var data = {resource_id: "b85ecabf-7849-422d-b44d-49c54a3a7c8e", limit: 1000}
    return $.ajax({
        url: "https://data.qld.gov.au/api/3/action/datastore_search",
        data: data,
        dataType: "jsonp",
        cache: true
    });
}

function dataExists() {
    if (localStorage.getItem("rawData") === null || localStorage.getItem("apiData") === null) {
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
            $.when(getRawDataAjax(), getApiDataAjax()).done(function(raw, api){
                localStorage.setItem("rawData", JSON.stringify(raw));
                localStorage.setItem("apiData", JSON.stringify(api));
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