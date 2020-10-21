// should only be called after localstorage contains api and raw geojson data
function createMap () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxhbmJhcmsiLCJhIjoiY2tmbmtwamM3MDNqbzJ4cXRmZ2R4aGVxOSJ9.J_cyZxD5QAw8wyOQq-ompA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/alanbark/ckfqbb24y0rj519ryeuf99z91', // stylesheet location
        center: [146.5, -23.4], // starting position [lng, lat]
        zoom: 4.6 // starting zoom
    });

    map.on('load', function() {
        map.addSource('raw-data', {
            'type' : 'geojson',
            data: JSON.parse(localStorage.getItem("rawData"))[0]
        });
        var data = JSON.parse(localStorage.getItem("apiData")); 
        var matchExpression = ['match', ['get', 'qld_loca_2']];
        // iterate over each suburb, set transaction to color, match with 
        data[0]['result']['records'].forEach(function (suburb) {
            // Convert the range of data values to a suitable color
            var red = suburb['Transactions'];
            if (red > 255) {
                red = 255;
            }
            var color = 'rgb('+ red + ', 0, 0)';
            
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
                    'fill-opacity': 0.4
                }
            }
        );
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
    var data = {resource_id: "b85ecabf-7849-422d-b44d-49c54a3a7c8e"}
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
        }, 500)
        setTimeout(function() {
            $("#loading").css("visibility", "hidden");
        }, 1500)
    });
}