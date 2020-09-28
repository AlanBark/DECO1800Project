<?php
// returns data from given resource id as a PHP object
function getData($resourceid, $arguments = '') {
    $api_url = "https://www.data.qld.gov.au/api/3/action/datastore_search_sql?sql=SELECT%20*%20from%20%22"
                    .$resourceid."%22%20".$arguments;
    return json_decode(file_get_contents($api_url), true);
}
//https://www.data.qld.gov.au/api/3/action/datastore_search_sql?sql=SELECT%20*%20from%20%22b85ecabf-7849-422d-b44d-49c54a3a7c8e%22%20WHERE%20%22Transactions%22%3E10
// gets data per year from month data
function getMonth($year) {

    // Marriage data per month with databases per year
    $monthData = array(
        2010 => '5cf44c9a-4f78-4ded-a711-f082c617f262',
        2011 => '9543cfb8-35ae-49a4-9cc5-6028bc2af8eb',
        2012 => '05b297dd-a6ca-42c6-a4b1-8e040af4ec75',
        2013 => 'fec6fc0c-8c5c-4e2e-ac6c-baf436810ee6',
        2014 => '49191ce1-606c-4e7b-b940-63709a96dfd6',
        2015 => '11ab94c5-6757-47e5-9635-3eb33980f367',
        2016 => 'ca539297-dd7a-4b87-8716-cdabb284b438',
        2017 => '4429f6f4-f5f7-4ebe-8909-c0c2d40d6f40',
        2018 => '90bd13ee-a6b4-4812-b49d-10905ff1191a',
        2019 => '4618c255-5f2c-4f10-9653-161505f447ce'
    );
    $resourceid = $monthData[$year];
    return getData($resourceid);
}

// gets data per year from suburb data
function getSuburb($year) {
    $TRANSACTION_CUTOFF = 25;
    // Marriage data per suburb with databases per year
    $suburbData = array(
        2010 => '166fa3e9-bce5-4615-aaa1-acf587ac3216',
        2011 => '88d8e6f8-c538-4a7f-b03f-de5a05602511',
        2012 => 'faf36846-1dbe-40aa-8495-0e70666b14d0',
        2013 => '49c58330-90a7-4082-bcab-328f6056e27f',
        2014 => '3ebac5f9-11d0-4b8b-87a6-0af684f59342',
        2015 => '45f82885-cefb-490c-a9c3-d30753a4d538',
        2016 => '26c0a69b-153b-4898-8bf7-680a0feac04d',
        2017 => '58b995ee-65ad-460e-bac0-656589ba6546',
        2018 => '340a2665-2446-4794-9edc-85bc8e9d9f89',
        2019 => 'b85ecabf-7849-422d-b44d-49c54a3a7c8e'
    );
    $resourceid = $suburbData[$year];
    return getData($resourceid, 'WHERE "Transactions">'.$TRANSACTION_CUTOFF);
}

function getAllMonths() {

    // uninitialised array to return
    $allData = Array();

    // initialise array. next for loop has to add to something.
    for ($i = 0; $i < 12; $i++) {
        $allData[$i] = 0;
    }

    // loop over every year and retrieve data
    for ($year = 2010; $year <= 2019; $year++) {
        $data = getMonth($year);
        // loop over every month and add to array element
        for ($month = 0; $month < 12; $month++) {
            $allData[$month] 
                += $data['result']['records'][$month]['Transactions'];
        }
    }
    
    // yes i know another for loop
    // averages data
    for ($i = 0; $i < 12; $i++) {
        $allData[$i] = ceil($allData[$i] / 10);
    }
    return $allData;
}

function getAllSuburbs () {

    // declare uninitialised array.
    $allData =  Array();
    $frequency = Array();

    // loop over every year and retrieve data
    for ($year = 2010; $year <= 2019; $year++) {
        $data = getSuburb($year);
        
        // Iterate over each suburb. 
        foreach($data['result']['records'] as $suburb ) {
            // If suburb exists, add accumulative average
            // Accumulative average:
            //      Multiply current average by frequency
            //      Add result to next number
            //      Increase frequency by 1
            //      Divide by frequency
            if (isset($allData[$suburb['Suburb']])) {
                $temp = $allData[$suburb['Suburb']] * $frequency[$suburb['Suburb']];
                $temp += $suburb['Transactions'];
                $frequency[$suburb['Suburb']]++;
                $temp = ceil($temp / $frequency[$suburb['Suburb']]);
                $allData[$suburb['Suburb']] = $temp;
            // If suburb does not exist, set frequency to 1 and Initialise array element
            } else {
                $frequency[$suburb['Suburb']] = 1;
                $allData[$suburb['Suburb']] = $suburb['Transactions'];
            }
        }
    }
    arsort($allData);
    return $allData;
}
?>