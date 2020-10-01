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
        <h4>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</h4>
        <button id="btnMap" type="button" class="btn btn-light">Lets get started</button>
    </div>
    <script>
        $(document).ready(function() {
            $('#btnMap').click(function() {
                $.fn.mapHandler();
            });
            $.fn.mapHandler = function() {
                $.ajax({
                    url: "includes/map-init.php",
                    type: 'post',
                    data: {"callinitialiseMap" : "1"},
                    success: function(response) {
                        var tmp=new Function (response);
                        tmp();
                    }
                });
            }
        });
    </script>
</div>


<?php include("includes/footer.php");?>

</body>
</html>