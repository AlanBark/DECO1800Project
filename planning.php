<?php include("includes/config.php");?>
<!DOCTYPE html>
<html>
<head>
	<?php include("includes/header.php");?>
	<script type='text/javascript' src='js/guestlist.js'></script>
	<script type='text/javascript' src='js/checklist.js'></script>

</head>
<body>

<?php include("includes/navigation.php");?>


<div class="planning container" id="main-content">
	<h2>Planning</h2>
</div>

<!--Code insired by https://codepen.io/arjancodes/pen/gbweYB-->
<div id="planning-accordion">

	<ul>

	<li><div class="section-title"><h3>Checklist</h3></div>
		
		<div class="section-content">
			<div id="checklist">
		
			<button id="add">Add</button><input id="task">
				<hr>
			<div id="todos"></div>
			</div>
	   	</div>

	</li>
	
	<li class="active"><div class="section-title"><h3>Guestlist</h3></div>
	    	
	    <div class="section-content">			
	<div class="wrapper">
    <header>
	  
      <form id="registrar">
        <input type="text" name="name" placeholder="Invite Someone">
        <button type="submit" name="submit" value="submit">Submit</button>
      </form>
</header>
		<h2>Invitees</h2>
	  <div class="main" style="height:500px;overflow-y:auto">
	  <ul id="invitedList" style="display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;"></ul>
    </div>
  </div>


	</li>
	
	<li><div class="section-title"><h3>Trends</h3></div>

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
