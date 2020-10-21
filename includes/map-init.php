<?php
$payload = file_get_contents('../js/raw-data.json');
header('Content-Type: application/json');
echo $payload;
?>