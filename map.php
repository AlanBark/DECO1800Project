<?php include("includes/config.php");?>
<!DOCTYPE html>
<html>
<head>
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

<div class="container" id="main-content">

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

            <button class="map-accordion">Price</button>
            <div class="panel">

                <form action="/action_page.php">
                    <label for="price-input">Choose a Price:</label>
                    <select name="price-input" id="price-input" multiple>
                        <option value="price-low">&#36;</option>
                        <option value="price-medium">&#36;&#36;</option>
                        <option value="price-high">&#36;&#36;&#36;</option>
                    </select>
                    <br><br>
                    <input type="submit" value="Submit">
                    </form>

            </div>

            <button class="map-accordion">Weather</button>
            <div class="panel">
            <p>Weather stuff</p>

            </div>

        <script>
            var acc = document.getElementsByClassName("map-accordion");
            var i;

            for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("map-accordion-active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                panel.style.display = "none";
                } else {
                panel.style.display = "block";
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
    </script>
</div>

<?php include("includes/footer.php");?>

</body>
</html>