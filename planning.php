<?php include("includes/config.php");?>
<!DOCTYPE html>
<html>
<head>
	<?php include("includes/header.php");?>
	<script type='text/javascript' src='js/guestlist.js'></script>


</head>
<body>

<?php include("includes/navigation.php");?>


<div class="planning container" id="main-content">
	<h1>Planning</h1>
</div>

<!-- Horizontal Flexbox Accordion code insired by https://codepen.io/arjancodes/pen/gbweYB -->
<div id="planning-accordion">

	<ul>

	<li><div class="section-title"><h3>Checklist</h3></div>
		
		<div class="section-content">
			<div id="checklist">
			
				<ul class="todo-list js-todo-list"></ul>
				<!-- box code insired by https://codepen.io/valerypatorius/pen/oXGMGL/ --> 
				<div class="empty-state">
					<h2 class="empty-state__title">Your first todo</h2>
					<p class="empty-state__description">What do you want to get done?</p>
					<div class="boxes">

						<input type="checkbox" id="box-1">
						<label for="box-1">Discuss your ideal wedding with your other half </label>

						<input type="checkbox" id="box-2">
						<label for="box-2">Draw up a budget </label>

						<input type="checkbox" id="box-3">
						<label for="box-3">Start planning the guestlist with the Guestlist tool </label>

						<input type="checkbox" id="box-4">
						<label for="box-4">Pick potential wedding dates </label>

						<input type="checkbox" id="box-5" checked>
						<label for="box-5">Choose the venue for wedding through using the mapping tool</label>

						<input type="checkbox" id="box-6">
						<label for="box-6">Feel relaxed to enjoy wedding</label>
					</div>
				</div>
				<!-- end -->
		
				
			</div>
	   	</div>

	</li>
	
	<li class="active"><div class="section-title"><h3>Guestlist</h3></div>  	
	    <div class="section-content">			
			<div class="guest-wrapper">
	
				<h2>Invitees</h2>

				<div id="guest-header">
					<form id="registrar">
						<input type="text" name="name" placeholder="Invite Someone">
						<button type="submit" name="submit" value="submit">Submit</button>
					</form>
				</div>

				<div class="guestlist" style="height:70%;overflow-y:auto">
					<ul id="guestnames" style="display: block;
						list-style-type: disc;
						margin-block-start: 1em;
						margin-block-end: 1em;
						margin-inline-start: 0px;
						margin-inline-end: 0px;
						padding-inline-start: 40px;"></ul>
				</div>
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
