<?php include("includes/config.php");?>
<!DOCTYPE html>
<html>
<head>
<!-- bootstrap for popup plugin -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

<!-- @TODO add this to header with conditional includes -->
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

    <h2>Interactive Map</h2>

    <div id="big-box">

        <div id="map-filter-section">

            <button class="map-accordion">Date</button>
            
            <div class="panel">
                <form action="/action_page.php">
                    <label for="date-input">Select a Date:</label>
                    <input type="date" id="date-input" name="date-input">
                    <input type="submit">
                </form>
            </div>

            <button class="map-accordion">Pricing</button>
            
            <div class="panel">
                <div id="price-container">
                    <div id="price-selection">
                        <button class="price-selector" data-toggle="tooltip" data-trigger="hover" title="$6 000 - $8 000">$</button>
                        <button class="price-selector" data-toggle="tooltip" data-trigger="hover" title="$8 000 - $16 000">$$</button>
                        <button class="price-selector" data-toggle="tooltip" data-trigger="hover" title="$16 000 - $33 000">$$$</button>
                        <button class="price-selector" data-toggle="tooltip" data-trigger="hover" title="$33 000 +">$$$$</button>
                    </div>
                    <p id="price-info">	&#9432 All prices are data driven estimates from historical information.</p> 
                    <div id="price-display"></div>
                </div>
            </div>

            <button class="map-accordion">Weather</button>

            <div class="panel">
            <p>Weather stuff</p>
            </div>

            <script>
                // enable pricing options
                var buttons = document.getElementsByClassName("price-selector");
                var i;
                for (i = 0; i < buttons.length; i++) {
                    buttons[i].addEventListener("click", function() {
                        if (this.classList.contains("active")) {
                            this.classList.toggle("active");
                        } else {
                            var j;
                            for (j = 0; j < buttons.length; j++) {
                                buttons[j].classList.remove("active");
                            }
                            this.classList.toggle("active");
                        }
                    });
                }
            </script>
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
        </div>

    </div>
    <script>
        startMap();
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