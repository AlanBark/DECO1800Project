<?php include("includes/config.php");?>
<!DOCTYPE html>
<html>
<head>
<!-- bootstrap for popup plugin -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

<!-- mapbox cdn -->
<script src='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.min.js"></script>
<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.css" type="text/css"/>

<!-- Promise polyfill script required to use Mapbox GL Geocoder in IE 11 -->
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
<script type="text/javascript" src="js/map.js"></script>

<?php include("includes/header.php");?>

</head>

<body>

<?php include("includes/navigation.php");?>

<div id="main-content">

    <h1>Interactive Map</h1>

    <div id="big-box">

        <div id="map-filter-section">

            <button class="map-accordion">Month</button>
            
            <div class="panel">
                <div id="range-container">
                    <button class="month-btn summer" id="0" data-toggle="tooltip" data-trigger="hover" title="January"><i class="fas fa-tree" id="0"></i></button>
                    <button class="month-btn summer" id="1" data-toggle="tooltip" data-trigger="hover" title="February"><i class="fas fa-tree" id="1"></i></button>
                    <button class="month-btn autumn selected" id="2" data-toggle="tooltip" data-trigger="hover" title="March"><i class="fas fa-tree" id="2"></i></button>
                    <button class="month-btn autumn" id="3" data-toggle="tooltip" data-trigger="hover" title="April"><i class="fas fa-tree" id="3"></i></button>
                    <button class="month-btn autumn" id="4" data-toggle="tooltip" data-trigger="hover" title="May"><i class="fas fa-tree" id="4"></i></button>
                    <button class="month-btn winter" id="5" data-toggle="tooltip" data-trigger="hover" title="June"><i class="fas fa-tree" id="5"></i></button>
                    <button class="month-btn winter" id="6" data-toggle="tooltip" data-trigger="hover" title="July"><i class="fas fa-tree" id="6"></i></button>
                    <button class="month-btn winter" id="7" data-toggle="tooltip" data-trigger="hover" title="August"><i class="fas fa-tree" id="7"></i></button>
                    <button class="month-btn spring" id="8" data-toggle="tooltip" data-trigger="hover" title="September"><i class="fas fa-tree" id="8"></i></button>
                    <button class="month-btn spring" id="9" data-toggle="tooltip" data-trigger="hover" title="October"><i class="fas fa-tree" id="9"></i></button>
                    <button class="month-btn spring" id="10" data-toggle="tooltip" data-trigger="hover" title="November"><i class="fas fa-tree" id="10"></i></button>
                    <button class="month-btn summer" id="11" data-toggle="tooltip" data-trigger="hover" title="December"><i class="fas fa-tree" id="11"></i></button>
                </div>
            </div>

            <button class="map-accordion">Pricing</button>
            
            <div class="panel">
                <div id="price-container">
                    <div id="price-selection">
                        <button id="1" class="price-selector" data-toggle="tooltip" data-trigger="hover" title="$6 000 - $12 000">$</button>
                        <button id="2" class="price-selector" data-toggle="tooltip" data-trigger="hover" title="$12 000 - $18 000">$$</button>
                        <button id="3" class="price-selector" data-toggle="tooltip" data-trigger="hover" title="$18 000 - $24 000">$$$</button>
                        <button id="4" class="price-selector" data-toggle="tooltip" data-trigger="hover" title="$24 000 - $30 000">$$$$</button>
                        <button id="5" class="price-selector" data-toggle="tooltip" data-trigger="hover" title="$30 000+">$$$$$</button>
                    </div>
                    <p id="price-info">	&#9432 All prices are data driven estimates from historical information.</p> 
                    <div id="price-display">
                        <p id="place-info">Location: </p>
                        <p id="transactions-info">Average Weddings: </p>
                        <p id="popularity-index">Popularity Index: </p>
                        <p id="price-show">Price Estimate: </p>
                    </div>
                </div>
            </div>

            <button class="map-accordion">More Information</button>

            <div class="panel">
            <p class="more-info">Average weddings are the mean amount of annual weddings for that suburb.</p>
            <p class="more-info">The popularity index is calculated by finding the ratio of that subrubs weddings compared to the mean, offset by the monthly ratio of weddings compared to the mean.</p>
            <p class="more-info">This can give a rough price index, calculated using the average real cost of a wedding and offsetting that by the price index</p> 
            </div>

            <script>
                // enable accordian
                var acc = document.getElementsByClassName("map-accordion");
                var i;
                for (i = 0; i < acc.length; i++) {
                    acc[i].addEventListener("click", function() {
                        this.classList.toggle("active");
                        var panel = this.nextElementSibling;
                        if (panel.style.maxHeight) {
                            panel.style.maxHeight = null;
                        } else {
                            panel.style.maxHeight = panel.scrollHeight + "px";
                        } 
                    });
                }
            </script>

        </div>

        <div id='map-container'>
            <div id="loading"></div>
            <div id='map'></div>
            <div id="legend">
                <div id="gradient"></div>
                <p>Less Popular</p>
                <p>More Popular</p>
            </div>
        </div>

    </div>
    <script>
        startMap(map);
        // enable all tooltips
        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });
    </script>
</div>

<?php include("includes/footer.php");?>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html>