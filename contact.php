<?php include("includes/config.php");?>
<!DOCTYPE html>
<html>
<head>
	<?php include("includes/header.php");?>
</head>
<body>

<?php include("includes/navigation.php");?>

<div class="container" id="main-content">
	<h2>Contact Us</h2>



	<div id="contact-area">

		<div class="contact-item">
			<img src="/images/wedding-table.jpg" style="max-width: 400px;">
		</div>

		<div class="contact-item">

			<form class="contact-form">
				<h4>Contact Form</h4>  
		
				<label for="name">Name</label>
				<input type="text" id="fname" name="firstname" required>

				<label for="email">Email</label>
				<input type="text" id="email" name="email" required>

				<label for="phone">Phone (Optional)</label>
				<input type="number" id="phone" value="">

				<label for="topic">Type of Inquiry</label>
				<select name="topic">
					<option value="select">Select an option</option>
					<option value="general">General Inquiry</option>
					<option value="venues">Venues</option>
					<option value="feedback">Feedback</option>
				</select>

				<label for="message">Message</label>
				<textarea id="message" name="message" placeholder="Send us a message ..." style="height:100px"></textarea>

				<button type="submit" class="contact-btn">Submit</button>
          	</form>

		</div>

		
	</div>


</div>

<?php include("includes/footer.php");?>

</body>
</html>