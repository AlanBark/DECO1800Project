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
    <?php
    echo "<pre>";
    $test = getAllSuburbs();
    print_r($test);
    ?>
</div>
<?php include("includes/footer.php");?>

</body>
</html>