<?php include("includes/config.php");?>
<!DOCTYPE html>
<html>
<head>
<!-- @TODO add this to header with conditional includes -->
<script src='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.min.js"></script>
<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.css" type="text/css"/>
<link rel="stylesheet" href="css/map-style.css" type="text/css"/>

<!-- Promise polyfill script required to use Mapbox GL Geocoder in IE 11 -->
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
<script type="text/javascript" src="js/map.js"></script>
<?php include("includes/header.php");?>
<?php include("includes/api-interaction.php");?>
</head>

<body>

<?php include("includes/navigation.php");?>

<div class="container" id="main-content">

    <h2>Interactive Map</h2>

    <div id="big-box">

        <div id="map-filter-section">

            <button class="map-accordion">Date</button>
            <div class="panel">
            <p>Date panel stuff</p>


            </div>

            <button class="map-accordion">Price</button>
            <div class="panel">
            <p>Price stuff</p>


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

        <div id='map'>
            <div id="loading"></div>
        </div>

    </div>
    <script>
        $(document).ready(function() {
            $('#btnMap').click(function() {
                $("#loading").css("visibility", "visible");
            });
            $.ajax({
                url: "includes/map-init.php",
                type: 'post',
                data: {"callinitialiseMap" : "1"},
                success: function(response) {
                    // run response as function
                    var tmp=new Function (response);
                    tmp();
                    setTimeout(function () {
                        $("#loading").css("visibility", "hidden");
                        $("#map").css("visibility", "visible");
                        $()
		            }, 20);
                }
            });
        });
    </script>
</div>

<?php include("includes/footer.php");?>

</body>
</html>