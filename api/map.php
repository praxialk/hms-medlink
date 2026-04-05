<?php
// Set CORS headers to allow cross-origin requests
header("Access-Control-Allow-Origin: *"); // Change * to your specific origin if possible
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Check if the request method is OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Respond with a 200 OK status code
    http_response_code(200);
    exit(); // Exit immediately to prevent further processing
}

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

// Check if JSON decoding was successful
if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400); // Bad request
    echo json_encode(array("error" => "Invalid JSON payload"));
    exit();
}

// Retrieve the JSON payload from the request body

// Check if the required fields are present
if (isset($data['disease']) && isset($data['location'])) {
    // Extract disease and location from the request
    $disease = $data['disease'];
    $location = $data['location'];

    // Geocode the location to obtain coordinates
    $coordinates = geocodeLocation($location);
    if ($coordinates) {
        $latitude = $coordinates['lat'];
        $longitude = $coordinates['lng'];

        // Search for nearby medical facilities using MapTiler
        $facilities = searchNearbyFacilities($latitude, $longitude, $disease);

        // Send JSON response back to the client
        header('Content-Type: application/json');
        echo json_encode($facilities);
    } else {
        // Unable to geocode location, send an error response
        http_response_code(400); // Bad request
        echo json_encode(array("error" => "Unable to geocode location"));
    }
} else {
    // Required fields are missing, send an error response
    http_response_code(400); // Bad request
    echo json_encode(array("error" => "Missing required fields"));
}

function geocodeLocation($location) {
    // MapTiler Geocoding API endpoint
    $endpoint = "https://api.maptiler.com/geocoding/v1/search";

    // MapTiler access token (replace 'YOUR_ACCESS_TOKEN' with your actual token)
    $accessToken = "8xEdmFLbHwt5Gqv0h9iH";

    // Construct the query parameters
    $params = [
        "key" => $accessToken,
        "text" => $location,
        "limit" => 1 // Limiting to one result
    ];

    // Make the API request
    $url = $endpoint . "?" . http_build_query($params);
    $response = file_get_contents($url);

    // Decode the JSON response
    $data = json_decode($response, true);
    var_dump($data); // Debug output to see the decoded JSON data

    // Check if geocoding was successful
    if (isset($data['features'][0]['geometry']['coordinates'])) {
        $coordinates = $data['features'][0]['geometry']['coordinates'];
        return array("lat" => $coordinates[1], "lng" => $coordinates[0]);
    } else {
        return null; // Geocoding failed
    }
}

function searchNearbyFacilities($latitude, $longitude, $condition) {
    // MapTiler API endpoint for searching nearby places
    $endpoint = "https://api.maptiler.com/maps/streets/1-0-0/";

    // MapTiler access token (replace 'YOUR_ACCESS_TOKEN' with your actual token)
    $accessToken = "8xEdmFLbHwt5Gqv0h9iH";

    // Construct the query parameters
    $params = [
        "key" => $accessToken,
        "lat" => $latitude,
        "lng" => $longitude,
        "radius" => 1000, // 1000 meters radius
        "query" => $condition // Search query
    ];

    // Make the API request
    $url = $endpoint . "?" . http_build_query($params);
    $response = file_get_contents($url);

    // Decode the JSON response
    $data = json_decode($response, true);

    // Extract relevant information from the response
    $facilities = [];
    foreach ($data['features'] as $feature) {
        $name = $feature['properties']['name'];
        $phone = $feature['properties']['phone'] ?? 'N/A';
        $facilities[] = ['name' => $name, 'phone' => $phone];
    }

    return $facilities;
}
?>
