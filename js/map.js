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
            data: localStorage.getItem("rawData")
        });

        map.addLayer(
            {
                'id': 'filtered',
                'type': 'fill' ,
                'source': 'filtered-json',
                'paint': {
                    'fill-color': [
                        "rgb",
                        // 73logfrequency gives a nice curve between
                        // 0 and 255 ish over a range of 3000 frequency
                        ["floor", ["*", 73, ["log10", ["get", "qld_loca_3"]]]],
                        0,
                        0
                    ],
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
        cache: true,
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

function start_map() {
    $(document).ready(function() {
        
        var rawData = JSON.parse(localStorage.getItem("rawData"));
        var apiData = JSON.parse(localStorage.getItem("apiData"));
        if (apiData && rawData) {
            //create_map();
        } else { 
            
            // call both ajax, run function when finished.
            $.when(getRawDataAjax(), getApiDataAjax()).done(function(raw, api){
                console.log("got here");
                localStorage.setItem("rawData", JSON.stringify(raw));
                localStorage.setItem("apiData", JSON.stringify(api));
                //create_map();
            });
        }
    });
}