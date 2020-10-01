<?php
	switch ($_SERVER["SCRIPT_NAME"]) {
		case "/about.php":
			$CURRENT_PAGE = "About"; 
			$PAGE_TITLE = "About Us";
			break;
		case "/contact.php":
			$CURRENT_PAGE = "Contact"; 
			$PAGE_TITLE = "Contact Us";
            break;
        case "/map.php":
            $CURRENT_PAGE = "Map"; 
            $PAGE_TITLE = "Map Page";
            break;
        case "/planning.php":
            $CURRENT_PAGE = "Planning"; 
            $PAGE_TITLE = "Planning page";
            break;
		default:
			$CURRENT_PAGE = "Index";
			$PAGE_TITLE = "Welcome to my homepage!";
	}
?>