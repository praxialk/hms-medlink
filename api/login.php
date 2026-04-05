<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: *");


error_log(json_encode($_POST));
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Read the raw request body to get JSON data
    $json_data = file_get_contents('php://input');

    // Decode the JSON data into an associative array
    $data = json_decode($json_data, true);


// Check if email and password are set in the POST request
if (isset($data['email'] , $data['password'])) {
    // Extract email and password from the POST request
    $email = $data['email'];
    $password = $data['password'];

    $dbHost = getenv('DB_HOST') ?: 'localhost';
    $db = new mysqli($dbHost, 'root', "", "hms"); 

    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
    }

    // Escape email and password to prevent SQL injection
    $email = $db->real_escape_string($email);
    $password = $db->real_escape_string($password);

    // Perform authentication using email and password
    $query = "SELECT user_id, username, user_type FROM users WHERE email = '$email' AND password = '$password'";
    $result = $db->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $user_id = $row["user_id"];
        $username = $row["username"];
        $user_type = $row["user_type"];

        $response = [
            "success" => true,
            "message" => "Login successful",
            "user_id" => $user_id,
            "username" => $username,
            "userType" => $user_type
        ];
    } else {
        $response = ["success" => false, "message" => "Invalid email or password"];
    }
    $db->close();
} else {
    $response = ["success" => false, "message" => "Email or password not provided"];
}
}

echo json_encode($response);
?>
