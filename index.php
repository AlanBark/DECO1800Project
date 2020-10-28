<?php include("includes/config.php");?>
<?php ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);?>
<!DOCTYPE html>
<html>
<head>
    <?php include("includes/header.php");?>
</head>
<body>

<?php include("includes/navigation.php");?>

    <div id="slideshow">
        <a href="javascript:;" class="prev" style="text-decoration: none">&#10148;</a>
        <a href="javascript:;" class="next" style="text-decoration: none">&#10148;</a>

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

        <div class="slideshow-info">

            <h1>Save the Date</h1>

            <div class="slideshow-info-inner">
                <div class="scroll">
                    <div class="img current"><p class="inner-text">Wedding planning can be stressful, however, we are here to help you!</p>
                    <p class="inner-text">Browse our planning tools to help you organise your big day or click the link below view our interactive map displaying past wedding statistics.</p></div>
                </div>
            </div>
        
            <a class="btn", href="/planning.php">Get Started Now! &nbsp&nbsp&nbsp&#10148;</a>
        
        </div>
    </div>



<footer>
<?php include("includes/footer.php");?>
</footer>

<script src="js/homepage.js"></script>

</body>
</html>