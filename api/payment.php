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
        $user_id = $_GET['user_id'];
        $query = "SELECT * FROM payment WHERE user_id = $user_id";
        $result = mysqli_query($db_conn, $query);

        if (!$result) {
            echo json_encode(["error" => "Query failed: " . mysqli_error($db_conn)]);
            exit();
        }

        $payments = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $payments[] = $row;
        }

        echo json_encode($payments);
        break;
    case "POST":
        $user_id = $_GET['user_id'];
        $payments = json_decode(file_get_contents('php://input'));
        
        if (
            empty($payments->email)|| 
            empty($payments->amount) ||
            empty($payments->date) 
        ) {
            echo json_encode(["error" => "Please fill in all fields"]);
            exit();
        }

        $payment_email = mysqli_real_escape_string($db_conn, $payments->email);
        $payment_date = mysqli_real_escape_string($db_conn, $payments->date);
        $payment_amount = mysqli_real_escape_string($db_conn, $payments->amount);

        $sql = "INSERT INTO payment (user_id, payment_email, payment_date, payment_amount) VALUES ('$user_id', '$payment_email', '$payment_date', '$payment_amount')";

        if (mysqli_query($db_conn, $sql)) {
            echo json_encode(["success" => "Payment Added Successfully"]);
        } else {
            echo json_encode(["error" => "Failed to add payment. Please check the data."]);
        }
        break;
}
?>
