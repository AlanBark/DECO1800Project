<?php include("includes/config.php");?>
<!DOCTYPE html>
<html>
<head>
	<?php include("includes/header.php");?>
</head>
<body>

<?php include("includes/navigation.php");?>

    <h1>About Us</h1>

    <div class="container about-wrapper" id="main-content">
        <div class="about-item">
            <h3>Yee's Team of Divorced Moms</h3></h3>
            <p>This website is brought to you by Yee's Team of Divorced Moms, which consists of Yee, Alec, Jared and Leo.</p>

            <h3 class="about-text">Data Source</h3>
            <p>The information displayed in the interactive map is retrieved from the Australian Government’s Open Data Portal (data.gov.au). These data sources include marriage statistics by month, suburb and gender. We use these sets of data to determine whether the time provided by users is peak wedding season, which may lead to higher prices. The data was originally presented as a table, however, we will analyse and display it through a graphical and visual representation in the form of an interactive map.</p>

            <h3 class="about-text">Data Source Links</h3>
            <p>Queensland Government (2020). Marriages by suburb. Queensland Government. <a href="https://www.data.qld.gov.au/dataset/marriages-by-suburb" style="color: blue;">https://www.data.qld.gov.au/dataset/marriages-by-suburb</a></p>
            <p>Queensland Government (2020). Marriages by sex. Queensland Government. <a href="https://www.data.qld.gov.au/dataset/marriages-by-sex" style="color: blue;">https://www.data.qld.gov.au/dataset/marriages-by-sex</a></p>
        </div>
    

        <div class="about-item">
            <img src="/images/team.jpg" class="about-image" style="max-width: 400px">
        </div>

    </div>

<?php include("includes/footer.php");?>

</body>
</html>