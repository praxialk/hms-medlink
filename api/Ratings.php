<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

$db_conn = mysqli_connect(getenv('DB_HOST') ?: 'localhost', 'root', '', 'hms');
if ($db_conn === false) {
    echo json_encode(["error" => "Could not connect to the database"]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        $query = "SELECT * FROM Ratings";
        $result = mysqli_query($db_conn, $query);

        if (!$result) {
            echo json_encode(["error" => "Query failed: " . mysqli_error($db_conn)]);
            exit();
        }

        $Ratings = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $Ratings[] = $row;
        }

        echo json_encode($Ratings);
        break;
    case "POST":
        $Ratings = json_decode(file_get_contents('php://input'));
        
        if (
            empty($Ratings->name)|| 
            empty($Ratings->email)|| 
            empty($Ratings->doc_name)|| 
            empty($Ratings->rating) ||
            empty($Ratings->feedback) 
        ) {
            echo json_encode(["error" => "Please fill in all fields"]);
            exit();
        }

        $name = mysqli_real_escape_string($db_conn, $Ratings->name);
        $email = mysqli_real_escape_string($db_conn, $Ratings->email);
        $doc_name = mysqli_real_escape_string($db_conn, $Ratings->doc_name);
        $rating = mysqli_real_escape_string($db_conn, $Ratings->rating);
        $feedback = mysqli_real_escape_string($db_conn, $Ratings->feedback);

        $sql = "INSERT INTO Ratings (name , email, doc_name , rating , feedback) VALUES ('$name', '$email', '$doc_name', '$rating' , '$feedback')";

        if (mysqli_query($db_conn, $sql)) {
            echo json_encode(["success" => "Rating and Feedback Added Successfully"]);
        } else {
            echo json_encode(["error" => "Failed to add . Please check the data."]);
        }
        break;
}
?>
