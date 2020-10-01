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
    <div id="loading"></div>
    <h4>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</h4>
    <button id="btnMap" type="button" class="btn btn-light">Lets get started</button>
    <div id='map'></div>
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