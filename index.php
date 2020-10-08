<?php include("includes/config.php");?>
<?php ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);?>
<!DOCTYPE html>
<html>
<link type="text/css" rel="stylesheet" href="css/homepage.css">
<head>
	<?php include("includes/header.php");?>
</head>
<body>

<!--<?php include("includes/design-top.php");?>-->
<?php include("includes/navigation.php");?>


<div id="box">
    <a href="javascript:;" class="prev"><</a>
    <a href="javascript:;" class="next">></a>
    <ul>
        <li><img src="images/HomePageImage1.jpg"></li>
        <li><img src="images/HomePageImage2.jpg"></li>
        <li><img src="images/HomePageImage3.jpg"></li>
        <li><img src="images/HomePageImage4.jpg"></li>
        <li><img src="images/HomePageImage5.jpg"></li>
    </ul>
    <ol>
        <li class="active">0</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ol>
    <div class="text">
		<h1>Save the Date</h1>

		<div class="app">
        <div class="scroll">
            <div class="img current"><p class="center">Wedding planning can be stressful, however, we are here to help you!</p>
			<p class="center">Browse our planning tools to help you organise your big day or click the link below view our interactive map displaying past wedding statistics.</p></div>
             <div class="img current"><p class="center">put some text later 1</p></div>
              <div class="img current"><p class="center">put some text later 2</p></div>
               <div class="img current"><p class="center">put some text later 3</p></div>
               <div class="img current"><p class="center">put some text later 4</p></div>

        
            <div class="lf"><</div>
            <div class="lr">></div>
            
           
            <div class="dots">
                <span class="square"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
		<a class="btn", href="/planning.php">Get Start Now! &nbsp&nbsp></a>
	</div>
</div>



<footer>
<?php include("includes/footer.php");?>
</footer>
<script src="js/homepage.js"></script>

</body>
</html>