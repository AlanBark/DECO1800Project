<?php
include("api-interaction.php");

function initialiseMap($data) {

    // associative array of suburbs and marriage frequency
    $suburbs = getAllSuburbs();

    $allSuburbs = json_decode(file_get_contents('../js/raw-data.json'), true);
    
    $count = 0;
    foreach($allSuburbs['features'] as $i) {
        $found = false;
        foreach($suburbs as $suburb => $frequency) {
            if ($i['properties']['qld_loca_2'] == $suburb) {
                $found = true;
                $allSuburbs['features'][$count]['properties']['qld_loca_3'] = $frequency;
                break;
            }
        }
        if (!$found) {
            unset($allSuburbs['features'][$count]);
        }
        $count++;
    }
    $newJson = json_encode($allSuburbs);
    file_put_contents('../tmp/filtered.geojson', $newJson);

    echo "createMap();";
}

if (isset($_POST['callinitialiseMap'])) {
    echo initialiseMap($_POST['callinitialiseMap']);
}
?>