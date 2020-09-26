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
    $test = getMonth(2010);
    foreach ($test['result']['records'] as $value) {
        $dateObj   = DateTime::createFromFormat('!m', $value['Month']);
        $monthName = $dateObj->format('F');
        print_r(nl2br($monthName . " : " . $value['Transactions']."\n"));
    }
    
    ?>
</div>
<?php include("includes/footer.php");?>

</body>
</html>