<?php include("includes/config.php");?>
<!DOCTYPE html>
<html>
<head>
	<?php include("includes/header.php");?>
</head>
<body>

<?php include("includes/navigation.php");?>


<div class="planning container" id="main-content">
	<h2>Planning</h2>
</div>

	<div id="planning-accordion">
	<ul>

	<li><div class="section-title"><h3>Checklist</h3></div>
		<div class="section-content">
		<div id="checklist">
  <input id="01" type="checkbox" name="r" value="1" >
  <label for="01">Task1</label>
  <input id="02" type="checkbox" name="r" value="2">
  <label for="02">Task2</label>
  <input id="03" type="checkbox" name="r" value="3">
  <label for="03">Task3</label>
</div>




	   	</div>
	</li>
	
	<li class="active">
	    <div class="section-title"><h3>Guestlist</h3></div>
	    	
	    <div class="section-content">
	    	      <p>blah blah blah blah yes yes yes rip rip rip yuck yuck yuck yuck yuck why is this not symmetrical waaaaahhhh cry cry cry 
	    	      </p>


	    </div>
	</li>
	
	<li>
		<div class="section-title"><h3>Trends</h3></div>
		<div class="section-content">



	    </div>
	</li>
	
	<li>
		<div class="section-title"><h3>Venues</h3></div>
		<div class="section-content">


		</div>    
	</li>
	
	</ul>
	</div>

</div>
<script>
var section = $('li');

function toggleAccordion() {
  section.removeClass('active');
  $(this).addClass('active');
}

section.on('click', toggleAccordion);
</script>


<?php include("includes/footer.php");?>

</body>
</html>