<!--Contains Header data and meta data to be included on each page-->

<!--Sets title to current page title @see /includes/config.php for $PAGE_TITLE-->
<title><?php print $PAGE_TITLE;?></title>

<!--Only include metadata on landing page-->
<?php if ($CURRENT_PAGE == "Index") { ?>
	<meta name="description" content="" />
	<meta name="keywords" content="" /> 
<?php } ?>


<!--General style and script includes-->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<script src="https://kit.fontawesome.com/b0200c253d.js" crossorigin="anonymous"></script>

<!-- Stylesheet -->
<link rel="stylesheet" type="text/css" href="css/style.css">

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">



