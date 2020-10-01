<!--Contains Header data and meta data to be included on each page-->

<!--Sets title to current page title @see /includes/config.php for $PAGE_TITLE -->
<title><?php print $PAGE_TITLE;?></title>

<!--
<title>Save The Date</title>-->

<!-- Sets icon for browser tab -->
<link rel="icon" href="" type="image/x-icon"> 


<!--Only include metadata on landing page-->
<?php if ($CURRENT_PAGE == "Index") { ?>
	<meta name="description" content="" />
	<meta name="keywords" content="" /> 
<?php } ?>

<!--General style and script includes-->

<!-- -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

<!-- Stylesheets -->
<link rel="stylesheet" type="text/css" href="css/style.css">

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">



