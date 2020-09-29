<?php include("includes/config.php");?>
<!DOCTYPE html>
<html>
<head>
	<?php include("includes/header.php");?>
    <?php include("includes/api-interaction.php");?>
</head>
<body>

<?php include("includes/navigation.php");?>

<div class="container" id="main-content">
	<h2>Interactive Map</h2>
    <div id="mapid"></div>
    <script>
        var mymap = L.map('mapid').setView([51.505, -0.09], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYWxhbmJhcmsiLCJhIjoiY2tmbW5wcHU2MmQ2eDJxbG1mdmVlY3FleiJ9.N9kjUP7cI-ng_Yd7gSU0vA'
        }).addTo(mymap);
    </script>
</div>
<?php include("includes/footer.php");?>

</body>
</html>