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
	<h1>Planning</h1>
</div>

<!-- Horizontal Flexbox Accordion code insired by https://codepen.io/arjancodes/pen/gbweYB -->
<div id="planning-accordion">

	<ul>

	<li><div class="section-title"><h3>Checklist</h3></div>
		
		<div class="section-content">
			<div id="checklist">
			
				<ul class="todo-list js-todo-list"></ul>
				<!-- add the empty state here -->
				<div class="empty-state">
					<h2 class="empty-state__title">Add your first todo</h2>
					<p class="empty-state__description">What do you want to get done?</p>
				</div>
				<!-- end -->
		
				<form class="todo-form js-form">
					<input autofocus type="text" aria-label="Enter a new todo item" placeholder="E.g. Buy some flowers" class="js-todo-input">
				</form>
	
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
